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

  const columns = [
    { header: "Id", key: "id" },
    { header: "Nome popular", key: "nome_popular" },
    { header: "Nome científico", key: "nome_cientifico" },
    { header: "Status conservação", key: "status_conservacao" }
  ];

  return (
    <GenericManager
      title="Gerenciar Faunas"
      entityName="Fauna"
      gender="f"
      data={faunas}
      setData={setFaunas}
      service={FaunaService}
      columns={columns}
      loading={loading}
      createPath="/admin/faunas/novo"
      editPathPrefix="/admin/faunas"
    />
  );
}
