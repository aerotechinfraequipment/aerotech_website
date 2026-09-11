import boomLift from "../assets/boom-lift.jpg";
import articulatingLift from "../assets/articulating-boom-lift.jpg";
import scissorLift from "../assets/scissor-lift.jpg";
import excavator from "../assets/excavator.jpg";
import sanyCrane from "../assets/sany-crane.jpg";

export interface Equipment {
  id: string;
  name: string;
  slug: string;
  image: string;
  status: "available" | "rented";
  category: string;
  description: string;
  rentalType: string;
}

export const equipmentData: Equipment[] = [
  {
    id: "boom-lift",
    name: "Boom Lift",
    slug: "boom-lift",
    image: boomLift,
    status: "available",
    category: "Access Equipment",
    description: "Telescopic boom lift for safe, efficient work at height on construction, maintenance and installation jobs.",
    rentalType: "Daily & Monthly Rental",
  },
  {
    id: "articulating-boom-lift",
    name: "Articulating Boom Lift",
    slug: "articulating-boom-lift",
    image: articulatingLift,
    status: "available",
    category: "Access Equipment",
    description: "Knuckle-boom access platform that reaches up, over and around obstacles in congested work areas.",
    rentalType: "Daily & Monthly Rental",
  },
  {
    id: "scissor-lift",
    name: "Scissor Lift",
    slug: "scissor-lift",
    image: scissorLift,
    status: "rented",
    category: "Access Equipment",
    description: "Electric scissor lift providing a stable, spacious platform for vertical work in warehouses and buildings.",
    rentalType: "Daily & Monthly Rental",
  },
  {
    id: "excavator",
    name: "Excavator",
    slug: "excavator",
    image: excavator,
    status: "available",
    category: "Earthmoving",
    description: "Heavy-duty excavator for digging, grading, trenching and demolition work on any terrain.",
    rentalType: "Daily & Monthly Rental",
  },
  {
    id: "sany-crane",
    name: "SANY Crane",
    slug: "sany-crane",
    image: sanyCrane,
    status: "available",
    category: "Lifting Equipment",
    description: "Mobile crane for heavy lifting, structural erection and material handling on large-scale projects.",
    rentalType: "Daily & Monthly Rental",
  },
];
