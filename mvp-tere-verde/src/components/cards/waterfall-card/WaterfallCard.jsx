import styles from "./WaterfallCard.module.css";

import { Card } from "../card/Card";
import { Button } from "../../button/Button";

export function WaterfallCard({ waterfall, onExplore }) {
    const image = "./placeholder.jpg";
    //waterfall.fotos_urls && waterfall.fotos_urls.length > 0
        //? waterfall.fotos_urls[0]
        //: "/placeholder.jpg";

    return (
        <Card className={styles.card}>
            <div className={styles.wrapper}>
                <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${image})` }}
                    role="img"
                    aria-label={`Imagem da cachoeira ${waterfall.nome}`}
                />  
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{waterfall.nome}</h1>
                <ul className={styles.meta}>
                    <li>Altura: {waterfall.altura_queda_m} m</li>
                    <li>Acesso: {formatDifficulty("fácil")}</li> {/* Aguardando os dados no db.json para inserir um valor */}
                </ul>
                <Button shape="pill" className={styles.button} onClick={onExplore}>
                    Explorar
                </Button>
            </div>
        </Card>
    );
}

function formatDifficulty(value) {
    return value.charAt(0) + value.slice(1).toLowerCase();
}