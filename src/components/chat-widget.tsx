import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Leaf, MessageCircle, Plus, Trash2, X, History } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

type Thread = { id: string; title: string; updatedAt: number; messages: UIMessage[] };
const KEY = "asm-chat-threads";
const ACTIVE_KEY = "asm-chat-active";

const newThread = (): Thread => ({ id: crypto.randomUUID(), title: "New chat", updatedAt: Date.now(), messages: [] });

function loadThreads(): { threads: Thread[]; active: string } {
  let threads: Thread[] = [];
  try { threads = JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { threads = []; }
  if (!threads.length) {
    threads = [newThread()];
    localStorage.setItem(KEY, JSON.stringify(threads));
  }
  const stored = localStorage.getItem(ACTIVE_KEY);
  const active = threads.some((t) => t.id === stored) ? stored! : threads[0].id;
  return { threads, active };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showList, setShowList] = useState(false);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const { threads, active } = loadThreads();
    setThreads(threads);
    setActiveId(active);
  }, []);

  const commit = useCallback((updater: (t: Thread[]) => Thread[]) => {
    setThreads((prev) => {
      const next = updater(prev);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const select = (id: string) => { setActiveId(id); localStorage.setItem(ACTIVE_KEY, id); setShowList(false); };
  const create = () => { const t = newThread(); commit((p) => [t, ...p]); select(t.id); };
  const remove = (id: string) => {
    let fallback = "";
    commit((p) => {
      const rest = p.filter((t) => t.id !== id);
      const next = rest.length ? rest : [newThread()];
      fallback = next[0].id;
      return next;
    });
    if (id === activeId) setTimeout(() => select(fallback));
  };

  const saveMessages = useCallback((id: string, messages: UIMessage[]) => {
    commit((p) => p.map((t) => {
      if (t.id !== id) return t;
      const firstUser = messages.find((m) => m.role === "user");
      const text = firstUser?.parts.find((x) => x.type === "text");
      const title = t.title === "New chat" && text && "text" in text ? text.text.slice(0, 40) : t.title;
      return { ...t, messages, title, updatedAt: Date.now() };
    }));
  }, [commit]);

  const active = threads.find((t) => t.id === activeId);

  return (
    <>
      {open && (
        <div role="dialog" aria-label="ASM Delights assistant" className="fixed bottom-24 right-4 z-[60] flex h-[min(620px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-lg border border-border bg-background shadow-2xl sm:right-6">
          <div className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground"><Leaf size={18} /></span>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold">Badam · ASM Concierge</p>
              <p className="text-xs opacity-80">Picks, gifting & recipe ideas</p>
            </div>
            <Button size="icon" variant="ghost" aria-label="Chat history" onClick={() => setShowList((v) => !v)} className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><History /></Button>
            <Button size="icon" variant="ghost" aria-label="New chat" onClick={create} className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Plus /></Button>
            <Button size="icon" variant="ghost" aria-label="Close chat" onClick={() => setOpen(false)} className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><X /></Button>
          </div>

          {showList ? (
            <ul className="flex-1 overflow-y-auto p-2">
              {[...threads].sort((a, b) => b.updatedAt - a.updatedAt).map((t) => (
                <li key={t.id} className={`flex items-center rounded-md ${t.id === activeId ? "bg-muted" : ""}`}>
                  <button type="button" onClick={() => select(t.id)} className="flex-1 truncate px-3 py-3 text-left text-sm text-foreground">{t.title}</button>
                  <Button size="icon" variant="ghost" aria-label={`Delete ${t.title}`} onClick={() => remove(t.id)}><Trash2 size={16} /></Button>
                </li>
              ))}
            </ul>
          ) : active ? (
            <ChatWindow key={active.id} thread={active} onSave={saveMessages} />
          ) : null}
        </div>
      )}
      <button
        type="button"
        aria-label={open ? "Close assistant" : "Chat with ASM Delights"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-4 z-[60] flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-accent/40 transition-transform hover:scale-105 sm:right-6"
      >
        {open ? <X /> : <MessageCircle />}
      </button>
    </>
  );
}

const suggestions = ["Suggest a Diwali gift under ₹1,500", "Best dry fruits for daily energy?", "How do I track my order?"];

function ChatWindow({ thread, onSave }: { thread: Thread; onSave: (id: string, m: UIMessage[]) => void }) {
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, stop } = useChat({
    id: thread.id,
    messages: thread.messages,
    transport: new DefaultChatTransport({ api: "/api/chat", body: { threadId: thread.id } }),
    onError: (e) => setError(e.message || "Something went wrong. Please try again."),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (!busy && messages.length !== thread.messages.length) onSave(thread.id, messages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [busy, messages, onSave, thread.id]);

  useEffect(() => { if (!busy) textareaRef.current?.focus(); }, [busy]);

  const send = (text: string) => {
    if (!text.trim() || busy) return;
    setError("");
    sendMessage({ text });
  };

  return (
    <>
      <Conversation className="flex-1">
        <ConversationContent className="gap-5 p-4">
          {messages.length === 0 ? (
            <ConversationEmptyState icon={<Leaf className="text-accent-foreground" />} title="Namaste! How can I help?" description="Ask about products, gifts, nutrition or delivery.">
              <div className="mt-4 grid w-full gap-2">
                {suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => send(s)} className="rounded-md border border-border bg-card px-3 py-2 text-left text-sm text-foreground hover:border-primary">{s}</button>
                ))}
              </div>
            </ConversationEmptyState>
          ) : (
            messages.map((m) => (
              <Message key={m.id} from={m.role}>
                <MessageContent className={m.role === "user" ? "bg-primary text-primary-foreground" : ""}>
                  {m.parts.map((p, i) => p.type === "text" ? (m.role === "assistant" ? <MessageResponse key={i}>{p.text}</MessageResponse> : <span key={i}>{p.text}</span>) : null)}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" && <Shimmer className="text-sm">Badam is thinking…</Shimmer>}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="border-t border-border p-3">
        <PromptInput onSubmit={({ text }) => send(text)}>
          <PromptInputTextarea ref={textareaRef} placeholder="Ask about almonds, gifts, recipes…" autoFocus />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!busy && status === "error" ? false : undefined} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </>
  );
}
