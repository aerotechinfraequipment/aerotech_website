import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mainlayout">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />

      <main id="main-content" className="main-content" tabIndex={-1}>
        {children}
      </main>

      <Footer />
      <a
        className="wa-fab"
        href="https://wa.me/919791890636?text=Hello%20AeroTech%2C%20I%20have%20an%20enquiry."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with AeroTech on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c4.55 0 8.25 3.7 8.25 8.24 0 2.2-.86 4.28-2.42 5.84a8.19 8.19 0 0 1-5.83 2.41c-1.46 0-2.89-.39-4.14-1.13l-.3-.18-3.08.81.82-3-.2-.31a8.214 8.214 0 0 1-1.26-4.44c0-4.54 3.7-8.24 8.25-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.71 4.3 3.8.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.21-.17-.46-.29" />
        </svg>
      </a>
    </div>
  );
};

export default MainLayout;