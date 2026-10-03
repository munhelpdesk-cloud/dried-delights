# Premium Admin Panel

## Build
- Add a separate `/admin/login` demo sign-in screen using the ASM Delights maroon-and-gold visual system.
- Add a shared responsive admin shell with sidebar navigation, mobile menu, search, alerts, profile menu, and demo sign-out.
- Build working UI-only pages for dashboard, products, product add/edit, orders, order details, transactions, customers, reports, and profile settings.
- Reuse the shared catalog as the initial product source, then keep demo create/update/delete changes in local browser storage.
- Add realistic sample operational data, filters, statuses, charts, tables, empty states, confirmations, and CSV export where relevant.

## Behavior
- Demo login accepts any valid-looking email and a password of at least six characters; no real account is created.
- Admin session, profile preferences, and product edits stay in the browser only.
- Product changes remain isolated to the admin demo and do not modify the public storefront catalog.

## Quality
- Match the existing premium ASM Delights theme and remain usable across desktop and mobile.
- Add unique page titles and sharing descriptions for every admin route.
- Verify sign-in, navigation, product add/edit/delete, filters, detail views, and mobile layout in the running preview.
