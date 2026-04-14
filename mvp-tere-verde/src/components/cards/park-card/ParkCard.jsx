import styles from "./ParkCard.module.css";
import { Card } from "../card/Card";
import { Button } from "../../button/Button";

export function ParkCard({ park }) {
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
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{park.nome}</h3>
        <p className={styles.meta}>
          Altura: {park.area_total_ha} ha &bull; Acesso:{" "}
          {formatarDificuldade(park.dificuldade_acesso)} ha &bull; Altura:{" "}
          {park.altitude_max_m} m
        </p>
        <Button shape="pill" className={styles.button}>
          Explorar
        </Button>
      </div>
    </Card>
  );
}

function formatarDificuldade(valor) {
  return valor.charAt(0) + valor.slice(1).toLowerCase();
}
