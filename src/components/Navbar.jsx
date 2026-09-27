import { Link, NavLink } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

export default function Navbar({ cart }) {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <Link to="/" className={styles.brandLogo}>
          <span className={styles.logoAccent}>Super</span>Store
        </Link>
        <nav className={styles.navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="shop"
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.activeLink}` : styles.link
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.cartLink} ${styles.activeLink}`
                : `${styles.link} ${styles.cartLink}`
            }
          >
            <span>Cart</span>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
