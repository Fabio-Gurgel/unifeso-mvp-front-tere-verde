import { TrendingUp, Droplet, TreePine, Binoculars } from "lucide-react";

export const ParkDestach = [
  {
    id: 1,
    icon: <TreePine />,
    title: "Trilhas",
    value: (park) => park.trilhas_relacionadas_ids?.length ?? 0,
  },
  {
    id: 2,
    icon: <Droplet />,
    title: "Cachoeiras",
    value: (park) => park.cachoeiras_relacionadas_ids?.length ?? 0,
  },
  {
    id: 3,
    icon: <Binoculars />,
    title: "Mirantes",
    value: (park) => park.quantidade_mirantes ?? 0,
  },
    {
    id: 4,
    icon: <TrendingUp />,
    title: "Altitude máxima",
    value: (park) =>
      `${new Intl.NumberFormat("pt-BR").format(park.altitude_max_m)} m`,
  }
];