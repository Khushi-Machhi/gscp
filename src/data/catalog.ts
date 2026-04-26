// export type Category = {
//   slug: string;
//   name: string;
//   short: string;
//   description: string;
//   image: string;
//   products: { name: string; tag: string; img: string }[];
// };

// import valve from "@/assets/p-valve.jpg";
// import bellow from "@/assets/p-bellow.jpg";
// import rods from "@/assets/p-rods.jpg";
// import reactor from "@/assets/p-reactor.jpg";
// import sight from "@/assets/p-sight.jpg";
// import elbow from "@/assets/p-elbow.jpg";
// import heat from "@/assets/p-heat.jpg";
// import flange from "@/assets/p-flange.jpg";

// export const categories: Category[] = [
//   {
//     slug: "bellows-expansion-joints",
//     name: "Bellows Expansion Joints",
//     short: "12+ variants",
//     description:
//       "High-pressure PTFE and PTFE-lined bellows engineered for thermal expansion, vibration absorption and chemical resistance.",
//     image: bellow,
//     products: [
//       { name: "PTFE High Pressure Bellow", tag: "Bellows", img: bellow },
//       { name: "PTFE Machined High Pressure Bellow", tag: "Bellows", img: bellow },
//       { name: "300mm PTFE Bellow", tag: "Bellows", img: bellow },
//       { name: "Industrial Bellows", tag: "Industrial", img: bellow },
//     ],
//   },
//   {
//     slug: "lined-valves",
//     name: "Lined Valves",
//     short: "PTFE • PFA",
//     description:
//       "PTFE-lined valves built to handle aggressive media — corrosion-proof, leak-tight, and designed for long service life.",
//     image: valve,
//     products: [
//       { name: "Bakelite Bonet And PTFE Valve", tag: "Valves", img: valve },
//       { name: "PTFE Lined Plug Valve", tag: "Valves", img: valve },
//       { name: "PTFE Lined Butterfly Gate Valve", tag: "Valves", img: valve },
//       { name: "Industrial Valves", tag: "Industrial", img: valve },
//     ],
//   },
//   {
//     slug: "laboratory-glassware",
//     name: "Laboratory Glassware",
//     short: "Premium grade",
//     description:
//       "Premium borosilicate laboratory and industrial glassware for chemical, pharma and research applications.",
//     image: reactor,
//     products: [
//       { name: "50L Jacketed Glass Reactor", tag: "Glass", img: reactor },
//       { name: "Glass Stirring Assembly", tag: "Glass", img: reactor },
//       { name: "Industrial & Laboratory Glassware", tag: "Glass", img: reactor },
//       { name: "PTFE Industrial Stirrer", tag: "Stirrer", img: rods },
//     ],
//   },
//   {
//     slug: "glass-heat-exchangers",
//     name: "Glass Heat Exchangers",
//     short: "Shell & Tube",
//     description:
//       "Glass heat exchangers and shell-and-tube assemblies for efficient heat transfer in corrosive environments.",
//     image: heat,
//     products: [
//       { name: "Glass Heat Exchanger", tag: "Heat", img: heat },
//       { name: "Glass Body Shell And Tube", tag: "Shell & Tube", img: heat },
//       { name: "Heat Exchanger", tag: "Heat", img: heat },
//     ],
//   },
//   {
//     slug: "industrial-sight-glass",
//     name: "Industrial Sight Glass",
//     short: "Single & Double window",
//     description:
//       "Industrial sight glasses for visual monitoring of process flows under pressure and temperature.",
//     image: sight,
//     products: [
//       { name: "Double Window Sight Glass", tag: "Glass", img: sight },
//       { name: "Industrial Sight Glass", tag: "Glass", img: sight },
//     ],
//   },
//   {
//     slug: "ptfe-lined-fittings",
//     name: "PTFE Lined Fittings",
//     short: "Tees • Elbows • Flanges",
//     description:
//       "Complete range of PTFE-lined pipe fittings — tees, elbows, reducing flanges, spacers and feed pipes.",
//     image: elbow,
//     products: [
//       { name: "PTFE Lined Equal Tees", tag: "Fittings", img: elbow },
//       { name: "45° MS PTFE Lined Elbow", tag: "Fittings", img: elbow },
//       { name: "MS PTFE Lined Header", tag: "Lined", img: elbow },
//       { name: "PTFE Feed Pipes", tag: "Pipes", img: elbow },
//       { name: "PTFE Lined Reducing Flange", tag: "Flanges", img: flange },
//       { name: "SS Flanges", tag: "Flanges", img: flange },
//       { name: "PFA / FEP Lined Spacer", tag: "Spacer", img: flange },
//       { name: "PTFE Lap Seal", tag: "Sealing", img: valve },
//     ],
//   },
//   {
//     slug: "ptfe-products",
//     name: "PTFE Products",
//     short: "Rods • Sheets • Custom",
//     description:
//       "Pure PTFE products including rods, machined parts and custom polymer components built to spec.",
//     image: rods,
//     products: [
//       { name: "Teflon Rods", tag: "PTFE", img: rods },
//       { name: "PTFE Product", tag: "PTFE", img: rods },
//       { name: "SS PTFE Pbt Blade Stirrer", tag: "Stirrer", img: rods },
//     ],
//   },
//   {
//     slug: "food-product-kettles",
//     name: "Food Product Kettles",
//     short: "Steam jacketed",
//     description:
//       "Steam jacketed kettles for food processing — durable stainless steel construction with consistent heating.",
//     image: heat,
//     products: [
//       { name: "Steam Jacketed Kettle 20 Litre", tag: "Food", img: heat },
//     ],
//   },
// ];

