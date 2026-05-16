import styles from "./Events.module.css";
import { useState, useEffect } from "react";
import eventService from "../../services/eventService";

import { PageHeader } from "../../components/page-header/PageHeader";
import { Button } from "../../components/button/Button";
import { EventCard } from "../../components/cards/event-card/EventCard";
import { EventDetailsModal } from "../../components/modals/event-details-modal/EventDetailsModal";

export function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const [open, setOpen] = useState(false);       
  const [filterOpen, setFilterOpen] = useState(false); 

  const [sort, setSort] = useState("PROXIMOS"); 
  const [locationFilter, setLocationFilter] = useState(null); 

  const sortLabels = {
    PROXIMOS: "Ordenar: Próximos",
    ESTE_MES: "Ordenar: Este mês",
    PROXIMO_MES: "Ordenar: Próximo mês",
    AZ: "Ordenar: Nome A-Z",
  };

  const locationLabels = {
    PARNASO: "PARNASO",
    MUNICIPAL: "Parque Municipal",
    VISITANTES: "Centro de Visitantes",
    TRES_PICOS: "Três Picos",
  };

  useEffect(() => {
    async function load() {
      const data = await eventService.getAll();
      setEvents(data); 
    }
    load();
  }, []);

  const handleSelectSort = (value) => {
    setSort(value);
    setOpen(false);
  };

  const handleSelectLocation = (value) => {
    setLocationFilter(value);
    setFilterOpen(false);
  };

  const getFilteredAndSortedEvents = () => {
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth();

    let resultado = [...events];

    if (locationFilter) {
      resultado = resultado.filter((event) => {
        if (!event.localizacao) return false;
        const localFormatado = event.localizacao.toLowerCase();
        
        switch (locationFilter) {
          case "PARNASO":
            return localFormatado.includes("parnaso");
          case "MUNICIPAL":
            return localFormatado.includes("municipal");
          case "VISITANTES":
            return localFormatado.includes("visitantes");
          case "TRES_PICOS":
            return localFormatado.includes("picos");
          default:
            return true;
        }
      });
    }

    if (sort === "ESTE_MES") {
      resultado = resultado.filter((event) => {
        if (!event.cronograma?.data_inicio) return false;
        const dataEv = new Date(event.cronograma.data_inicio + "T00:00:00");
        return dataEv.getFullYear() === anoAtual && dataEv.getMonth() === mesAtual;
      });
    } else if (sort === "PROXIMO_MES") {
      resultado = resultado.filter((event) => {
        if (!event.cronograma?.data_inicio) return false;
        const dataEv = new Date(event.cronograma.data_inicio + "T00:00:00");
        
        const proximoMes = (mesAtual + 1) % 12;
        const anoDoProximoMes = mesAtual === 11 ? anoAtual + 1 : anoAtual;

        return dataEv.getFullYear() === anoDoProximoMes && dataEv.getMonth() === proximoMes;
      });
    }

    resultado.sort((a, b) => {
      const dataA = a.cronograma?.data_inicio ? new Date(a.cronograma.data_inicio + "T00:00:00") : new Date(0);
      const dataB = b.cronograma?.data_inicio ? new Date(b.cronograma.data_inicio + "T00:00:00") : new Date(0);

      switch (sort) {
        case "PROXIMOS":
        case "ESTE_MES":
        case "PROXIMO_MES":
          return dataA - dataB;
        case "AZ":
          return a.nome.localeCompare(b.nome);
        default:
          return 0;
      }
    });

    return resultado;
  };

  const displayEvents = getFilteredAndSortedEvents();

  return (
    <>
      <PageHeader
        title="Eventos e Atividades"
        subtitle="Participe de workshops e observações guiadas nos parques de Teresópolis."
      />
      
      <main className={styles.container}>
        <div className={styles.actionsContainer}>
          
          {}
          <div className={styles.dropdown}>
            <Button
              shape="pill"
              className={styles.filterButton}
              onClick={() => {
                setFilterOpen((prev) => !prev);
                setOpen(false); 
              }}
              aria-expanded={filterOpen}
            >
              {locationFilter ? (
                `Local: ${locationLabels[locationFilter]}`
              ) : (
                <>
                  <svg 
                    className={styles.filterIcon} 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filtrar
                </>
              )}
            </Button>

            {filterOpen && (
              <div className={styles.menuLeft}>
                <button onClick={() => handleSelectLocation("PARNASO")} className={styles.item}>
                  PARNASO
                </button>
                <button onClick={() => handleSelectLocation("MUNICIPAL")} className={styles.item}>
                  Parque Municipal
                </button>
                <button onClick={() => handleSelectLocation("VISITANTES")} className={styles.item}>
                  Centro de Visitantes
                </button>
                <button onClick={() => handleSelectLocation("TRES_PICOS")} className={styles.item}>
                  Três Picos
                </button>
                <button 
                  onClick={() => handleSelectLocation(null)} 
                  className={`${styles.item} ${styles.clearFilter}`}
                >
                  Limpar filtro
                </button>
              </div>
            )}
          </div>

          {}
          <div className={styles.dropdown}>
            <Button
              shape="pill"
              className={styles.sortButton}
              onClick={() => {
                setOpen((prev) => !prev);
                setFilterOpen(false); 
              }}
              aria-expanded={open}
            >
              {sortLabels[sort]}
            </Button>

            {open && (
              <div className={styles.menu}>
                <button onClick={() => handleSelectSort("PROXIMOS")} className={styles.item}>
                  Próximos eventos
                </button>
                <button onClick={() => handleSelectSort("ESTE_MES")} className={styles.item}>
                  Este mês
                </button>
                <button onClick={() => handleSelectSort("PROXIMO_MES")} className={styles.item}>
                  Próximo mês
                </button>
                <button onClick={() => handleSelectSort("AZ")} className={styles.item}>
                  Nome A-Z
                </button>
              </div>
            )}
          </div>
        </div>

        {displayEvents.length > 0 ? (
          <ul className={styles.grid}>
            {displayEvents.map((event) => (
              <li key={event.id}>
                <EventCard 
                  event={event} 
                  onDetails={() => setSelectedEvent(event)} 
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noEvents}>Nenhum evento encontrado para este filtro.</p>
        )}
      </main>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}