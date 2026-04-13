import styles from "./Button.module.css";

export function Button({
  variant = "default",
  shape = "rounded",
  className = "",
  children,
}) {
  return (
    <button id="button" className={`${styles.button} ${styles[variant]} ${styles[shape]} ${className}`}>
      {children}
    </button>
  );
}
