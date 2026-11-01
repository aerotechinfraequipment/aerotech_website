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
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://aerotechinfra.com/#website",
      "url": "https://aerotechinfra.com/",
      "name": "AeroTech Infra Equipment",
      "description": "Construction equipment rental & industrial products counter in Sriperumbudur, Tamil Nadu.",
      "publisher": {
        "@id": "https://aerotechinfra.com/#organization"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://aerotechinfra.com/#organization",
      "name": "AeroTech Infra Equipment Private Limited",
      "url": "https://aerotechinfra.com",
      "logo": "https://aerotechinfra.com/android-chrome-512x512.png",
      "image": "https://aerotechinfra.com/android-chrome-512x512.png",
      "telephone": "+919791890636",
      "email": "aerotech2003@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "SF No.135/4G2, Chennai Salai, Thirumangalam",
        "addressLocality": "Sriperumbudur",
        "addressRegion": "Tamil Nadu",
        "postalCode": "602106",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 12.9675,
        "longitude": 79.9406
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Rental & Sales Fleet",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Heavy Equipment Rental",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Boom Lift Rental" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Scissor Lift Rental" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Excavator Rental" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "All-Terrain Crane Rental" } }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Industrial Supplies & Hardware",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Welding Equipment & Consumables" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Power Tools & Cutting Wheels" } },
              { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Structural Steel Sections" } }
            ]
          }
        ]
      }
    }
  ]
};

const Home = () => {
  return (
    <>
      <SEO
        title="Construction Equipment Rental & Industrial Products | AeroTech Infra Equipment"
        description="AeroTech Infra Equipment — boom lifts, scissor lifts, excavators, and cranes for daily or monthly rental, plus genuine pneumatics, power tools, steel, and industrial hardware in Sriperumbudur, Tamil Nadu."
        canonical="/"
        keywords="construction equipment rental, boom lift hire Sriperumbudur, scissor lift rental Chennai, industrial tools Tamil Nadu, excavator hire, crane rental"
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
