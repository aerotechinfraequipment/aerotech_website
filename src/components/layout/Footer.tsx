import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        {/* Brand column */}
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label="AeroTech Infra Equipment — home">
            <span className="site-header__logo-icon" aria-hidden="true">
              <img src={logo} alt="AeroTech Infra Equipment logo" width={500} height={500} />
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
            <a
              href="https://wa.me/919791890636"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="site-footer__social-link"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.55 0 8.25 3.7 8.25 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 0 1-5.83 2.41c-1.46 0-2.89-.39-4.14-1.13l-.3-.18-3.08.81.82-3-.2-.31a8.214 8.214 0 0 1-1.26-4.44c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.21-.17-.46-.29" />
              </svg>
            </a>
          </div>
        </div>

        {/* Equipment links */}
        <nav aria-label="Equipment rental links">
          <h3 className="site-footer__heading">Equipment Rental</h3>
          <ul className="site-footer__links">
            <li><Link to="/equipment">All Rental Fleet</Link></li>
            <li><Link to="/equipment">Boom Lifts (Telescopic &amp; Articulating)</Link></li>
            <li><Link to="/equipment">Scissor Lifts (Rough Terrain)</Link></li>
            <li><Link to="/equipment">Excavators &amp; Earthmoving</Link></li>
            <li><Link to="/equipment">All-Terrain &amp; Truck Cranes</Link></li>
          </ul>
        </nav>

        {/* Product links */}
        <nav aria-label="Product links">
          <h3 className="site-footer__heading">Products &amp; Materials</h3>
          <ul className="site-footer__links">
            <li><Link to="/products">All Industrial Products</Link></li>
            <li><Link to="/products">Welding Equipment &amp; Electrodes</Link></li>
            <li><Link to="/products">Power Tools &amp; Cut-Off Wheels</Link></li>
            <li><Link to="/products">Safety &amp; PPE Equipment</Link></li>
            <li><Link to="/steel-products">Steel Pipes, Channels &amp; Beams</Link></li>
            <li><Link to="/steel-products">Roofing Sheets &amp; Mesh</Link></li>
          </ul>
        </nav>

        {/* Company links */}
        <nav aria-label="Company links">
          <h3 className="site-footer__heading">Company</h3>
          <ul className="site-footer__links">
            <li><Link to="/about">About AeroTech</Link></li>
            <li><Link to="/equipment">Rental Services</Link></li>
            <li><Link to="/products">Product Sales</Link></li>
            <li><Link to="/contact">Contact &amp; Enquiry</Link></li>
            <li><Link to="/contact#quote">Get a Quote</Link></li>
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
            <li>SF No.135/4G2, Chennai Salai, Thirumangalam, Sriperumbudur, Tamil Nadu 602 106</li>
            <li style={{ fontSize: "0.8rem", color: "var(--steel)" }}>GSTIN: 33ABFCA6529D1ZY</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} AeroTech Infra Equipment Private Limited. All rights reserved.</p>
          <div className="site-footer__legal">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
