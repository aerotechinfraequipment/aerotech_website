import { useNavigate } from "react-router-dom";
import type { Equipment } from "../../data/equipment/list";

interface EquipmentCardProps {
  item: Equipment;
}

const EquipmentCard = ({ item }: EquipmentCardProps) => {
  const navigate = useNavigate();
  const isAvailable = item.status === "available";

  return (
    <article
      className="eq-card"
      onClick={() => navigate(`/equipment/${item.id}`)}
      role="link"
      tabIndex={0}
      aria-label={`View details for ${item.name}`}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/equipment/${item.id}`)}
    >
      {/* Image */}
      <div className="eq-card__img-wrap">
        <img src={item.image} alt={item.name} loading="lazy" className="eq-card__img" />
        <span className={`eq-card__badge ${isAvailable ? "eq-card__badge--available" : "eq-card__badge--rented"}`}>
          <span className="eq-card__badge-dot" />
          {isAvailable ? "Available" : "Rented"}
        </span>
      </div>

      {/* Body */}
      <div className="eq-card__body">
        {/* Brand */}
        <span className="eq-card__brand">{item.brand}</span>

        {/* Name */}
        <h3 className="eq-card__name">{item.name}</h3>

        {/* Category */}
        <p className="eq-card__category">{item.category_formated}</p>

        {/* Models */}
        {item.models?.length > 0 && (
          <div className="eq-card__models">
            {item.models.map((m) => (
              <span key={m} className="eq-card__model-tag">{m}</span>
            ))}
          </div>
        )}

        {/* Footer CTAs */}
        <div className="eq-card__footer">
          <div className="eq-card__actions">
            <span className="eq-card__btn eq-card__btn--view">
              View Equipment
            </span>
            <a
              href={`https://wa.me/919791890636?text=${encodeURIComponent(
                `Hello AeroTech, I am interested in renting the ${item.name}. Please share availability and pricing.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="eq-card__btn eq-card__btn--quote"
              onClick={(e) => e.stopPropagation()}
            >
              Get Quote
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default EquipmentCard;
