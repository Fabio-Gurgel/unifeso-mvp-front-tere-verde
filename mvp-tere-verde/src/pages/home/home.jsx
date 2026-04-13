import styles from "./Home.module.css";

import { ListParks } from "../../data/ListParks";
import { InfoItems } from "../../data/InfoItems";

import { Mouse, MapPin } from "lucide-react";
import { Button } from "../../components/button/Button";
import { Card } from "../../components/card/Card";

export function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Explore trilhas, parques e cachoeiras de Teresópolis
        </h1>
        <Button shape="pill" className={styles.heroButton}>
          Descobrir Trilhas
        </Button>
        <Mouse className={styles.heroIcon} />
      </header>
      <section className={styles.about}>
        <h2 className={styles.subtitle}>Conheça nossos parques</h2>
        <div className={styles.cardsContainer}>
          {ListParks.map((parks) => (
            <Card className={styles.cardPark} variant="small" key={parks.id}>
              <div className={styles.containerCardIcon}>
                <MapPin className={styles.cardIcon} />
              </div>
              <h3 className={styles.cardTitle}>{parks.title}</h3>
              <span className={styles.cardDescription}>
                {parks.description}
              </span>
            </Card>
          ))}
        </div>
      </section>
      <section className={styles.info}>
        <h2 className={styles.subtitle}>O que você encontra aqui</h2>
        <div className={styles.grid}>
          {InfoItems.map((item) => (
            <div className={styles.item} key={item.id}>
              <div className={styles.containerIcon}>
                <span className={styles.itemIcon}>{item.icon}</span>
              </div>
              <div className={styles.itemContent}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
