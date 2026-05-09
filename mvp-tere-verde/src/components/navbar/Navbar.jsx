import styles from "./Navbar.module.css";

import { useState } from "react";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import { Mountain, Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const menu = [
    { opcao: "Trilhas", rota: "/trilhas" },
    { opcao: "Cachoeiras", rota: "/cachoeiras" },
    { opcao: "Parques", rota: "/parques" },
    { opcao: "Biodiversidade", rota: "/biodiversidade" },
    { opcao: "Eventos", rota: "/eventos" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to={"/"} className={styles.logo}>
          <Mountain className={styles.mountainIcon} /> Parques de Teresópolis
        </Link>
      </div>

      <Button onClick={() => setOpen(!open)} className={styles.mobileMenu}>
        {open ? <X /> : <Menu />}
      </Button>
      <ul className={`${styles.menu} ${open ? styles.active : ""}`}>
        {menu.map((item) => (
          <li key={item.rota} className={styles.menuItem}>
            <Link
              to={item.rota}
              className={styles.menuLink}
              onClick={() => setOpen(false)}
            >
              {item.opcao}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
