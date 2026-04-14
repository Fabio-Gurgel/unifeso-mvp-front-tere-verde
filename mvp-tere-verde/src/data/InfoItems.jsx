import { MapPin, Calendar, Info, CloudSun } from "lucide-react";

export const InfoItems = [
  {
    id: 1,
    icon: <MapPin />,
    title: "Informações sobre trilhas",
    description:
      "Consulte dados completos sobre dificuldade, distância, tempo estimado e condições atuais de cada trilha.",
  },
  {
    id: 2,
    icon: <Info />,
    title: "Biodiversidade",
    description:
      "Explore informações sobre a fauna e flora local, com guias de identificação de espécies nativas.",
  },
  {
    id: 3,
    icon: <Calendar />,
    title: "Eventos e atividades",
    description:
      "Fique por dentro de eventos, palestras, trilhas guiadas e atividades educativas nos parques.",
  },
  {
    id: 4,
    icon: <CloudSun />,
    title: "Condições em tempo real",
    description:
      "Acesse informações atualizadas sobre clima, estado das trilhas e avisos importantes para sua segurança.",
  },
];
