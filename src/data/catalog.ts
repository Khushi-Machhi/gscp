export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  products: { name: string; tag: string; img: string }[];
};

import valve from "@/assets/p-valve.jpg";
import bellow from "@/assets/p-bellow.jpg";
import rods from "@/assets/p-rods.jpg";
import reactor from "@/assets/p-reactor.jpg";
import sight from "@/assets/p-sight.jpg";
import elbow from "@/assets/p-elbow.jpg";
import heat from "@/assets/p-heat.jpg";
import flange from "@/assets/p-flange.jpg";

export const categories: Category[] = [
  {
    slug: "bellows-expansion-joints",
    name: "Bellows Expansion Joints",
    short: "12+ variants",
    description:
      "High-pressure PTFE and PTFE-lined bellows engineered for thermal expansion, vibration absorption and chemical resistance.",
    image: bellow,
    products: [
      { name: "PTFE High Pressure Bellow", tag: "Bellows", img: bellow },
      { name: "PTFE Machined High Pressure Bellow", tag: "Bellows", img: bellow },
      { name: "300mm PTFE Bellow", tag: "Bellows", img: bellow },
      { name: "Industrial Bellows", tag: "Industrial", img: bellow },
    ],
  },
  {
    slug: "lined-valves",
    name: "Lined Valves",
    short: "PTFE • PFA",
    description:
      "PTFE-lined valves built to handle aggressive media — corrosion-proof, leak-tight, and designed for long service life.",
    image: valve,
    products: [
      { name: "Bakelite Bonet And PTFE Valve", tag: "Valves", img: valve },
      { name: "PTFE Lined Plug Valve", tag: "Valves", img: valve },
      { name: "PTFE Lined Butterfly Gate Valve", tag: "Valves", img: valve },
      { name: "Industrial Valves", tag: "Industrial", img: valve },
    ],
  },
  {
    slug: "laboratory-glassware",
    name: "Laboratory Glassware",
    short: "Premium grade",
    description:
      "Premium borosilicate laboratory and industrial glassware for chemical, pharma and research applications.",
    image: reactor,
    products: [
      { name: "50L Jacketed Glass Reactor", tag: "Glass", img: reactor },
      { name: "Glass Stirring Assembly", tag: "Glass", img: reactor },
      { name: "Industrial & Laboratory Glassware", tag: "Glass", img: reactor },
      { name: "PTFE Industrial Stirrer", tag: "Stirrer", img: rods },
    ],
  },
  {
    slug: "glass-heat-exchangers",
    name: "Glass Heat Exchangers",
    short: "Shell & Tube",
    description:
      "Glass heat exchangers and shell-and-tube assemblies for efficient heat transfer in corrosive environments.",
    image: heat,
    products: [
      { name: "Glass Heat Exchanger", tag: "Heat", img: heat },
      { name: "Glass Body Shell And Tube", tag: "Shell & Tube", img: heat },
      { name: "Heat Exchanger", tag: "Heat", img: heat },
    ],
  },
  {
    slug: "industrial-sight-glass",
    name: "Industrial Sight Glass",
    short: "Single & Double window",
    description:
      "Industrial sight glasses for visual monitoring of process flows under pressure and temperature.",
    image: sight,
    products: [
      { name: "Double Window Sight Glass", tag: "Glass", img: sight },
      { name: "Industrial Sight Glass", tag: "Glass", img: sight },
    ],
  },
  {
    slug: "ptfe-lined-fittings",
    name: "PTFE Lined Fittings",
    short: "Tees • Elbows • Flanges",
    description:
      "Complete range of PTFE-lined pipe fittings — tees, elbows, reducing flanges, spacers and feed pipes.",
    image: elbow,
    products: [
      { name: "PTFE Lined Equal Tees", tag: "Fittings", img: elbow },
      { name: "45° MS PTFE Lined Elbow", tag: "Fittings", img: elbow },
      { name: "MS PTFE Lined Header", tag: "Lined", img: elbow },
      { name: "PTFE Feed Pipes", tag: "Pipes", img: elbow },
      { name: "PTFE Lined Reducing Flange", tag: "Flanges", img: flange },
      { name: "SS Flanges", tag: "Flanges", img: flange },
      { name: "PFA / FEP Lined Spacer", tag: "Spacer", img: flange },
      { name: "PTFE Lap Seal", tag: "Sealing", img: valve },
    ],
  },
  {
    slug: "ptfe-products",
    name: "PTFE Products",
    short: "Rods • Sheets • Custom",
    description:
      "Pure PTFE products including rods, machined parts and custom polymer components built to spec.",
    image: rods,
    products: [
      { name: "Teflon Rods", tag: "PTFE", img: rods },
      { name: "PTFE Product", tag: "PTFE", img: rods },
      { name: "SS PTFE Pbt Blade Stirrer", tag: "Stirrer", img: rods },
    ],
  },
  {
    slug: "food-product-kettles",
    name: "Food Product Kettles",
    short: "Steam jacketed",
    description:
      "Steam jacketed kettles for food processing — durable stainless steel construction with consistent heating.",
    image: heat,
    products: [
      { name: "Steam Jacketed Kettle 20 Litre", tag: "Food", img: heat },
    ],
  },
];

export const allProducts = categories.flatMap((c) =>
  c.products.map((p) => ({ ...p, category: c.name, categorySlug: c.slug })),
);

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
