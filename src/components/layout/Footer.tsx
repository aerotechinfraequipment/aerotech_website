import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png"


const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        {/* Brand column */}
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label="AeroTech Infra Equipment — home">
            {/* <span className="site-footer__logo-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2 3 10v12h6v-7h6v7h6V10L12 2zm0 2.8 7 6V20h-2v-7H7v7H5v-9.2l7-6z" />
              </svg>
            </span> */}
          <span className="site-header__logo-icon" aria-hidden="true">
            <img src={logo} alt="AeroTech Infra Equipment" />
          </span>
            <span className="site-footer__logo-text">
              <span className="site-footer__logo-main">AEROTECH</span>
              <span className="site-footer__logo-sub">Infra Equipment</span>
            </span>
          </Link>
          <p className="site-footer__desc">
            Construction equipment rental and industrial hardware solutions for demanding projects across Tamil Nadu.
          </p>
          <div className="site-footer__social">
            <a href="#" aria-label="Facebook" className="site-footer__social-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.6-.1-1.4-.2-2.2-.2-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7h3z" /></svg>
            </a>
            <a href="#" aria-label="Instagram" className="site-footer__social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="site-footer__social-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5v12H3.44v-12h3.5zM5.2 3a2 2 0 1 1 0 4.1 2 2 0 0 1 0-4.1zM10.6 8.5h3.4v1.6h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.8h-3.5v-6.03c0-1.44-.03-3.3-2-3.3-2 0-2.31 1.57-2.31 3.19v6.14h-3.5v-12z" /></svg>
            </a>
          </div>
        </div>

        {/* Equipment links */}
        <nav aria-label="Equipment rental links">
          <h3 className="site-footer__heading">Equipment Rental</h3>
          <ul className="site-footer__links">
            <li><Link to="/equipment/boom-lift">Boom Lift</Link></li>
            <li><Link to="/equipment/articulating-boom-lift">Articulating Boom Lift</Link></li>
            <li><Link to="/equipment/scissor-lift">Scissor Lift</Link></li>
            <li><Link to="/equipment/excavator">Excavator</Link></li>
            <li><Link to="/equipment/sany-crane">SANY Crane</Link></li>
          </ul>
        </nav>

        {/* Product links */}
        <nav aria-label="Product links">
          <h3 className="site-footer__heading">Products</h3>
          <ul className="site-footer__links">
            <li><Link to="/products?category=pneumatic">Pneumatic Products</Link></li>
            <li><Link to="/products?category=power-tools">Power Tools</Link></li>
            <li><Link to="/products?category=welding">Welding Equipment</Link></li>
            <li><Link to="/products?category=valves-fittings">Valves &amp; Fittings</Link></li>
            <li><Link to="/products?category=measuring-instruments">Measuring Instruments</Link></li>
            <li><Link to="/products?category=compressors">Compressors</Link></li>
          </ul>
        </nav>

        {/* Company links */}
        <nav aria-label="Company links">
          <h3 className="site-footer__heading">Company</h3>
          <ul className="site-footer__links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/industries">Industries</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/brands">Brands</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        {/* Contact column */}
        <div>
          <h3 className="site-footer__heading">Get In Touch</h3>
          <ul className="site-footer__contact">
            <li>
              <a href="tel:+919791890636">97918 90636</a>
            </li>
            <li>
              <a href="mailto:aerotech2003@gmail.com">aerotech2003@gmail.com</a>
            </li>
            <li>Sriperumbudur, Tamil Nadu</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} AeroTech Infra Equipment Pvt Ltd. All rights reserved.</p>
          <div className="site-footer__legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;