import { TriangleAlert, Accessibility, Shield, Activity } from "lucide-react";

export const IntroWaterfalls = [
    {
        id: 1,
        icon: <TriangleAlert />,
        title: "Risco de tromba d'água",
        field: "risco_tromba_dagua",
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
        icon: <Shield />,
        title: "Salva vidas",
        field: "presenca_salvavidas",
        format: (value) => (value ? "Sim" : "Não"),
    },
    {
        id: 3,
        icon: <Accessibility />,
        title: "Acesso PCD",
        field: "acesso_deficientes",
        format: (value) => (value ? "Sim" : "Não"),
    },
    {
        id: 4,
        icon: <Activity />,
        title: "Status",
        field: "ativo",
        format: (value) => (value ? "Aberta" : "Fechada"),
    },
];