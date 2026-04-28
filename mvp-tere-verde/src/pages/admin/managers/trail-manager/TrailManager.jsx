import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import TrailService from "../../../../services/trailService";
import { DeleteModal } from "../../../../components/admin/delete-modal/DeleteModal";
import { toast } from "sonner";

export function TrailsManager() {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [trailToDelete, setTrailToDelete] = useState(null);

  const loadTrails = async () => {
    try {
      setLoading(true);
      const data = await TrailService.getAll();
      setTrails(data);
    } catch (error) {
      console.error("Erro ao buscar trilhas:", error);
      toast.error("Erro ao carregar a lista de trilhas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrails();
  }, []);

  const handleOpenDeleteModal = (id) => {
    setTrailToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await TrailService.delete(trailToDelete);
      setTrails((prev) => prev.filter((p) => p.id !== trailToDelete));
      toast.success("Trilha excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir trilha:", error);
      toast.error("Houve um erro ao tentar excluir a trilha.");
    } finally {
      setIsDeleteModalOpen(false);
      setTrailToDelete(null);
    }
  };

  const columns = [
    { header: "Id", key: "id" },
    { header: "Nome", key: "nome" },
    { header: "Dificuldade", key: "dificuldade" },
    {
      header: "Tempo estimado",
      key: "tempo_estimado_min",
      render: (trail) => <span>{trail.tempo_estimado_min} minutos</span>,
    },
    {
      header: "Status",
      key: "ativo",
      render: (trail) => (
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-tight ${
            trail.ativo
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {trail.ativo ? "Ativa" : "Inativa"}
        </span>
      ),
    },
  ];

  return (
    <>
      <GenericManager
        title="Gerenciar Trilhas"
        subtitle="Visualize, crie, edite e exclua as trilhas do sistema"
        entityName="Trilha"
        data={trails}
        columns={columns}
        onDelete={handleOpenDeleteModal}
        loading={loading}
        createPath="/admin/trilhas/novo"
        editPathPrefix="/admin/trilhas"
        searchPlaceholder="Buscar por nome, dificuldade..."
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Tem certeza que deseja excluir esta trilha? Esta ação é irreversível."
      />
    </>
  );
}
