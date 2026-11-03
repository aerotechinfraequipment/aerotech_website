import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import EquipmentCard from "../ui/EquipmentCard";
import { featuredEquipments } from "../../data/equipment/featured";
import { equipments } from "../../data/equipment/list";

const extra = equipments.find((item) => item.id === "genie-scissor-lift-gs5390rt");
const featured = extra ? [...featuredEquipments, extra] : featuredEquipments;

const FeaturedEquipment = () => {
  return (
    <section className="featured-equipment">
      <div className="container">
        <SectionHeader
          title="Featured equipment for rent"
          description="Every machine is inspected and maintained to be productive from day one on your site."
        />
        <div className="catalogue-grid">
          {featured.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
        <div className="section-end-link">
          <Link to="/equipment">View all equipment →</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEquipment;
