import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "spices",
    slug: "spices",
    accent: "#a6502f",
    softAccent: "#f0d9cb",
    icon: "spice",
    name: { da: "Krydderier & blandinger", en: "Spices & blends" },
    tagline: { da: "Berbere, mitmita og mere", en: "Berbere, mitmita and more" },
    description: {
      da: "Soltrørrede chilier, aromatiske frø og håndblandede krydderimixer fra Det Etiopiske Højland.",
      en: "Sun-dried chillies, aromatic seeds and hand-blended spice mixes from the Ethiopian highlands.",
    },
  },
  {
    id: "grains",
    slug: "grains",
    accent: "#9c7830",
    softAccent: "#f1e4c8",
    icon: "grain",
    name: { da: "Korn & mel", en: "Grains & flour" },
    tagline: { da: "Teff, byg og kikærter", en: "Teff, barley and chickpeas" },
    description: {
      da: "Finmalet teff til injera, nærende bygmel og kikærtemel til shiro — kværnet på traditionel vis.",
      en: "Finely milled teff for injera, nourishing barley flour and chickpea flour for shiro — stone-ground the traditional way.",
    },
  },
  {
    id: "coffee",
    slug: "coffee",
    accent: "#6b4226",
    softAccent: "#e8d7c5",
    icon: "coffee",
    name: { da: "Kaffe", en: "Coffee" },
    tagline: { da: "Yirgacheffe, Sidamo, Harrar", en: "Yirgacheffe, Sidamo, Harrar" },
    description: {
      da: "Enkeltorigin kaffe fra de berømte højlandsregioner. Ristet i små partier, hele bønner eller malet.",
      en: "Single-origin coffee from the celebrated highland regions. Small-batch roasted, whole bean or ground.",
    },
  },
  {
    id: "honey",
    slug: "honey",
    accent: "#b07c1e",
    softAccent: "#f4e3bd",
    icon: "honey",
    name: { da: "Honning", en: "Honey" },
    tagline: { da: "Hvid honning & vildhonning", en: "White & wild honey" },
    description: {
      da: "Raw, ufiltreret honning fra bjergbikubber i Tigray og Amhara. Blomsterrig og dybt aromatisk.",
      en: "Raw, unfiltered honey from mountain apiaries in Tigray and Amhara. Floral and deeply aromatic.",
    },
  },
  {
    id: "sauces",
    slug: "sauces",
    accent: "#99392a",
    softAccent: "#efd3c9",
    icon: "sauce",
    name: { da: "Saucer & pasta", en: "Sauces & pastes" },
    tagline: { da: "Awaze, niter kibbeh, harissa", en: "Awaze, niter kibbeh, harissa" },
    description: {
      da: "Færdige smagsbaser til doro wat, shiro og tibs. Lavet efter familieopskrifter i små batches.",
      en: "Ready flavour bases for doro wat, shiro and tibs. Made to family recipes in small batches.",
    },
  },
  {
    id: "pantry",
    slug: "pantry",
    accent: "#6f7248",
    softAccent: "#e6e4d1",
    icon: "pantry",
    name: { da: "Kolonial & hverdag", en: "Pantry & essentials" },
    tagline: { da: "Bælgfrugter, ghee & røgelse", en: "Pulses, ghee & incense" },
    description: {
      da: "Alt det nødvendige til hverdagen: bælgfrugter, klaret smør, røgelse og smukke serveringskurve.",
      en: "Everyday essentials: pulses, clarified butter, incense and beautiful serving baskets.",
    },
  },
];

export const categoryById = (id: string) =>
  categories.find((category) => category.id === id);

export const categoryBySlug = (slug: string) =>
  categories.find((category) => category.slug === slug);
