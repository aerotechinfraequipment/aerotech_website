import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import logo from "../../assets/logo/logo.png"

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Equipment Rental", to: "/equipment" },
  { label: "Products", to: "/products" },
  // { label: "Industries", to: "/industries" },
  // { label: "Projects", to: "/projects" },
  // { label: "Brands", to: "/brands" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* Logo */}
        <Link to="/" className="site-header__logo" aria-label="AeroTech Infra Equipment — home">
          <span className="site-header__logo-icon" aria-hidden="true">
            <img src={logo} alt="AeroTech Infra Equipment" />
          </span>
          <span className="site-header__logo-text">
            <span className="site-header__logo-main">AEROTECH</span>
            <span className="site-header__logo-sub">Infra Equipment</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="site-header__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="site-header__nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="site-header__cta">
          <Button variant="accent" to="/contact#quote">Get a Quote</Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="site-header__hamburger"
          aria-expanded={mobileOpen}
          aria-label="Open menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="site-header__mobile-menu">
          <nav>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="site-header__mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="accent" to="/contact#quote" fullWidth>Get a Quote</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;