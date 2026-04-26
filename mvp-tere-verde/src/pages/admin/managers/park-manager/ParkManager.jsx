import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import { DeleteModal } from "../../../../components/admin/delete-modal/DeleteModal";
import ParkService from "../../../../services/parkService";
import { toast } from "sonner";

export function ParksManager() {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parkToDelete, setParkToDelete] = useState(null);

  const loadParks = async () => {
    try {
      setLoading(true);
      const data = await ParkService.getAll();
      setParks(data);
    } catch (error) {
      console.error("Erro ao buscar parques:", error);
      toast.error("Erro ao carregar a lista de parques.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParks();
  }, []);

  const handleOpenModal = (id) => {
    setParkToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      alert("Parque removido com sucesso!")
      await ParkService.delete(parkToDelete);
      setParks((prev) => prev.filter((p) => p.id !== parkToDelete));
      toast.success("Parque removido com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir parque:", error);
      toast.error("Houve um erro ao tentar excluir o parque.");
    } finally {
      setIsModalOpen(false);
      setParkToDelete(null);
    }
  };

  const columns = [
    { header: "Id", key: "id" },
    { header: "Nome", key: "nome" },
    { header: "Localização", key: "localizacao" },
    { header: "Visitação anual", key: "visitacao_anual" },
    {
      header: "Status",
      key: "ativo",
      render: (park) => (
        <span
          className={`px-2.5 py-0.5 text-xs font-semibold rounded-full uppercase tracking-tight ${
            park.ativo
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {park.ativo ? "Ativo" : "Inativo"}
        </span>
      ),
    },
  ];

  return (
    <>
      <GenericManager
        title="Gerenciar Parques"
        subtitle="Visualize, crie, edite e exclua os parques do sistema"
        entityName="Parque"
        data={parks}
        columns={columns}
        onDelete={handleOpenModal}
        loading={loading}
        createPath="/admin/parques/novo"
        editPathPrefix="/admin/parques"
        searchPlaceholder="Buscar por nome, local..."
      />

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Tem certeza que deseja excluir este parque? Esta ação é irreversível."
      />
    </>
  );
}
