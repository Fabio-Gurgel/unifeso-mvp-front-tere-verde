import styles from "./WaterfallDetailsModal.module.css";

import { parques } from "../../../../db.json";
import { trilhas } from "../../../../db.json";

import { IntroWaterfalls } from "../../../data/waterfalls/introWaterfalls";
import { WaterfallsMetrics } from "../../../data/waterfalls/waterfallsMetrics";
import { RiskMap } from "../../../data/waterfalls/riskMap";

import { Droplet, MapPin, TriangleAlert, MoveRight } from "lucide-react";

import { Modal } from "../modal/Modal";
import { Gallery } from "../../gallery/Gallery";
import { Card } from "../../cards/card/Card";
import { Button } from "../../button/Button";
    
export function WaterfallsDetailsModal({ waterfall, isOpen, onClose}) {

    const risk = RiskMap[waterfall.seguranca.risco_tromba_dagua] || {};
    const park = parques.find((p) => p.id === waterfall.parque_id);
    const trail = trilhas.find((t) => t.id === waterfall.trilha_id);
    const photos = waterfall ? waterfall.fotos : [];

    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            leftContent={
                <div className={styles.leftContainer}>
                    <Gallery photos={photos} altPrefix={`Foto da cachoeira ${waterfall.nome}.`} />

                    <section className={styles.leftContent}>
                        <h2 className={styles.subtitleModal}>Sobre a cachoeira</h2>
                        <p className={styles.introWaterfall}>{waterfall.descricao}</p>

                        <ul className={styles.grid}>
                            {IntroWaterfalls.map((item) => (
                                <li key={item.id} className={styles.item}>
                                    <div className={styles.containerIcon}>
                                        <span className={styles.itemIcon}>{item.icon}</span>
                                    </div>

                                    <div className={styles.itemContent}>
                                        <span className={styles.itemTitle}>{item.title}</span>
                                        <span className={styles.itemValue}>
                                            {item.render
                                                ? item.render(waterfall[item.field])
                                                : item.format
                                                ? item.format(waterfall[item.field])
                                                : String(waterfall[item.field] ?? "Sem informação.")
                                            }
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
                        <Droplet aria-hidden="true" />
                        <span className={styles.shortTitle}>CACHOEIRA</span>
                    </header>

                    <section className={styles.introWaterfall}>
                        <h1 className={styles.waterfallName}>{waterfall.nome}</h1>
                        <span className={styles.local}>
                            <MapPin aria-hidden="true" />
                            {waterfall.localizacao}
                        </span>
                    </section>

                    <section className={styles.sectionMetrics}>
                        <ul className={styles.metricsContainer}>
                            {WaterfallsMetrics.map((item) => (
                                <li key={item.id}>
                                    <Card className={styles.cardMetric}>
                                    <div className={styles.headerCard}>
                                        <span className={styles.iconMetric}>{item.icon}</span>
                                        <span className={styles.metricTitle}>{item.title}</span>
                                    </div>
                                    <span className={styles.metricValue}>
                                        {item.render
                                            ? item.render(waterfall[item.field])
                                            : item.format
                                            ? item.format(waterfall[item.field])
                                            : String (waterfall[item.field] ?? "Sem informação.")}
                                    </span>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className={styles.riskSection} style={{ backgroundColor: risk?.color }}>
                        <Card className={styles.cardContainerRisk}>
                            <div className={styles.riskContent}>
                                <div className={styles.riskHeader}>
                                    <span className={styles.riskIcon}>{risk?.icon && <risk.icon />}</span>
                                    <span className={styles.riskTitle}>Atenção!</span>
                                </div>
                                <span className={styles.riskDescription}>
                                    Risco de tromba d'água: {waterfall.seguranca.risco_tromba_dagua}. Evite visitar em dias chuvosos.
                                </span>
                            </div>
                        </Card>
                    </section>

                    <section className={styles.findIn}>
                        <h2 className={styles.subtitleModal}>Parque</h2>
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
                                Ver detalhes do parque <MoveRight />
                            </Button>
                        </Card>
                    </section>

                    <section className={styles.findIn}>
                        <h2 className={styles.subtitleModal}>Trilha de acesso</h2>
                        <Card className={styles.cardContainer}>
                            <div className={styles.cardContent}>
                                <MapPin />
                                <span className={styles.localName}>
                                    {trail?.nome ?? "Trilha não encontrado"}
                                </span>
                            </div>

                           <Button
                                shape="text"
                                className={styles.localButton}
                                onClick={() => alert(`Encaminhar para trilha.`)}
                            >
                                Ver detalhes da trilha<MoveRight />
                            </Button>
                        </Card>
                    </section>

                </div>
            }
        />
    );
}