// export const allProducts = categories.flatMap((c) =>
//   c.products.map((p) => ({ ...p, category: c.name, categorySlug: c.slug })),
// );

// export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);


import valve from "@/assets/p-valve.jpg";
import bellow from "@/assets/p-bellow.jpg";
import rods from "@/assets/p-rods.jpg";
import reactor from "@/assets/p-reactor.jpg";
import sight from "@/assets/p-sight.jpg";
import elbow from "@/assets/p-elbow.jpg";
import heat from "@/assets/p-heat.jpg";
import flange from "@/assets/p-flange.jpg";

export type SpecRow = { label: string; value: string };
export type FAQ = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  tag: string;
  img: string;
  price?: string;
  moq?: string;
  shortDescription: string;
  longDescription: string;
  specs: SpecRow[];
  highlights: { title: string; body: string }[];
  trade: SpecRow[];
  faqs: FAQ[];
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  image: string;
  products: Product[];
};

// Common trade info reused across products
const tradeDefault: SpecRow[] = [
  { label: "Minimum Order Quantity", value: "1 Piece" },
  { label: "FOB Port", value: "Vadodara, Gujarat" },
  { label: "Payment Terms", value: "Cash Advance (CA), Cash in Advance (CID), Cheque" },
  { label: "Supply Ability", value: "500 Pieces Per Week" },
  { label: "Delivery Time", value: "7 Days" },
  {
    label: "Main Export Market(s)",
    value:
      "Asia, Australia, South America, Middle East, Africa, Central America, Eastern Europe, North America, Western Europe",
  },
  { label: "Main Domestic Market", value: "All India" },
];

// Helper to build a product with sensible defaults derived from category presets
type Preset = {
  tag: string;
  img: string;
  baseSpecs: SpecRow[];
  highlights: { title: string; body: string }[];
  faqs: FAQ[];
};

const makeFaqs = (name: string): FAQ[] => [
  {
    q: `How is the ${name} typically installed in industrial systems?`,
    a: `The ${name} is installed using standard flanged or threaded connections compatible with DIN, ANSI, or JIS specifications. Proper alignment, gasket selection and tightening torque are essential for leak-free performance.`,
  },
  {
    q: `Which industries benefit most from using ${name}?`,
    a: `Chemical processing, pharmaceutical, petrochemical, food & beverage, fertilizer, dye & intermediate and water treatment industries benefit due to the product's chemical resistance and durability.`,
  },
  {
    q: `When should the ${name} be inspected or replaced?`,
    a: `Routine inspection is recommended during scheduled plant shutdowns. Replace if there are signs of physical damage, lining wear, or if operating conditions routinely approach the rated pressure or temperature limits.`,
  },
  {
    q: `Can the ${name} be customized for my application?`,
    a: `Yes — sizes, end connections, lining thickness and materials of construction can be customized. Share your operating conditions and we will recommend the right specification.`,
  },
  {
    q: `Where is the ${name} manufactured and shipped from?`,
    a: `It is manufactured at our facility in Vadodara, Gujarat (India) and shipped to clients across India and overseas through Vadodara port and partner logistics.`,
  },
];

