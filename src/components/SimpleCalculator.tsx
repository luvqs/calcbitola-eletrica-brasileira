
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { calculateWireGauge, WireResult } from "@/lib/calculations";
import { ResultDisplay } from "@/components/ResultDisplay";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator,
  LightbulbIcon, 
  Power, 
  Gauge, 
  Cable, 
  ArrowRight, 
  Info 
} from "lucide-react";
import { CircleHelp } from "@/components/CircleHelp";

const usageTypes = [
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

const installationTypes = [
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

export function SimpleCalculator() {
  const [usageType, setUsageType] = useState("general");
  const [power, setPower] = useState(600);
  const [voltage, setVoltage] = useState("220");
  const [distance, setDistance] = useState(15);
  const [installationType, setInstallationType] = useState("wall");
  const [result, setResult] = useState<WireResult | null>(null);
  const [suggestions, setSuggestions] = useState(usageTypes[1].suggestions);

  const handleUsageTypeChange = (value: string) => {
    setUsageType(value);
    const selectedType = usageTypes.find(type => type.id === value);
    if (selectedType) {
      setPower(selectedType.defaultPower);
      setSuggestions(selectedType.suggestions);
    }
  };

  const handleCalculate = () => {
    const wireResult = calculateWireGauge({
      type: usageType,
      power: power,
      voltage: parseInt(voltage),
      distance: distance,
      installationType: installationType,
      isSimpleCalculation: true
    });
    
    setResult(wireResult);
  };

  const selectedUsageType = usageTypes.find(type => type.id === usageType);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Calculator className="w-5 h-5" />
        <h2 className="text-lg font-medium">Cálculo Simplificado</h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <form className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="usageType" className="text-base">
                  Tipo de Uso
                </Label>
                <CircleHelp text="Selecione o tipo de equipamento ou circuito que você deseja instalar" />
              </div>
              
              <Select value={usageType} onValueChange={handleUsageTypeChange}>
                <SelectTrigger id="usageType" className="w-full">
                  <SelectValue placeholder="Selecione o tipo de uso" />
                </SelectTrigger>
                <SelectContent>
                  {usageTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id} className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {type.icon}
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="power" className="text-base">
                  Potência do Equipamento (Watts)
                </Label>
                <CircleHelp text="Potência do equipamento em Watts. Verifique na etiqueta do produto ou manual." />
              </div>
              
              <div className="space-y-2">
                <Input
                  type="number"
                  id="power"
                  value={power}
                  onChange={(e) => setPower(Number(e.target.value))}
                  className="w-full"
                />
                
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((value) => (
                    <Button
                      key={value}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setPower(value)}
                      className={power === value ? "bg-primary/10" : ""}
                    >
                      {value} W
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base">Tensão da Rede</Label>
                <CircleHelp text="Tensão da rede elétrica disponível no local da instalação" />
              </div>
              
              <RadioGroup
                value={voltage}
                onValueChange={setVoltage}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="127" id="127v" />
                  <Label htmlFor="127v">127V</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="220" id="220v" />
                  <Label htmlFor="220v">220V</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base">
                  Distância: {distance} metros
                </Label>
                <CircleHelp text="Distância entre o quadro de distribuição e o ponto de uso" />
              </div>
              
              <Slider
                value={[distance]}
                min={1}
                max={100}
                step={1}
                onValueChange={(values) => setDistance(values[0])}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base">Tipo de Instalação</Label>
                <CircleHelp text="Como os fios serão instalados" />
              </div>
              
              <RadioGroup
                value={installationType}
                onValueChange={setInstallationType}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {installationTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`border rounded-lg p-4 ${
                      installationType === type.id
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    } transition-colors`}
                  >
                    <div className="flex items-start space-x-2">
                      <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                      <div>
                        <Label htmlFor={type.id} className="font-medium">
                          {type.label}
                        </Label>
                        <p className="text-muted-foreground text-sm">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button 
              type="button" 
              className="w-full" 
              size="lg"
              onClick={handleCalculate}
            >
              Calcular Bitola do Fio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && <ResultDisplay result={result} />}
    </div>
  );
}
