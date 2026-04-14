import styles from "./ParkCard.module.css";

import { Card } from "../card/Card";

export function ParkCard({ park }) {
  return (
    <Card className={styles.card}>
      <div className={styles.image}>
        style={{ backgroundImage: `url(${park.fotos_urls?.[0]})` }}
      </div>
      <div className={styles.info}>
        <h3>{park.nome}</h3>
        <p>{park.localizacao}</p>
        <span>{park.area_total_ha} ha</span>
      </div>
    </Card>
  );
}
