import indConstruction from "../assets/ind-construction.jpg";
import indInfrastructure from "../assets/ind-infrastructure.jpg";
import indManufacturing from "../assets/ind-manufacturing.jpg";
import indMaintenance from "../assets/ind-maintenance.jpg";
import indWarehousing from "../assets/ind-warehousing.jpg";
import indEngineering from "../assets/ind-engineering.jpg";

export interface Industry {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export const industriesData: Industry[] = [
  {
    id: "construction",
    name: "Construction",
    slug: "construction",
    image: indConstruction,
    description: "Access equipment, lifting and tools for residential, commercial and industrial building projects.",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    slug: "infrastructure",
    image: indInfrastructure,
    description: "Cranes, excavators and hardware for roads, bridges and utility projects.",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    slug: "manufacturing",
    image: indManufacturing,
    description: "Pneumatics, FRL units and power tools that keep production lines running.",
  },
  {
    id: "maintenance",
    name: "Maintenance & Facilities",
    slug: "maintenance",
    image: indMaintenance,
    description: "Equipment and tools for building maintenance, cleaning and facility management.",
  },
  {
    id: "warehousing",
    name: "Warehousing & Logistics",
    slug: "warehousing",
    image: indWarehousing,
    description: "Scissor lifts, forklifts and material handling tools for warehouses and distribution centres.",
  },
  {
    id: "engineering",
    name: "Engineering Services",
    slug: "engineering",
    image: indEngineering,
    description: "Measuring instruments, welding equipment and precision tools for engineering workshops.",
  },
];
