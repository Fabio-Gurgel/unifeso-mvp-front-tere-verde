import styles from "./TrailsDetailsModal.module.css";

import Trail from "../../../services/trailService";
import { parques } from "../../../../db.json";

import { IntroTrails } from "../../../data/trails/introTrails";
import { TrailsMetrics } from "../../../data/trails/trailsMetrics";

import { Mountain, MapPin, MoveRight } from "lucide-react";
import { Modal } from "../modal/Modal";
import { Gallery } from "../../gallery/Gallery";
import { Card } from "../../cards/card/Card";
import { Button } from "../../button/Button";

export function TrailsDetailsModal({ trail, isOpen, onClose, onViewPark }) {
  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "facil":
        return styles.easy;
      case "moderado":
        return styles.medium;
      case "dificil":
        return styles.hard;
      default:
        return "";
    }
  };

    const parks = parques.filter((p) => trail.parque_ids?.includes(p.id));
    const photos = trail ? trail.fotos_urls : [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      leftContent={
        <div className={styles.leftContainer}>
          <Gallery
            photos={photos}
            altPrefix={`Foto da trilha ${trail.nome}.`}
          />

          <section className={styles.leftContent}>
            <h2 className={styles.subtitleModal}>Sobre a trilha</h2>
            <p className={styles.introPark}>{trail.descricao}</p>

            <ul className={styles.grid}>
              {IntroTrails.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.containerIcon}>
                    <span className={styles.itemIcon}>{item.icon}</span>
                  </div>

                  <div className={styles.itemContent}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemValue}>
                      {item.render
                        ? item.render(trail[item.field])
                        : item.format
                          ? item.format(trail[item.field])
                          : String(trail[item.field] ?? "Sem informação.")}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      }
      rightContent={
        <div className={styles.rightContainer}>
          <header className={styles.rightHeader}>
            <Mountain aria-hidden="true" />
            <span className={styles.shortTitle}>TRILHA</span>
          </header>

          <section className={styles.introTrail}>
            <h1 className={styles.trailName}>{trail.nome}</h1>
            <span className={styles.local}>
              <MapPin aria-hidden="true" />
              {trail.localizacao}
            </span>
            <span
              className={`${styles.trailBadge} ${getDifficultyClass(trail.dificuldade)}`}
            >
              {trail.dificuldade}
            </span>
          </section>

          <section className={styles.sectionMetrics}>
            <ul className={styles.metricsContainer}>
              {TrailsMetrics.map((item) => (
                <li key={item.id}>
                  <Card className={styles.cardMetric}>
                    <div className={styles.headerCard}>
                      <span className={styles.iconMetric}>{item.icon}</span>
                      <span className={styles.metricTitle}>{item.title}</span>
                    </div>
                    <span className={styles.metricValue}>
                      {item.value(trail)}
                    </span>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.findIn}>
            <h2 className={styles.subtitleModal}>Parque</h2>
            {parks.length > 0 ? (
              parks.map((park) => (
                <Card key={park.id} className={styles.cardContainer}>
                  <div className={styles.cardContent}>
                    <MapPin />
                    <span className={styles.localName}>{park.nome}</span>
                  </div>

                    <Button
                      shape="text"
                      className={styles.localButton}
                      onClick={() => onViewPark(park)}
                    >
                      Ver mais <MoveRight />
                    </Button>
                  </Card>
                ))
              ) : (
                <Card className={styles.cardContainer}>
                  <div className={styles.cardContent}>
                    <MapPin />
                    <span className={styles.localName}>
                      Nenhum parque encontrado
                    </span>
                  </div>
                </Card>
              )}
            </section>

            <Card className={styles.cardContainer}>
              <div className={styles.cardContentColumn}>
                <h3 className={styles.cardTitle}>Recomendações</h3>

                <ul className={styles.list}>
                  {trail.recomendacoes?.map((item, index) => (
                    <li key={index} className={styles.listItems}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        }
      />
    );
}
