import SectionHeader from "../ui/SectionHeader";
import IndustryCard from "../ui/IndustryCard";
import { industriesData } from "../../data/industries";

const Sectors = () => {
  const featured = industriesData.slice(0, 3);

  return (
    <section className="sectors">
      <div className="container">
        <SectionHeader
          subtitle="Industries"
          title="Serving projects across sectors"
          description="From construction sites to factory floors, our equipment and products support the industries that build and maintain Tamil Nadu."
        />
        <div className="sectors__grid">
          {featured.map((item) => (
            <IndustryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sectors;
