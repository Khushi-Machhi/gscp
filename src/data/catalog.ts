// Image resolution
// Images are served from `/assets/products/` and filenames may vary.
// We prefer explicit mappings from `productFileMap`, fall back to slug-based
// filenames where necessary. This keeps the UI working even if files have
// different extensions or casing in the public folder.

/** Returns the expected image path for a product slug. */
export const getProductImage = (slug: string, fallback = "/assets/products/placeholder.jpeg"): string => {
  // If a deterministic map contains the exact slug, use it.
  if (typeof productFileMap !== "undefined" && productFileMap[slug]) return `/assets/products/${productFileMap[slug]}`;

  // Try to match any mapped filename value that corresponds to the slug (fuzzy match).
  const s = slug.toLowerCase();
  const token = slug.split(/[-_]/)[0].toLowerCase();
  for (const filename of Object.values(productFileMap || {})) {
    const name = filename.replace(/\.[^.]+$/, "").toLowerCase().replace(/\s+/g, "-");
    if (name === s || name.startsWith(s) || name.includes(s) || name.includes(token)) return `/assets/products/${filename}`;
  }

  // Fall back to common extensions if no mapped filename found.
  const exts = ["jpeg", "jpg", "png", "webp", "gif", "svg", "bmp", "avif"];
  for (const ext of exts) {
    const candidate = `${slug}.${ext}`;
    if (Object.values(productFileMap || {}).includes(candidate)) return `/assets/products/${candidate}`;
  }

  // Final fallback: assume jpeg (keeps prior behaviour)
  return `/assets/products/${slug}.jpeg` || fallback;
};

