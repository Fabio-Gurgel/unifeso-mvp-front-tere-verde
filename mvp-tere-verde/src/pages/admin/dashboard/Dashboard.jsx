import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Trees, Route, Waves, Calendar, Sprout, Squirrel } from "lucide-react";

import ParkService from "../../../services/parkService";
import TrailService from "../../../services/trailService";
import FaunaService from "../../../services/faunaService";
import WaterfallService from "../../../services/waterfallService";
import EventService from "../../../services/eventService";
import FloraService from "../../../services/floraService";

export function DashboardAdm() {
  const [counts, setCounts] = useState({
    parques: 0,
    trilhas: 0,
    cachoeiras: 0,
    eventos: 0,
    fauna: 0,
    flora: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [parques, trilhas, cachoeiras, eventos, fauna, flora] =
          await Promise.all([
            ParkService.getAll(),
            TrailService.getAll(),
            WaterfallService.getAll(),
            EventService.getAll(),
            FaunaService.getAll(),
            FloraService.getAll(),
          ]);

        setCounts({
          parques: parques.length,
          trilhas: trilhas.length,
          cachoeiras: cachoeiras.length,
          eventos: eventos.length,
          fauna: fauna.length,
          flora: flora.length,
        });
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const modules = [
    {
      label: "Parques",
      fullLabel: "Parques cadastrados",
      totalCount: loading ? "..." : counts.parques,
      icon: Trees,
      color: "bg-green-600",
      link: "/admin/parques"
    },
    {
      label: "Trilhas",
      fullLabel: "Trilhas cadastradas",
      totalCount: loading ? "..." : counts.trilhas,
      icon: Route,
      color: "bg-blue-600",
      link: "/admin/trilhas"
    },
    {
      label: "Cachoeiras",
      fullLabel: "Cachoeiras cadastradas",
      totalCount: loading ? "..." : counts.cachoeiras,
      icon: Waves,
      color: "bg-cyan-600",
      link: "/admin/cachoeiras"
    },
    {
      label: "Eventos",
      fullLabel: "Eventos cadastrados",
      totalCount: loading ? "..." : counts.eventos,
      icon: Calendar,
      color: "bg-purple-600",
      link: "/admin/eventos"
    },
    {
      label: "Faunas",
      fullLabel: "Faunas cadastradas",
      totalCount: loading ? "..." : counts.fauna,
      icon: Squirrel,
      color: "bg-yellow-600",
      link: "/admin/fauna"
    },
    {
      label: "Floras",
      fullLabel: "Floras cadastradas",
      totalCount: loading ? "..." : counts.flora,
      icon: Sprout,
      color: "bg-green-400",
      link: "/admin/flora"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl text-neutral-800 mb-4">Registros atuais</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {modules.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 border border-neutral-200/50"
              >
                <div className={`${stat.color} p-2.5 rounded-lg shrink-0`}>
                  <stat.icon className="size-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-semibold text-neutral-800 leading-none">
                    {stat.totalCount}
                  </span>
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider mt-1">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl text-neutral-800 mb-4">Ações Rápidas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {modules.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                >
                  <action.icon className="size-6 text-white" />
                </div>
                <h3 className="text-xl mb-2 text-neutral-800">
                  {action.fullLabel}
                </h3>
                <p className="text-sm text-neutral-600">Criar e gerenciar {action.label.toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
