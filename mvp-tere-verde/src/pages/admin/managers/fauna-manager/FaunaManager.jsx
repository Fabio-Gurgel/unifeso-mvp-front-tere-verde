import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import FaunaService from "../../../../services/faunaService";
import { DeleteModal } from "../../../../components/admin/delete-modal/DeleteModal";
import { toast } from "sonner";

export function FaunasManager() {
  const [faunas, setFaunas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [faunaToDelete, setFaunaToDelete] = useState(null);

  const loadFaunas = async () => {
    try {
      setLoading(true);
      const data = await FaunaService.getAll();
      setFaunas(data);
    } catch (error) {
      console.error("Erro ao buscar faunas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await FaunaService.delete(faunaToDelete);
      setFaunas((prev) => prev.filter((p) => p.id !== faunaToDelete));
      toast.success("Fauna removido com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir fauna:", error);
      toast.error("Houve um erro ao tentar excluir a fauna.");
    } finally {
      setIsDeleteModalOpen(false);
      setFaunaToDelete(null);
    }
  };

  useEffect(() => {
    loadFaunas();
  }, []);

  const handleOpenDeleteModal = (id) => {
    setFaunaToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const columns = [
    { header: "Id", key: "id" },
    { header: "Nome popular", key: "nome_popular" },
    { header: "Nome científico", key: "nome_cientifico" },
    { header: "Status conservação", key: "status_conservacao" }
  ];

  return (
    <>
      <GenericManager
        title="Gerenciar Faunas"
        subtitle="Visualize, crie, edite e exclua os faunas do sistema"
        entityName="Fauna"
        data={faunas}
        columns={columns}
        onDelete={handleOpenDeleteModal}
        loading={loading}
        createPath="/admin/faunas/novo"
        editPathPrefix="/admin/faunas"
        searchPlaceholder="Buscar por nome popular, científico..."
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Tem certeza que deseja excluir esta fauna? Esta ação é irreversível."
      />
    </>
  );
}
