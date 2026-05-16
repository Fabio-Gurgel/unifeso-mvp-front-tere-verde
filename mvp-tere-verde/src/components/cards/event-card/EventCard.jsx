import styles from "./EventCard.module.css";
import { Card } from "../card/Card";
import { Button } from "../../button/Button";
import { Calendar, MapPin } from "lucide-react";

export function EventCard({ event, onDetails }) {
  const image = event.fotos_urls?.length > 0 
    ? event.fotos_urls[0] 
    : "/placeholder-event.jpg";

  const formatEventDate = (dateString) => {
    if (!dateString) return "Data a definir";
    
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const eventDate = formatEventDate(event.cronograma?.data_inicio);

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

        <div className={styles.footer}>
          <Button 
            shape="pill" 
            className={styles.button} 
            onClick={onDetails}
          >
            Ver detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
}