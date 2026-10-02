import collectionImage from "@/assets/asm-product-collection.jpg";
import packagingImage from "@/assets/asm-packaging-lineup.jpg";
import giftImage from "@/assets/asm-gift-box.jpg";

export type NutritionRow = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  detail: string;
  description: string;
  price: number;
  oldPrice: number;
  badge: string;
  category: "nuts" | "dry-fruits" | "berries-seeds" | "gifting";
  rating: number;
  reviews: number;
  crop: string;
  origin: string;
  ingredients: string;
  sizes: { label: string; price: number }[];
  nutrition: NutritionRow[];
  highlights: string[];
  pairings: string[];
  delivery: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "california-almonds",
    name: "California Almonds",
    shortName: "Almonds",
    detail: "Premium whole • 250g",
    description: "Crisp, clean-tasting whole almonds selected for an even bite and satisfying everyday crunch.",
    price: 349,
    oldPrice: 399,
    badge: "Bestseller",
    category: "nuts",
    rating: 9,
    reviews: 184,
    crop: "object-[18%_70%]",
    origin: "California, USA",
    ingredients: "100% whole almonds. Contains tree nuts.",
    sizes: [{ label: "250g", price: 349 }, { label: "500g", price: 649 }, { label: "1kg", price: 1199 }],
    nutrition: [{ label: "Energy", value: "579 kcal" }, { label: "Protein", value: "21.2g" }, { label: "Carbohydrate", value: "21.6g" }, { label: "Healthy fats", value: "49.9g" }],
    highlights: ["Naturally rich in vitamin E", "Plant-based protein", "No preservatives"],
    pairings: ["Overnight oats", "Badam milk", "Granola and salads"],
    delivery: "Dispatches in 24 hours • Delivery in 3–5 working days",
    image: collectionImage,
  },
  {
    slug: "whole-cashews-w320",
    name: "Whole Cashews W320",
    shortName: "Cashews",
    detail: "Buttery & crisp • 250g",
    description: "Creamy whole W320 cashews with a gentle sweetness, carefully sorted for size, colour, and crunch.",
    price: 429,
    oldPrice: 479,
    badge: "Fresh batch",
    category: "nuts",
    rating: 8,
    reviews: 127,
    crop: "object-[72%_78%]",
    origin: "Goa & coastal Karnataka, India",
    ingredients: "100% whole cashew kernels. Contains tree nuts.",
    sizes: [{ label: "250g", price: 429 }, { label: "500g", price: 799 }, { label: "1kg", price: 1499 }],
    nutrition: [{ label: "Energy", value: "553 kcal" }, { label: "Protein", value: "18.2g" }, { label: "Carbohydrate", value: "30.2g" }, { label: "Healthy fats", value: "43.9g" }],
    highlights: ["Premium W320 grade", "Naturally creamy", "Hand sorted"],
    pairings: ["Kaju curry", "Vegan cream", "Festive sweets"],
    delivery: "Dispatches in 24 hours • Delivery in 3–5 working days",
    image: collectionImage,
  },
  {
    slug: "roasted-pistachios",
    name: "Roasted Pistachios",
    shortName: "Pistachios",
    detail: "Lightly salted • 200g",
    description: "Open-shell pistachios, gently roasted and lightly salted for a bright, savoury crunch.",
    price: 399,
    oldPrice: 449,
    badge: "Top rated",
    category: "nuts",
    rating: 9,
    reviews: 203,
    crop: "object-[25%_15%]",
    origin: "Kerman, Iran",
    ingredients: "Pistachios, sea salt. Contains tree nuts.",
    sizes: [{ label: "200g", price: 399 }, { label: "400g", price: 749 }, { label: "800g", price: 1399 }],
    nutrition: [{ label: "Energy", value: "560 kcal" }, { label: "Protein", value: "20.2g" }, { label: "Carbohydrate", value: "27.2g" }, { label: "Healthy fats", value: "45.3g" }],
    highlights: ["Gently roasted", "Lightly salted", "Naturally high in fibre"],
    pairings: ["Baklava", "Kulfi and ice cream", "Cheese platters"],
    delivery: "Dispatches in 24 hours • Delivery in 3–5 working days",
    image: collectionImage,
  },
  {
    slug: "medjool-dates",
    name: "Medjool Dates",
    shortName: "Dates",
    detail: "Soft & luscious • 400g",
    description: "Plump Medjool dates with a caramel-like sweetness and soft texture, perfect for natural snacking.",
    price: 549,
    oldPrice: 625,
    badge: "No added sugar",
    category: "dry-fruits",
    rating: 7,
    reviews: 96,
    crop: "object-[79%_12%]",
    origin: "Jordan Valley, Jordan",
    ingredients: "100% Medjool dates. Contains naturally occurring sugars.",
    sizes: [{ label: "400g", price: 549 }, { label: "800g", price: 999 }, { label: "1.2kg", price: 1399 }],
    nutrition: [{ label: "Energy", value: "277 kcal" }, { label: "Protein", value: "1.8g" }, { label: "Carbohydrate", value: "75g" }, { label: "Dietary fibre", value: "6.7g" }],
    highlights: ["No added sugar", "Naturally caramel-like", "Soft and seed-in"],
    pairings: ["Date shakes", "Energy bites", "Stuffed with nuts"],
    delivery: "Dispatches in 24 hours • Delivery in 3–5 working days",
    image: collectionImage,
  },
  {
    slug: "premium-walnut-kernels", name: "Premium Walnut Kernels", shortName: "Walnuts", detail: "Light & crunchy • 200g", description: "Freshly shelled walnut kernels with a clean, delicate crunch and naturally rich flavour.", price: 449, oldPrice: 525, badge: "Heart smart", category: "nuts", rating: 8, reviews: 88, crop: "object-[82%_46%]", origin: "Kashmir, India", ingredients: "100% walnut kernels. Contains tree nuts.", sizes: [{ label: "200g", price: 449 }, { label: "400g", price: 829 }], nutrition: [{ label: "Energy", value: "654 kcal" }, { label: "Protein", value: "15.2g" }, { label: "Healthy fats", value: "65.2g" }], highlights: ["Freshly shelled", "Omega-rich", "No preservatives"], pairings: ["Breakfast bowls", "Brownies", "Salads"], delivery: "Dispatches in 24 hours • Delivery in 3–5 working days", image: packagingImage,
  },
  {
    slug: "cranberry-trail-mix", name: "Cranberry Trail Mix", shortName: "Trail Mix", detail: "Fruit & nut mix • 250g", description: "A colourful everyday mix of nuts, berries and seeds balanced for satisfying snacking.", price: 299, oldPrice: 349, badge: "New", category: "berries-seeds", rating: 8, reviews: 72, crop: "object-[88%_50%]", origin: "Packed in India", ingredients: "Almonds, cashews, cranberries, raisins, pumpkin seeds and walnuts.", sizes: [{ label: "250g", price: 299 }, { label: "500g", price: 549 }], nutrition: [{ label: "Energy", value: "472 kcal" }, { label: "Protein", value: "13.8g" }, { label: "Dietary fibre", value: "8.2g" }], highlights: ["Six wholesome ingredients", "Travel friendly", "No artificial colours"], pairings: ["Desk snacking", "Yoghurt bowls", "Road trips"], delivery: "Dispatches in 24 hours • Delivery in 3–5 working days", image: packagingImage,
  },
  {
    slug: "royal-dry-fruit-gift-box", name: "Royal Dry Fruit Gift Box", shortName: "Royal Gift Box", detail: "Four premium selections", description: "An elegant maroon keepsake box filled with four premium dry-fruit favourites for memorable celebrations.", price: 1299, oldPrice: 1599, badge: "Gift favourite", category: "gifting", rating: 9, reviews: 141, crop: "object-center", origin: "Curated and packed in India", ingredients: "Almonds, cashews, pistachios and Medjool dates.", sizes: [{ label: "4 jars", price: 1299 }, { label: "6 jars", price: 1899 }], nutrition: [{ label: "Selections", value: "4" }, { label: "Net weight", value: "800g" }], highlights: ["Premium rigid box", "Festive ready", "Custom note included"], pairings: ["Festivals", "Weddings", "Corporate gifting"], delivery: "Dispatches in 24–48 hours • Delivery in 3–5 working days", image: giftImage,
  },
  {
    slug: "roasted-seed-mix", name: "Roasted Seed Mix", shortName: "Seed Mix", detail: "Lightly roasted • 200g", description: "A crisp blend of pumpkin, sunflower and flax seeds, gently roasted for an easy everyday snack.", price: 249, oldPrice: 299, badge: "Protein pick", category: "berries-seeds", rating: 7, reviews: 61, crop: "object-[72%_50%]", origin: "Packed in India", ingredients: "Pumpkin seeds, sunflower seeds, flax seeds and sea salt.", sizes: [{ label: "200g", price: 249 }, { label: "400g", price: 449 }], nutrition: [{ label: "Energy", value: "535 kcal" }, { label: "Protein", value: "24g" }, { label: "Dietary fibre", value: "11g" }], highlights: ["Plant protein", "Gently roasted", "Clean ingredients"], pairings: ["Salads", "Smoothie bowls", "Anytime snacking"], delivery: "Dispatches in 24 hours • Delivery in 3–5 working days", image: packagingImage,
  },
];

export const productBySlug = (slug: string) => products.find((product) => product.slug === slug);

export const catalogForPrompt = products.map(({ slug, name, description, ingredients, origin, highlights, pairings, sizes }) => ({
  slug, name, description, ingredients, origin, highlights, pairings, sizes,
}));