import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import EventService from "../../../../services/EventService";
import { DeleteModal } from "../../../../components/admin/delete-modal/DeleteModal";
import { toast } from "sonner";

export function EventsManager() {
  const [Events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

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

  const handleConfirmDelete = async () => {
    try {
      await EventService.delete(eventToDelete);
      setEvents((prev) => prev.filter((p) => p.id !== eventToDelete));
      toast.success("Evento removido com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      toast.error("Houve um erro ao tentar excluir o evento.");
    } finally {
      setIsDeleteModalOpen(false);
      setEventToDelete(null);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleOpenDeleteModal = (id) => {
    setEventToDelete(id);
    setIsDeleteModalOpen(true);
  };

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
    <>
      <GenericManager
        title="Gerenciar Eventos"
        subtitle="Visualize, crie, edite e exclua os eventos do sistema"
        entityName="Evento"
        data={Events}
        columns={columns}
        onDelete={handleOpenDeleteModal}
        loading={loading}
        createPath="/admin/eventos/novo"
        editPathPrefix="/admin/eventos"
        searchPlaceholder="Buscar por nome, categoria..."
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Tem certeza que deseja excluir este evento? Esta ação é irreversível."
      />
    </>
  );
}
