import styles from "./EventDetailsModal.module.css";
import { Modal } from "../modal/Modal";
import { Gallery } from "../../gallery/Gallery";
import { Card } from "../../cards/card/Card";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Ticket, 
  Clock, 
  Info,
  User
} from "lucide-react";

export function EventDetailsModal({ event, isOpen, onClose }) {
  if (!event) return null;

  const photos = event.fotos_urls ?? [];
  
  // Lógica para cor da badge de vagas (similar à dificuldade das trilhas)
  const getVagasClass = (vagas) => {
    if (vagas > 20) return styles.vagasAlta;
    if (vagas > 0) return styles.vagasBaixa;
    return styles.vagasEsgotado;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      leftContent={
        <div className={styles.leftContainer}>
          <Gallery photos={photos} altPrefix={`Foto do evento ${event.nome}`} />

          <section className={styles.leftContent}>
            <h2 className={styles.subtitleModal}>Sobre o Evento</h2>
            <p className={styles.description}>{event.descricao}</p>
            
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.iconContainer}><Info size={18} /></div>
                <div>
                  <span className={styles.infoLabel}>Requisitos</span>
                  <span className={styles.infoValue}>{event.requisitos || "Nenhum"}</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconContainer}><User size={18} /></div>
                <div>
                  <span className={styles.infoLabel}>Organizador</span>
                  <span className={styles.infoValue}>{event.organizador?.nome}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      }
      rightContent={
        <div className={styles.rightContainer}>
          <header className={styles.rightHeader}>
            <Calendar size={18} />
            <span className={styles.categoryBadge}>{event.categoria}</span>
          </header>

          <section className={styles.mainInfo}>
            <h1 className={styles.eventName}>{event.nome}</h1>
            <span className={styles.location}>
              <MapPin size={16} />
              {event.localizacao}
            </span>
          </section>

          <section className={styles.metricsSection}>
            <ul className={styles.metricsGrid}>
              <li>
                <Card className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <Ticket size={18} />
                    <span>VALOR</span>
                  </div>
                  <span className={styles.metricValue}>
                    {event.valor > 0 ? `R$ ${event.valor.toFixed(2)}` : "Gratuito"}
                  </span>
                </Card>
              </li>
              <li>
                <Card className={styles.metricCard}>
                  <div className={styles.metricHeader}>
                    <Users size={18} />
                    <span>VAGAS</span>
                  </div>
                  <span className={`${styles.metricValue} ${getVagasClass(event.vagas_disponiveis)}`}>
                    {event.vagas_disponiveis} disponíveis
                  </span>
                </Card>
              </li>
            </ul>
          </section>

          <section className={styles.scheduleSection}>
            <h2 className={styles.subtitleModal}>Cronograma</h2>
            <Card className={styles.scheduleCard}>
              <div className={styles.scheduleItem}>
                <Clock size={16} />
                <span>Início: {event.cronograma?.data_inicio} às {event.cronograma?.horario_inicio}</span>
              </div>
              <div className={styles.scheduleItem}>
                <Clock size={16} />
                <span>Término: {event.cronograma?.data_fim} às {event.cronograma?.horario_fim}</span>
              </div>
            </Card>
          </section>
        </div>
      }
    />
  );
}