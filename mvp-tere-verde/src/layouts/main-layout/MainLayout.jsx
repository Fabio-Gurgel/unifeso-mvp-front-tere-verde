import styles from "./MainLayout.module.css";

import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";

export function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className={styles.container}>
      <div className={`${styles.background} ${!isHome ? styles.blur : ""}`} />
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
