import styles from "./Home.module.css";

import { ListParks } from "../../data/home/listParks";
import { InfoItems } from "../../data/home/infoItems";

import { Mouse, MapPin } from "lucide-react";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/cards/card/Card";

export function Home() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          Explore trilhas, parques e cachoeiras de Teresópolis
        </h1>
        <Button shape="pill" className={styles.headerButton}>
          Descobrir Trilhas
        </Button>
        <Mouse aria-hidden="true" className={styles.headerIcon} />
      </header>
      <main className={styles.container}>
        <section className={styles.about}>
          <h2 className={styles.subtitle}>Conheça nossos parques</h2>
          <ul className={styles.cardsContainer}>
            {ListParks.map((parks) => (
              <li key={parks.id} className={styles.cardItem}>
                <Card className={styles.cardPark} variant="small">
                  <div className={styles.containerCardIcon}>
                    <MapPin aria-hidden="true" className={styles.cardIcon} />
                  </div>

                  <h3 className={styles.cardTitle}>{parks.title}</h3>

                  <p className={styles.cardDescription}>{parks.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </section>
        <section className={styles.info}>
          <h2 className={styles.subtitle}>O que você encontra aqui</h2>

          <ul className={styles.grid}>
            {InfoItems.map((item) => (
              <li className={styles.item} key={item.id}>
                <div className={styles.containerIcon}>
                  <span aria-hidden="true" className={styles.itemIcon}>
                    {item.icon}
                  </span>
                </div>

                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
