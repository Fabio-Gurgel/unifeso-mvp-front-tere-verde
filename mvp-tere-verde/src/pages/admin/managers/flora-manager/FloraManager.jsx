import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import FloraService from "../../../../services/floraService";
import { DeleteModal } from "../../../../components/admin/delete-modal/DeleteModal";
import { toast } from "sonner";

export function FlorasManager() {
  const [floras, setFloras] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [floraToDelete, setFloraToDelete] = useState(null);

  const loadFloras = async () => {
    try {
      setLoading(true);
      const data = await FloraService.getAll();
      setFloras(data);
    } catch (error) {
      console.error("Erro ao buscar floras:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFloras();
  }, []);

  const handleOpenDeleteModal = (id) => {
    setFloraToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await FloraService.delete(floraToDelete);
      setFloras((prev) => prev.filter((p) => p.id !== floraToDelete));
      toast.success("Flora removida com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir flora:", error);
      toast.error("Houve um erro ao tentar excluir a flora.");
    } finally {
      setIsDeleteModalOpen(false);
      setFloraToDelete(null);
    }
  };

  const columns = [
    { header: "Id", key: "id" },
    { header: "Nome Popular", key: "nome_popular" },
    { header: "Nome científico", key: "nome_cientifico" },
    {
      header: "Medicinal",
      key: "medicinal",
      render: (flora) => (
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-tight ${
            flora.medicinal
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {flora.medicinal ? "Sim" : "Não"}
        </span>
      )
    }
  ];

  return (
    <>
      <GenericManager
        title="Gerenciar Floras"
        subtitle="Visualize, crie, edite e exclua as floras do sistema"
        entityName="Flora"
        data={floras}
        columns={columns}
        onDelete={handleOpenDeleteModal}
        loading={loading}
        createPath="/admin/floras/novo"
        editPathPrefix="/admin/floras"
        searchPlaceholder="Buscar por nome popular, científico..."
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Tem certeza que deseja excluir esta flora? Esta ação é irreversível."
      />
    </>
  );
}
