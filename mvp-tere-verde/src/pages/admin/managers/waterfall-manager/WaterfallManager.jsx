import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import WaterfallService from "../../../../services/waterfallService";


export function WaterfallsManager() {
  const [waterfalls, setWaterfalls] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWaterfalls = async () => {
    try {
      setLoading(true);
      const data = await WaterfallService.getAll();
      setWaterfalls(data);
    } catch (error) {
      console.error("Erro ao buscar cachoeiras:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWaterfalls();
  }, []);

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
    <GenericManager
      title="Gerenciar Cachoeiras"
      entityName="Cachoeira"
      gender="f"
      data={waterfalls}
      setData={setWaterfalls}
      service={WaterfallService}
      columns={columns}
      loading={loading}
      createPath="/admin/cachoeiras/novo"
      editPathPrefix="/admin/cachoeiras"
    />
  );
}
