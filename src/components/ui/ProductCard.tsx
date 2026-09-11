import { Link } from "react-router-dom";
import Button from "./Button";
import type { Product } from "../../data/products";

interface ProductCardProps {
  item: Product;
}

const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <article className="product-card">
      <Link
        to={`/products/${item.slug}`}
        className="product-card__image"
        aria-label={`View ${item.name}`}
      >
        <img src={item.image} alt={item.name} loading="lazy" />
      </Link>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__brand">{item.brand}</span>
          <span className="product-card__category">{item.category}</span>
        </div>
        <h3 className="product-card__name">
          <Link to={`/products/${item.slug}`}>{item.name}</Link>
        </h3>
        <div className="product-card__actions">
          <Button variant="dark" to={`/products/${item.slug}`}>View Product</Button>
          <Button
            variant="outline-dark"
            href={`https://wa.me/919791890636?text=${encodeURIComponent(`Hello AeroTech, I am interested in ${item.name}. Please share price and availability.`)}`}
            external
          >
            Enquire Now
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
