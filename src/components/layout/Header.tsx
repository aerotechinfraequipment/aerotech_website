import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Button from "../ui/Button";
import logo from "../../assets/logo/logo.webp"
import { useBlogs } from "../../lib/catalog";

const baseLinks: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Equipment Rental", to: "/equipment" },
  { label: "Products", to: "/products" },
  { label: "Steel Products", to: "/steel-products" },
];

const Header = () => {
  const { pathname } = useLocation();
  const { data } = useBlogs();
  const topics = data ?? [];
  const navLinks: { label: string; to: string; children?: { label: string; to: string }[] }[] = [
    ...baseLinks,
    {
      label: "Blogs",
      to: "/blogs",
      ...(topics.length
        ? { children: topics.map((blog) => ({ label: blog.menuLabel, to: `/blogs/${blog.slug}` })) }
        : {}),
    },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const mobileOpen = menuPath === pathname;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* Logo */}
        <Link to="/" className="site-header__logo" aria-label="AeroTech Infra Equipment — home">
          <span className="site-header__logo-icon" aria-hidden="true">
            <img src={logo} alt="" width={36} height={36} decoding="async" />
          </span>
          <span className="site-header__logo-text">
            <span className="site-header__logo-main">AEROTECH</span>
            <span className="site-header__logo-sub">Infra Equipment</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="site-header__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <div key={link.to} className={`site-header__nav-item${link.children ? " has-menu" : ""}`}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) => `site-header__nav-link${isActive ? " is-active" : ""}`}
              >
                {link.label}
                {link.children && (
                  <svg className="site-header__chevron" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M5 7.5 10 12.5 15 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                )}
              </NavLink>
              {link.children && (
                <div className="site-header__submenu">
                  <ul aria-label={`${link.label} topics`}>
                    {link.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          className={({ isActive }) => `site-header__submenu-link${isActive ? " is-active" : ""}`}
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuPath(mobileOpen ? null : pathname)}
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
        <div className="site-header__mobile-menu" id="mobile-nav">
          <nav>
            {navLinks.map((link) => (
              <div key={link.to} className="site-header__mobile-group">
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) => `site-header__mobile-link${isActive ? " is-active" : ""}`}
                  onClick={() => setMenuPath(null)}
                >
                  {link.label}
                </NavLink>
                {link.children && (
                  <div className="site-header__mobile-sub">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) => `site-header__mobile-sublink${isActive ? " is-active" : ""}`}
                        onClick={() => setMenuPath(null)}
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button variant="accent" to="/contact#quote" fullWidth>Get a Quote</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;