import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../ui/ProductCard";
import featuredProducts from "../../data/products/home-featured.json";
import type { Product } from "../../data/products";

const featured = featuredProducts as Product[];

const ProductsInStock = () => {

  return (
    <section className="products-section">
      <div className="container">
        <SectionHeader
          title="Industrial products in stock"
          description="Pneumatics, power tools, welding, valves and more — available for businesses and individual buyers."
        />

        <div className="catalogue-grid">
          {featured.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
        <div className="section-end-link">
          <Link to="/products">View all products →</Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsInStock;
