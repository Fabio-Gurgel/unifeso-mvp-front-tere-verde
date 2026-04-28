import styles from "./TrailsDetailsModal.module.css";

import Trail from "../../../services/trailService";

//import { useState, useEffect } from "react";

import { IntroTrails } from "../../../data/trails/introTrails";
import { TrailsMetrics } from "../../../data/trails/trailsMetrics";
//import { getRandomItems } from "../../../utils/arrayUtils";

import {
    Mountain,
    MapPin,
} from "lucide-react";
import { Modal } from "../modal/Modal";
import { Gallery } from "../../gallery/Gallery";
import { Card } from "../../cards/card/Card";
import { Button } from "../../button/Button";

export function TrailsDetailsModal({ trail, isOpen, onClose }) {

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

    const photos = trail ? trail.fotos : [];

    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            leftContent={
                <div className={styles.leftContainer}>
                    <Gallery photos={photos} altPrefix={`Foto da trilha ${trail.nome}.`}/>

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
                        <span className={`${styles.trailBadge} ${getDifficultyClass(trail.dificuldade)}`}>
                            {trail.dificuldade}
                        </span>
                    </section>

                    <section className={styles.sectionMetrics}>
                        <ul className={styles.metricsContainer}>
                           {TrailsMetrics.map((item) =>(
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

                    
                </div>
            }
        />
    );
}