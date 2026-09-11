import { Link } from "react-router-dom";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../ui/ProductCard";
import { productsData, productCategories } from "../../data/products";

const ProductsInStock = () => {
  const featured = productsData.slice(0, 4);

  return (
    <section className="products-section">
      <div className="container">
        <SectionHeader
          subtitle="Product Catalogue"
          title="Industrial products in stock"
          description="Pneumatics, power tools, welding, valves and more — available for businesses and individual buyers."
          linkText="View full catalogue →"
          linkTo="/products"
        />

        <div className="products-section__tags">
          {productCategories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="tag-pill"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <div className="products-section__grid">
          {featured.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsInStock;
