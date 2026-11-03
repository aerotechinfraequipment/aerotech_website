import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import NotFound from "./pages/NotFound";

// Code-split pages on route demand
const Home = lazy(() => import("./pages/Home"));
const EquipmentRental = lazy(() => import("./pages/EquipmentRental"));
const EquipmentDetail = lazy(() => import("./pages/EquipmentDetail"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const SteelProducts = lazy(() => import("./pages/SteelProducts"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

// Automatically scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

// Accessible loading fallback
function PageFallback() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        color: "var(--muted-foreground)",
        fontSize: "1rem",
        fontWeight: 600,
      }}
      role="status"
      aria-live="polite"
    >
      <span>Loading AeroTech…</span>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainLayout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipment" element={<EquipmentRental />} />
            <Route path="/equipment/:id" element={<EquipmentDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/steel-products" element={<SteelProducts />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
