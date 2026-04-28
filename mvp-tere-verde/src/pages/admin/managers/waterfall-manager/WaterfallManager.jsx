import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import WaterfallService from "../../../../services/waterfallService";
import { DeleteModal } from "../../../../components/admin/delete-modal/DeleteModal";
import { toast } from "sonner";

export function WaterfallsManager() {
  const [waterfalls, setWaterfalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [waterfallToDelete, setWaterfallToDelete] = useState(null);

  const loadWaterfalls = async () => {
    try {
      setLoading(true);
      const data = await WaterfallService.getAll();
      setWaterfalls(data);
    } catch (error) {
      console.error("Erro ao buscar cachoeiras:", error);
      toast.error("Erro ao carregar a lista de cachoeiras.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWaterfalls();
  }, []);

  const handleOpenDeleteModal = (id) => {
    setWaterfallToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await WaterfallService.delete(waterfallToDelete);
      setWaterfalls((prev) => prev.filter((p) => p.id !== waterfallToDelete));
      toast.success("Cachoeira excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cachoeira:", error);
      toast.error("Houve um erro ao tentar excluir a cachoeira.");
    } finally {
      setIsDeleteModalOpen(false);
      setWaterfallToDelete(null);
    }
  };

  const columns = [
    { header: "Id", key: "id" },
    { header: "Nome", key: "nome" },
    { header: "Localização", key: "localizacao" },
    {
      header: "Banhável",
      key: "pode_banhar",
      render: (waterfall) => (
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-tight ${
            waterfall.caracteristicas?.pode_banhar
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {waterfall.caracteristicas?.pode_banhar ? "Sim" : "Não"}
        </span>
      ),
    },
  ];

  return (
    <>
      <GenericManager
        title="Gerenciar Cachoeiras"
        subtitle="Visualize, crie, edite e exclua as cachoeiras do sistema"
        entityName="Cachoeira"
        data={waterfalls}
        columns={columns}
        onDelete={handleOpenDeleteModal}
        loading={loading}
        createPath="/admin/cachoeiras/novo"
        editPathPrefix="/admin/cachoeiras"
        searchPlaceholder="Buscar por nome, local..."
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Tem certeza que deseja excluir esta cachoeira? Esta ação é irreversível."
      />
    </>
  );
}
