import SectionHeader from "../ui/SectionHeader";
import EquipmentCard from "../ui/EquipmentCard";
import { equipmentData } from "../../data/equipment";

const FeaturedEquipment = () => {
  const featured = equipmentData.slice(0, 3);

  return (
    <section className="featured-equipment">
      <div className="container">
        <SectionHeader
          subtitle="Rental Fleet"
          title="Featured equipment for rent"
          description="Every machine is inspected and maintained to be productive from day one on your site."
          linkText="View all equipment →"
          linkTo="/equipment"
        />
        <div className="featured-equipment__grid">
          {featured.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEquipment;
