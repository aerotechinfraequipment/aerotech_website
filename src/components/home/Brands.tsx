import SectionHeader from "../ui/SectionHeader";
import BrandCard from "../ui/BrandCard";
import { brandsData } from "../../data/brands";

const Brands = () => {
  return (
    <section className="brands-section">
      <div className="container">
        <SectionHeader
          title="Genuine products from leading manufacturers"
          align="center"
        />
        <div className="brands-section__grid">
          {brandsData.map((item) => (
            <BrandCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
