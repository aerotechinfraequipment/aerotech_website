import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import EquipmentCard from "../ui/EquipmentCard";
import { useHomeEquipment } from "../../lib/catalog";

const FeaturedEquipment = () => {
  const { data, error, loading } = useHomeEquipment();
  const featured = data ?? [];

  return (
    <section className="featured-equipment">
      <div className="container">
        <SectionHeader
          title="Featured equipment for rent"
          description="Every machine is inspected and maintained to be productive from day one on your site."
        />
        {loading ? (
          <p>Loading equipment…</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="catalogue-grid">
            {featured.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </div>
        )}
        <div className="section-end-link">
          <Link to="/equipment">View all equipment →</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEquipment;
