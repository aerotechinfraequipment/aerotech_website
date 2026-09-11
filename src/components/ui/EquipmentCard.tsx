import { Link } from "react-router-dom";
import Button from "./Button";
import type { Equipment } from "../../data/equipment";

interface EquipmentCardProps {
  item: Equipment;
}

const EquipmentCard = ({ item }: EquipmentCardProps) => {
  const isAvailable = item.status === "available";

  return (
    <article className="equipment-card">
      <Link
        to={`/equipment/${item.slug}`}
        className="equipment-card__image"
        aria-label={`View ${item.name}`}
      >
        <img src={item.image} alt={item.name} loading="lazy" />
        <div className="equipment-card__badge">
          <span
            className={`badge ${isAvailable ? "badge--available" : "badge--rented"}`}
          >
            <span className="badge__dot" />
            <span>{isAvailable ? "Available" : "Currently Rented"}</span>
          </span>
        </div>
      </Link>

      <div className="equipment-card__body">
        <p className="equipment-card__category">{item.category}</p>
        <h3 className="equipment-card__name">
          <Link to={`/equipment/${item.slug}`}>{item.name}</Link>
        </h3>
        <p className="equipment-card__desc">{item.description}</p>
        <p className="equipment-card__rental-type">{item.rentalType}</p>
        <div className="equipment-card__actions">
          <Button variant="dark" to={`/equipment/${item.slug}`}>View Equipment</Button>
          <Button
            variant="accent"
            href={`https://wa.me/919791890636?text=${encodeURIComponent(`Hello AeroTech, I am interested in renting ${item.name}. Please share availability and rental pricing.`)}`}
            external
          >
            Get Quote
          </Button>
        </div>
      </div>
    </article>
  );
};

export default EquipmentCard;
