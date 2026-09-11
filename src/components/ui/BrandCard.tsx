import type { Brand } from "../../data/brands";

interface BrandCardProps {
  item: Brand;
}

const BrandCard = ({ item }: BrandCardProps) => {
  return (
    <div className="brand-card">
      <span className="brand-card__name">{item.name}</span>
      <span className="brand-card__desc">{item.description}</span>
    </div>
  );
};

export default BrandCard;
