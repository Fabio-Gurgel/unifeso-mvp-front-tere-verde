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
  User,
  ShieldCheck,
  MoveRight
} from "lucide-react";

export function EventDetailsModal({ event, isOpen, onClose }) {
  if (!event) return null;

  const photos = event.fotos_urls ?? [];
  
  // Função para formatar a data (AAAA-MM-DD para DD/MM/AAAA)
  const formatEventDate = (dateString) => {
    if (!dateString) return "A definir";
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

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
            
            <ul className={styles.infoGrid}>
              <li className={styles.infoItem}>
                <div className={styles.iconContainer}><Info size={18} /></div>
                <div className={styles.itemContent}>
                  <span className={styles.infoLabel}>Requisitos</span>
                  <span className={styles.infoValue}>{event.requisitos || "Nenhum"}</span>
                </div>
              </li>
              <li className={styles.infoItem}>
                <div className={styles.iconContainer}><User size={18} /></div>
                <div className={styles.itemContent}>
                  <span className={styles.infoLabel}>Organizador</span>
                  <span className={styles.infoValue}>{event.organizador?.nome}</span>
                </div>
              </li>
            </ul>
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
            <div className={styles.statusBadge}>
              <ShieldCheck size={14} /> {event.status || "CONFIRMADO"}
            </div>
          </section>

          <section className={styles.sectionDestach}>
            <h2 className={styles.subtitleModal}>Informações</h2>
            <ul className={styles.metricsGrid}>
              <li>
                <Card className={styles.metricBlock}>
                  <div className={styles.metricHeader}>
                    <Calendar size={16} />
                    <label>DATA</label>
                  </div>
                  <span className={styles.metricValue}>
                    {formatEventDate(event.cronograma?.data_inicio)}
                  </span>
                </Card>
              </li>
              <li>
                <Card className={styles.metricBlock}>
                  <div className={styles.metricHeader}>
                    <Clock size={16} />
                    <label>HORÁRIO</label>
                  </div>
                  <span className={styles.metricValue}>
                    {event.cronograma?.horario_inicio} - {event.cronograma?.horario_fim}
                  </span>
                </Card>
              </li>
              <li>
                <Card className={styles.metricBlock}>
                  <div className={styles.metricHeader}>
                    <Ticket size={16} />
                    <label>VALOR</label>
                  </div>
                  <span className={styles.metricValue}>
                    {event.valor_entrada > 0 ? `R$ ${event.valor_entrada.toFixed(2)}` : "Gratuito"}
                  </span>
                </Card>
              </li>
              <li>
                <Card className={styles.metricBlock}>
                  <div className={styles.metricHeader}>
                    <Users size={16} />
                    <label>VAGAS</label>
                  </div>
                  <span className={`${styles.metricValue} ${getVagasClass(event.capacidade?.vagas_disponiveis)}`}>
                    {event.capacidade?.vagas_disponiveis} disponíveis
                  </span>
                </Card>
              </li>
            </ul>
          </section>

          <section className={styles.subscriptionSection}>
            {event.capacidade?.exige_inscricao && (
              <div className={styles.inscriptionNotice}>
                <Info size={20} />
                <div>
                  <strong>Inscrição Necessária</strong>
                  <p>Este evento requer inscrição prévia para garantir sua vaga.</p>
                </div>
              </div>
            )}
            <button className={styles.subscribeButton}>
              Inscrever-se no Evento <MoveRight size={18} />
            </button>
          </section>
        </div>
      }
    />
  );
}