/** Returns the expected image path for a category slug. */
export const getCategoryImage = (slug: string, fallback = "/assets/products/placeholder.jpeg"): string => {
  // direct match: category-<slug> or <slug>
  const direct = productFileMap[`category-${slug}`] || productFileMap[slug];
  if (direct) return `/assets/products/${direct}`;

  // best fuzzy match: find any mapped filename whose key contains the slug token
  const token = slug.split(/[-_]/)[0];
  for (const [k, v] of Object.entries(productFileMap)) {
    if (k.includes(token) || k.startsWith(slug) || k.indexOf(slug) !== -1) return `/assets/products/${v}`;
  }

  return `/assets/products/category-${slug}.jpeg`;
};
import { productFileMap } from './productFileMap';

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
  glassReactor: {
    tag: "Glass Reactor",
    baseSpecs: [
      { label: "Material", value: "Borosilicate Glass 3.3" },
      { label: "Capacity", value: "5 L to 200 L (custom up to 500 L)" },
      { label: "Working Temperature", value: "-20°C to +200°C" },
      { label: "Working Pressure", value: "Full vacuum to +0.5 Bar" },
      { label: "Jacket Design Pressure", value: "Up to 3 Bar" },
      { label: "Connection", value: "PTFE flange / DN coupling" },
      { label: "Stirrer Drive", value: "TEFC motor with gearbox" },
      { label: "Application", value: "R&D, pilot plants, kilo labs, API synthesis, distillation, reaction" },
      { label: "Wall Thickness", value: "Engineered for vacuum & jacketed duty" },
      { label: "Stand", value: "MS powder-coated structure" },
      { label: "Compliance", value: "GMP / Non-GMP, FLP / Non-FLP available" },
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
          "Transparent borosilicate glass enables real-time visual monitoring of reactions, mixing and distillation — improving process control and safety.",
      },
      {
        title: "Modular & Expandable",
        body:
          "Standardised DN couplings allow quick reconfiguration for reaction, distillation, extraction or scrubbing duty. Interchangeable reactor volumes and accessories.",
      },
    ],
    faqs: [],
  },
  heatExchanger: {
    tag: "Heat Exchanger",
    baseSpecs: [
      { label: "Type", value: "Shell & Tube / Coil" },
      { label: "Shell Material", value: "Borosilicate Glass 3.3 / MS / SS" },
      { label: "Tube Material", value: "Borosilicate Glass 3.3 / PTFE" },
      { label: "Design Pressure (Shell)", value: "Atmospheric to 3 Bar" },
      { label: "Design Pressure (Tube)", value: "Full vacuum to +1 Bar" },
      { label: "Temperature", value: "-20°C to +200°C" },
      { label: "Connection", value: "Flanged / DN coupling" },
      { label: "Application", value: "Condenser, cooler, heater, reboiler in corrosive service" },
    ],
    highlights: [
      {
        title: "Corrosion-Proof Heat Transfer",
        body:
          "Borosilicate glass and PTFE construction handles aggressive acids, solvents and intermediates without contamination of the process stream.",
      },
      {
        title: "High Thermal Efficiency",
        body:
          "Optimised tube arrangement and baffle design delivers excellent overall heat-transfer coefficients for efficient process heating and cooling.",
      },
      {
        title: "Easy Maintenance",
        body:
          "DN-coupled end caps and bolted-flange construction allow straightforward inspection, cleaning and tube replacement without pipeline disturbance.",
      },
    ],
    faqs: [],
  },
  condenser: {
    tag: "Condenser",
    baseSpecs: [
      { label: "Material", value: "Borosilicate Glass 3.3" },
      { label: "Type", value: "Coil / Shell & Tube" },
      { label: "Connection", value: "DN coupling / Flanged" },
      { label: "Working Temperature", value: "-20°C to +200°C" },
      { label: "Working Pressure", value: "Full vacuum to +0.5 Bar" },
      { label: "Coolant", value: "Water / Chilled brine / Glycol" },
      { label: "Application", value: "Vapour condensation, reflux, distillation, solvent recovery" },
    ],
    highlights: [
      {
        title: "High Surface Area",
        body:
          "Helical coil or multi-tube design delivers maximum heat transfer surface area for efficient condensation of solvent vapours.",
      },
      {
        title: "Chemical Inertness",
        body:
          "Borosilicate glass wetted surfaces are inert to virtually all solvents and corrosive vapours — no contamination of condensate.",
      },
      {
        title: "Direct DN Coupling",
        body:
          "Standard DN couplings allow the condenser to be directly attached to glass reactors, columns or distillation flasks without adapters.",
      },
    ],
    faqs: [],
  },
  valves: {
    tag: "Valve",
    baseSpecs: [
      { label: "Body Material", value: "MS / SS 304 / SS 316 with PTFE / FEP / PFA lining" },
      { label: "End Connection", value: "Flanged ANSI 150# / DIN PN10 / PN16" },
      { label: "Size Range", value: "15 mm (½\") to 300 mm (12\")" },
      { label: "Working Pressure", value: "Up to 10 Bar" },
      { label: "Temperature Range", value: "-20°C to +180°C" },
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
          "Robust metal body with bonded fluoropolymer lining gives the strength of metal with the inertness of plastic — minimising downtime.",
      },
      {
        title: "Bubble-Tight Shut-Off",
        body:
          "Precision-machined seats and discs ensure zero-leak isolation, even after thousands of operating cycles.",
      },
    ],
    faqs: [],
  },
  bellows: {
    tag: "Bellow",
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
  stirrer: {
    tag: "Stirrer",
    baseSpecs: [
      { label: "Shaft Material", value: "SS 304 / SS 316 with PTFE coating" },
      { label: "Blade Type", value: "Anchor / PBT / Propeller / Paddle" },
      { label: "Length", value: "Custom (300 mm to 2500 mm)" },
      { label: "Diameter", value: "Custom (10 mm to 50 mm shaft)" },
      { label: "Coating", value: "PTFE / PFA bonded coating" },
      { label: "Application", value: "Glass reactors, SS reactors, lab & pilot plants" },
      { label: "Temperature", value: "Up to 200°C" },
      { label: "Compliance", value: "GMP / Non-GMP; FDA-grade liner available" },
    ],
    highlights: [
      {
        title: "Corrosion-Proof Wetted Parts",
        body:
          "PTFE coating fully encapsulates the shaft and blade — no metal contact with the process fluid, eliminating contamination risk.",
      },
      {
        title: "Custom Geometry",
        body:
          "Anchor, PBT, propeller and paddle blades sized to your reactor for optimum mixing efficiency and flow pattern.",
      },
      {
        title: "Built for Long Life",
        body: "SS core with bonded PTFE liner withstands continuous duty in demanding chemical service.",
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
      { label: "Form", value: "Rod / Tube / Sheet / Machined component / Cover / Distributor" },
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
        body: "Lowest coefficient of friction of any solid — ideal for bushes, seals, covers and slides.",
      },
      {
        title: "Custom Machined to Spec",
        body: "We CNC-machine and mould PTFE to your exact drawing — tight tolerances, repeatable quality.",
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
    tag: "Flange",
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
  sightGlass: {
    tag: "Sight Glass",
    baseSpecs: [
      { label: "Type", value: "Single window / Double window / PTFE Lined" },
      { label: "Body Material", value: "MS / SS 304 / SS 316" },
      { label: "Glass", value: "Toughened borosilicate" },
      { label: "Size Range", value: "25 mm to 200 mm" },
      { label: "Connection", value: "Flanged ANSI / DIN" },
      { label: "Working Pressure", value: "Up to 10 Bar" },
      { label: "Temperature", value: "Up to 200°C" },
      { label: "Gasket", value: "PTFE / Graphite" },
      { label: "Application", value: "Process visualization, flow monitoring, level observation" },
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
        body: "MS, SS 304 or SS 316 body with optional PTFE lining to suit your service conditions and corrosion requirements.",
      },
    ],
    faqs: [],
  },
  structure: {
    tag: "Structure",
    baseSpecs: [
      { label: "Material", value: "MS (Mild Steel)" },
      { label: "Finish", value: "Powder-coated (epoxy)" },
      { label: "Design", value: "Modular frame system" },
      { label: "Application", value: "Supporting glass reactors, distillation assemblies, pilot plant equipment" },
      { label: "Customisation", value: "Height, width and tier count as per customer layout" },
      { label: "Load Capacity", value: "Engineered for full process load" },
      { label: "Standard", value: "As per IS structural fabrication standards" },
    ],
    highlights: [
      {
        title: "Modular Frame Design",
        body:
          "Bolted-section MS structure allows height and layout adjustment to accommodate glass assemblies of varying capacities.",
      },
      {
        title: "Durable Powder-Coat Finish",
        body:
          "Epoxy powder-coat protects against corrosion in humid chemical plant environments and provides a professional finish.",
      },
      {
        title: "Load-Rated Fabrication",
        body:
          "Structurally designed to support the full static and dynamic load of glass reactor assemblies including motor, condenser and accessories.",
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
  img: opts.img ?? (productFileMap[slug] ? `/assets/products/${productFileMap[slug]}` : getProductImage(slug)),
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

const legacyCategories: Category[] = [

  // ─── BOROSILICATE GLASS REACTOR ASSEMBLIES ────────────────────────────────

  {
    slug: "glass-reactor-assemblies",
    name: "Glass Reactor Assemblies",
    short: "Jacketed • Reaction-Cum-Distillation • Complete Units",
    description:
      "Complete borosilicate glass jacketed reactor assemblies for chemical synthesis, distillation and pilot plant duty — GMP and non-GMP configurations.",
    image: getCategoryImage("glass-reactor-assemblies"),
    products: [
      p(presets.glassReactor, "borosilicate-glass-jacketed-reactor-unit-4", "Borosilicate Glass Jacketed Reactor Unit 4", {
        price: "Contact for price",
        shortDescription:
          "Complete borosilicate glass jacketed reactor unit (Unit 4) with stirrer drive, condenser, DN accessories and MS powder-coated support structure.",
        longDescription:
          "The Borosilicate Glass Jacketed Reactor Unit 4 from Gujarat Scientific And Polymer is a fully assembled, pilot-scale reaction system built around a borosilicate glass 3.3 jacketed reactor vessel. The outer glass jacket circulates heating or cooling media to provide precise temperature control of the reaction. The unit is supplied complete with PTFE-coated anchor or PBT stirrer, TEFC geared motor, glass coil condenser, addition funnel, thermometer pocket, sampling valve and all necessary DN-coupled glassware — mounted on a robust MS powder-coated structural frame. Available in GMP and Non-GMP, and Flame-Proof (FLP) and Non-FLP configurations. Capacity ranges from 5 L to 200 L with custom builds up to 500 L.",
      }),
      p(presets.glassReactor, "glass-assembly-reaction-cum-distillation", "Glass Assembly Reaction Cum Distillation Unit", {
        shortDescription:
          "Combined borosilicate glass reaction and distillation assembly for simultaneous reaction and continuous product removal.",
        longDescription:
          "The Glass Assembly Reaction Cum Distillation Unit integrates a jacketed borosilicate glass 3.3 reactor with a packed or plate distillation column and condenser train in a single modular assembly. As reaction proceeds, product vapour is continuously removed by distillation — driving equilibrium-limited reactions to completion. Widely used in esterification, solvent recovery, and API synthesis. All components are DN-coupled for easy assembly, cleaning and reconfiguration. Supplied on a single MS powder-coated structure.",
      }),
      p(presets.glassReactor, "glass-reaction-assembly", "Glass Reaction Assembly", {
        shortDescription:
          "Modular borosilicate glass reaction assembly with reactor vessel, reflux condenser, addition funnel and support structure.",
        longDescription:
          "The Glass Reaction Assembly from Gujarat Scientific And Polymer is a ready-to-use reaction setup comprising a borosilicate glass 3.3 reactor flask or cylindrical vessel, reflux condenser, dropping/addition funnel, thermometer pocket, sampling valve and PTFE stirrer — all mounted on a MS powder-coated frame. Designed for R&D and process development work where rapid setup and process visibility are essential. Available in jacketed and non-jacketed configurations from 5 L to 100 L.",
      }),
      p(presets.glassReactor, "glass-assembly", "Glass Assembly (Complete Unit)", {
        shortDescription:
          "Complete borosilicate glass process assembly configured for reaction, distillation or extraction as per customer specification.",
        longDescription:
          "The Glass Assembly (Complete Unit) from Gujarat Scientific And Polymer is a customer-specified assembly of borosilicate glass 3.3 process equipment — reactor, column, condenser, receivers and instrumentation — integrated on a common MS powder-coated structure. Configured to customer process requirements for reaction, fractional distillation, solvent recovery, gas absorption or extraction. All DN couplings and PTFE seals supplied. GMP and non-GMP documentation available on request.",
      }),
      p(presets.glassReactor, "assembly-lab", "Lab Glass Assembly Unit", {
        shortDescription:
          "Compact bench-top borosilicate glass lab assembly for small-scale reaction and distillation studies in R&D and QC.",
        longDescription:
          "The Lab Glass Assembly Unit is a compact, bench-top borosilicate glass 3.3 assembly ideal for R&D, quality control and process development in chemical and pharmaceutical laboratories. The unit includes a glass reactor flask or cylindrical vessel, condenser, addition funnel, and all standard accessories on a compact bench-top MS structure. Available in 0.5 L to 20 L capacities. Suitable for atmospheric, vacuum and reflux operations.",
      }),
      p(presets.glassReactor, "jacketed-vessel", "Glass Jacketed Vessel", {
        shortDescription:
          "Standalone borosilicate glass jacketed vessel for temperature-controlled storage, mixing or reaction of process media.",
        longDescription:
          "The Glass Jacketed Vessel from Gujarat Scientific And Polymer is a borosilicate glass 3.3 cylindrical vessel enclosed by a glass jacket through which heating or cooling media is circulated. Used as a standalone temperature-controlled vessel for mixing, dissolution, crystallisation or reaction. Available with PTFE-coated stirrer, motor drive, temperature probe and all DN accessories. Capacities from 5 L to 200 L. MS powder-coated support stand included.",
      }),
      /* Removed: Borosilicate Glass Flask 500 Litre
      p(presets.glassReactor, "flask-500-ltr", "Borosilicate Glass Flask 500 Litre", {
        shortDescription:
          "Large-capacity 500-litre borosilicate glass flask for pilot plant and production-scale reaction or storage applications.",
        longDescription:
          "The Borosilicate Glass Flask 500 Litre from Gujarat Scientific And Polymer is a large-volume, round-bottom or cylindrical borosilicate glass 3.3 flask engineered for pilot plant and production-scale duty. The thick-walled construction withstands full vacuum and jacketed service. Available with multiple DN-coupled nozzles for stirrer, condenser, addition funnel, thermometer and sampling. Supplied on a purpose-built MS powder-coated structure with appropriate stirrer and drive system.",
      }),*/
      p(presets.glassReactor, "jacketed-distillation-glass-assembly", "Jacketed Distillation Glass Assembly", {
        shortDescription:
          "Jacketed borosilicate glass distillation assembly with heated flask, packed column, condenser and receiver for precise temperature-controlled distillation.",
        longDescription:
          "The Jacketed Distillation Glass Assembly integrates a borosilicate glass 3.3 jacketed distillation flask with packed or plate column, reflux condenser, distillate receiver and all DN accessories on a single MS powder-coated frame. The jacketed flask enables uniform heating by circulating hot water or steam, eliminating hot spots and improving distillation efficiency. Ideal for solvent recovery, purification of thermally sensitive compounds and API processing.",
      }),
    ],
  },

  // ─── GLASS HEAT EXCHANGERS & CONDENSERS ───────────────────────────────────

  {
    slug: "glass-heat-exchangers-condensers",
    name: "Glass Heat Exchangers & Condensers",
    short: "Shell & Tube • Coil Condenser",
    description:
      "Borosilicate glass heat exchangers and condensers for corrosion-free heating, cooling and vapour condensation in chemical and pharmaceutical processes.",
    image: getCategoryImage("glass-heat-exchangers-condensers"),
    products: [
      p(presets.heatExchanger, "glass-heat-exchanger", "Borosilicate Glass Heat Exchanger", {
        shortDescription:
          "Borosilicate glass shell and tube heat exchanger for corrosion-free heating, cooling and condensation in aggressive chemical service.",
        longDescription:
          "The Borosilicate Glass Heat Exchanger from Gujarat Scientific And Polymer uses borosilicate glass 3.3 tubes and shell to deliver fully corrosion-resistant heat transfer for acids, solvents and corrosive intermediates. Available as condenser, cooler, heater or reboiler with heat transfer areas from 0.5 m² to 50 m². DN-coupled end caps allow easy tube bundle inspection and cleaning. Supplied in shell & tube or block type configurations. Suitable for both GMP and non-GMP duty.",
      }),
      p(presets.condenser, "glass-coil-condenser", "Glass Coil Condenser", {
        shortDescription:
          "Borosilicate glass coil condenser for laboratory and pilot plant distillation, reflux and vapour condensation duties.",
        longDescription:
          "The Glass Coil Condenser from Gujarat Scientific And Polymer uses a helical borosilicate glass coil immersed in a glass outer shell through which cooling water flows counter-currently. The large surface area-to-volume ratio delivers efficient condensation of solvent vapours across a wide range of vapour loads. Available in DN 50 to DN 200 with standard DN couplings for direct connection to glass reactor assemblies, distillation columns and rotary evaporators.",
      }),
      p(presets.condenser, "glass-condenser", "Borosilicate Glass Condenser", {
        shortDescription:
          "General-purpose borosilicate glass condenser for laboratory and pilot plant vapour condensation and reflux operations.",
        longDescription:
          "The Borosilicate Glass Condenser from Gujarat Scientific And Polymer is fabricated from borosilicate glass 3.3 in coil, Liebig, or shell & tube configuration to suit the required condensation duty. Used for reflux condensation above reactors, distillate condensation in distillation trains, and solvent vapour recovery. Standard DN couplings allow direct integration with glass reactor assemblies, columns and evaporators. Available in single-pass and multi-pass designs.",
      }),
    ],
  },

  // ─── PTFE LINED VALVES ────────────────────────────────────────────────────

  {
    slug: "ptfe-lined-valves",
    name: "PTFE Lined Valves",
    short: "Ball • Flush Bottom • Glass Lined",
    description:
      "PTFE-lined valves for corrosive chemical service — ball valves, flush bottom valves and glass-lined valve variants with bubble-tight shut-off.",
    image: getCategoryImage("ptfe-lined-valves"),
    products: [
      p(presets.valves, "ptfe-lined-ball-valve", "PTFE Lined Ball Valve", {
        shortDescription:
          "PTFE-lined ball valve with full-bore port and bubble-tight shut-off for corrosive chemical service.",
        longDescription:
          "The PTFE Lined Ball Valve from Gujarat Scientific And Polymer features a CS or SS body with fully encapsulated PTFE / PFA lining. The ball and seats are also lined, giving a zero-contact metal-to-process-fluid design. Manual, pneumatic and electric actuated versions are available. Quarter-turn operation provides fast open/close response. Sizes 15 mm to 300 mm, ANSI 150# / DIN PN10 flanged ends. Tested to zero-leak bubble-tight shut-off standard.",
      }),
      /* Removed: Glass Lined Valve
      p(presets.valves, "glass-lined-valve", "Glass Lined Valve", {
        shortDescription:
          "Glass-lined valve for corrosive chemical service where glass lining is preferred over fluoropolymer for extreme acid resistance.",
        longDescription:
          "The Glass Lined Valve from Gujarat Scientific And Polymer is designed for applications where a glass-lined wetted surface provides superior resistance to specific corrosive chemicals. The steel body is lined with a specially formulated glass lining offering outstanding resistance to concentrated acids, alkalis and oxidising media at elevated temperatures. Suitable for chemical, fertilizer and pharmaceutical manufacturing. Available in ball and plug configurations, manual and actuated.",
      }),*/
      p(presets.valves, "ptfe-lined-valve", "PTFE Lined Valve", {
        shortDescription:
          "General-purpose PTFE-lined valve for on-off and throttling service in corrosive chemical and pharmaceutical piping systems.",
        longDescription:
          "The PTFE Lined Valve from Gujarat Scientific And Polymer is available in ball, butterfly, plug, diaphragm and check configurations — all with PTFE / PFA / FEP fluoropolymer lining for corrosion-free operation. The fully lined wetted path eliminates metal contact with the process fluid. Operating temperature -20°C to +180°C, pressure to 10 Bar. Flanged ANSI 150# / DIN PN10 ends. Suitable for chemical, pharmaceutical, petrochemical and water-treatment service.",
      }),
      /* Removed: Flush Bottom Valve
      p(presets.valves, "flush-bottom-valve", "Flush Bottom Valve", {
        shortDescription:
          "PTFE-lined flush bottom valve for complete zero-dead-volume drain of reactor, tank or vessel contents.",
        longDescription:
          "The Flush Bottom Valve from Gujarat Scientific And Polymer mounts directly to the bottom nozzle of a reactor or tank. When open, the plug sits flush with the vessel bottom — eliminating the dead volume that traps product, solids or contamination found with conventional drain valves. PTFE-lined body and plug ensure full chemical resistance. Available in manual and actuated configurations, 25 mm to 150 mm, ANSI 150# / DIN PN10 flanged.",
      }),*/
      p(presets.valves, "ms-ptfe-lined-flush-bottom-valve", "MS PTFE Lined Flush Bottom Valve", {
        shortDescription:
          "MS (mild steel) body PTFE-lined flush bottom valve for economical zero-dead-volume drain in corrosive chemical service.",
        longDescription:
          "The MS PTFE Lined Flush Bottom Valve from Gujarat Scientific And Polymer uses a mild steel body with full PTFE lining on all wetted surfaces including the plug face. Engineered for complete drain of reactor and vessel contents without dead-volume accumulation. The PTFE lining provides chemical resistance equivalent to SS-bodied versions at a more economical cost for non-high-corrosion environments. Sizes 25 mm to 150 mm, manual and actuated versions available.",
      }),
    ],
  },

  // ─── PTFE EXPANSION JOINT BELLOWS ─────────────────────────────────────────

  {
    slug: "ptfe-expansion-joint-bellows",
    name: "PTFE Expansion Joint Bellows",
    short: "Standard • High Pressure • Long Type • Axpincer",
    description:
      "PTFE and PTFE-lined bellows engineered for thermal expansion, vibration absorption and chemical resistance in corrosive piping systems.",
    image: getCategoryImage("ptfe-expansion-joint-bellows"),
    products: [
      p(presets.bellows, "ptfe-expansion-bellow", "PTFE Expansion Joint Bellow", {
        price: "8500 INR / Piece",
        shortDescription:
          "Flexible PTFE expansion joint bellow with stainless steel flanges — absorbs thermal, axial, lateral and angular movement in corrosive piping.",
        longDescription:
          "The PTFE Expansion Joint Bellow from Gujarat Scientific And Polymer is a flexible piping component used to compensate for vibration, thermal expansion and piping misalignment. The PTFE bellows body offers superior chemical, corrosion and high-temperature resistance. Engineered convolutions allow axial, lateral and angular movement — protecting connected equipment, pumps and instruments. Stainless steel flanges standard. Sizes 25 mm to 600 mm, PN10/PN16. Ideal for pharmaceutical, chemical and food & beverage processing.",
      }),
      /* Removed: Axpincer PTFE Bellow
      p(presets.bellows, "axpincer-bellow", "Axpincer PTFE Bellow", {
        shortDescription:
          "Axpincer-type PTFE bellow designed to absorb axial compression and extension movements in pressurised corrosive pipelines.",
        longDescription:
          "The Axpincer PTFE Bellow from Gujarat Scientific And Polymer is engineered specifically to absorb axial (compression and extension) pipe movement while maintaining the integrity of the corrosion-resistant PTFE wetted surface. The axpincer design uses a controlled-pitch convoluted PTFE body with flanged ends, suitable for high-cycle applications in chemical plant piping. Available in sizes 25 mm to 300 mm with SS 304 / SS 316 flanges.",
      }),*/
      p(presets.bellows, "high-pressure-bellow", "High Pressure PTFE Bellow", {
        price: "9500 INR / Piece",
        shortDescription:
          "High pressure PTFE expansion joint bellow for demanding service above standard PN10/PN16 ratings.",
        longDescription:
          "The High Pressure PTFE Bellow from Gujarat Scientific And Polymer is engineered for piping service at elevated pressures above standard PN10/PN16 ratings. Thick-wall PTFE convoluted body with reinforced SS flanges and, where required, internal wire-braid or external SS ring reinforcement. Designed for chemical plant, pharmaceutical and petrochemical duty where both high operating pressure and full corrosion resistance are required. Available 25 mm to 300 mm NB.",
      }),
      p(presets.bellows, "ptfe-expansion-bellow-long", "PTFE Expansion Bellow Long Type", {
        shortDescription:
          "Long-type PTFE expansion joint bellow with extended convolution length for higher axial movement absorption in large piping runs.",
        longDescription:
          "The PTFE Expansion Bellow Long Type from Gujarat Scientific And Polymer provides greater axial movement absorption than standard-length bellows — ideal for long piping runs with large thermal expansion ranges or where anchor points are widely spaced. The extended convoluted PTFE body maintains the same chemical resistance and flanged connection standard as the regular series. Available 25 mm to 400 mm NB in custom lengths.",
      }),
      p(presets.bellows, "ptfe-high-pressure-bellow", "PTFE High Pressure Machined Bellow", {
        price: "9500 INR / Piece",
        shortDescription:
          "Precision machined PTFE high pressure bellow for critical service requiring maximum dimensional accuracy and pressure rating.",
        longDescription:
          "The PTFE High Pressure Machined Bellow from Gujarat Scientific And Polymer is manufactured by precision CNC machining of solid PTFE billets, resulting in tighter dimensional tolerances and more uniform wall thickness than moulded bellows. The machined construction enables a higher pressure rating and better fatigue life in demanding high-cycle applications. Used in pharmaceutical, fine chemical and high-purity process service. SS 316 flanges standard. Sizes 15 mm to 200 mm.",
      }),
    ],
  },

  // ─── PTFE INDUSTRIAL STIRRERS ─────────────────────────────────────────────

  {
    slug: "ptfe-industrial-stirrers",
    name: "PTFE Industrial Stirrers & Assemblies",
    short: "Anchor • PBT • Lab • GMP Assembly",
    description:
      "PTFE-coated SS stirrers and complete stirring assemblies for glass and SS reactors — lab, industrial and GMP-model configurations.",
    image: getCategoryImage("ptfe-industrial-stirrers"),
    products: [
      // Removed product: Lab Stirrer (PTFE Coated)
      // Removed product: SS PTFE Lined Stirrer
      p(presets.stirrer, "stirrer", "Industrial Glass Reactor Stirrer", {
        shortDescription:
          "Industrial-duty PTFE-coated stirrer for glass-lined and borosilicate glass reactors in continuous chemical process service.",
        longDescription:
          "The Industrial Glass Reactor Stirrer from Gujarat Scientific And Polymer is a heavy-duty PTFE-coated SS stirrer designed for continuous duty in glass-lined and borosilicate glass reactors. The PTFE coating ensures complete chemical inertness of all wetted metal surfaces. Available with anchor, retreat-curve impeller, PBT or propeller blades in lengths from 500 mm to 2500 mm. Designed to be driven by TEFC geared motors suitable for chemical plant environments. Custom shaft diameters from 20 mm to 50 mm.",
      }),
      // Removed product: SS PTFE Lined Stirrer with Plate Check and Seal
      // Removed product: SS PTFE Anchor and PBT Blade Stirrer
      p(presets.stirrer, "stirrer-assembly-gmp", "Stirring Assembly GMP Model", {
        shortDescription:
          "Complete GMP-model stirring assembly with motor, gearbox, mechanical seal and PTFE stirrer for pharmaceutical reactor use.",
        longDescription:
          "The Stirring Assembly GMP Model from Gujarat Scientific And Polymer is a complete, documentation-ready stirring system for pharmaceutical manufacturing. The assembly comprises a TEFC variable-speed motor, stainless steel gearbox, PTFE-encapsulated mechanical seal, PTFE-lined SS stirrer shaft and blade — all in GMP-compliant construction with smooth, crevice-free surfaces. Material certificates, FAT documentation and GMP compliance dossier available. Suitable for API synthesis, intermediates and pharmaceutical-grade chemical reactors.",
      }),
      p(presets.stirrer, "stirrer-assembly", "Stirring Assembly (Standard)", {
        shortDescription:
          "Complete stirring assembly with motor, gearbox, PTFE stirrer and coupling for glass reactor pilot plant duty.",
        longDescription:
          "The Standard Stirring Assembly from Gujarat Scientific And Polymer is a complete, ready-to-install drive system for glass reactor assemblies. The package includes a TEFC geared motor, shaft coupling, PTFE-lined SS stirrer shaft and interchangeable blade assembly (anchor, PBT or paddle). Suitable for atmospheric and vacuum glass reactor duty in R&D and pilot plant service. Available for reactor sizes 5 L to 200 L. Motor power from 0.12 kW to 2.2 kW to match stirrer load.",
      }),
    ],
  },

  // ─── PTFE PRODUCTS ────────────────────────────────────────────────────────

  {
    slug: "ptfe-moulded-machined-products",
    name: "PTFE Moulded & Machined Products",
    short: "Rods • Pipes • Covers • Distributors",
    description:
      "Virgin and filled PTFE products — rods, pipes, moulded covers, distributors and custom machined components for industrial and laboratory use.",
    image: getCategoryImage("ptfe-moulded-machined-products"),
    products: [
      p(presets.ptfe, "teflon-rods", "PTFE Teflon Rod", {
        shortDescription:
          "Virgin PTFE rod (Teflon rod) in standard and custom diameters for machining gaskets, bushes, valve seats and custom components.",
        longDescription:
          "The PTFE Teflon Rod from Gujarat Scientific And Polymer is extruded or compression-moulded from virgin grade PTFE for maximum chemical inertness and mechanical properties. Supplied in standard diameters from 5 mm to 300 mm and standard lengths of 1000 mm, or custom lengths on request. Used as feedstock for CNC machining of gaskets, valve seats, bushes, bearings, nozzles and bespoke components. Glass-filled, carbon-filled and bronze-filled grades available for improved wear resistance. FDA-compliant grades available.",
      }),
      p(presets.ptfe, "ptfe-pipe", "PTFE Pipe", {
        shortDescription:
          "Extruded PTFE pipe for transfer of highly corrosive acids, alkalis and ultra-pure process fluids where metal piping is unsuitable.",
        longDescription:
          "The PTFE Pipe from Gujarat Scientific And Polymer is ram-extruded from virgin PTFE resin and available in nominal diameters from 6 mm to 200 mm with wall thickness to suit working pressure. PTFE pipe is chemically inert to virtually all industrial chemicals including hydrofluoric acid, aqua regia and strong oxidisers. Operating temperature -200°C to +260°C. Smooth bore minimises pressure drop and prevents product adhesion. Supplied in standard lengths with plain, flanged or compression-fitting ends.",
      }),
      p(presets.ptfe, "ptfe-product", "PTFE Moulded Product", {
        shortDescription:
          "Custom PTFE moulded product manufactured by compression moulding to customer drawings and specifications.",
        longDescription:
          "Gujarat Scientific And Polymer manufactures custom PTFE moulded products by compression moulding virgin or filled PTFE resin to customer-supplied drawings or samples. Common items include valve diaphragms, reactor bottom covers, impeller discs, nozzle liners and reactor gasket rings. Mould tooling manufactured in-house for rapid turnaround. Virgin, glass-filled, carbon-filled and bronze-filled PTFE grades available. FDA-compliant material certificates provided on request.",
      }),
      p(presets.ptfe, "ptfe-lined-top-cover", "PTFE Lined Top Cover", {
        shortDescription:
          "PTFE lined top cover (head plate) for glass reactors and tanks — multiple nozzle ports with PTFE-sealed fittings.",
        longDescription:
          "The PTFE Lined Top Cover from Gujarat Scientific And Polymer is a full-face PTFE or PTFE-lined MS head plate for glass reactors, distillation flasks and process tanks. Multiple DN-sized nozzle ports are provided for stirrer entry, condenser attachment, addition funnel, thermometer pocket, sampling and gas inlet/outlet. All nozzles are fitted with PTFE sealing rings. The one-piece PTFE or lined design eliminates metal-to-process-fluid contact at the reactor head — critical for pharmaceutical and high-purity chemical applications.",
      }),
      p(presets.ptfe, "ptfe-distributor", "PTFE Liquid Distributor", {
        shortDescription:
          "PTFE liquid distributor for even distribution of process liquid across packed beds in glass distillation and absorption columns.",
        longDescription:
          "The PTFE Liquid Distributor from Gujarat Scientific And Polymer is precision machined from virgin PTFE to provide uniform drip-point distribution of liquid feed across the full cross-sectional area of packed glass columns. Used in distillation, absorption, stripping and liquid-liquid extraction glass columns. The PTFE construction is fully resistant to all solvents and acids that would attack conventional plastic or metallic distributors. Available for column diameters from DN 50 to DN 600.",
      }),
    ],
  },

  // ─── PTFE LINED PIPE FITTINGS ─────────────────────────────────────────────

  {
    slug: "ptfe-lined-pipe-fittings",
    name: "PTFE Lined Pipe & Fittings",
    short: "Pipe • Bend • Elbow • Tee • Hose Pipe",
    description:
      "Complete range of MS PTFE-lined pipes, bends, elbows, tees and hose pipes for corrosion-resistant chemical process piping systems.",
    image: getCategoryImage("ptfe-lined-pipe-fittings"),
    products: [
      p(presets.fittings, "ms-ptfe-lined-pipe", "MS PTFE Lined Pipe", {
        shortDescription:
          "MS (mild steel) PTFE-lined pipe spool for constructing corrosion-resistant chemical process piping systems.",
        longDescription:
          "The MS PTFE Lined Pipe from Gujarat Scientific And Polymer consists of a mild steel pipe body with a continuous PTFE liner bonded to the inner surface, giving the structural strength of steel with the chemical inertness of fluoropolymer. Supplied in standard lengths of 1 m, 2 m and 3 m, or custom-cut lengths with flanged ends to ANSI 150# or DIN PN10. Spark-tested to verify pinhole-free lining. Sizes 15 mm to 300 mm NB. Suitable for acids, alkalis, solvents and corrosive process fluids.",
      }),
      p(presets.fittings, "ms-ptfe-lined-bend", "MS PTFE Lined Bend", {
        shortDescription:
          "MS PTFE-lined 180° bend for U-turn direction changes in corrosive chemical piping — spark-tested, full chemical resistance.",
        longDescription:
          "The MS PTFE Lined Bend from Gujarat Scientific And Polymer is a 180° return bend with PTFE lining on all wetted surfaces, providing a smooth, corrosion-resistant flow path for direction reversal in chemical process piping. The MS body provides structural integrity and flanged ANSI 150# / DIN PN10 ends ensure direct compatibility with the rest of the lined piping system. Spark-tested and vent-hole fitted. Available in 15 mm to 300 mm NB.",
      }),
      p(presets.fittings, "ms-ptfe-lined-elbow", "MS PTFE Lined Elbow Pipe", {
        shortDescription:
          "MS PTFE-lined 90° elbow for direction changes in corrosive chemical piping — spark-tested, vent hole fitted.",
        longDescription:
          "The MS PTFE Lined Elbow Pipe from Gujarat Scientific And Polymer is a 90° (or 45°) direction-change fitting with a full PTFE lining on the inner wetted surface, providing a smooth, crevice-free flow path in chemical process piping. Mild steel body with ANSI 150# / DIN PN10 flanged ends. Each elbow is fitted with a pressure-relief vent hole and spark-tested to verify pinhole-free lining integrity before dispatch. Available in 15 mm to 300 mm NB.",
      }),
      p(presets.fittings, "ss-ptfe-lined-hose-pipe", "SS PTFE Lined Hose Pipe", {
        shortDescription:
          "Flexible SS PTFE-lined hose pipe for connecting lined piping systems across vibrating or moving equipment.",
        longDescription:
          "The SS PTFE Lined Hose Pipe from Gujarat Scientific And Polymer combines a smooth PTFE-lined inner bore with a stainless steel wire-braid outer sheath, providing flexibility for connecting rigid lined piping across pump outlets, agitated vessels and any equipment with vibration or relative movement. The PTFE inner tube provides full chemical resistance. SS braid provides pressure containment. Flanged ANSI 150# / DIN PN10 ends. Available in 25 mm to 150 mm NB and custom lengths.",
      }),
      p(presets.fittings, "ptfe-lined-equal-tee", "PTFE Lined Equal Tee", {
        shortDescription:
          "PTFE / FEP / PFA lined equal tee for branching corrosive process streams — full-bore flow path, spark-tested.",
        longDescription:
          "The PTFE Lined Equal Tee from Gujarat Scientific And Polymer is a three-way fitting with a continuously moulded fluoropolymer (PTFE / FEP / PFA) lining throughout the full internal wetted surface including the branch junction. No exposed metal contacts the process fluid. MS or SS body with ANSI 150# / DIN PN10 flanged ends. Spark-tested and vent holes fitted to each outlet. Available in 15 mm to 300 mm NB. Direct replacement for standard unlined tees in corrosive service.",
      }),
      p(presets.fittings, "ptfe-lined-instrument-tee", "PTFE / PFA Lined Instrument Tee", {
        shortDescription:
          "PTFE / PFA / FEP / PP lined instrument tee for connecting pressure gauges, transmitters or temperature elements to lined chemical piping.",
        longDescription:
          "The PTFE / PFA Lined Instrument Tee from Gujarat Scientific And Polymer is a reducing tee with a full fluoropolymer lining on the main bore and a smaller branch nozzle (typically DN 15 to DN 25) for connecting instrumentation such as pressure gauges, transmitters, thermowells or sample valves to PTFE-lined process piping. Available in PTFE, PFA, FEP and PP lining options. MS or SS body with ANSI 150# / DIN PN10 flanged main ends and threaded or flanged instrument branch.",
      }),
    ],
  },

  // ─── MS PTFE FLANGES ──────────────────────────────────────────────────────

  {
    slug: "ms-ptfe-flanges",
    name: "MS PTFE Flanges",
    short: "Slip-On • Weld-Neck • Blind • Reducing",
    description:
      "Mild steel PTFE-lined flanges for corrosion-resistant connections in chemical process piping — all major standard dimensions.",
    image: getCategoryImage("ms-ptfe-flanges"),
    products: [
      p(presets.flanges, "ms-ptfe-flange", "MS PTFE Lined Flange", {
        shortDescription:
          "MS (mild steel) PTFE-lined flange for corrosion-resistant bolted connections in chemical process piping systems.",
        longDescription:
          "The MS PTFE Lined Flange from Gujarat Scientific And Polymer is a mild steel flange with a PTFE face lining that prevents corrosive process fluids from contacting the MS gasket-seating face or bolt holes. Available as slip-on, weld-neck, reducing, blind or spectacle blind types to ANSI B16.5 150# or DIN PN10/PN16. Face lining is spark-tested for integrity. Used in PTFE-lined piping systems across chemical, pharmaceutical, fertilizer and petrochemical industries. Sizes 15 mm to 300 mm NB.",
      }),
    ],
  },

  // ─── INDUSTRIAL SIGHT GLASS ───────────────────────────────────────────────

  {
    slug: "industrial-sight-glass",
    name: "Industrial Sight Glass",
    short: "MS PTFE Lined • Visual Flow Monitoring",
    description:
      "MS PTFE-lined industrial sight glasses for visual monitoring of corrosive process flows under pressure and temperature in lined piping systems.",
    image: getCategoryImage("industrial-sight-glass"),
    products: [
      p(presets.sightGlass, "ms-ptfe-lined-sight-glass", "MS PTFE Lined Sight Glass", {
        shortDescription:
          "MS PTFE-lined sight glass for visual monitoring of corrosive chemical flows in PTFE-lined process piping.",
        longDescription:
          "The MS PTFE Lined Sight Glass from Gujarat Scientific And Polymer features a mild steel body fully lined with PTFE on all wetted surfaces, with a toughened borosilicate glass window retained in a PTFE-cushioned seat. Designed for visual monitoring of flow direction, clarity, level and phase behaviour in PTFE-lined piping systems handling corrosive acids, alkalis and solvents. Available in single and double window configurations, sizes 25 mm to 200 mm, ANSI 150# / DIN PN10 flanged ends.",
      }),
    ],
  },

  // ─── PTFE LINED FUNNEL ────────────────────────────────────────────────────

  {
    slug: "ptfe-lined-funnels",
    name: "PTFE Lined Funnels",
    short: "Transfer • Addition • MS Lined",
    description:
      "MS PTFE-lined funnels for safe, corrosion-resistant transfer of acids, solvents and chemical process fluids into reactors and vessels.",
    image: getCategoryImage("ptfe-lined-funnels"),
    products: [
      p(presets.fittings, "ms-ptfe-lined-funnel", "MS PTFE Lined Funnel", {
        tag: "Lined Funnel",
        shortDescription:
          "MS PTFE-lined transfer funnel for safe, corrosion-resistant addition of acids and chemicals to reactors and process vessels.",
        longDescription:
          "The MS PTFE Lined Funnel from Gujarat Scientific And Polymer is a mild steel funnel body fully lined internally with PTFE, providing a corrosion-resistant, non-contaminating flow path for transferring acids, alkalis, solvents and other corrosive chemicals into reactors, storage tanks and process vessels. The large PTFE-lined funnel bowl prevents splashing and chemical contact with unlined surfaces. Available in standard sizes from DN 50 to DN 200 with flanged or threaded outlet connection.",
      }),
    ],
  },

  // ─── MS STRUCTURE ─────────────────────────────────────────────────────────

  {
    slug: "ms-support-structures",
    name: "MS Powder-Coated Support Structures",
    short: "Modular Frames for Glass Assemblies",
    description:
      "Mild steel powder-coated modular support structures for borosilicate glass reactors, distillation assemblies and pilot plant equipment.",
    image: getCategoryImage("ms-support-structures"),
    products: [
      // Removed product: MS Powder-Coated Structure Part
    ],
  },
];

export const categories: Category[] = [
  {
    slug: "ptfe-products",
    name: "PTFE Products",
    short: "Rods • Tubes • Bushes • Custom Machined Parts",
    description:
      "Virgin and filled PTFE components, machined parts, bellows and stirrers designed for chemical resistance and long-life service.",
    image: getCategoryImage("ptfe-products"),
    products: [
      ...(legacyCategories.find((category) => category.slug === "ptfe-moulded-machined-products")?.products ?? []),
      ...(legacyCategories.find((category) => category.slug === "ptfe-expansion-joint-bellows")?.products ?? []),
      ...(legacyCategories.find((category) => category.slug === "ptfe-industrial-stirrers")?.products ?? []),
    ],
  },
  {
    slug: "ms-ptfe-lined-products",
    name: "MS PTFE Lined Products",
    short: "Valves • Flanges • Pipes • Fittings",
    description:
      "MS PTFE-lined valves, flanges, pipes, fittings and accessories for corrosion-resistant industrial piping systems.",
    image: getCategoryImage("ms-ptfe-lined-products"),
    products: [
      ...(legacyCategories.find((category) => category.slug === "ptfe-lined-valves")?.products ?? []),
      ...(legacyCategories.find((category) => category.slug === "ptfe-lined-pipe-fittings")?.products ?? []),
      ...(legacyCategories.find((category) => category.slug === "ms-ptfe-flanges")?.products ?? []),
      ...(legacyCategories.find((category) => category.slug === "industrial-sight-glass")?.products ?? []),
      ...(legacyCategories.find((category) => category.slug === "ptfe-lined-funnels")?.products ?? []),
    ],
  },
  {
    slug: "glass-products",
    name: "Glass Products",
    short: "Reactors • Heat Exchangers • Condensers",
    description:
      "Borosilicate glass reactors, distillation assemblies, condensers and heat exchangers for chemical and pharmaceutical processing.",
    image: getCategoryImage("glass-products"),
    products: [
      ...(legacyCategories.find((category) => category.slug === "glass-reactor-assemblies")?.products ?? []),
      ...(legacyCategories.find((category) => category.slug === "glass-heat-exchangers-condensers")?.products ?? []),
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
//
// Image filename → product slug mapping (from source ZIP):
//   borosilicate-glass-jacketed-reactor-unit-4.jpeg → borosilicate-glass-jacketed-reactor-unit-4.jpg
//   GLASS ASSEMBLY REACTION CUM.jpeg               → glass-assembly-reaction-cum-distillation.jpg
//   GLASS REACTION ASSEMBLY.jpeg                   → glass-reaction-assembly.jpg
//   GLASS ASSEMBLY.jpeg                            → glass-assembly.jpg
//   ASSEMBLY LAB .jpeg                             → assembly-lab.jpg
//   JACKET VESAL.jpeg                              → jacketed-vessel.jpg
//   FLASK 500 LTR.heic                             → flask-500-ltr.jpg
//   jacketed-distillation-glass-assembly-5.jpg     → jacketed-distillation-glass-assembly.jpg
//   HET AXCHENGER.heic / HET EXCHENGER.heic        → glass-heat-exchanger.jpg
//   COIL CONDENCER.heic                            → glass-coil-condenser.jpg
//   GLASS CONDENCER.heic                           → glass-condenser.jpg
//   BALL VALVE.png                                 → ptfe-lined-ball-valve.jpg
//   GLASS LINE VALVE.heic                          → glass-lined-valve.jpg
//   LINE VALVE.jpeg                                → ptfe-lined-valve.jpg
//   FLUSH BOTTAM VALVE .heic                       → flush-bottom-valve.jpg
//   MS PTFE LINE FLUSH BOTTAM VALVE.png            → ms-ptfe-lined-flush-bottom-valve.jpg
//   JT-52476822-ptfe-bellow-with-flange.jpg        → ptfe-expansion-bellow.jpg
//   AXPINCER BELLOW.heic                           → axpincer-bellow.jpg
//   HIGH PRESURE BELLOW.jpeg                       → high-pressure-bellow.jpg
//   PTFE AXPENTION BELLOW LONG.jpeg                → ptfe-expansion-bellow-long.jpg
//   PTFE HIGH PRESURE BELLOW.jpeg / PTFE BELLOW    → ptfe-high-pressure-bellow.jpg
//   LAB STIRRER.heic                               → lab-stirrer.jpg
//   SS PTFE LINE STIRRER.jpeg                      → ss-ptfe-lined-stirrer.jpg
//   STIRRER.jpeg                                   → stirrer.jpg
//   SS PTFE LINED STIRRER WITH PRP PLATE...        → ss-ptfe-stirrer-with-plate-check-seal.jpg
//   SS PTFE LINED STURRER ANCHOR PLUS PBT          → ss-ptfe-anchor-pbt-stirrer.jpg
//   STURING ASSEMBLY GMP MODEL.jpeg                → stirrer-assembly-gmp.jpg
//   STURING ASSEMBLY.heic                          → stirrer-assembly.jpg
//   OA-52476822-product-jpeg.jpg / PTFE PRODUCT    → ptfe-product.jpg
//   PTFE LINE TOP COVER .jpeg                      → ptfe-lined-top-cover.jpg
//   PTFE RED DISTIBUTER - TL.jpeg                  → ptfe-distributor.jpg
//   teflon-rods-1.jpg.jpeg                         → teflon-rods.jpg
//   RF-52476822-ptfe-pipe.jpg / MS PTFE LINEED PIPE→ ms-ptfe-lined-pipe.jpg
//   MS PTFE LINED BEND.jpeg                        → ms-ptfe-lined-bend.jpg
//   MS PTFE Elbow Pipe...jpeg                      → ms-ptfe-lined-elbow.jpg
//   SS PTFE LINED HORSE PIPE.jpeg                  → ss-ptfe-lined-hose-pipe.jpg
//   LS-52476822-ptfe-fep-pfa-lined-equal-tee.png   → ptfe-lined-equal-tee.jpg
//   Ms Pfa Fep Pp Lined Instrument Tee...jpeg      → ptfe-lined-instrument-tee.jpg
//   MS FLANGE.heic                                 → ms-ptfe-flange.jpg
//   MS PTFE LINED SIDE GLASS.jpeg                  → ms-ptfe-lined-sight-glass.jpg
//   MS PTFE LINE FUNNEL.jpeg                       → ms-ptfe-lined-funnel.jpg
//   STRUCTURE PART .heic / structure part.heic     → ms-structure-part.jpg
// ---------------------------------------------------------------------------
export const PRODUCT_IMAGE_LIST: string[] = [
  // Placeholder (required fallback)
  "placeholder.jpg",

  // ── Category cover images ──────────────────────────────────────────────
  ...categories.map((c) => `category-${c.slug}.jpg`),

  // ── Product images (one per product) ──────────────────────────────────
  ...allProducts.map((pr) => `${pr.slug}.jpg`),
];