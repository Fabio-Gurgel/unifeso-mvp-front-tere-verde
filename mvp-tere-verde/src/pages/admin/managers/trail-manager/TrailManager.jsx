import { useState, useEffect } from "react";
import { GenericManager } from "../../../../components/admin/generic-manager/GenericManager";
import TrailService from "../../../../services/trailService";

export function TrailsManager() {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTrails = async () => {
    try {
      setLoading(true);
      const data = await TrailService.getAll();
      setTrails(data);
    } catch (error) {
      console.error("Erro ao buscar trilhas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrails();
  }, []);

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
    <GenericManager
      title="Gerenciar Trilhas"
      entityName="Trilha"
      gender="f"
      data={trails}
      setData={setTrails}
      service={TrailService}
      columns={columns}
      loading={loading}
      createPath="/admin/trilhas/novo"
      editPathPrefix="/admin/trilhas"
    />
  );
}
