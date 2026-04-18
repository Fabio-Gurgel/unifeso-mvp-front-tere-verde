import { Clock, Mountain, Star } from "lucide-react";

export const ParkMetrics = [
  {
    id: 1,
    icon: <Mountain />,
    title: "Área total",
    value: (park) =>
      `${new Intl.NumberFormat("pt-BR").format(park.area_total_ha)} ha`,
  },
  {
    id: 2,
    icon: <Clock />,
    title: "Tempo de visitação",
    value: (park) => {
      const horas = park.tempo_medio_visita_h ?? 0;

      return horas === 1 ? "1h" : `${horas}h`;
    },
  },
  {
    id: 3,
    icon: <Star />,
    title: "Visitação anual",
    value: (park) =>
      `${new Intl.NumberFormat("pt-BR").format(park.visitacao_anual)} por ano`,
  },
];
