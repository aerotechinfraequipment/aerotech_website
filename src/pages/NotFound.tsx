import { Link } from "react-router-dom";
import SEO from "../components/seo/SEO";

const NotFound = () => {
  return (
    <>
      <SEO
        title="Page not found"
        description="The page you requested is not on the AeroTech Infra Equipment site."
        noindex
      />
      <section className="not-found" aria-labelledby="not-found-title">
        <div className="container">
          <p className="not-found__code">404</p>
          <h1 id="not-found-title">Page Not Found</h1>
          <p>That address does not match a page on this site.</p>
          <nav aria-label="Helpful links">
            <Link to="/">Home</Link>
            <Link to="/equipment">Equipment rental</Link>
            <Link to="/products">Products</Link>
            <Link to="/steel-products">Steel products</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </section>
    </>
  );
};

export default NotFound;
