import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../ui/ProductCard";
import { useHomeProducts } from "../../lib/catalog";

const ProductsInStock = () => {
  const { data, error, loading } = useHomeProducts();
  const featured = data ?? [];

  return (
    <section className="products-section">
      <div className="container">
        <SectionHeader
          title="Industrial products in stock"
          description="Pneumatics, power tools, welding, valves and more — available for businesses and individual buyers."
        />

        {loading ? (
          <p>Loading products…</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="catalogue-grid">
            {featured.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
        <div className="section-end-link">
          <Link to="/products">View all products →</Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsInStock;
