import { TrendingUp, Droplet, WavesIcon } from "lucide-react";

export const WaterfallsMetrics = [
    {
        id: 1,
        icon: <TrendingUp />,
        title: "ALTURA",
        value: (waterfall) => `${(waterfall.altura_queda_m)} m`,
    },
    {
        id: 2,
        icon: <Droplet />,
        title: "PROFUNDIDADE",
        value: (waterfall) => `${(waterfall.profundidade_max_poco_m)} m`,
    },
    {
        id: 3,
        icon: <WavesIcon />,
        title: "BANHO",
        field: "pode_banhar",
        format: (value) => (value ? "Sim" : "Não")
    },
];