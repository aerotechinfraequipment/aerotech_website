import type { Brand } from "../../data/brands";

interface BrandCardProps {
  item: Brand;
}

const BrandCard = ({ item }: BrandCardProps) => {
  return (
    <div className="brand-card">
      <img
        className="brand-card__logo"
        src={item.logo}
        alt={`${item.name} logo`}
      />
    </div>
  );
};

export default BrandCard;
