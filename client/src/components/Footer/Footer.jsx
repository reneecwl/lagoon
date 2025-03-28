import "./Footer.scss";
import logo from "../../assets/logo/lagoon-white-logo.png";

export default function Footer({ handleNavigation }) {
  return (
    <>
      <footer className="footer">
        <div className="footer__main">
          <div className="footer__logo-container" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src={logo} alt="logo" className="footer__logo" />
            <h1 className="footer__title">Lagoon</h1>
          </div>
          <div className="footer__content">
            <h5 className="footer__subtitle" onClick={() => handleNavigation("about")}>
              About Us
            </h5>
            <h5 className="footer__subtitle" onClick={() => handleNavigation("discover")}>
              Explore
            </h5>
            <a
              href="mailto:lagoon.planner@gmail.com"
              target="_blank"
              className="footer__subtitle"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="footer__terms">
          <p className="terms__details">© 2025 Lagoon Ltd </p>
          <p className="terms__details">Terms of Use</p>
          <p className="terms__details">Privacy Policy</p>
          <p className="terms__details">Cookies</p>
          <p className="terms__details terms__tico">Ontario - TICO Registration No.T1543994</p>
        </div>
      </footer>
    </>
  );
}
