import styles from "./Card.module.css";

export function Card({
    variant = "default",
    className = "",
    children,
}) {
    return(
        <div className={`${styles.card} ${styles[variant]} ${className}`}>
            {children}
        </div>
    )
}