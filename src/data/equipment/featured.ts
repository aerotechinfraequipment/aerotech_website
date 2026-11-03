import type { Equipment } from "./list";
import s65TelescopicBoomLift from "../../assets/images/S-65 Telescopic Boom Lift.jpg";
import lift600AJArticulatedBoomLift from "../../assets/images/600AJ Articulated Boom Lift.webp";
import gs4069RTScissorLift from "../../assets/images/GS-4069 RT Rough Terrain Scissor Lift.jpg";
import sy870HExcavator from "../../assets/images/SY870H Large excavator.webp";
import stc250T5TruckCrane from "../../assets/images/STC250T5 25T Truck Crane.webp";

export const featuredEquipments: Equipment[] = [
  {
    id: "genie-boom-lift-s65",
    name: "S-65 Telescopic Boom Lift",
    image: s65TelescopicBoomLift,
    brand: "Genie",
    category: "boom-lift",
    category_formated: "Boom Lift",
    description:
      "Genie® S®-65 telescopic boom lift can perform a wider range of heavier lift tasks on construction and industrial jobsites thanks to their dual lift capacity and offer innovative features to help increase jobsite efficiency.",
    rentalType: "Daily, Weekly & Monthly Rental",
    status: "available",
    models: ["S-65 XC", "S-65 TraX", "S-65 HF"],
    can_show_in_home: true,
  },
  {
    id: "jlg-articulated-boom-lift-600aj",
    name: "600AJ Articulated Boom Lift",
    image: lift600AJArticulatedBoomLift,
    brand: "JLG",
    category: "articulated-boom-lift",
    category_formated: "Articulated Boom Lift",
    description:
      "The 600 Series features a narrow chassis option for access to confined areas and the industry's best work envelope. A standard oscillating axle and optional four-wheel drive give you outstanding drive performance on rough terrain.",
    rentalType: "Daily, Weekly & Monthly Rental",
    status: "available",
    models: [],
    can_show_in_home: true,
  },
  {
    id: "genie-scissor-lift-gs4069rt",
    name: "GS-4069 RT Rough Terrain Scissor Lift",
    image: gs4069RTScissorLift,
    brand: "Genie",
    category: "scissor-lift",
    category_formated: "Scissor Lift",
    description:
      "The Genie® GS™-4069 RT rough terrain scissor lift is the only 40 ft full-drive-height unit in its class, offering up to 40% gradeability. Its four-wheel drive and active oscillating axle make it ideal for the most demanding outdoor construction sites.",
    rentalType: "Daily, Weekly & Monthly Rental",
    status: "available",
    models: ["GS-4069 RT", "GS-4069 DC"],
    can_show_in_home: true,
  },
  {
    id: "sany-excavator-sy870h",
    name: "SY870H Large excavator",
    image: sy870HExcavator,
    brand: "Sany",
    category: "excavator",
    category_formated: "Excavator",
    description:
      "More than 20 kinds of optional working devices, good engine protection with a multi-stage reinforced fuel filter system. Much more convenient maintenance operation, durable oil and filters to reach more extended maintenance period and 50% less expense. The longest designed lifetime can reach 25000 hours, 30% longer than previous models. Adopt optimized engine, pump, and valve matching technology to improve energy transfer efficiency, lower fuel consumption, and achieve higher efficiency.",
    rentalType: "Daily, Weekly & Monthly Rental",
    status: "available",
    models: [],
    can_show_in_home: true,
  },
  {
    id: "sany-crane-stc250t5",
    name: "STC250T5 25T Truck Crane",
    image: stc250T5TruckCrane,
    brand: "Sany",
    category: "crane",
    category_formated: "Crane",
    description:
      "More than 20 kinds of optional working devices, good engine protection with a multi-stage reinforced fuel filter system. The longest designed lifetime can reach 25000 hours, 30% longer than previous models. Much more convenient maintenance operation, durable oil and filters to reach more extended maintenance period and 50% less expense. Adopt optimized engine, pump, and valve matching technology to improve energy transfer efficiency, lower fuel consumption, and achieve higher efficiency.",
    rentalType: "Daily, Weekly & Monthly Rental",
    status: "available",
    models: [],
    can_show_in_home: true,
  },
];

const featuredById = Object.fromEntries(
  featuredEquipments.map((item) => [item.id, item]),
);

export function featuredEquipment(id: string): Equipment {
  const item = featuredById[id];
  if (!item) {
    throw new Error(`Missing featured equipment: ${id}`);
  }
  return item;
}
