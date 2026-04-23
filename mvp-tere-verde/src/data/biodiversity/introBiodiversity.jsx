import { Leaf, Mountain, Activity, Heart, SunMoon, Apple } from "lucide-react";

export const introFlora = [
  {
    id: 1,
    icon: <Leaf />,
    title: "Família",
    render: (val) => {
      if (!val) return "Sem informação disponível.";
      return val;
    },
  },
  {
    id: 2,
    icon: <Mountain />,
    title: "Altura média",
    render: (val) => {
      if (!val && val !== 0) return "Sem informação disponível.";
      return `${val} m`;
    },
  },
  {
    id: 3,
    icon: <Activity />,
    title: "Época de floração",
    render: (val) => {
      if (!val) return "Sem informação disponível.";

      return val
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    },
  },
  {
    id: 4,
    icon: <Heart />,
    title: "Uso medicinal",
    render: (val) => {
      if (val === true) return "Possui uso medicinal";
      if (val === false) return "Não possui uso medicinal";
      return "Sem informação disponível.";
    },
  },
];

export const introFauna = [
  {
    id: 1,
    icon: <Leaf />,
    title: "Habitat",
    render: (val) => {
      if (!val) return "Sem informação disponível.";
      return val
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    },
  },
  {
    id: 2,
    icon: <SunMoon />,
    title: "Hábitos",
    render: (val) => {
      if (!val) return "Sem informação disponível.";
      return val
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    },
  },
  {
    id: 3,
    icon: <Apple />,
    title: "Alimentação",
    render: (val) => {
      if (!val) return "Sem informação disponível.";
      return val
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    },
  },
];