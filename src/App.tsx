import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import ProductsList from "./pages/ProductsList";
import About from "./pages/About";
// import ComingSoon from "./pages/ComingSoon"; 
import UnderConstruction from "./pages/UnderConstruction";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<UnderConstruction />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;