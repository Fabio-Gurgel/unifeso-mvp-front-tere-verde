import styles from "./BiodiversityCard.module.css";

import { Card } from "../card/Card";
import { Button } from "../../button/Button";

export function BiodiversityCard({ bio, onExplore }) {
  const image =
    bio.fotos_urls && bio.fotos_urls.length > 0
      ? bio.fotos_urls[0]
      : "/placeholder.jpg";

  return (
    <Card className={styles.card}>
      <div className={styles.wrapper}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={`Imagem da espécie ${bio.nome}`}
        />
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{bio.nomePopular}</h1>
        <ul className={styles.meta}>
          <li>{bio.nome_cientifico}</li>
          <li>{bio.status_conservacao}</li>
        </ul>
        <Button shape="pill" className={styles.button} onClick={onExplore}>
          Saiba mais
        </Button>
      </div>
    </Card>
  );
}
