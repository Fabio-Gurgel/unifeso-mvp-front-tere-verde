import { Link } from "react-router";
import {
  Mountain,
  TreePine,
  MapPin,
  Calendar,
  LogOut,
  Plus,
} from "lucide-react";

export function DashboardAdm() {
  //   const navigate = useNavigate();

  const stats = [
    {
      label: "Total de Parques",
      value: "4",
      icon: Mountain,
      color: "bg-green-600",
    },
    {
      label: "Trilhas Cadastradas",
      value: "24",
      icon: TreePine,
      color: "bg-blue-600",
    },
    { label: "Cachoeiras", value: "24", icon: MapPin, color: "bg-cyan-600" },
    { label: "Eventos", value: "12", icon: Calendar, color: "bg-purple-600" },
  ];

  const quickActions = [
    {
      title: "Gerenciar Parques",
      description: "Criar, editar ou excluir parques",
      icon: Mountain,
      link: "/admin/parques",
      color: "bg-green-700",
    },
    {
      title: "Gerenciar Trilhas",
      description: "Administrar trilhas dos parques",
      icon: TreePine,
      link: "#",
      color: "bg-blue-700",
    },
    {
      title: "Gerenciar Cachoeiras",
      description: "Administrar cachoeiras dos parques",
      icon: MapPin,
      link: "#",
      color: "bg-cyan-700",
    },
    {
      title: "Eventos",
      description: "Criar e gerenciar eventos",
      icon: Calendar,
      link: "#",
      color: "bg-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="size-6 text-white" />
                </div>
              </div>
              <p className="text-3xl mb-1 text-neutral-800">{stat.value}</p>
              <p className="text-sm text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl text-neutral-800 mb-4">Ações Rápidas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
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
                  {action.title}
                </h3>
                <p className="text-sm text-neutral-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl mb-4 text-neutral-800">Atividades Recentes</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-neutral-200">
              <div className="bg-green-100 p-2 rounded-lg">
                <Plus className="size-5 text-green-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-800">Novo parque criado</p>
                <p className="text-xs text-neutral-500">
                  Parque Nacional da Serra dos Órgãos • Há 2 horas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-neutral-200">
              <div className="bg-blue-100 p-2 rounded-lg">
                <TreePine className="size-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-800">Trilha atualizada</p>
                <p className="text-xs text-neutral-500">
                  Trilha Pedra do Sino • Há 5 horas
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Calendar className="size-5 text-purple-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-800">Evento publicado</p>
                <p className="text-xs text-neutral-500">
                  Caminhada Ecológica • Há 1 dia
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
