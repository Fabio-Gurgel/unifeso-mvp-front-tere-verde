import styles from "./TrailCard.module.css";
import { Card } from "../card/Card";
import { Button } from "../../button/Button";

export function TrailCard({ trail }) {
  const image =
    trail.fotos_urls && trail.fotos_urls.length > 0
      ? trail.fotos_urls[0]
      : "/placeholder.jpg";

  return (
    <Card className={styles.card}>
      <div className={styles.wrapper}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{trail.nome}</h3>
        <p className={styles.meta}>
          Dificuldade: {formatarDificuldade(trail.dificuldade)} &bull; Distância: {trail.distancia_total_m / 1000} km
        </p>
        <Button shape="pill" className={styles.button}>
          Explorar
        </Button>
      </div>
    </Card>
  );
}

function formatarDificuldade(valor) {
  if (!valor) return "";
  return valor.charAt(0).toUpperCase() + valor.slice(1).toLowerCase();
}