# ASM Delights premium storefront redesign

## Goal
Rebuild the storefront around the interaction and merchandising quality of Farmley while keeping ASM Delights visually original. The uploaded maroon-and-gold logo will become the main brand anchor.

## What will change
- Replace the current editorial homepage with a product-first shopping experience: slim offer bar, compact navigation, full-width campaign banner, category shortcuts, promotional tiles, bestseller rails, offer badges, quick add controls, reviews, brand story, newsletter, and a complete footer.
- Use a bright premium palette led by ASM maroon, warm gold, white, and subtle neutral backgrounds. Product photography and packaging will carry most of the visual energy.
- Refine the header with category navigation, working search, account entry, order tracking, cart count, and a compact mobile menu.
- Rework product cards and product detail pages with discount pricing, variants, quantity, delivery lookup, benefits, product information, recommendations, and reviews.
- Preserve and visually integrate the cart, checkout, order tracking, and popup AI shopping assistant.

## Missing pages to add
- Shop all products
- Category collection pages
- Gift boxes and festive gifting
- About ASM Delights
- Contact and support
- Frequently asked questions
- Shipping and returns
- Privacy policy and terms

## Content and behavior
- Keep catalog, cart, checkout, inventory, and payment interactions UI-only with local data.
- Expand the shared catalog so all pages use consistent products, prices, categories, badges, and imagery.
- All navigation and calls to action will open real pages or perform a visible interaction.
- Retain INR pricing and Indian dry-fruit shopping context.

## Technical details
- Continue with TanStack Start routes and the existing shared cart.
- Store the uploaded logo through the project asset flow and derive the favicon from it.
- Build reusable storefront sections, product cards, footer, and policy-page layout instead of duplicating markup.
- Resolve existing compile/runtime issues before visual verification.
- Verify desktop and mobile navigation, search, product selection, cart, checkout, tracking, and chat popup.
