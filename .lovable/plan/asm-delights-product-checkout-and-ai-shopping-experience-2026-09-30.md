# ASM Delights product, checkout, and AI shopping experience

## What will be built

- Turn each bestseller into a linked product page with its own name, price, gallery treatment, ingredients, origin, nutrition table, available sizes, freshness notes, delivery estimate, quantity control, and add-to-bag action.
- Add a consistent shared store header and bag state so products added from the home or detail pages are reflected throughout the shopping flow.
- Add a cart review and polished checkout page with contact, delivery address, delivery method, payment presentation, order summary, and a UI-only confirmation state. No real payment or order processing will be added.
- Add an in-app “Find my perfect pick” assistant where shoppers can describe an occasion, dietary preference, snack goal, or paste a recipe. The assistant will recommend only ASM Delights catalog items, explain pairings, and provide links to relevant product pages.
- Preserve the chosen warm-ivory, burgundy, and antique-gold ASM Delights design, using Farmley only as an ecommerce usability reference rather than copying its branding or page design.

## Pages and navigation

- `/` — updated product cards and bag navigation.
- `/products/:slug` — one reusable detail layout populated for California Almonds, Whole Cashews W320, Roasted Pistachios, and Medjool Dates.
- `/assistant` — AI shopping and recipe-pairing experience with suggested prompts and clear loading/error states.
- `/cart` — bag contents, quantity controls, totals, and checkout entry.
- `/checkout` — UI-only delivery/payment form and confirmation state.

## Technical details

- Move the static catalog into one shared typed module so home, product pages, cart, checkout, and AI prompts use the same product facts.
- Keep cart data in browser storage for this UI-only phase; no customer, order, inventory, or payment records will be created.
- Use TanStack Start server routing with the Lovable AI Gateway and `openai/gpt-6-astra`; the API key and product prompt remain server-side.
- Stream AI responses into approved AI interface primitives, constrain the assistant to the local catalog, and surface safe gateway errors without automatic retries for terminal failures.
- Add unique metadata for every visible page, including product-specific titles and descriptions.

## Validation

- Verify product navigation, size and quantity controls, add-to-bag, cart updates, checkout completion, and the AI recommendation flow.
- Check desktop and mobile layouts for legibility, stable controls, and no overlap.
- Confirm the final preview builds without errors.
