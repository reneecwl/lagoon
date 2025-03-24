import "./ErrorPage.scss";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-page__container">
        <h1 className="error-page__title">Oops!</h1>
        <h2 className="error-page__subtitle">404 - Page Not Found</h2>
        <p className="error-page__text">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="error-page__button">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
