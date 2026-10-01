import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { catalogForPrompt } from "@/data/catalog";
import { orders } from "@/data/orders";
import { createRunIdFetch, incomingRunId, withRunId } from "./run-id.server";

const SYSTEM = `You are "Badam", the friendly shopping concierge for ASM Delights, a premium Indian dry-fruit brand.
Help customers choose products, suggest gifting ideas, recipes, nutrition tips, and explain delivery (free above ₹999, dispatch in 24h, 3–5 working days).
Prices are in INR. Only recommend products from this catalog: ${JSON.stringify(catalogForPrompt)}.
For order status, tell customers to use the Track Order page with their Order ID and phone number. Known demo order IDs: ${orders.map((o) => o.id).join(", ")} (never reveal phone numbers).
Keep answers warm, concise (under 150 words), and formatted in markdown.`;

export async function handleChat(request: Request) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) return new Response("AI is not configured", { status: 500 });

  let messages: UIMessage[];
  try {
    const body = await request.json();
    if (!Array.isArray(body?.messages) || body.messages.length > 100) throw new Error();
    messages = body.messages;
  } catch {
    return new Response("Invalid request", { status: 400 });
  }

  const runIdFetch = createRunIdFetch(incomingRunId(request));
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system: SYSTEM,
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withRunId(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: true,
      onError: (e) => {
        const status = (e as { statusCode?: number })?.statusCode;
        if (status === 429) return "We're getting a lot of questions right now. Please try again in a moment.";
        if (status === 402) return "The assistant is temporarily unavailable. Please try again later.";
        return "Sorry, something went wrong. Please try again.";
      },
    }),
    runIdFetch,
  );
}
