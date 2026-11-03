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
  "@id": "https://aerotechinfra.com/#website",
  "url": "https://aerotechinfra.com/",
  "name": "AeroTech Infra Equipment",
  "description": "Construction equipment rental & industrial products counter in Sriperumbudur, Tamil Nadu.",
  "publisher": {
    "@id": "https://aerotechinfra.com/#organization"
  }
};

const Home = () => {
  return (
    <>
      <SEO
        title="Construction Equipment Rental & Industrial Products | AeroTech Infra Equipment"
        description="AeroTech Infra Equipment — boom lifts, scissor lifts, excavators, and cranes for daily or monthly rental, plus genuine pneumatics, power tools, steel, and industrial hardware in Sriperumbudur, Tamil Nadu."
        canonical="/"
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
