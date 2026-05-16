import styles from "./Events.module.css";
import { useState, useEffect } from "react";
import eventService from "../../services/eventService";

import { PageHeader } from "../../components/page-header/PageHeader";
import { EventCard } from "../../components/cards/event-card/EventCard";
import { EventDetailsModal } from "../../components/modals/event-details-modal/EventDetailsModal";

export function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await eventService.getAll();
      setEvents(data);
    }
    load();
  }, []);

  return (
    <>
      <PageHeader
        title="Eventos e Atividades"
        subtitle="Participe de workshops e observações guiadas nos parques de Teresópolis."
      />
      <main className={styles.container}>
        <ul className={styles.grid}>
          {events.map((event) => (
            <li key={event.id}>
              <EventCard 
                event={event} 
                onDetails={() => setSelectedEvent(event)} 
              />
            </li>
          ))}
        </ul>
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