import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import ParkService from "../../../../services/parkService";

export function ParksManager() {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadParks = async () => {
    try {
      setLoading(true);
      const data = await ParkService.getAll();
      setParks(data);
    } catch (error) {
      console.error("Erro ao buscar parques:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParks();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Deseja realmente excluir este parque?")) {
      try {
        await ParkService.delete(id);
        setParks((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Erro ao excluir parque:", error);
        alert("Houve um erro ao tentar excluir o parque.");
      }
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
    <GenericManager
      title="Gerenciar Parques"
      subtitle="Visualize, crie, edite e exclua os parques do sistema"
      entityName="Parque"
      data={parks}
      columns={columns}
      onDelete={handleDelete}
      loading={loading}
      createPath="/admin/parques/novo"
      editPathPrefix="/admin/parques"
      searchPlaceholder="Buscar por nome, local..."
    />
  );
}
