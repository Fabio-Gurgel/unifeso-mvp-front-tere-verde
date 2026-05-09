import { Route, MapPin, UsersRound, Activity } from "lucide-react";

export const IntroTrails = [
    {
        id: 1,
        icon: <Route />,
        title: "Tipo de percurso",
        field: "tipo_percurso",
        render: (val) => {
            if (!val) return "Sem informação disponível";
            return val
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
        },
    },
    {
        id: 2, 
        icon: <UsersRound />,
        title: "Exige guia",
        field: "exige_guia",
        format: (value) => (value ? "Sim" : "Não"),
    },
    {
        id: 3,
        icon: <MapPin />,
        title: "Coordenadas",
        field: "coordenadas",
        render: (val) => {
            if (!val || typeof val !== "object") {
                return "Sem informação disponível";
            }
            return `lat: ${val.lat}, lng: ${val.lng}`;
        },
    },
    {
        id: 4,
        icon: <Activity />,
        title: "Status",
        field: "ativo",
        format: (value) => (value ? "Ativo" : "Inativo"),
    },
];