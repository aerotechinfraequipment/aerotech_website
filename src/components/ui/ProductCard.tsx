import { Link } from "react-router-dom";
import Button from "./Button";
import type { Product } from "../../data/products";

interface ProductCardProps {
  item: Product;
}

const PLACEHOLDER = "/images/product-placeholder.png";

const ProductCard = ({ item }: ProductCardProps) => {
  // Determine product image path: prefer explicit image, or convention /images/products/<slug>.jpg
  const imageSrc = item.image || item.thumbnail || `/images/products/${item.slug}.jpg`;

  return (
    <article className="product-card">
      <Link
        to={`/products/${item.slug}`}
        className="product-card__image"
        aria-label={`View ${item.name} details`}
      >
        <img
          src={imageSrc}
          alt={`${item.name} by ${item.brand}`}
          width={850}
          height={850}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes("product-placeholder.png")) {
              target.src = PLACEHOLDER;
            }
          }}
        />
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
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
