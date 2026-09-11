import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import EquipmentRental from "./pages/EquipmentRental";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
// import ComingSoon from "./pages/ComingSoon"; 
// import UnderConstruction from "./pages/UnderConstruction";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<EquipmentRental />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;