import { Route, Clock, TrendingUp } from "lucide-react";

export const TrailsMetrics = [
    {
        id: 1,
        icon: <Route />,
        title: "Distância",
        value: (trail) => 
            `${(trail.distancia_total_m / 1000)} km`,
    },
    {
        id: 2,
        icon: <Clock />,
        title: "Tempo",
        value: (trail) => 
            trail.tempo_estimado_min >= 60
               ? `${Math.floor(trail.tempo_estimado_min / 60)} h`
               : `${trail.tempo_estimado_min} min`, 
    },
    {
        id: 3,
        icon: <TrendingUp />,
        title: "Elevação",
        value: (trail) =>
            `${trail.ganho_elevacao_m} m`,
    }
]