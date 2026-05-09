import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import FloraService from "../../../../services/floraService";

export function FlorasManager() {
  const [floras, setFloras] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <GenericManager
      title="Gerenciar Floras"
      entityName="Flora"
      gender="f"
      data={floras}
      setData={setFloras}
      service={FloraService}
      columns={columns}
      loading={loading}
      createPath="/admin/floras/novo"
      editPathPrefix="/admin/floras"
    />
  );
}
