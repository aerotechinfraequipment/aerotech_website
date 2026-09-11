import catPneumatic from "../assets/cat-pneumatic.jpg";
import puTubes from "../assets/product-pu-tubes.jpg";
import drill from "../assets/product-drill.jpg";
import multimeter from "../assets/product-multimeter.jpg";
import catPowerTools from "../assets/cat-power-tools.jpg";
import catWelding from "../assets/cat-welding.jpg";
import catValvesFittings from "../assets/cat-valves-fittings.jpg";
import catMeasuring from "../assets/cat-measuring.jpg";
import catCompressors from "../assets/cat-compressors.jpg";
import catFrlActuators from "../assets/cat-frl-actuators.jpg";
import catAccessories from "../assets/cat-accessories.jpg";

export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  brand: string;
  category: string;
  type: string;
}

export const productsData: Product[] = [
  {
    id: "festo-pneumatic-cylinder",
    name: "Pneumatic Cylinder (ISO Standard)",
    slug: "festo-pneumatic-cylinder",
    image: catPneumatic,
    brand: "Festo",
    category: "Pneumatic Products",
    type: "Cylinders",
  },
  {
    id: "janatics-solenoid-valve",
    name: "5/2 Solenoid Valve",
    slug: "janatics-solenoid-valve",
    image: catPneumatic,
    brand: "Janatics",
    category: "Pneumatic Products",
    type: "Valves",
  },
  {
    id: "pu-pneumatic-tubes",
    name: "PU Pneumatic Tubes",
    slug: "pu-pneumatic-tubes",
    image: puTubes,
    brand: "PBI",
    category: "Pneumatic Products",
    type: "Tubes & Hoses",
  },
  {
    id: "bosch-cordless-drill-driver",
    name: "Cordless Drill Driver 18V",
    slug: "bosch-cordless-drill-driver",
    image: drill,
    brand: "Bosch",
    category: "Power Tools",
    type: "Drills",
  },
  {
    id: "ferm-angle-grinder",
    name: "Angle Grinder 100mm",
    slug: "ferm-angle-grinder",
    image: catPowerTools,
    brand: "Ferm",
    category: "Power Tools",
    type: "Grinders",
  },
  {
    id: "inverter-welding-machine",
    name: "Inverter Welding Machine 250A",
    slug: "inverter-welding-machine",
    image: catWelding,
    brand: "Techno",
    category: "Welding Equipment",
    type: "Welding Machines",
  },
  {
    id: "brass-ball-valve",
    name: "Brass Ball Valve",
    slug: "brass-ball-valve",
    image: catValvesFittings,
    brand: "CDC Pneumatics",
    category: "Valves & Fittings",
    type: "Valves",
  },
  {
    id: "brass-compression-fittings",
    name: "Brass Compression Fittings",
    slug: "brass-compression-fittings",
    image: catValvesFittings,
    brand: "SS Camlock Coupling",
    category: "Valves & Fittings",
    type: "Fittings",
  },
  {
    id: "fluke-digital-multimeter",
    name: "Digital Multimeter",
    slug: "fluke-digital-multimeter",
    image: multimeter,
    brand: "Fluke",
    category: "Measuring Instruments",
    type: "Test Instruments",
  },
  {
    id: "pressure-gauge",
    name: "Pressure Gauge (Glycerine Filled)",
    slug: "pressure-gauge",
    image: catMeasuring,
    brand: "PBI",
    category: "Measuring Instruments",
    type: "Gauges",
  },
  {
    id: "air-compressor-2hp",
    name: "Piston Air Compressor 2HP",
    slug: "air-compressor-2hp",
    image: catCompressors,
    brand: "Aero Tech",
    category: "Compressors",
    type: "Compressors",
  },
  {
    id: "smc-frl-unit",
    name: "FRL Combination Unit",
    slug: "smc-frl-unit",
    image: catFrlActuators,
    brand: "SMC",
    category: "FRL & Actuators",
    type: "Air Preparation",
  },
  {
    id: "cutting-grinding-discs",
    name: "Cutting & Grinding Discs",
    slug: "cutting-grinding-discs",
    image: catAccessories,
    brand: "Cumi",
    category: "Industrial Accessories",
    type: "Abrasives",
  },
  {
    id: "spray-gun-gravity-feed",
    name: "Spray Gun (Gravity Feed)",
    slug: "spray-gun-gravity-feed",
    image: catCompressors,
    brand: "Aero Tech",
    category: "Industrial Accessories",
    type: "Spray Guns",
  },
];

export const productCategories = [
  { label: "All Categories", slug: "" },
  { label: "Pneumatic Products", slug: "Pneumatic Products" },
  { label: "Power Tools", slug: "Power Tools" },
  { label: "Welding Equipment", slug: "Welding Equipment" },
  { label: "Valves & Fittings", slug: "Valves & Fittings" },
  { label: "Measuring Instruments", slug: "Measuring Instruments" },
  { label: "Compressors", slug: "Compressors" },
  { label: "Industrial Accessories", slug: "Industrial Accessories" },
  { label: "FRL & Actuators", slug: "FRL & Actuators" },
];

export const productBrands = [
  "Aero Tech", "Bosch", "CDC Pneumatics", "Cumi", "Ferm",
  "Festo", "Fluke", "Janatics", "PBI", "SMC",
  "SS Camlock Coupling", "Techno",
];

export const productTypes = [
  "Abrasives", "Air Preparation", "Compressors", "Cylinders",
  "Drills", "Fittings", "Gauges", "Grinders", "Spray Guns",
  "Test Instruments", "Tubes & Hoses", "Valves", "Welding Machines",
];
