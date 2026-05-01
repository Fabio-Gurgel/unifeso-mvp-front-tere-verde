import { Shield, AlertTriangle, Skull, Leaf } from "lucide-react";

export const ConservationMap = {
  "Não ameaçada": {
    color: "#78C841",
    icon: Leaf,
  },
  "Vulnerável": {
    color: "#FFD150",
    icon: Shield,
  },
  "Em perigo": {
    color: "#F77F00",
    icon: AlertTriangle,
  },
  "Em perigo crítico": {
    color: "#9B0F06",
    icon: Skull,
  },
};