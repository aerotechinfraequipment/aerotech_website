import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mainlayout">
      <Header />

      <main className="main-content">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;