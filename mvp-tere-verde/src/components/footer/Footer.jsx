import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.text}>
        © 2026 Parques de Teresópolis. Projeto desenvolvido para facilitar o
        acesso a informações sobre os parques naturais da região.
      </span>
    </footer>
  );
}
