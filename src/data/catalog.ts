// ---------------------------------------------------------------------------
// Image resolution
// ---------------------------------------------------------------------------
// Every product image lives at:  /assets/products/{product-slug}.jpg
// Every category image lives at: /assets/products/category-{category-slug}.jpg
//
// Drop your images into /public/assets/products/ with the matching filename.
// Use getProductImage() / getCategoryImage() in your components — they accept
// an optional fallback so the UI never breaks while you're adding images.
// ---------------------------------------------------------------------------

/** Returns the expected image path for a product slug. */
export const getProductImage = (slug: string, fallback = "/assets/products/placeholder.jpg"): string =>
  `/assets/products/${slug}.jpg`;

/** Returns the expected image path for a category slug. */
export const getCategoryImage = (slug: string, fallback = "/assets/products/placeholder.jpg"): string =>
  `/assets/products/category-${slug}.jpg`;

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

type Preset = {
  tag: string;
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
  evaporation: {
    tag: "Evaporation",
    baseSpecs: [
      { label: "Material", value: "Borosilicate Glass 3.3 / SS 316" },
      { label: "Evaporation Capacity", value: "1 L/hr to 200 L/hr" },
      { label: "Working Pressure", value: "Full vacuum to atmospheric" },
      { label: "Working Temperature", value: "Up to 200°C" },
      { label: "Heating", value: "Hot water / Steam / Thermic fluid" },
      { label: "Condenser", value: "Glass shell & tube / Coil" },
      { label: "Drive", value: "TEFC motor with gearbox" },
      { label: "Application", value: "Concentration, solvent recovery, distillation" },
      { label: "Compliance", value: "GMP / Non-GMP available" },
    ],
    highlights: [
      {
        title: "Efficient Solvent Recovery",
        body:
          "High evaporation rates with minimal heat exposure — ideal for heat-sensitive products in pharma, fine chemicals and food industries.",
      },
      {
        title: "Full Process Visibility",
        body:
          "Borosilicate glass construction enables real-time monitoring of the evaporation process without interruption.",
      },
      {
        title: "Compact Modular Design",
        body:
          "Skid-mounted units with standardised DN couplings allow easy integration into existing process lines and simple maintenance.",
      },
    ],
    faqs: [],
  },
  engineeredGlass: {
    tag: "Engineered Glass",
    baseSpecs: [
      { label: "Material", value: "Borosilicate Glass 3.3" },
      { label: "Working Temperature", value: "-20°C to +200°C" },
      { label: "Working Pressure", value: "Full vacuum to +0.5 Bar" },
      { label: "Connection", value: "DN coupling / Flanged" },
      { label: "Application", value: "Filtration, separation, extraction, fermentation, chromatography" },
      { label: "Compliance", value: "GMP / Non-GMP, FLP / Non-FLP available" },
      { label: "Stand", value: "MS powder-coated / SS structure" },
    ],
    highlights: [
      {
        title: "Inert & Contamination-Free",
        body:
          "Borosilicate glass wetted surfaces ensure zero contamination of process media — critical for pharmaceutical and food-grade applications.",
      },
      {
        title: "Validated for GMP Use",
        body:
          "Available in GMP and non-GMP configurations with documentation support for FDA-regulated production environments.",
      },
      {
        title: "Application Flexibility",
        body:
          "From Nutsche filtration to chromatography and liquid-liquid extraction — one glass system platform covers multiple unit operations.",
      },
    ],
    faqs: [],
  },
  glassColumns: {
    tag: "Glass Columns",
    baseSpecs: [
      { label: "Material", value: "Borosilicate Glass 3.3" },
      { label: "Diameter Range", value: "2\" (50 mm) to 24\" (600 mm)" },
      { label: "Working Temperature", value: "Up to 200°C" },
      { label: "Working Pressure", value: "Full vacuum to +0.5 Bar" },
      { label: "Packing Type", value: "Structured / Random packings" },
      { label: "Internals", value: "Packing supports, retainers, liquid distributors, re-distributors, feed sections" },
      { label: "Connection", value: "DN coupling / Flanged" },
      { label: "Application", value: "Distillation, absorption, stripping, scrubbing" },
    ],
    highlights: [
      {
        title: "Wide Diameter Range",
        body:
          "Available from 2\" pilot-scale to 24\" production-scale — enabling seamless scale-up of distillation and absorption processes.",
      },
      {
        title: "Complete Column Internals",
        body:
          "Structured and random packings, liquid distributors, re-distributors and feed sections supplied to maximise separation efficiency.",
      },
      {
        title: "Corrosion-Proof Operation",
        body:
          "Borosilicate glass columns resist HCl, H₂SO₄, HNO₃ and most organic solvents — no corrosion, no product contamination.",
      },
    ],
    faqs: [],
  },
  heatExchanger: {
    tag: "Heat Exchanger",
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
  processEngineering: {
    tag: "Process Engineering",
    baseSpecs: [
      { label: "Material", value: "Borosilicate Glass 3.3 / PP / FRP / SS" },
      { label: "Design", value: "Custom engineered to process requirements" },
      { label: "Capacity", value: "Pilot to full production scale" },
      { label: "Working Pressure", value: "Vacuum to +3 Bar" },
      { label: "Working Temperature", value: "Up to 200°C" },
      { label: "Application", value: "HCl generation, gas absorption, acid concentration/dilution, bromine recovery" },
      { label: "Compliance", value: "As per IS / DIN / ASME / customer specs" },
      { label: "Supply Scope", value: "Engineering, fabrication, supply, erection & commissioning" },
    ],
    highlights: [
      {
        title: "Turnkey Process Packages",
        body:
          "Complete engineering packages from design through commissioning — single-source accountability for complex glass-lined process systems.",
      },
      {
        title: "Proven Process Routes",
        body:
          "HCl generation via boiling, sulphuric acid and calcium chloride routes; sulphuric acid dilution and concentration; bromine recovery — all with operating references.",
      },
      {
        title: "Corrosion-Proof Construction",
        body:
          "Borosilicate glass, PP and FRP construction ensures long service life in highly corrosive acid and halogen environments.",
      },
    ],
    faqs: [],
  },
  sightGlass: {
    tag: "Sight Glass",
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
    baseSpecs: [
      { label: "Material", value: "MS / SS 304 / SS 316 with PTFE / PFA lining" },
      { label: "Standard", value: "ANSI B16.5 / DIN 2527 / JIS" },
      { label: "Size Range", value: "15 mm to 300 mm" },
      { label: "Pressure Rating", value: "150# / PN10 / PN16" },
      { label: "Type", value: "Slip-on / Weld-neck / Reducing / Blind / Spectacle" },
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
  strainer: {
    tag: "Strainer",
    baseSpecs: [
      { label: "Type", value: "Y-Type / Basket Type" },
      { label: "Lining", value: "PTFE / PFA / FEP" },
      { label: "Body Material", value: "Carbon Steel / SS 304 / SS 316" },
      { label: "Size Range", value: "25 mm to 300 mm" },
      { label: "End Connection", value: "Flanged ANSI 150# / DIN PN10" },
      { label: "Working Pressure", value: "Up to 10 Bar" },
      { label: "Temperature", value: "-20°C to +200°C" },
      { label: "Screen Mesh", value: "20 mesh to 100 mesh (custom)" },
      { label: "Application", value: "Inline filtration, protection of pumps & instruments" },
    ],
    highlights: [
      {
        title: "Full PTFE Wetted Path",
        body:
          "PTFE-lined body and screen protect against corrosion in aggressive chemical service — no metal contact with process fluid.",
      },
      {
        title: "Easy Cleanout",
        body:
          "Removable screen basket or Y-plug allows fast cleaning or replacement without disturbing pipeline.",
      },
      {
        title: "Protects Downstream Equipment",
        body:
          "Captures particulate before pumps, valves and instruments — extending their service life significantly.",
      },
    ],
    faqs: [],
  },
  gaskets: {
    tag: "Gaskets",
    baseSpecs: [
      { label: "Type", value: "Anti-static / PTFE / Graphite" },
      { label: "Material", value: "Conductive PTFE / Carbon-filled PTFE" },
      { label: "Size Range", value: "15 mm to 600 mm (NB)" },
      { label: "Thickness", value: "1.5 mm / 3 mm / 4.5 mm (custom)" },
      { label: "Temperature", value: "-200°C to +260°C" },
      { label: "Pressure", value: "Up to 16 Bar" },
      { label: "Standard", value: "ANSI / DIN / JIS" },
      { label: "Application", value: "PTFE-lined piping, flange joints, chemical plants" },
    ],
    highlights: [
      {
        title: "Static Dissipative",
        body:
          "Conductive carbon-filled PTFE construction safely dissipates static charge — essential for flammable service in lined piping.",
      },
      {
        title: "Universal Chemical Resistance",
        body:
          "PTFE base material resists virtually all acids, bases and solvents across the full operating range.",
      },
      {
        title: "Drop-In Fit",
        body:
          "Cut to ANSI / DIN bolt patterns — drop-in replacement for standard gaskets in lined piping systems.",
      },
    ],
    faqs: [],
  },
  stirrer: {
    tag: "Stirrer",
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
  img: opts.img ?? getProductImage(slug),
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
  // ─── BOROSILICATE GLASS CATEGORIES ────────────────────────────────────────

  {
    slug: "evaporation-equipment",
    name: "Evaporation Equipment",
    short: "Rotary • Wiped Film • Falling Film",
    description:
      "Borosilicate glass evaporators for solvent recovery and concentration — rotary film, wiped/thin film and falling film configurations.",
    image: getCategoryImage("evaporation-equipment"),
    products: [
      p(presets.evaporation, "rotary-film-evaporator", "Rotary Film Evaporator", {
        shortDescription:
          "Rotary film evaporator in borosilicate glass 3.3 for efficient evaporation and solvent recovery under vacuum.",
        longDescription:
          "The Rotary Film Evaporator from Gujarat Scientific And Polymer uses borosilicate glass 3.3 construction throughout the wetted path. A rotating flask creates a thin, turbulent film maximising heat transfer and evaporation rate under vacuum. The unit includes a glass condenser, receiving flask and PTFE seals. Ideal for R&D, pilot scale and small-batch production in pharma, flavour & fragrance and fine chemical industries.",
      }),
      p(presets.evaporation, "wiped-film-evaporator", "Wiped Film Evaporator / Thin Film Evaporator", {
        shortDescription:
          "Wiped/thin film evaporator for continuous, short-residence evaporation of heat-sensitive and viscous products.",
        longDescription:
          "The Wiped Film Evaporator (also supplied as a Thin Film Evaporator) uses a mechanically wiped, thin film on a heated borosilicate glass cylinder. Residence time is measured in seconds — critical for heat-sensitive pharmaceuticals, vitamins and natural extracts. The integral short-path condenser eliminates vapour losses. Gujarat Scientific And Polymer supplies GMP and non-GMP configurations.",
      }),
      p(presets.evaporation, "falling-film-evaporator", "Falling Film Evaporator", {
        shortDescription:
          "Falling film evaporator for gentle, continuous evaporation of dilute solutions under vacuum.",
        longDescription:
          "The Falling Film Evaporator distributes feed liquid as a thin falling film on the inside of borosilicate glass tubes, giving very low temperature difference between steam and product. Used for concentration of fruit juices, APIs, HCl solutions and other thermally sensitive liquids. Gujarat Scientific And Polymer designs systems to customer capacity from pilot to production scale.",
      }),
    ],
  },

  {
    slug: "glass-reactors",
    name: "Glass Lab Reactors",
    short: "Jacketed • Spherical • CSTR • UV",
    description:
      "Full range of borosilicate glass lab and pilot reactors — jacketed, spherical, cylindrical, kilo lab, CSTR, UV and filter reactor configurations.",
    image: getCategoryImage("glass-reactors"),
    products: [
      p(presets.glassware, "lab-glass-reactor", "Lab Glass Reactor", {
        shortDescription:
          "Bench-top borosilicate glass lab reactor for small-scale reaction studies in R&D and quality control.",
        longDescription:
          "The Lab Glass Reactor is a compact borosilicate glass 3.3 vessel with PTFE-lined stirrer, temperature probes and DN-coupled accessories. Available in 0.5 L to 20 L capacities with optional jacketing for heating/cooling. Standard bench-top model suits R&D, quality control and process development in chemical and pharmaceutical laboratories.",
      }),
      p(presets.glassware, "high-pressure-lab-reactor", "High Pressure Lab Reactor", {
        shortDescription:
          "Borosilicate glass high pressure lab reactor for reactions above atmospheric pressure in research applications.",
        longDescription:
          "The High Pressure Lab Reactor from Gujarat Scientific And Polymer is designed for reactions requiring elevated pressure conditions. The reactor vessel uses thick-walled borosilicate glass 3.3 rated to +3 Bar working pressure, with pressure gauge, safety rupture disc, PTFE-lined stirrer and jacketed design for precise temperature control. Supplied with MS powder-coated support stand.",
      }),
      p(presets.glassware, "spherical-glass-reactor", "Spherical Glass Reactor", {
        shortDescription:
          "Spherical borosilicate glass reactor offering maximum volume-to-surface-area ratio for efficient mixing.",
      }),
      p(presets.glassware, "cylindrical-glass-reactor", "Cylindrical Glass Reactor", {
        shortDescription:
          "Standard cylindrical borosilicate glass reactor with PTFE stirrer for chemical synthesis and process development.",
      }),
      p(presets.glassware, "kilo-lab-glass-reactor", "Kilo Lab Glass Reactor", {
        shortDescription:
          "Kilo-scale borosilicate glass reactor (20 L – 100 L) bridging lab and pilot plant scale production.",
        longDescription:
          "The Kilo Lab Glass Reactor serves as the critical scale-up step between laboratory synthesis and pilot production. Available in 20 L to 100 L capacities with jacketed body, PTFE-coated anchor stirrer, motor drive, temperature control and all DN-coupled glass accessories. Gujarat Scientific supplies GMP documentation upon request.",
      }),
      p(presets.glassware, "jacketed-glass-reactor", "Jacketed Glass Reactor", {
        price: "Contact for price",
        shortDescription:
          "Jacketed borosilicate glass reactor for precise temperature-controlled reactions using hot water, steam or cooling media.",
        longDescription:
          "The Jacketed Glass Reactor from Gujarat Scientific And Polymer features an outer glass jacket through which heating or cooling media is circulated, enabling tight control of reaction temperature. The inner vessel is fabricated from borosilicate glass 3.3. Available 5 L to 200 L with PTFE-coated stirrer, motor drive, condenser, dropping funnel and all standard accessories on an MS powder-coated stand.",
      }),
      p(presets.glassware, "cstr-glass-reactor", "Continuous Stirred Tank Glass Reactor (CSTR)", {
        shortDescription:
          "Continuous stirred tank glass reactor for steady-state continuous reaction processes in pharma and chemical R&D.",
      }),
      p(presets.glassware, "uv-reactor", "Ultra Violet Reactor (UV Reactor)", {
        shortDescription:
          "UV reactor in borosilicate glass for photochemical reactions, water treatment and advanced oxidation processes.",
        longDescription:
          "The Ultra Violet (UV) Reactor uses high-transparency borosilicate glass 3.3 to maximise UV transmission into the reaction medium. UV lamps are positioned in quartz sleeves within the glass vessel. Used for photochlorination, photobromination, advanced oxidation and water/effluent treatment. Gujarat Scientific supplies complete units with UV lamp, power supply and safety enclosure.",
      }),
      p(presets.glassware, "triple-wall-glass-reactor", "Triple Wall Glass Reactor (Double Jacketed)", {
        shortDescription:
          "Triple wall (double jacketed) borosilicate glass reactor for extreme temperature differential reaction applications.",
      }),
      p(presets.glassware, "filter-reactor", "Filter Reactor", {
        shortDescription:
          "Combined reaction and filtration glass reactor — filter bottom plate eliminates product transfer steps.",
        longDescription:
          "The Filter Reactor integrates a sintered glass or PTFE filter plate at the base of the borosilicate glass reactor, allowing reaction and filtration in the same vessel. This eliminates product transfer and reduces contamination risk. Suitable for API synthesis, catalyst removal and crystallisation in pharmaceutical manufacturing.",
      }),
    ],
  },

  {
    slug: "glass-distillation-units",
    name: "Glass Distillation Units",
    short: "Simple • Fractional • Short Path",
    description:
      "Borosilicate glass distillation plants and units — simple, fractional, reflux, reaction-distillation and molecular/short path configurations.",
    image: getCategoryImage("glass-distillation-units"),
    products: [
      p(presets.glassware, "distillation-plant-glass-lined-reactor", "Distillation Plant With Glass Lined Reactor", {
        shortDescription:
          "Complete distillation plant integrating a glass-lined reactor with borosilicate glass distillation column and condenser train.",
      }),
      p(presets.glassware, "reflux-reaction-distillation-unit", "Reflux Reaction Distillation Unit", {
        shortDescription:
          "Reflux reaction distillation unit combining glass reactor, column, reflux condenser and receiver for simultaneous reaction and separation.",
      }),
      p(presets.glassware, "reaction-distillation-unit", "Reaction Distillation Unit", {
        shortDescription:
          "Borosilicate glass reaction distillation unit for simultaneous chemical reaction and product distillation.",
        longDescription:
          "The Reaction Distillation Unit from Gujarat Scientific And Polymer combines a jacketed glass reactor with a packed or plate glass distillation column and condenser assembly. As the reaction proceeds, product is continuously removed by distillation, driving equilibrium towards completion. Widely used in esterification, transesterification and solvent recovery applications.",
      }),
      p(presets.glassware, "simple-distillation-unit", "Simple Distillation Unit", {
        shortDescription:
          "Simple borosilicate glass distillation unit for laboratory and pilot-scale purification of single-component liquids.",
      }),
      p(presets.glassware, "fractional-distillation-unit", "Fractional Distillation Unit", {
        shortDescription:
          "Fractional distillation unit with packed or plate glass column for separation of close-boiling mixtures.",
        longDescription:
          "The Fractional Distillation Unit uses a DN-coupled borosilicate glass packed or plate column above the distillation flask to achieve multiple theoretical plates and clean separation of mixtures with close boiling points. Gujarat Scientific And Polymer supplies complete units with column, head, condenser, receivers and reflux divider.",
      }),
      p(presets.glassware, "molecular-distillation-unit", "Molecular Distillation / Short Path Distillation", {
        shortDescription:
          "Short path / molecular distillation unit for purification of high-boiling, heat-sensitive compounds under high vacuum.",
        longDescription:
          "Molecular Distillation (Short Path Distillation) operates under high vacuum (0.001 mbar) with an internal condenser positioned just millimetres from the evaporator surface — minimising the mean free path and enabling distillation of high molecular weight compounds (vitamins, fatty acids, cannabis extracts, silicone oils) at temperatures far below their normal boiling points.",
      }),
    ],
  },

  {
    slug: "engineered-glass-systems",
    name: "Engineered Glass Systems",
    short: "Filters • Extractors • Fermentors",
    description:
      "Purpose-built borosilicate glass process systems — Nutsche filters, phase separators, mixer settlers, fermentors, chromatography columns and extraction units.",
    image: getCategoryImage("engineered-glass-systems"),
    products: [
      p(presets.engineeredGlass, "glass-nutsche-filter", "Glass Nutsche Filter", {
        shortDescription:
          "Borosilicate glass Nutsche filter for batch pressure or vacuum filtration in pharmaceutical and fine chemical manufacturing.",
        longDescription:
          "The Glass Nutsche Filter is a closed, pressure-rated borosilicate glass vessel with a sintered glass or PTFE filter plate. Slurry is charged into the vessel and filtered under vacuum or pressure — without exposure to the atmosphere. Cake washing, reslurrying and drying under vacuum are all carried out in the same vessel. Supplied in GMP and non-GMP versions with full documentation.",
      }),
      p(presets.engineeredGlass, "glass-agitated-nutsche-filter", "Glass Agitated Nutsche Filter", {
        shortDescription:
          "Glass agitated Nutsche filter with PTFE-coated stirrer for uniform cake washing and smoothing in pharmaceutical API manufacture.",
      }),
      p(presets.engineeredGlass, "glass-phase-separator", "Glass Phase Separator", {
        shortDescription:
          "Borosilicate glass phase separator for clean liquid-liquid phase separation of immiscible solvents and process streams.",
      }),
      p(presets.engineeredGlass, "glass-mixer-settler", "Glass Mixer Settler", {
        shortDescription:
          "Multi-stage borosilicate glass mixer settler for counter-current liquid-liquid extraction in R&D and pilot plants.",
      }),
      p(presets.engineeredGlass, "glass-mixing-vessel", "Glass Mixing Vessel", {
        shortDescription:
          "Borosilicate glass mixing vessel with PTFE stirrer for blending, dissolution and preparation of process media.",
      }),
      p(presets.engineeredGlass, "glass-fermentor", "Fermentor (Glass)", {
        shortDescription:
          "Borosilicate glass fermentor / bioreactor for aerobic and anaerobic fermentation in pharmaceutical and biotech R&D.",
        longDescription:
          "The Glass Fermentor from Gujarat Scientific And Polymer is fabricated from borosilicate glass 3.3 with a stainless steel head plate fitted with multiple ports for agitator, sparger, pH probe, DO probe, temperature sensor and sampling. Available 2 L to 100 L. The transparent glass vessel enables direct visual observation of fermentation progress, foam level and broth colour.",
      }),
      p(presets.engineeredGlass, "glass-chromatography-column", "Glass Chromatography Column", {
        shortDescription:
          "Borosilicate glass chromatography column for preparative-scale separation and purification of APIs and natural products.",
      }),
      p(presets.engineeredGlass, "solid-liquid-extraction-unit", "Solid-Liquid Extraction Unit", {
        shortDescription:
          "Borosilicate glass solid-liquid extraction unit (Soxhlet-style or percolation) for botanical, herbal and pharmaceutical extractions.",
      }),
      p(presets.engineeredGlass, "liquid-liquid-extraction-unit", "Liquid-Liquid Extraction Unit", {
        shortDescription:
          "Multi-stage borosilicate glass liquid-liquid extraction unit in GMP / Non-GMP and FLP / Non-FLP configurations.",
        longDescription:
          "The Liquid-Liquid Extraction Unit from Gujarat Scientific And Polymer uses borosilicate glass 3.3 construction with PTFE-lined fittings throughout. Available in GMP & Non-GMP and Flame-proof (FLP) & Non-FLP variants. Systems range from single mixer-settler stages to multi-stage counter-current extraction trains. Supplied complete with support structure, pumps and instrumentation.",
      }),
    ],
  },

  {
    slug: "glass-columns",
    name: "Glass Columns & Column Internals",
    short: "2\" to 24\" dia • Structured & Random Packing",
    description:
      "Borosilicate glass columns from 2\" to 24\" diameter with complete internals — packings, supports, distributors and feed sections.",
    image: getCategoryImage("glass-columns"),
    products: [
      p(presets.glassColumns, "glass-column-2-to-24-inch", "Glass Column (2\" to 24\" Diameter)", {
        shortDescription:
          "Borosilicate glass distillation / absorption column available from 2\" pilot scale to 24\" production scale.",
        longDescription:
          "Gujarat Scientific And Polymer supplies borosilicate glass 3.3 columns from 50 mm (2\") to 600 mm (24\") nominal diameter. Each column section is flanged with DN couplings for easy assembly, cleaning and modification. Columns are engineered for distillation, absorption, scrubbing and stripping duty in chemical, pharmaceutical and HCl / H₂SO₄ service.",
      }),
      p(presets.glassColumns, "glass-column-structured-packing", "Glass Column Structured Packing", {
        shortDescription:
          "High-efficiency glass structured packing for borosilicate glass distillation columns — low pressure drop, high capacity.",
      }),
      p(presets.glassColumns, "glass-column-random-packing", "Glass Column Random Packing", {
        shortDescription:
          "Borosilicate glass random packing (Raschig rings, saddles) for acid-resistant distillation and absorption columns.",
      }),
      p(presets.glassColumns, "glass-packing-support-retainer", "Packing Support & Retainer", {
        shortDescription:
          "Borosilicate glass packing support grids and retainers for secure bed support in glass distillation columns.",
      }),
      p(presets.glassColumns, "glass-liquid-distributor", "Liquid Distributor & Re-Distributor", {
        shortDescription:
          "Glass liquid distributors and re-distributors for even liquid distribution across the packed bed in glass columns.",
      }),
      p(presets.glassColumns, "glass-column-feed-section", "Column Feed Section", {
        shortDescription:
          "Borosilicate glass column feed sections for accurate introduction of feed liquid at the correct column position.",
      }),
    ],
  },

  {
    slug: "glass-heat-exchangers",
    name: "Glass Heat Exchangers",
    short: "Shell & Tube • Coil Condenser",
    description:
      "Glass heat exchangers and shell-and-tube assemblies for efficient heat transfer in corrosive environments.",
    image: getCategoryImage("glass-heat-exchangers"),
    products: [
      p(presets.heatExchanger, "glass-shell-and-tube-heat-exchanger", "Glass Shell And Tube Heat Exchanger", {
        shortDescription:
          "Borosilicate glass shell and tube heat exchanger for corrosion-free heating, cooling and condensation duties.",
        longDescription:
          "The Glass Shell And Tube Heat Exchanger from Gujarat Scientific And Polymer uses borosilicate glass 3.3 tubes and shell (or MS/SS shell with glass tubes) to deliver fully corrosion-resistant heat transfer for acids, solvents and corrosive intermediates. Available as condenser, cooler, heater or reboiler in heat transfer areas from 0.5 m² to 50 m². DN-coupled end caps allow easy tube bundle inspection and cleaning.",
      }),
      p(presets.heatExchanger, "ms-ptfe-glass-shell-and-tube", "MS PTFE Glass Shell And Tube Heat Exchanger", {
        shortDescription:
          "Shell and tube heat exchanger with MS shell, PTFE tube sheets and borosilicate glass tubes for maximum chemical resistance.",
      }),
      p(presets.heatExchanger, "glass-coil-condenser", "Glass Coil Condenser", {
        shortDescription:
          "Borosilicate glass coil condenser for laboratory and pilot plant distillation, reflux and vapour condensation duties.",
        longDescription:
          "The Glass Coil Condenser uses a helical borosilicate glass coil immersed in a glass shell through which cooling water flows counter-currently. High surface area-to-volume ratio delivers efficient condensation of solvent vapours. Available in DN 50 to DN 200 with standard DN couplings for direct connection to glass column assemblies.",
      }),
      p(presets.heatExchanger, "heat-exchanger-and-condenser-tubes", "Heat Exchanger And Condenser Tubes (Replacement)", {
        shortDescription:
          "Replacement borosilicate glass heat exchanger and condenser tubes for all standard glass process equipment.",
      }),
    ],
  },

  {
    slug: "process-engineering-packages",
    name: "Process Engineering Packages",
    short: "HCl • H₂SO₄ • Gas Absorption • Bromine",
    description:
      "Turnkey borosilicate glass process engineering packages for HCl generation, gas absorption, sulphuric acid dilution/concentration and bromine recovery.",
    image: getCategoryImage("process-engineering-packages"),
    products: [
      p(presets.processEngineering, "hcl-gas-generation-unit", "HCl Gas Generation Unit", {
        shortDescription:
          "Turnkey HCl gas generation unit in borosilicate glass — boiling route, sulphuric acid route or calcium chloride route.",
        longDescription:
          "Gujarat Scientific And Polymer supplies complete HCl Gas Generation Units using borosilicate glass, PP and FRP construction. Three process routes are available: (1) Boiling Route — direct evaporation of hydrochloric acid solution; (2) Sulphuric Acid Route — reaction of NaCl with H₂SO₄; (3) Calcium Chloride Route — displacement reaction. Each package includes reactor/generator, absorption column, tail gas scrubber and instrumentation.",
      }),
      p(presets.processEngineering, "gas-absorber-adiabatic", "Gas Absorber — Adiabatic Type", {
        shortDescription:
          "Adiabatic gas absorber in borosilicate glass for absorption of HCl, HBr, SO₂, NH₃ and other gases into liquid.",
      }),
      p(presets.processEngineering, "sulphuric-acid-dilution-unit", "Sulphuric Acid Dilution Unit", {
        shortDescription:
          "Safe, controlled sulphuric acid dilution unit in borosilicate glass with inline mixing and temperature monitoring.",
        longDescription:
          "Diluting concentrated sulphuric acid generates extreme heat. The Gujarat Scientific Sulphuric Acid Dilution Unit uses a controlled-mixing borosilicate glass system with inline temperature monitoring and automatic feed control to ensure safe, repeatable dilution to any target concentration. Fully lined piping, PTFE valves and glass instrumentation throughout.",
      }),
      p(presets.processEngineering, "sulphuric-acid-concentration-unit", "Sulphuric Acid Concentration Unit", {
        shortDescription:
          "Borosilicate glass sulphuric acid concentration unit for reconcentration of spent or dilute sulphuric acid streams.",
      }),
      p(presets.processEngineering, "bromine-recovery-unit", "Bromine Recovery Unit", {
        shortDescription:
          "Bromine recovery unit from bromide solution or sea bittern using borosilicate glass oxidation and stripping columns.",
        longDescription:
          "The Bromine Recovery Unit from Gujarat Scientific And Polymer recovers elemental bromine from bromide-containing brines or sea bittern by oxidation with chlorine followed by stripping with steam or air in borosilicate glass packed columns. The bromine vapour is absorbed and condensed to produce commercial-grade liquid bromine. Complete package includes oxidation reactor, stripping column, condenser, absorber and storage.",
      }),
    ],
  },

  // ─── PTFE LINED PRODUCT CATEGORIES ───────────────────────────────────────

  {
    slug: "bellows-expansion-joints",
    name: "PTFE Expansion Joint Bellows",
    short: "PTFE & high-pressure",
    description:
      "High-pressure PTFE and PTFE-lined bellows engineered for thermal expansion, vibration absorption and chemical resistance.",
    image: getCategoryImage("bellows-expansion-joints"),
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
      p(presets.bellows, "ms-high-pressure-bellow", "MS High Pressure Bellow"),
    ],
  },

  {
    slug: "lined-valves",
    name: "Lined Valves",
    short: "PTFE / FEP / PFA",
    description:
      "PTFE-lined valves built to handle aggressive media — corrosion-proof, leak-tight and designed for long service life.",
    image: getCategoryImage("lined-valves"),
    products: [
      p(presets.valves, "ptfe-lined-ball-valve", "Lined Ball Valve", {
        shortDescription:
          "PTFE-lined ball valve with full-bore port and bubble-tight shut-off for corrosive chemical service.",
        longDescription:
          "The Lined Ball Valve from Gujarat Scientific And Polymer features a CS or SS body with fully encapsulated PTFE / PFA lining. The ball and seats are also lined, giving a zero-contact metal-to-process-fluid design. Manual, pneumatic and electric actuated versions are available. Sizes 15 mm to 300 mm, ANSI 150# / DIN PN10 flanged ends.",
      }),
      p(presets.valves, "ptfe-lined-butterfly-valve", "Lined Butterfly Valve", {
        shortDescription:
          "PTFE-lined butterfly valve for on-off and throttling service in corrosive chemical and pharmaceutical piping.",
      }),
      p(presets.valves, "ptfe-lined-plug-valve", "Lined Plug Valve", {
        shortDescription:
          "PTFE-lined plug valve with quarter-turn operation for bubble-tight isolation in aggressive chemical service.",
      }),
      p(presets.valves, "lined-diaphragm-valve", "Lined Diaphragm Valve", {
        shortDescription:
          "PTFE-lined diaphragm valve offering drip-tight shut-off and crevice-free flow path for pharmaceutical and chemical duty.",
        longDescription:
          "The Lined Diaphragm Valve uses a flexible PTFE diaphragm as the only wetted moving part, eliminating the need for packing or seals in contact with the process fluid. The CS or SS body is fully PTFE-lined. Ideal for sterile pharmaceutical duty, slurries and highly corrosive media where leakage cannot be tolerated. Manual and actuated versions available.",
      }),
      p(presets.valves, "lined-swing-check-valve", "Lined Swing Check Valve", {
        shortDescription:
          "PTFE-lined swing check valve preventing backflow in corrosive chemical piping systems.",
      }),
      p(presets.valves, "lined-ball-check-valve", "Lined Ball Check Valve", {
        shortDescription:
          "PTFE-lined ball check valve with spring-assisted closure for reliable backflow prevention in chemical service.",
      }),
      p(presets.valves, "lined-sampling-valve-sandwich", "Lined Sampling Valve — Sandwich Type", {
        shortDescription:
          "Wafer-style PTFE-lined sampling valve for representative process sample collection without full pipeline interruption.",
      }),
      p(presets.valves, "lined-sampling-valve-t-type", "Lined Sampling Valve — T Type", {
        shortDescription:
          "T-type PTFE-lined sampling valve for inline sample collection from PTFE-lined process piping.",
      }),
      p(presets.valves, "flush-bottom-valve", "Flush Bottom Valve", {
        shortDescription:
          "PTFE-lined flush bottom valve for complete drain of reactor, tank or vessel contents with zero dead volume.",
        longDescription:
          "The Flush Bottom Valve mounts directly to the bottom nozzle of a reactor or tank. When open, the plug sits flush with the vessel bottom — eliminating the dead volume that collects product, solids or contamination found with conventional drain valves. PTFE-lined body and plug. Available in manual and actuated configurations, 25 mm to 150 mm.",
      }),
      p(presets.valves, "ms-ptfe-linned-flush-bottom-valve", "MS PTFE Lined Flush Bottom Valve"),
    ],
  },

  {
    slug: "ptfe-lined-fittings",
    name: "PTFE Lined Pipe Fittings",
    short: "Elbows • Tees • Reducers • Crosses",
    description:
      "Complete range of PTFE-lined pipe fittings — pipe spools, elbows, tees, crosses, reducers, dip pipes and headers.",
    image: getCategoryImage("ptfe-lined-fittings"),
    products: [
      p(presets.fittings, "lined-pipe-spool", "Lined Pipe Spool", {
        shortDescription:
          "PTFE-lined MS pipe spool for connecting PTFE-lined valves and fittings in corrosive chemical piping systems.",
      }),
      p(presets.fittings, "lined-elbow-90", "Lined Elbow 90°", {
        shortDescription:
          "PTFE-lined 90° elbow for direction changes in corrosive chemical piping — spark-tested, vent-hole provided.",
      }),
      p(presets.fittings, "lined-elbow-45", "Lined Elbow 45°", {
        shortDescription:
          "PTFE-lined 45° elbow for gradual direction changes in corrosive chemical and pharmaceutical piping.",
      }),
      p(presets.fittings, "lined-equal-tee", "Lined Equal Tee", {
        shortDescription:
          "PTFE-lined equal tee for branching corrosive process streams — full-bore flow path with zero dead volume.",
      }),
      p(presets.fittings, "lined-instrument-tee", "Lined Instrument Tee", {
        shortDescription:
          "PTFE-lined instrument tee for connecting pressure gauges, transmitters or temperature elements to lined piping.",
      }),
      p(presets.fittings, "lined-equal-cross", "Lined Equal Cross", {
        shortDescription:
          "PTFE-lined equal cross fitting for four-way distribution of corrosive process fluids.",
      }),
      p(presets.fittings, "lined-concentric-reducer", "Lined Concentric Reducer", {
        shortDescription:
          "PTFE-lined concentric reducer for diameter transitions in PTFE-lined chemical piping systems.",
      }),
      p(presets.fittings, "lined-hose-pipe", "Lined Hose Pipe", {
        shortDescription:
          "Flexible PTFE-lined hose pipe for connecting lined piping systems across vibrating or moving equipment.",
      }),
      p(presets.fittings, "lined-jacketed-spool", "Lined Jacketed Spool", {
        shortDescription:
          "PTFE-lined jacketed pipe spool for temperature-controlled transport of heat-sensitive or viscous corrosive fluids.",
      }),
      p(presets.fittings, "lined-jacketed-elbow-90", "Lined Jacketed Elbow 90°", {
        shortDescription:
          "PTFE-lined jacketed 90° elbow for heated or cooled direction changes in viscous or solidifying process streams.",
      }),
      p(presets.fittings, "ptfe-lined-header", "PTFE Lined Header", {
        shortDescription:
          "PTFE-lined distribution header for even flow distribution across multiple branch lines in chemical process plants.",
      }),
      p(presets.fittings, "lined-dip-pipe-sparger", "Lined Dip Pipe With Sparger", {
        shortDescription:
          "PTFE-lined dip pipe with sparger for sparging gas or liquid into the base of a reactor or storage tank.",
      }),
      p(presets.fittings, "pure-antistatic-drop-tube", "Pure Antistatic Drop Tube", {
        shortDescription:
          "Conductive antistatic PTFE drop tube for safe transfer of flammable liquids into vessels — dissipates static charge.",
      }),
      p(presets.fittings, "lined-y-strainer", "Lined Y Strainer", {
        shortDescription:
          "PTFE-lined Y-type strainer for inline filtration of corrosive process streams before valves and instruments.",
      }),
      p(presets.fittings, "lined-basket-strainer", "Basket Strainer (Lined)", {
        shortDescription:
          "PTFE-lined basket strainer for high-flow filtration of corrosive liquids in chemical process piping.",
      }),
      p(presets.fittings, "ms-ptfe-lined-pipe-spool", "MS PTFE Lined Pipe And Fittings (Complete Sets)", {
        shortDescription:
          "Complete sets of MS PTFE-lined pipe and fittings supplied as a matched system for new plant construction.",
      }),
    ],
  },

  {
    slug: "industrial-sight-glass",
    name: "Industrial Sight Glass",
    short: "Single & Double window • PTFE Lined",
    description:
      "Industrial sight glasses for visual monitoring of process flows under pressure and temperature — single window, double window and PTFE-lined types.",
    image: getCategoryImage("industrial-sight-glass"),
    products: [
      p(presets.sightGlass, "industrial-sight-glass", "Industrial Sight Glass", {
        shortDescription:
          "Single-window borosilicate sight glass for visual monitoring of process flows in industrial pipelines.",
      }),
      p(presets.sightGlass, "double-window-sight-glass", "Lined Double Window Sight Glass", {
        shortDescription:
          "Double-window PTFE-lined sight glass for visual inspection of corrosive process media in lined piping systems.",
        longDescription:
          "The Lined Double Window Sight Glass features two toughened borosilicate glass windows for illuminated observation of process media from opposite sides. The body is PTFE-lined to withstand corrosive chemicals. MS or SS body with ANSI / DIN flanged ends. Available 25 mm to 200 mm. The PTFE lining makes it directly compatible with PTFE-lined piping systems.",
      }),
      p(presets.sightGlass, "ptfe-lined-sight-glass", "PTFE Lined Sight Glass", {
        shortDescription:
          "PTFE-lined sight glass for visual monitoring of corrosive chemical flows — direct replacement in lined piping systems.",
      }),
    ],
  },

  {
    slug: "flanges-spacers",
    name: "Flanges, Blind Flanges & Spacers",
    short: "Reducing • Blind • Spectacle • Spacer",
    description:
      "PTFE / PFA / FEP lined flanges — reducing, blind, spectacle blind and spacers in ANSI, DIN and JIS dimensions.",
    image: getCategoryImage("flanges-spacers"),
    products: [
      p(presets.flanges, "lined-reducing-flange", "Lined Reducing Flange", {
        shortDescription:
          "PTFE-lined reducing flange for diameter transitions in PTFE-lined corrosive chemical piping systems.",
      }),
      p(presets.flanges, "ms-ptfe-lined-reducing-flange", "MS PTFE Lined Reducing Flange"),
      p(presets.flanges, "lined-blind-flange", "Lined Blind Flange", {
        shortDescription:
          "PTFE-lined blind flange for pressure-rated closure of pipeline ends and vessel nozzles in corrosive service.",
      }),
      p(presets.flanges, "spectacle-blind-flange", "Spectacle Blind Flange", {
        shortDescription:
          "PTFE-lined spectacle blind flange for positive isolation or full-bore flow in chemical process piping.",
        longDescription:
          "The Spectacle Blind Flange (also called a figure-8 blind) provides reliable positive isolation between two flanges. Rotating the spectacle switches between the solid blind (isolation) and open ring (flow) positions without removing any piping. PTFE-lined body for corrosive chemical service. Available ANSI 150# and DIN PN10/PN16.",
      }),
      p(presets.flanges, "pfa-fep-lined-spacer", "PFA / FEP Lined Spacer", {
        shortDescription:
          "PFA / FEP lined flange spacer for corrosion-resistant isolation between flanged connections in lined piping.",
      }),
    ],
  },

  {
    slug: "ptfe-products",
    name: "PTFE Machined & Moulded Products",
    short: "Rods • Tubes • Sheets • Custom",
    description:
      "Pure and filled PTFE products — rods, tubes, sheets, machined components and custom moulded parts for industrial applications.",
    image: getCategoryImage("ptfe-products"),
    products: [
      p(presets.ptfe, "ptfe-rod", "PTFE Rod (Teflon Rod)", {
        shortDescription:
          "Virgin PTFE rod in standard and custom diameters for machining gaskets, bushes, seals and custom components.",
      }),
      p(presets.ptfe, "ptfe-tube", "PTFE Tube", {
        shortDescription:
          "Extruded PTFE tube for lining, sleeving, chemical transfer and high-purity fluid handling applications.",
      }),
      p(presets.ptfe, "ptfe-pipe", "PTFE Pipe", {
        shortDescription:
          "Extruded PTFE pipe for transfer of highly corrosive acids and ultra-pure process fluids.",
      }),
      p(presets.ptfe, "ptfe-sheet", "PTFE Sheet", {
        shortDescription:
          "Virgin PTFE sheet for gasket cutting, lining, laboratory bench covers and chemical-resistant fabrications.",
      }),
      p(presets.ptfe, "ptfe-molded-machined-products", "PTFE Moulded & Machined Products", {
        shortDescription:
          "Custom PTFE moulded and CNC-machined components manufactured to customer drawings and specifications.",
        longDescription:
          "Gujarat Scientific And Polymer manufactures custom PTFE components by compression moulding and CNC machining to any customer specification. Common items include valve seats, diaphragms, gaskets, impellers, bushings, nozzles and bespoke machined parts. Virgin and filled PTFE (glass-filled, carbon-filled, bronze-filled) grades are available. FDA-compliant material certification provided on request.",
      }),
      p(presets.ptfe, "ptfe-stuffing-boxes", "PTFE Stuffing Boxes", {
        shortDescription:
          "PTFE stuffing box packing rings and complete stuffing box assemblies for corrosion-resistant shaft sealing.",
      }),
      p(presets.ptfe, "ptfe-conveyer-rod", "PTFE Conveyor Rod", {
        shortDescription:
          "PTFE conveyor rod for non-stick, chemical-resistant conveyor and guide rail applications.",
      }),
    ],
  },

  {
    slug: "anti-static-gaskets",
    name: "Anti-Static Gaskets",
    short: "Conductive PTFE",
    description:
      "Conductive PTFE anti-static gaskets for PTFE-lined piping systems handling flammable or static-sensitive process media.",
    image: getCategoryImage("anti-static-gaskets"),
    products: [
      p(presets.gaskets, "anti-static-gasket", "Anti-Static Gasket", {
        shortDescription:
          "Conductive carbon-filled PTFE anti-static gasket for safe static dissipation in PTFE-lined flammable service piping.",
        longDescription:
          "Standard PTFE gaskets are insulators and can accumulate dangerous static charges in lined piping systems handling flammable solvents. The Anti-Static Gasket from Gujarat Scientific And Polymer uses carbon-filled conductive PTFE to maintain electrical continuity across flanged joints, safely dissipating static to ground. Supplied to ANSI 150# and DIN PN10/PN16 dimensions.",
      }),
    ],
  },

  {
    slug: "lined-strainers",
    name: "Lined Strainers",
    short: "Y-Type • Basket Type",
    description:
      "PTFE-lined Y-type and basket strainers for inline protection of pumps, valves and instruments in corrosive chemical service.",
    image: getCategoryImage("lined-strainers"),
    products: [
      p(presets.strainer, "lined-y-strainer-product", "Lined Y Strainer", {
        shortDescription:
          "PTFE-lined Y-type strainer for compact inline filtration of corrosive chemical process streams.",
      }),
      p(presets.strainer, "lined-basket-strainer-product", "Lined Basket Strainer", {
        shortDescription:
          "PTFE-lined basket strainer for high-flow inline filtration of corrosive liquids in chemical process plants.",
        longDescription:
          "The Lined Basket Strainer from Gujarat Scientific And Polymer features a large-area removable basket with PTFE-lined body and cover. High flow area minimises pressure drop across the strainer. The basket can be removed, cleaned and replaced quickly without disturbing the pipeline. Available 25 mm to 200 mm with ANSI / DIN flanged ends.",
      }),
    ],
  },

  {
    slug: "stirrers",
    name: "PTFE Industrial Stirrers",
    short: "Anchor • PBT • Blade",
    description:
      "PTFE-coated industrial and laboratory stirrers — anchor, PBT, paddle and blade types for reactors.",
    image: getCategoryImage("stirrers"),
    products: [
      p(presets.stirrer, "ss-ptfe-lined-stirrer-lab", "SS PTFE Lined Stirrer (Lab)"),
      p(presets.stirrer, "ss-ptfe-lined-stirrer", "SS PTFE Lined Stirrer"),
      p(presets.stirrer, "ss-ptfe-blade-type-stirrer", "SS PTFE Blade Type Stirrer"),
      p(presets.stirrer, "ss-ptfe-pbt-blade-stirrer", "SS PTFE PBT Blade Type Stirrer"),
      p(presets.stirrer, "ss-ptfe-anchor-and-pbt-blade-stirrer", "SS PTFE Anchor and PBT Blade Stirrer"),
      p(presets.stirrer, "laboratory-stirrer", "Laboratory Stirrer"),
    ],
  },

  {
    slug: "food-product-kettles",
    name: "Food Product Kettles",
    short: "Steam jacketed",
    description:
      "Steam jacketed kettles for food processing — durable stainless steel construction with consistent heating.",
    image: getCategoryImage("food-product-kettles"),
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

// ---------------------------------------------------------------------------
// Full image filename reference list
// ---------------------------------------------------------------------------
// Run `console.log(PRODUCT_IMAGE_LIST)` to see every file you need to provide.
// Place all files in: /public/assets/products/
//
// Category covers  → category-{slug}.jpg
// Product images   → {product-slug}.jpg
// Fallback image   → placeholder.jpg
// ---------------------------------------------------------------------------
export const PRODUCT_IMAGE_LIST: string[] = [
  // Placeholder (required fallback)
  "placeholder.jpg",

  // ── Category cover images ──────────────────────────────────────────────
  ...categories.map((c) => `category-${c.slug}.jpg`),

  // ── Product images (one per product) ──────────────────────────────────
  ...allProducts.map((pr) => `${pr.slug}.jpg`),
];