import styles from "./Navbar.module.css";

import { Link } from "react-router-dom";

import { Mountain } from "lucide-react";

export function Navbar() {
  const opcoes = [
    { opcao: "Trilhas", rota: "/trilhas" },
    { opcao: "Cachoeiras", rota: "/cachoeiras" },
    { opcao: "Parques", rota: "/parques" },
    { opcao: "Biodiversidade", rota: "/biodiversidade" },
    { opcao: "Eventos", rota: "/eventos" },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Mountain className={styles.mountainIcon} /> Parques de Teresópolis
      </div>
      <ul className={styles.menu}>
        {opcoes.map((item) => (
          <li key={item.rota} className={styles.menuItem}>
            <Link to={item.rota} className={styles.menuLink}>
              {item.opcao}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
