import styles from "./ParkDetailsModal.module.css";

import { useState } from "react";

import { IntroPark } from "../../../data/parks/introPark";
import { ParkMetrics } from "../../../data/parks/parkMetrics";
import { ParkDestach } from "../../../data/parks/parkDestach";

import { Mountain } from "lucide-react";
import { Modal } from "../modal/Modal";

export function ParkDetailsModal({ park, isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!park) return null;

  const shortTitle = park.nome?.split(" ").slice(0, 2).join(" ");
  const photos = park.fotos_urls ?? [];

  const gallery =
    photos.length === 0 ? (
      <div className={styles.placeholder}>
        <img
          src="/placeholder.jpg"
          alt={`Sem foto do parque ${park.nome} disponível.`}
        />
      </div>
    ) : (
      <div className={styles.gallery}>
        <img
          className={styles.mainPhoto}
          src={photos[activeIndex]}
          alt={`Foto do parque ${park.nome}.`}
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
        />

        {photos.length > 1 && (
          <div className={styles.thumbs}>
            {photos.map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt={`Miniatura de foto do parque ${park.nome} ${i + 1}`}
                className={`${styles.thumb} ${i === activeIndex ? styles.active : ""}`}
                onClick={() => setActiveIndex(i)}
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
              />
            ))}
          </div>
        )}
      </div>
    );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      leftContent={
        <div className={styles.leftContainer}>
          {gallery}

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

          <section>
            <ul className={styles.metricsContainer}>
              {ParkMetrics.map((item) => (
                <li key={item.id} className={styles.cardMetric}>
                  <div className={styles.headerCard}>
                    <span className={styles.iconMetric}>{item.icon}</span>
                    <span className={styles.metricTitle}>{item.title}</span>
                  </div>
                  <span className={styles.metricValue}>{item.value(park)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles.subtitleModal}>Destaques</h2>
            <ul className={styles.destachContainer}>
              {ParkDestach.map((item) => (
                <li key={item.id} className={styles.cardDestach}>
                  <div className={styles.destachIcon}>{item.icon}</div>
                  <span className={styles.destachTitle}>{item.title}</span>
                  <span className={styles.destachValue}>
                    {item.value(park)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className={styles.subtitleModal}>Trilhas</h2>
          </section>
        </div>
      }
    />
  );
}
