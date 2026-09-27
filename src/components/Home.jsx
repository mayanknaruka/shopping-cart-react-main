import { Link } from "react-router-dom";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <section className={styles.heroSection}>
        <span className={styles.tagline}>Curated Collections 2026</span>
        <h1 className={styles.heroTitle}>
          Elevate Your Daily <br /> Lifestyle Essentials
        </h1>
        <p className={styles.heroSubtitle}>
          Discover carefully selected apparel, precision electronics, and
          premium goods designed for modern life.
        </p>
        <div className={styles.ctaGroup}>
          <Link to="shop" className={styles.primaryBtn}>
            Explore Products
          </Link>
          <Link to="cart" className={styles.secondaryBtn}>
            View Cart
          </Link>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <div className={styles.featureCard}>
          <h3>Fast Delivery</h3>
          <p>Worldwide insured shipping directly to your doorstep.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>Verified Quality</h3>
          <p>Hand-picked, high standard catalog from verified makers.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>Hassle-Free Returns</h3>
          <p>30-day money-back guarantee with straightforward support.</p>
        </div>
      </section>
    </div>
  );
}
