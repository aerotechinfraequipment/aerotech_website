import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import BrandCard from "../ui/BrandCard";
import { brandsData } from "../../data/brands";

const Brands = () => {
  return (
    <section className="brands-section">
      <div className="container">
        <SectionHeader
          subtitle="Brands We Carry"
          title="Genuine products from leading manufacturers"
          align="center"
        />
        <div className="brands-section__grid">
          {brandsData.map((item) => (
            <BrandCard key={item.id} item={item} />
          ))}
        </div>
        {/* <div className="brands-section__cta">
          <Link to="/brands" className="section-header__link">See all brands →</Link>
        </div> */}
      </div>
    </section>
  );
};

export default Brands;
