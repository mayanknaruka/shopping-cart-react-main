import styles from "./styles/App.module.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className={styles.pageWrapper}>
      <Navbar cart={cart} />
      <main className={styles.mainContent}>
        <Outlet context={{ cart, setCart }} />
      </main>
      <footer className={styles.footer}>
        <p>© 2026 Super Store Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
