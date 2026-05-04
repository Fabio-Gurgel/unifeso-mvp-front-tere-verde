import styles from "./BiodiversityDetailsModal.module.css";

import {
  IntroFauna,
  IntroFlora,
} from "../../../data/biodiversity/introBiodiversity";
import { ConservationMap } from "../../../data/biodiversity/conservationMap";
import { parques } from "../../../../db.json";

import { Mountain, Leaf, MapPin, MoveRight } from "lucide-react";
import { Modal } from "../modal/Modal";
import { Gallery } from "../../gallery/Gallery";
import { Card } from "../../cards/card/Card";
import { Button } from "../../button/Button";

export function BiodiversityDetailsModal({ specie, isOpen, onClose }) {
  if (!specie) return null;
  const photos = specie.fotos_urls ?? [];
  const isFauna = specie.tipo === "fauna";
  const intro = isFauna ? IntroFauna : IntroFlora;
  const conservation = ConservationMap[specie.status_conservacao];
  const Icon = conservation?.icon || Leaf;

  const park = parques.find((p) => p.id === specie.parque_id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      leftContent={
        <div className={styles.leftContainer}>
          <Gallery photos={photos} altPrefix={`Imagem de ${specie.nome}.`} />
          <section className={styles.leftContent}>
            <h2 className={styles.subtitleModal}>Sobre a Espécie</h2>
            <p className={styles.text}>
              {specie.descricao ?? "Sem descrição disponível"}
            </p>
            <ul className={styles.containerItems}>
              {intro.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div className={styles.containerIcon}>
                    <span className={styles.itemIcon}>{item.icon}</span>
                  </div>

                  <div className={styles.itemContent}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemValue}>
                      {item.render
                        ? item.render(specie[item.field])
                        : item.format
                          ? item.format(specie[item.field])
                          : String(specie[item.field] ?? "Sem informação.")}
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
            <span className={styles.modalType}>
              {isFauna ? "Fauna" : "Flora"}
            </span>
          </header>

          <section className={styles.introSpecie}>
            <h1 className={styles.speciePopularName}>{specie.nome_popular}</h1>
            <span className={styles.specieName}>{specie.nome_cientifico}</span>
          </section>

          <section
            className={styles.infosSpecie}
            aria-label="Informações da espécie"
          >
            {isFauna && (
              <article className={styles.conservationContainer}>
                <h2 className={styles.conservationTitle}>
                  Status de Conservação
                </h2>
                <Card className={styles.cardConservation}>
                  <div
                    className={styles.conservationBadge}
                    style={{ backgroundColor: conservation?.color }}
                  >
                    <Icon />
                    <div className={styles.badgeContent}>
                      <h3 className={styles.badgeTitle}>
                        {specie.status_conservacao}
                      </h3>
                      <span className={styles.iucn}>
                        Segundo a Lista Vermelha da IUCN
                      </span>
                    </div>
                  </div>
                </Card>
              </article>
            )}
            {!isFauna && (
              <article className={styles.typeFloraContainer}>
                <span className={styles.badgeTypeFlora}>
                  {specie.tipo_flora}
                </span>
              </article>
            )}

            <section className={styles.findIn}>
              <h2 className={styles.subtitleModal}>Onde Encontrar</h2>
              <Card className={styles.cardContainer}>
                <div className={styles.cardContent}>
                  <MapPin />
                  <span className={styles.localName}>
                    {park?.nome ?? "Parque não encontrado"}
                  </span>
                </div>

                <Button
                  shape="text"
                  className={styles.localButton}
                  onClick={() => alert(`Encaminhar para parque.`)}
                >
                  Ver mais <MoveRight />
                </Button>
              </Card>
            </section>

            <Card className={styles.cardContainer}>
              <div className={styles.cardContentColumn}>
                <h3 className={styles.cardTitle}>Importância ecológica</h3>
                <p className={styles.text}>{specie.importancia_ecologica}</p>
              </div>
            </Card>

            {!isFauna && (
              <Card className={styles.cardContainer}>
                <div className={styles.cardContentColumn}>
                  <h3 className={styles.cardTitle}>Características</h3>

                  <ul className={styles.list}>
                    {specie.caracteristicas?.map((item, index) => (
                      <li key={index} className={styles.listItems}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            )}

            <Card className={styles.cardContainer}>
              <div className={styles.cardContentColumn}>
                <h3 className={styles.cardTitle}>Conservação</h3>

                <ul className={styles.list}>
                  {specie.conservacao?.map((item, index) => (
                    <li key={index} className={styles.listItems}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </section>
        </div>
      }
    />
  );
}
