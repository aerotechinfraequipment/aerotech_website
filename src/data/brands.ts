export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
}

export const brandsData: Brand[] = [
  { id: "festo", name: "Festo", description: "Pneumatic automation", logo: "/images/brands/festo.svg" },
  { id: "janatics", name: "Janatics", description: "Pneumatic valves & cylinders", logo: "/images/brands/janatics.png" },
  { id: "bosch", name: "Bosch", description: "Professional power tools", logo: "/images/brands/bosch.svg" },
  { id: "fluke", name: "Fluke", description: "Test & measurement instruments", logo: "/images/brands/fluke.svg" },
  { id: "smc", name: "SMC", description: "Pneumatics & air preparation", logo: "/images/brands/smc.svg" },
  { id: "cumi", name: "Cumi", description: "Abrasives & industrial ceramics", logo: "/images/brands/cumi.png" },
];