const presets: Record<string, Preset> = {
  bellows: {
    tag: "Bellows",
    img: bellow,
    baseSpecs: [
      { label: "Media", value: "Corrosive chemicals, acids, air, water, gases" },
      { label: "Surface Treatment", value: "Polish" },
      { label: "Flange", value: "MS / SS 304 / SS 316" },
      { label: "Max. Temperature", value: "Up to 200°C" },
      { label: "Usage", value: "Industrial" },
      { label: "Material", value: "PTFE / Stainless Steel" },
      { label: "Technique", value: "Molded and fabricated" },
      { label: "Connecting Type", value: "Flanged" },
      { label: "Shape", value: "Cylindrical" },
      { label: "Working Pressure", value: "Up to 10 Bar" },
      { label: "Leakage Rate", value: "Zero (when properly installed)" },
      { label: "Size Range", value: "25 mm to 600 mm (Nominal Diameter)" },
      { label: "Pressure Rating", value: "PN10, PN16" },
      { label: "Temperature Tolerance", value: "-20°C to +200°C" },
      { label: "Standard", value: "DIN / ANSI / JIS" },
      { label: "Color", value: "White (PTFE interior)" },
    ],
    highlights: [
      {
        title: "Superior Corrosion Resistance",
        body:
          "PTFE interior with stainless steel exterior delivers outstanding protection against aggressive chemicals — ideal for industrial and pharmaceutical processing.",
      },
      {
        title: "High Flexibility for Dynamic Systems",
        body:
          "Engineered convolutions accommodate thermal expansion, vibration, axial, lateral and angular movement — protecting connected piping.",
      },
      {
        title: "Versatile Industrial Applications",
        body:
          "Compliant with DIN, ANSI and JIS standards. Trusted by manufacturers, OEMs and EPCs across India for leak-tight performance.",
      },
    ],
    faqs: [],
  },
  valves: {
    tag: "Valves",
    img: valve,
    baseSpecs: [
      { label: "Material", value: "MS / SS 304 / SS 316 with PTFE / FEP / PFA lining" },
      { label: "End Connection", value: "Flanged ANSI 150# / DIN PN10 / PN16" },
      { label: "Size Range", value: "15 mm (½\") to 300 mm (12\")" },
      { label: "Working Pressure", value: "Up to 10 Bar" },
      { label: "Temperature Range", value: "-20°C to +180°C" },
      { label: "Body Material", value: "Carbon Steel / Stainless Steel" },
      { label: "Lining", value: "PTFE / PFA / FEP" },
      { label: "Operation", value: "Manual / Pneumatic / Electric" },
      { label: "Standard", value: "ANSI / DIN / JIS" },
      { label: "Application", value: "Chemical, pharma, petrochemical, dye, water treatment" },
      { label: "Leak Tightness", value: "Bubble-tight shut-off" },
    ],
    highlights: [
      {
        title: "Chemically Inert Lining",
        body:
          "PTFE / PFA / FEP lining delivers near-universal chemical resistance — perfect for highly corrosive media and pure-process duty.",
      },
      {
        title: "Long Service Life",
        body:
          "Robust metal body with bonded fluoropolymer lining gives the strength of metal with the inertness of plastic — minimizing downtime.",
      },
      {
        title: "Bubble-Tight Shut-Off",
        body:
          "Precision-machined seats and discs ensure zero-leak isolation, even after thousands of operating cycles.",
      },
    ],
    faqs: [],
  },
  glassware: {
    tag: "Glassware",
    img: reactor,
    baseSpecs: [
      { label: "Material", value: "Borosilicate Glass 3.3" },
      { label: "Capacity", value: "5 L to 200 L" },
      { label: "Working Temperature", value: "-20°C to +200°C" },
      { label: "Pressure (Reactor)", value: "Full vacuum to +0.5 Bar" },
      { label: "Connection", value: "PTFE flange / DN coupling" },
      { label: "Application", value: "R&D, pilot plants, kilo labs, distillation, reaction" },
      { label: "Wall Thickness", value: "Engineered for vacuum & jacketed duty" },
      { label: "Compliance", value: "DIN / ASTM / ISO standards" },
      { label: "Stand", value: "MS powder-coated structure" },
    ],
    highlights: [
      {
        title: "Borosilicate 3.3 Construction",
        body:
          "Excellent thermal shock resistance, low thermal expansion and outstanding chemical inertness for demanding lab and pilot-plant duty.",
      },
      {
        title: "Full Process Visibility",
        body:
          "Transparent glass enables real-time monitoring of reactions, mixing and distillation — improving process control.",
      },
      {
        title: "Modular & Expandable",
        body:
          "Standardised DN couplings allow quick reconfiguration for reaction, distillation, extraction or scrubbing duty.",
      },
    ],
    faqs: [],
  },
  heatExchanger: {
    tag: "Heat Exchanger",
    img: heat,
    baseSpecs: [
      { label: "Type", value: "Shell & Tube / Coil / Block" },
      { label: "Heat Transfer Area", value: "0.5 m² to 50 m²" },
      { label: "Shell Material", value: "Borosilicate Glass / MS / SS" },
      { label: "Tube Material", value: "Borosilicate Glass / PTFE / SS" },
      { label: "Design Pressure (Shell)", value: "Atmospheric to 3 Bar" },
      { label: "Design Pressure (Tube)", value: "Full vacuum to +1 Bar" },
      { label: "Temperature", value: "-20°C to +200°C" },
      { label: "Application", value: "Condenser, cooler, heater, reboiler" },
      { label: "Connection", value: "Flanged / DN coupling" },
    ],
    highlights: [
      {
        title: "Corrosion-Proof Heat Transfer",
        body:
          "Glass and PTFE construction handles aggressive acids, solvents and intermediates without contamination.",
      },
      {
        title: "High Efficiency",
        body:
          "Optimised tube-side velocity and baffle design deliver excellent overall heat-transfer coefficients.",
      },
      {
        title: "Easy Maintenance",
        body:
          "Bolted-flange construction makes inspection, cleaning and tube replacement straightforward.",
      },
    ],
    faqs: [],
  },
  sightGlass: {
    tag: "Sight Glass",
    img: sight,
    baseSpecs: [
      { label: "Type", value: "Single window / Double window" },
      { label: "Body Material", value: "MS / SS 304 / SS 316" },
      { label: "Glass", value: "Toughened borosilicate" },
      { label: "Size Range", value: "25 mm to 200 mm" },
      { label: "Connection", value: "Flanged ANSI / DIN" },
      { label: "Working Pressure", value: "Up to 10 Bar" },
      { label: "Temperature", value: "Up to 200°C" },
      { label: "Gasket", value: "PTFE / Graphite" },
      { label: "Application", value: "Process visualization, level monitoring" },
    ],
    highlights: [
      {
        title: "Crystal-Clear Process Visibility",
        body: "Toughened borosilicate gives a clear, distortion-free view of process media even under pressure.",
      },
      {
        title: "Robust Pressure Rating",
        body: "Designed and tested for industrial pipeline pressures with PTFE-cushioned glass mounting.",
      },
      {
        title: "Wide Material Choice",
        body: "MS, SS 304 or SS 316 body to suit your service conditions and corrosion requirements.",
      },
    ],
    faqs: [],
  },
  fittings: {
    tag: "Lined Fitting",
    img: elbow,
    baseSpecs: [
      { label: "Lining", value: "PTFE / PFA / FEP" },
      { label: "Body Material", value: "Carbon Steel / SS 304 / SS 316" },
      { label: "Size Range", value: "15 mm to 300 mm (½\" to 12\")" },
      { label: "Lining Thickness", value: "3 mm (standard)" },
      { label: "End Connection", value: "Flanged ANSI 150# / DIN PN10" },
      { label: "Working Pressure", value: "Up to 10 Bar" },
      { label: "Temperature", value: "-20°C to +200°C" },
      { label: "Standard", value: "ANSI B16.5 / DIN 2533" },
      { label: "Application", value: "Corrosive fluid handling, chemical & pharma piping" },
    ],
    highlights: [
      {
        title: "Universal Chemical Resistance",
        body:
          "Fluoropolymer lining is inert to virtually all acids, bases and solvents — eliminating corrosion of the metallic body.",
      },
      {
        title: "Vent Holes & Spark Test",
        body:
          "Each fitting features pressure-relief vent holes and is spark-tested to ensure pinhole-free lining integrity.",
      },
      {
        title: "Drop-In Replacement",
        body:
          "Standard ANSI / DIN dimensions make installation easy as a direct replacement for conventional fittings.",
      },
    ],
    faqs: [],
  },
  flanges: {
    tag: "Flanges",
    img: flange,
    baseSpecs: [
      { label: "Material", value: "MS / SS 304 / SS 316 with PTFE / PFA lining" },
      { label: "Standard", value: "ANSI B16.5 / DIN 2527 / JIS" },
      { label: "Size Range", value: "15 mm to 300 mm" },
      { label: "Pressure Rating", value: "150# / PN10 / PN16" },
      { label: "Type", value: "Slip-on / Weld-neck / Reducing / Blind" },
      { label: "Temperature", value: "Up to 200°C" },
      { label: "Application", value: "Chemical, pharma, fertilizer, refinery" },
    ],
    highlights: [
      {
        title: "Precision-Machined Faces",
        body: "Smooth gasket-seating faces ensure leak-tight, repeatable connections.",
      },
      {
        title: "PTFE-Lined Variants",
        body: "Lined flanges deliver the corrosion resistance of fluoropolymers with the strength of steel.",
      },
      {
        title: "All Major Standards",
        body: "Manufactured to ANSI, DIN and JIS — interchangeable with global piping systems.",
      },
    ],
    faqs: [],
  },
  ptfe: {
    tag: "PTFE",
    img: rods,
    baseSpecs: [
      { label: "Material", value: "Virgin / Filled PTFE" },
      { label: "Color", value: "White (virgin) / Black, Brown (filled)" },
      { label: "Density", value: "2.13 - 2.20 g/cc" },
      { label: "Operating Temperature", value: "-200°C to +260°C" },
      { label: "Dielectric Strength", value: "60 kV/mm" },
      { label: "Coefficient of Friction", value: "0.05 - 0.10 (very low)" },
      { label: "Form", value: "Rod / Tube / Sheet / Machined component" },
      { label: "Compliance", value: "FDA grade available" },
      { label: "Standard Sizes", value: "Custom dimensions on request" },
    ],
    highlights: [
      {
        title: "Inert to Almost All Chemicals",
        body: "Virgin PTFE resists virtually all industrial chemicals across a wide temperature range.",
      },
      {
        title: "Self-Lubricating",
        body: "Lowest coefficient of friction of any solid — ideal for bushes, seals and slides.",
      },
      {
        title: "Custom Machined to Spec",
        body: "We CNC-machine PTFE to your exact drawing — tight tolerances, repeatable quality.",
      },
    ],
    faqs: [],
  },
  stirrer: {
    tag: "Stirrer",
    img: rods,
    baseSpecs: [
      { label: "Shaft Material", value: "SS 304 / SS 316 with PTFE coating" },
      { label: "Blade Type", value: "Anchor / PBT / Propeller / Paddle" },
      { label: "Length", value: "Custom (300 mm to 2500 mm)" },
      { label: "Diameter", value: "Custom (10 mm to 50 mm shaft)" },
      { label: "Coating", value: "PTFE / PFA bonded coating" },
      { label: "Application", value: "Glass-lined / SS reactors, lab & pilot plants" },
      { label: "Temperature", value: "Up to 200°C" },
      { label: "Compliance", value: "FDA-grade liner available" },
    ],
    highlights: [
      {
        title: "Corrosion-Proof Wetted Parts",
        body:
          "PTFE coating fully encapsulates the shaft and blade — no metal contact with the process fluid.",
      },
      {
        title: "Custom Geometry",
        body:
          "Anchor, PBT, propeller and paddle blades sized to your reactor for optimum mixing efficiency.",
      },
      {
        title: "Built for Long Life",
        body: "SS core with bonded PTFE liner withstands continuous duty in demanding chemical service.",
      },
    ],
    faqs: [],
  },
  food: {
    tag: "Food Grade",
    img: heat,
    baseSpecs: [
      { label: "Capacity", value: "20 L (other sizes on request)" },
      { label: "Material", value: "SS 304 / SS 316 (food grade)" },
      { label: "Heating", value: "Steam jacketed" },
      { label: "Working Pressure (Jacket)", value: "Up to 3 Bar" },
      { label: "Surface Finish", value: "Mirror polished interior" },
      { label: "Application", value: "Cooking, mixing, boiling, sterilizing" },
      { label: "Tilting", value: "Manual / Hand-wheel" },
      { label: "Compliance", value: "FSSAI hygienic design" },
    ],
    highlights: [
      {
        title: "Food-Safe Construction",
        body: "Food-grade SS with mirror-polished interior — easy to clean and CIP friendly.",
      },
      {
        title: "Uniform Heating",
        body: "Full-jacket steam heating delivers even temperature distribution and consistent product quality.",
      },
      {
        title: "Industrial Durability",
        body: "Heavy-duty fabrication for continuous service in commercial kitchens and food plants.",
      },
    ],
    faqs: [],
  },
};

