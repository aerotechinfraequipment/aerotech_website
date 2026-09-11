export interface Brand {
  id: string;
  name: string;
  description: string;
}

export const brandsData: Brand[] = [
  { id: "festo", name: "Festo", description: "Pneumatic automation" },
  { id: "janatics", name: "Janatics", description: "Pneumatic valves & cylinders" },
  { id: "bosch", name: "Bosch", description: "Professional power tools" },
  { id: "fluke", name: "Fluke", description: "Test & measurement instruments" },
  { id: "smc", name: "SMC", description: "Pneumatics & air preparation" },
  { id: "cumi", name: "Cumi", description: "Abrasives & industrial ceramics" },
];
