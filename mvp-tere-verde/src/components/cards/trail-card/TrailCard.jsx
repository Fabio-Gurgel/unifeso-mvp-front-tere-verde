import styles from "./TrailCard.module.css";

import { Card } from "../card/Card";
import { Button } from "../../button/Button";

export function TrailCard({ trail }) {
  const image = "/placeholder.jpg";
    //trail.fotos_urls && trail.fotos_urls.length > 0
      //? trail.fotos_urls[0]
      //: "/placeholder.jpg";

  return (
    <Card className={styles.card}>
      <div className={styles.wrapper}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={`Imagem da trilha ${trail.nome}`}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{trail.nome}</h3>
        <p className={styles.meta}>
          Dificuldade: {formatDifficulty(trail.dificuldade)} &bull; Distância: {trail.distancia_total_m / 1000} km
        </p>
        <Button shape="pill" className={styles.button}>
          Explorar
        </Button>
      </div>
    </Card>
  );
}

function formatDifficulty(value) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}