// Build a product
const p = (
  preset: Preset,
  slug: string,
  name: string,
  opts: Partial<Pick<Product, "img" | "price" | "moq" | "tag" | "shortDescription" | "longDescription">> = {},
): Product => ({
  slug,
  name,
  tag: opts.tag ?? preset.tag,
  img: opts.img ?? preset.img,
  price: opts.price,
  moq: opts.moq ?? "1 Piece",
  shortDescription:
    opts.shortDescription ??
    `Industrial-grade ${name} engineered for demanding chemical, pharmaceutical and process applications.`,
  longDescription:
    opts.longDescription ??
    `${name} from Gujarat Scientific And Polymer is built to deliver reliable performance in aggressive process environments. Manufactured in our Vadodara facility using high-grade raw materials and tested for dimensional accuracy, leak-tightness and chemical resistance. Suitable for chemical, pharmaceutical, petrochemical, fertilizer and water-treatment industries.`,
  specs: preset.baseSpecs,
  highlights: preset.highlights,
  trade: tradeDefault,
  faqs: makeFaqs(name),
});

export const categories: Category[] = [
  {
    slug: "bellows-expansion-joints",
    name: "Bellows Expansion Joints",
    short: "PTFE & high-pressure",
    description:
      "High-pressure PTFE and PTFE-lined bellows engineered for thermal expansion, vibration absorption and chemical resistance.",
    image: bellow,
    products: [
      p(presets.bellows, "ptfe-expansion-joint-bellow", "PTFE Expansion Joint Bellow", {
        price: "8500 INR / Piece",
        shortDescription:
          "Flexible PTFE expansion joint with stainless flanges — absorbs thermal, axial, lateral and angular movement in corrosive piping.",
        longDescription:
          "A PTFE expansion joint bellow is a flexible piping component used to compensate for vibration, thermal expansion and misalignment in piping systems. Made from PTFE (polytetrafluoroethylene), it offers superior chemical, corrosion and high-temperature resistance. Convolutions in the bellow design allow axial, lateral and angular movement, making it ideal for harsh chemical environments such as pharmaceutical, food & beverage and chemical processing industries.",
      }),
      p(presets.bellows, "ptfe-machined-high-pressure-bellow", "PTFE Machined High Pressure Bellow", {
        price: "9500 INR / Piece",
      }),
      p(presets.bellows, "ptfe-line-bellow", "PTFE Line Bellow"),
      p(presets.bellows, "300mm-ptfe-bellow", "300mm PTFE Bellow"),
      p(presets.bellows, "ptfe-high-pressure-bellow", "PTFE High Pressure Bellow"),
      p(presets.bellows, "ptfe-redistributor-tl", "PTFE Redistributor (TL)"),
      p(presets.bellows, "line-bellow-with-ms-flange", "Line Bellow with MS Flange"),
      p(presets.bellows, "ms-high-pressure-bellow", "MS High Pressure Bellow"),
      p(presets.bellows, "con-soket-bellow", "CON Socket Bellow"),
    ],
  },
  {
    slug: "lined-valves",
    name: "Lined Valves",
    short: "PTFE / FEP / PFA",
    description:
      "PTFE-lined valves built to handle aggressive media — corrosion-proof, leak-tight and designed for long service life.",
    image: valve,
    products: [
      p(presets.valves, "ptfe-lined-butterfly-gate-valve", "PTFE Lined Butterfly Gate Valve"),
      p(presets.valves, "ptfe-lined-plug-valve", "PTFE Lined Plug Valve"),
      p(presets.valves, "bakelite-bonet-and-ptfe-valve", "Bakelite Bonnet And PTFE Valve"),
      p(presets.valves, "bakilt-bonet-ptfe-valve", "Bakelite Bonnet PTFE Valve"),
      p(presets.valves, "bakelite-bonet-ptfe-valve", "Bakelite Bonnet & PTFE Valve"),
      p(presets.valves, "ms-ptfe-lined-ball-valves", "MS PTFE Lined Ball Valves"),
      p(presets.valves, "ms-rust-proof-ptfe-lined-ball-valves", "MS Rust-Proof PTFE Lined Ball Valves"),
      p(presets.valves, "ptfe-lined-ball-check-valve", "PTFE Lined Ball Check Valve"),
      p(presets.valves, "ptfe-linned-butterfly-gate-valve", "PTFE Lined Butterfly Gate Valve (Heavy Duty)"),
      p(presets.valves, "ms-ptfe-linned-flush-bottom-valve", "MS PTFE Lined Flush Bottom Valve"),
      p(presets.valves, "plug-valve", "Plug Valve"),
      p(presets.valves, "diaphragm-valve", "Diaphragm Valve"),
      p(presets.valves, "fep-ball-valves", "FEP Ball Valves"),
      p(presets.valves, "lined-swing-check-valve", "Lined Swing Check Valve"),
      p(presets.valves, "ptfe-drain-valves", "PTFE Drain Valves"),
    ],
  },
  {
    slug: "laboratory-glassware",
    name: "Laboratory Glassware",
    short: "Borosilicate 3.3",
    description:
      "Premium borosilicate laboratory and industrial glassware for chemical, pharma and research applications.",
    image: reactor,
    products: [
      p(presets.glassware, "50l-jacketed-glass-reactor", "50L Jacketed Glass Reactor"),
      p(presets.glassware, "jacketed-glass-reactor-50l", "Jacketed Glass Reactor (50L)"),
      p(presets.glassware, "borosilicate-glass-jacketed-reactor-unit", "Borosilicate Glass Jacketed Reactor Unit"),
      p(presets.glassware, "glass-stirring-assembly", "Glass Stirring Assembly"),
      p(presets.glassware, "glass-cylindrical-vessel", "Glass Cylindrical Vessel"),
      p(presets.glassware, "glr-glass-distillation-equipments", "GLR Glass Distillation Equipments"),
      p(presets.glassware, "reaction-distillation-unit", "Reaction Distillation Unit"),
      p(presets.glassware, "glass-distillation-apparatus", "Glass Distillation Apparatus"),
      p(presets.glassware, "reaction-cum-distillation-assembly", "Reaction Cum Distillation Assembly"),
      p(presets.glassware, "jacketed-distillation-glass-assembly", "Jacketed Distillation Glass Assembly"),
      p(presets.glassware, "laboratory-equipment", "Laboratory Equipment"),
      p(presets.glassware, "ptfe-lap-seal", "PTFE Lap Seal"),
      p(presets.glassware, "ptfe-specialized-high-performance-lap-seal", "PTFE Specialized High-Performance Lap Seal"),
    ],
  },
  {
    slug: "glass-heat-exchangers",
    name: "Glass Heat Exchangers",
    short: "Shell & Tube • Coil",
    description:
      "Glass heat exchangers and shell-and-tube assemblies for efficient heat transfer in corrosive environments.",
    image: heat,
    products: [
      p(presets.heatExchanger, "ms-ptfe-glass-shell-and-tube", "MS PTFE Glass Shell And Tube"),
      p(presets.heatExchanger, "glass-tube-heat-exchanger", "Glass Tube Heat Exchanger"),
      p(presets.heatExchanger, "shell-and-tube-glass-heat-exchanger", "Shell And Tube Glass Heat Exchanger"),
      p(presets.heatExchanger, "glass-body-shell-and-tube", "Glass Body Shell And Tube"),
      p(presets.heatExchanger, "glass-shell-and-tube-heat-exchanger", "Glass Shell And Tube Heat Exchanger"),
      p(presets.heatExchanger, "sswpl-heat-exchangers-component", "SSWPL Heat Exchangers Component (Glass & MS, Shell & Tube)"),
      p(presets.heatExchanger, "heat-exchanger-and-condenser-tubes", "Heat Exchanger And Condenser Tubes"),
      p(presets.heatExchanger, "tube-heat-exchanger", "Tube Heat Exchanger"),
      p(presets.heatExchanger, "shell-and-tube-condenser-complete", "Shell And Tube Condenser (Complete)"),
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
      p(presets.sightGlass, "industrial-sight-glass", "Industrial Sight Glass"),
      p(presets.sightGlass, "double-window-sight-glass", "Double Window Sight Glass"),
      p(presets.sightGlass, "double-window-type-sight-glass", "Double Window Type Sight Glass"),
    ],
  },
  {
    slug: "ptfe-lined-fittings",
    name: "PTFE Lined Fittings",
    short: "Tees • Elbows • Reducers",
    description:
      "Complete range of PTFE-lined pipe fittings — tees, elbows, reducers, crosses and feed pipes.",
    image: elbow,
    products: [
      p(presets.fittings, "ms-ptfe-lined-pipe-and-fittings", "MS PTFE Lined Pipe and Fittings"),
      p(presets.fittings, "45-ms-ptfe-lined-elbow", "45° MS PTFE Lined Elbow"),
      p(presets.fittings, "lined-elbow-45", "Lined Elbow 45°"),
      p(presets.fittings, "lined-elbow-90", "Lined Elbow 90°"),
      p(presets.fittings, "ms-ptfe-elbow-pipe", "MS PTFE Elbow Pipe"),
      p(presets.fittings, "ptfe-lined-equal-tees", "PTFE Lined Equal Tees"),
      p(presets.fittings, "ms-ptfe-lined-equal-tee", "MS PTFE Lined Equal Tee"),
      p(presets.fittings, "ptfe-lined-equal-cross", "PTFE Lined Equal Cross"),
      p(presets.fittings, "lined-equal-cross", "Lined Equal Cross"),
      p(presets.fittings, "ptfe-lined-unequal-cross", "PTFE Lined Unequal Cross"),
      p(presets.fittings, "lined-equal-tee", "Lined Equal Tee"),
      p(presets.fittings, "lined-equal-tee-epoxy", "Epoxy Painted Lined Equal Tee"),
      p(presets.fittings, "ptfe-lined-reducer", "PTFE Lined Reducer"),
      p(presets.fittings, "lined-reducer-flange", "Lined Reducer Flange"),
      p(presets.fittings, "lined-conentric-reducer", "Lined Concentric Reducer"),
      p(presets.fittings, "ms-ptfe-lined-pipe", "MS PTFE Lined Pipe"),
      p(presets.fittings, "ms-ptfe-lined-dip-pipe-fitting", "MS PTFE Lined Dip Pipe Fitting"),
      p(presets.fittings, "ptfe-feed-pipes", "PTFE Feed Pipes"),
      p(presets.fittings, "ms-ptfe-linend-hedar", "MS PTFE Lined Header"),
    ],
  },
  {
    slug: "flanges-spacers",
    name: "Flanges & Spacers",
    short: "PTFE / PFA / FEP lined",
    description:
      "PTFE / PFA / FEP lined flanges, reducing flanges and spacers in ANSI, DIN and JIS dimensions.",
    image: flange,
    products: [
      p(presets.flanges, "ptfe-lined-reducing-flange", "PTFE Lined Reducing Flange"),
      p(presets.flanges, "ms-ptfe-lined-reducing-flange", "MS PTFE Lined Reducing Flange"),
      p(presets.flanges, "pfa-fep-lined-spacer", "PFA / FEP Lined Spacer"),
      p(presets.flanges, "pfa-fep-lined-spacer-2", "PFA - FEP Lined Spacer (Heavy)"),
    ],
  },
  {
    slug: "ptfe-products",
    name: "PTFE Products",
    short: "Rods • Tubes • Custom",
    description:
      "Pure PTFE products including rods, tubes, sheets, machined parts and custom polymer components.",
    image: rods,
    products: [
      p(presets.ptfe, "teflon-rods", "Teflon Rods"),
      p(presets.ptfe, "te-flon-rods", "TE-FLON Rods"),
      p(presets.ptfe, "teflonsi-rods", "Teflon SI Rods"),
      p(presets.ptfe, "ptfe-tube", "PTFE Tube"),
      p(presets.ptfe, "ptfe-pipe", "PTFE Pipe"),
      p(presets.ptfe, "ptfe-product", "PTFE Product"),
      p(presets.ptfe, "ptfe-product-base", "PTFE Product (Custom)"),
      p(presets.ptfe, "ptfe-convener-road", "PTFE Conveyer Rod"),
      p(presets.ptfe, "ptfe-conveyer-road", "PTFE Conveyer Road"),
      p(presets.ptfe, "ptfe-stuffing-boxes", "PTFE Stuffing Boxes"),
    ],
  },
  {
    slug: "stirrers",
    name: "PTFE Industrial Stirrers",
    short: "Anchor • PBT • Blade",
    description:
      "PTFE-coated industrial and laboratory stirrers — anchor, PBT, paddle and blade types for reactors.",
    image: rods,
    products: [
      p(presets.stirrer, "ss-ptfe-line-sterrer-lab", "SS PTFE Lined Stirrer (Lab)"),
      p(presets.stirrer, "ss-ptfe-lined-stirrer", "SS PTFE Lined Stirrer"),
      p(presets.stirrer, "ss-ptfe-line-sterrer-laboratory-equipment", "SS PTFE Lined Stirrer (Laboratory Equipment)"),
      p(presets.stirrer, "ss-ptfe-blade-type-stirrer", "SS PTFE Blade Type Stirrer"),
      p(presets.stirrer, "ss-ptfe-pbt-blade-type-stirrer", "SS PTFE PBT Blade Type Stirrer"),
      p(presets.stirrer, "ss-ptfe-pbt-blade-stirrer", "SS PTFE PBT Blade Stirrer"),
      p(presets.stirrer, "ss-ptfe-anchor-and-pbt-blade-stirrer", "SS PTFE Anchor and PBT Blade Stirrer"),
      p(presets.stirrer, "ss-ptfe-pbt-and-anchor-type-stirrer", "SS PTFE PBT and Anchor Type Stirrer"),
      p(presets.stirrer, "laboratory-stirrer", "Laboratory Stirrer"),
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
      p(presets.food, "steam-jacketed-kettles-20-litre", "Steam Jacketed Kettle 20 Litre"),
    ],
  },
];

export const allProducts = categories.flatMap((c) =>
  c.products.map((pr) => ({ ...pr, category: c.name, categorySlug: c.slug })),
);

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const findProduct = (categorySlug: string, productSlug: string) => {
  const cat = findCategory(categorySlug);
  if (!cat) return null;
  const product = cat.products.find((pr) => pr.slug === productSlug);
  if (!product) return null;
  return { category: cat, product };
};