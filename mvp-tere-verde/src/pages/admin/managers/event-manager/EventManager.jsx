import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import EventService from "../../../../services/EventService";

export function EventsManager() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await EventService.getAll();
      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const columns = [
    { header: "Id", key: "id" },
    { header: "Nome", key: "nome" },
    { header: "Categoria", key: "categoria" },
    { header: "Status de confirmação", key: "status" },
    {
      header: "Status",
      key: "ativo",
      render: (event) => (
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-tight ${
            event.ativo
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {event.ativo ? "Ativo" : "Inativo"}
        </span>
      ),
    },
  ];

  return (
    <GenericManager
      title="Gerenciar Eventos"
      entityName="Evento"
      gender="m"
      data={events}
      setData={setEvents}
      service={EventService}
      columns={columns}
      loading={loading}
      createPath="/admin/eventos/novo"
      editPathPrefix="/admin/eventos"
    />
  );
}
