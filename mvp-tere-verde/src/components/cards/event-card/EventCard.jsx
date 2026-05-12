import styles from "./EventCard.module.css";
import { Card } from "../card/Card";
import { Button } from "../../button/Button";
import { Calendar, MapPin } from "lucide-react";

export function EventCard({ event, onDetails }) {
  // Padrão de extração de imagem: usa a primeira do array ou um placeholder[cite: 5, 9]
  const image = event.fotos_urls?.length > 0 
    ? event.fotos_urls[0] 
    : "/placeholder-event.jpg";

  // Formatação simples da data para o padrão brasileiro
  const eventDate = event.cronograma?.data_inicio 
    ? new Date(event.cronograma.data_inicio).toLocaleDateString('pt-BR') 
    : "Data a definir";

  return (
    <Card className={styles.card}>
      <div className={styles.wrapper}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={`Imagem do evento ${event.nome}`}
        />
      </div>
      
      <div className={styles.info}>
        <h1 className={styles.title}>{event.nome}</h1>
        
        <ul className={styles.meta}>
          <li>
            <Calendar size={16} /> 
            {eventDate}
          </li>
          <li>
            <MapPin size={16} /> 
            {event.localizacao}
          </li>
        </ul>

        {/* O botão utiliza o padrão shape="pill" para manter a identidade visual */}
        <Button 
          shape="pill" 
          className={styles.button} 
          onClick={onDetails}
        >
          Ver detalhes
        </Button>
      </div>
    </Card>
  );
}