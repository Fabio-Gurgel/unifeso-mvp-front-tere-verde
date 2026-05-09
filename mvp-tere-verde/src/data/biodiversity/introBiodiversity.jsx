import { Leaf, Mountain, Activity, Heart, SunMoon, Apple } from "lucide-react";

export const IntroFlora = [
  {
    id: 1,
    icon: <Leaf />,
    title: "Família",
    field: "familia",
    render: (val) => {
      if (!val) return "Sem informação disponível.";
      return val;
    },
  },
  {
    id: 2,
    icon: <Mountain />,
    title: "Altura média",
    field: "altura_media_m",
    render: (val) => {
      if (!val && val !== 0) return "Sem informação disponível.";
      return `${val} m`;
    },
  },
  {
    id: 3,
    icon: <Activity />,
    title: "Época de floração",
    field: "epoca_floracao",
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
    field: "uso_medicinal",
    render: (val) => {
      if (val === true) return "Possui uso medicinal";
      if (val === false) return "Não possui uso medicinal";
      return "Sem informação disponível.";
    },
  },
];

export const IntroFauna = [
  {
    id: 1,
    icon: <Leaf />,
    title: "Habitat",
    field: "habitat",
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
    field: "habitat",
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
    field: "alimentacao",
    render: (val) => {
      if (!val) return "Sem informação disponível.";
      return val
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    },
  },
];