import { Leaf, MapPinned, Calendar, Activity } from "lucide-react";

export const InfoPark = [
  {
    id: 1,
    icon: <Activity />,
    title: "Status",
    field: "ativo",
    format: (value) => (value ? "Ativo" : "Inativo"),
  },
  {
    id: 2,
    icon: <Leaf />,
    title: "Bioma",
    field: "bioma",
    render: (val) => {
      if (!val) return "Sem informação disponível";
      return val
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    },
  },
  {
    id: 3,
    icon: <MapPinned />,
    title: "Estação de carro",
    field: "distancia_estacionamento_min",
    render: (val) => (val ? `${val} min` : "Sem informação disponível"),
  },
  {
    id: 4,
    icon: <Calendar />,
    title: "Horário",
    field: "horario_operacao",
    render: (val) => {
      if (!val || typeof val !== "object") {
        return "Sem informação disponível";
      }

      const { abertura, fechamento } = val;

      if (!abertura && !fechamento) {
        return "Sem informação disponível";
      }

      return `${abertura ?? "--:--"} - ${fechamento ?? "--:--"}`;
    },
  },
];
