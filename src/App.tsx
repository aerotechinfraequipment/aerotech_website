import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import EquipmentRental from "./pages/EquipmentRental";
import EquipmentDetail from "./pages/EquipmentDetail";
import Products from "./pages/Products";
import SteelProducts from "./pages/SteelProducts";
import About from "./pages/About";
import Contact from "./pages/Contact";


function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<EquipmentRental />} />
          <Route path="/equipment/:id" element={<EquipmentDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/steel-products" element={<SteelProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;