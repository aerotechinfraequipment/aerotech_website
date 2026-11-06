import "../styles/pages/_home.scss";
import HeroSection from "../components/home/HeroSection";
import PartnerDivisions from "../components/home/PartnerDivisions";
import FeaturedEquipment from "../components/home/FeaturedEquipment";
import ReliabilitySupport from "../components/home/ReliabilitySupport";
import ProductsInStock from "../components/home/ProductsInStock";
import Sectors from "../components/home/Sectors";
import AboutStats from "../components/home/AboutStats";
import Brands from "../components/home/Brands";
import ContactSection from "../components/home/ContactSection";
import CtaBanner from "../components/home/CtaBanner";
import SEO from "../components/seo/SEO";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://aerotechinfraequipment.com/#website",
  "url": "https://aerotechinfraequipment.com/",
  "name": "AeroTech Infra Equipment",
  "description": "Reliable construction equipment rental and product sales in Tamil Nadu. Hire boom lifts and cranes, or buy tools, steel, and hardware in Sriperumbudur.",
  "publisher": {
    "@id": "https://aerotechinfraequipment.com/#organization"
  }
};

const Home = () => {
  return (
    <>
      <SEO
        title="Construction Equipment Rental & Sales"
        description="Reliable construction equipment rental and product sales in Tamil Nadu. Hire boom lifts and cranes, or buy tools, steel, and hardware in Sriperumbudur."
        canonical="/"
        ogImageAlt="AeroTech share image with a yellow boom lift"
        schema={homeSchema}
      />
      <HeroSection />
      <PartnerDivisions />
      <FeaturedEquipment />
      <ReliabilitySupport />
      <ProductsInStock />
      <Sectors />
      <AboutStats />
      <Brands />
      <ContactSection />
      <CtaBanner />
    </>
  );
};

export default Home;
