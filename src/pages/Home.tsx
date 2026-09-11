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

const Home = () => {
  return (
    <>
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