import { Link } from "react-router-dom";
import styles from "../styles/ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <div className={styles.errorContainer}>
      <span className={styles.statusCode}>404</span>
      <h1 className={styles.errorHeading}>Page Not Found</h1>
      <p className={styles.errorText}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className={styles.homeLink}>
        Return to Home
      </Link>
    </div>
  );
}
