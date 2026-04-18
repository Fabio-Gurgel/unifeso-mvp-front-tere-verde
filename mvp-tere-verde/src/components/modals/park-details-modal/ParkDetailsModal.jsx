import styles from "./ParkDetailsModal.module.css";
import { InfoPark } from "../../../data/infoPark";
import { ParkMetrics } from "../../../data/parkMetrics";
import { ParkDestach } from "../../../data/parkDestach";
import { useState } from "react";
import { Modal } from "../modal/Modal";
import { Mountain } from "lucide-react";

export function ParkDetailsModal({ park, isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const shortTitle = park.nome?.split(" ").slice(0, 2).join(" ");

  if (!park) return null;

  const photos = park.fotos_urls ?? [];

  const gallery =
    photos.length === 0 ? (
      <div className={styles.placeholder}>
        <img src="/placeholder.jpg" alt="Sem foto disponível" />
      </div>
    ) : (
      <div className={styles.gallery}>
        <img
          className={styles.mainPhoto}
          src={photos[activeIndex]}
          alt="Foto principal"
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
        />

        {photos.length > 1 && (
          <div className={styles.thumbs}>
            {photos.map((photo, i) => (
              <img
                key={i}
                src={photo}
                alt={`Miniatura ${i + 1}`}
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
        <article className={styles.leftContainer}>
          {gallery}
          <section className={styles.infoLeft}>
            <h2>Sobre o parque</h2>
            <p className={styles.textItem}>{park.descricao}</p>
            <ul className={styles.grid}>
              {InfoPark.map((item) => (
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
                          : String(
                              park[item.field] ?? "Sem informação disponível"
                            )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </article>
      }
      rightContent={
        <article className={styles.rightContainer}>
          <section className={styles.intro}>
            <Mountain />
            <span className={styles.shortTitle}>{shortTitle}</span>
          </section>
          <section className={styles.infoRight}>
            <h1>{park.nome}</h1>
            <span className={styles.local}>{park.localizacao}</span>
            <p className={styles.rightDescription}>{park.descricao}</p>
          </section>
          <section className={styles.metricsContainer}>
            {ParkMetrics.map((item) => (
              <div key={item.id} className={styles.cardMetric}>
                <div className={styles.headerCard}>
                  <span className={styles.iconMetric}>{item.icon}</span>
                  <span className={styles.metricTitle}>{item.title}</span>
                </div>
                <span className={styles.metricValue}>{item.value(park)}</span>
              </div>
            ))}
          </section>
          <h2>Destaques</h2>
          <section className={styles.destachContainer}>
            {ParkDestach.map((item) => (
              <div key={item.id} className={styles.cardDestach}>
                <div className={styles.destachIcon}>{item.icon}</div>
                <span className={styles.destachTitle}>{item.title}</span>
                <span className={styles.destachValue}>{item.value(park)}</span>
              </div>
            ))}
            <h2>Trilhas Populares</h2>
          </section>
        </article>
      }
    />
  );
}
