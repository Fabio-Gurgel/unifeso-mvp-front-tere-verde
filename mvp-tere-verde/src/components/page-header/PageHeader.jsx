import styles from "./PageHeader.module.css";

export function PageHeader({ title, subtitle}) {
    return(
        <header className={styles.header}>
            <h1 className={styles.pageTitle}>
                {title}
            </h1>
            <h2 className={styles.pageSubtitle}>
                {subtitle}
            </h2>
        </header>
    )
}