import styles from "./ParkCard.module.css";

import { Card } from "../card/Card";
import { Button } from "../../button/Button";

export function ParkCard({ park, onExplore }) {
  const image =
    park.fotos_urls && park.fotos_urls.length > 0
      ? park.fotos_urls[0]
      : "/placeholder.jpg";

  return (
    <Card className={styles.card}>
      <div className={styles.wrapper}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={`Imagem do parque ${park.nome}`}
        />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{park.nome}</h1>
        <ul className={styles.meta}>
          <li>Área: {park.area_total_ha} ha</li>
          <li>Acesso: {formatDifficulty(park.dificuldade_acesso)}</li>
          <li>Altitude: {park.altitude_max_m} m</li>
        </ul>
        <Button shape="pill" className={styles.button} onClick={onExplore}>
          Explorar
        </Button>
      </div>
    </Card>
  );
}

function formatDifficulty(valor) {
  return valor.charAt(0) + valor.slice(1).toLowerCase();
}
