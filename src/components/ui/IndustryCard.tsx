import type { Industry } from "../../data/industries";

interface IndustryCardProps {
  item: Industry;
}

const IndustryCard = ({ item }: IndustryCardProps) => {
  return (
    <article className="industry-card">
      <img src={item.image} alt={item.name} loading="lazy" />
      <div className="industry-card__overlay" />
      <div className="industry-card__content">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </div>
    </article>
  );
};

export default IndustryCard;
