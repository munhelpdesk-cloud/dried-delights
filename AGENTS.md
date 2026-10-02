# Project Architecture

- Keep catalog, cart, checkout, inventory, and payment behavior UI-only with local data; only AI recommendations use server-side infrastructure.
- Use the uploaded ASM Delights logo through a Lovable Assets pointer, because brand media should be served through the project asset flow.
- Keep product facts in one shared catalog module so storefront, detail pages, cart, checkout, and AI recommendations stay consistent.
