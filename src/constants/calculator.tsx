import { UsageType, InstallationType } from "@/types/calculator";
import { LightbulbIcon, Power, Gauge } from "lucide-react";

export const usageTypes: UsageType[] = [
  {
    id: "general_use",
    label: "Uso geral",
    icon: <Power className="w-4 h-4" />,
    defaultPower: 1000,
    suggestions: []
  },
  {
    id: "illumination",
    label: "Iluminação",
    icon: <LightbulbIcon className="w-4 h-4" />,
    defaultPower: 100,
    suggestions: []
  },
  {
    id: "general",
    label: "Tomadas de uso geral",
    icon: <Power className="w-4 h-4" />,
    defaultPower: 600,
    suggestions: []
  },
  {
    id: "shower",
    label: "Chuveiro/Torneira elétrica",
    icon: <Gauge className="w-4 h-4" />,
    defaultPower: 5500,
    suggestions: []
  },
  {
    id: "ac",
    label: "Ar-condicionado",
    icon: <Power className="w-4 h-4" />,
    defaultPower: 1500,
    suggestions: []
  },
  {
    id: "fridge",
    label: "Geladeira/Freezer",
    icon: <Power className="w-4 h-4" />,
    defaultPower: 350,
    suggestions: []
  },
  {
    id: "microwave",
    label: "Micro-ondas/Forno elétrico",
    icon: <Power className="w-4 h-4" />,
    defaultPower: 1500,
    suggestions: []
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
