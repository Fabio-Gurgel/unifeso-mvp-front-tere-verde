import styles from "./ParkDetailsModal.module.css";

import Trail from "../../../services/trailService";

import { useState, useEffect } from "react";

import { IntroPark } from "../../../data/parks/introPark";
import { ParkMetrics } from "../../../data/parks/parkMetrics";
import { ParkDestach } from "../../../data/parks/parkDestach";
import { getRandomItems } from "../../../utils/arrayUtils";

import {
  Mountain,
  Footprints,
  Clock,
  TrendingUp,
  MoveRight,
} from "lucide-react";
import { Modal } from "../modal/Modal";
import { Gallery } from "../../gallery/Gallery";
import { Card } from "../../cards/card/Card";
import { Button } from "../../button/Button";

export function ParkDetailsModal({ park, isOpen, onClose }) {
  const [trails, setTrails] = useState([]);

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

  useEffect(() => {
    if (!park || !isOpen) return;

    async function fetchTrails() {
      try {
        const data = await Trail.getByPark(park.id);

        const active = data.filter((t) => t.ativo);

        setTrails(getRandomItems(active));
      } catch (err) {
        console.error("Erro ao buscar trilhas", err);
      }
    }

    fetchTrails();
  }, [park, isOpen]);

  if (!park) return null;

  const shortTitle = park.nome?.split(" ").slice(0, 2).join(" ");
  const photos = park.fotos_urls ?? [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      leftContent={
        <div className={styles.leftContainer}>
          <Gallery photos={photos} altPrefix={`Foto do parque ${park.nome}.`} />

          <section className={styles.leftContent}>
            <h2 className={styles.subtitleModal}>Sobre o parque</h2>
            <p className={styles.introPark}>{park.descricao}</p>

            <ul className={styles.grid}>
              {IntroPark.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.containerIcon}>
                    <span className={styles.itemIcon}>{item.icon}</span>
                  </div>

                  <div className={styles.itemContent}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemValue}>
                      {item.render
                        ? item.render(park[item.field])
                        : item.format
                          ? item.format(park[item.field])
                          : String(park[item.field] ?? "Sem informação")}
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
            <span className={styles.shortTitle}>{shortTitle}</span>
          </header>

          <section className={styles.infoRight}>
            <h1>{park.nome}</h1>
            <span className={styles.local}>{park.localizacao}</span>
            <p className={styles.parkDescription}>{park.descricao}</p>
          </section>

          <section className={styles.sectionMetrics}>
            <ul className={styles.metricsContainer}>
              {ParkMetrics.map((item) => (
                <li key={item.id}>
                  <Card className={styles.cardMetric}>
                    <div className={styles.headerCard}>
                      <span className={styles.iconMetric}>{item.icon}</span>
                      <span className={styles.metricTitle}>{item.title}</span>
                    </div>
                    <span className={styles.metricValue}>
                      {item.value(park)}
                    </span>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.sectionDestach}>
            <h2 className={styles.subtitleModal}>Destaques</h2>
            <ul className={styles.destachContainer}>
              {ParkDestach.map((item) => (
                <li key={item.id}>
                  <Card className={styles.cardDestach}>
                    <div className={styles.destachIcon}>{item.icon}</div>
                    <span className={styles.destachTitle}>{item.title}</span>
                    <span className={styles.destachValue}>
                      {item.value(park)}
                    </span>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.sectionTrails}>
            <h2 className={styles.subtitleModal}>Trilhas Populares</h2>

            {trails.length === 0 ? (
              <p className={styles.emptyMessage}>
                Não há trilhas relacionadas a esse parque para exibir.
              </p>
            ) : (
              <ul className={styles.trailsContainer}>
                {trails.map((trail) => (
                  <li key={trail.id}>
                    <Card className={styles.cardTrail}>
                      <div className={styles.trailHeader}>
                        <h3 className={styles.trailTitle}>{trail.nome}</h3>
                        <span
                          className={`${styles.trailBadge} ${getDifficultyClass(
                            trail.dificuldade
                          )}`}
                        >
                          {trail.dificuldade}
                        </span>
                      </div>

                      <ul className={styles.trailInfo}>
                        <li>
                          <Footprints />
                          {(trail.distancia_total_m / 1000).toLocaleString(
                            "pt-BR",
                            {
                              minimumFractionDigits: 1,
                              maximumFractionDigits: 1,
                            }
                          )}{" "}
                          km
                        </li>
                        <li>
                          <Clock />
                          {(trail.tempo_estimado_min / 60).toLocaleString(
                            "pt-BR",
                            {
                              minimumFractionDigits: 1,
                              maximumFractionDigits: 1,
                            }
                          )}{" "}
                          h
                        </li>
                        <li>
                          <TrendingUp />
                          {trail.ganho_elevacao_m.toLocaleString("pt-BR")} m
                        </li>
                      </ul>

                      <div className={styles.containerButton}>
                        <Button
                          shape="text"
                          className={styles.trailButton}
                          onClick={() => alert(`Explorar: ${trail.nome}`)}
                        >
                          Ver mais <MoveRight />
                        </Button>
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      }
    />
  );
}
