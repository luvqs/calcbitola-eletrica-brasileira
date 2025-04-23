
import { UsageType, InstallationType } from "@/types/calculator";
import { LightbulbIcon, Power, Gauge } from "lucide-react";

export const usageTypes: UsageType[] = [
  {
    id: "illumination",
    label: "Iluminação",
    icon: <LightbulbIcon className="w-4 h-4" />,
    defaultPower: 100,
    suggestions: [60, 100, 150, 200]
  },
  {
    id: "general",
    label: "Tomadas de uso geral",
    icon: <Power className="w-4 h-4" />,
    defaultPower: 600,
    suggestions: [600, 1000, 1500, 2000]
  },
  {
    id: "shower",
    label: "Chuveiro/Torneira elétrica",
    icon: <Gauge className="w-4 h-4" />,
    defaultPower: 5500,
    suggestions: [4400, 5500, 6800, 7500]
  },
  {
    id: "ac",
    label: "Ar-condicionado",
    icon: <Power className="w-4 h-4" />,
    defaultPower: 1500,
    suggestions: [1000, 1500, 2500, 3500]
  },
  {
    id: "fridge",
    label: "Geladeira/Freezer",
    icon: <Power className="w-4 h-4" />,
    defaultPower: 350,
    suggestions: [250, 350, 500, 700]
  },
  {
    id: "microwave",
    label: "Micro-ondas/Forno elétrico",
    icon: <Power className="w-4 h-4" />,
    defaultPower: 1500,
    suggestions: [1000, 1500, 2000, 3000]
  }
];

export const installationTypes: InstallationType[] = [
  {
    id: "wall",
    label: "Embutida na parede",
    description: "Fios dentro da parede em eletrodutos ou diretamente embutidos"
  },
  {
    id: "apparent",
    label: "Aparente",
    description: "Fios externos, visíveis em canaletas ou eletrodutos"
  },
  {
    id: "underground",
    label: "Subterrânea",
    description: "Fios enterrados no solo em eletrodutos"
  }
];
