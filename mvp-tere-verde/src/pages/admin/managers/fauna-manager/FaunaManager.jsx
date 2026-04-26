import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import FaunaService from "../../../../services/faunaService";

export function FaunasManager() {
  const [faunas, setFaunas] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    loadFaunas();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Deseja realmente excluir esta fauna?")) {
      try {
        await FaunaService.delete(id);
        setFaunas((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Erro ao excluir fauna:", error);
        alert("Houve um erro ao tentar excluir a fauna.");
      }
    }
  };

  const columns = [
    { header: "Id", key: "id" },
    { header: "Nome popular", key: "nome_popular" },
    { header: "Nome científico", key: "nome_cientifico" },
    { header: "Status conservação", key: "status_conservacao" }
  ];

  return (
    <GenericManager
      title="Gerenciar Faunas"
      subtitle="Visualize, crie, edite e exclua os faunas do sistema"
      entityName="Fauna"
      data={faunas}
      columns={columns}
      onDelete={handleDelete}
      loading={loading}
      createPath="/admin/faunas/novo"
      editPathPrefix="/admin/faunas"
      searchPlaceholder="Buscar por nome popular, científico..."
    />
  );
}
