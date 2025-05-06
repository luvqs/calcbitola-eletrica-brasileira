
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight, AlertCircle } from "lucide-react";
import { calculateWireGauge, type WireResult } from "@/lib/calculations";
import { ResultDisplay } from "@/components/ResultDisplay";
import { usageTypes } from "@/constants/calculator";
import { UsageTypeSelect } from "./calculator/UsageTypeSelect";
import { PowerInput } from "./calculator/PowerInput";
import { VoltageInput } from "./calculator/VoltageInput";
import { DistanceInput } from "./calculator/DistanceInput";
import { InstallationTypeInput } from "./calculator/InstallationTypeInput";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const POWER_LIMIT = 50000; // 50,000 watts maximum
const DISTANCE_LIMIT = 1000; // 1,000 meters maximum

export function SimpleCalculator() {
  const [usageType, setUsageType] = useState("general_use");
  const [power, setPower] = useState(1000);
  const [voltage, setVoltage] = useState("220");
  const [distance, setDistance] = useState(15);
  const [installationType, setInstallationType] = useState("wall");
  const [result, setResult] = useState<WireResult | null>(null);
  const [powerExceeded, setPowerExceeded] = useState(false);
  const [distanceExceeded, setDistanceExceeded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setResult(null);
    setPowerExceeded(false);
    setDistanceExceeded(false);
  }, [usageType, power, voltage, distance, installationType]);

  const handleCalculate = () => {
    if (!power) {
      toast({
        variant: "destructive",
        title: "Campo obrigatório",
        description: "Por favor, preencha a Potência do Equipamento",
      });
      return;
    }

    if (power > POWER_LIMIT) {
      setPowerExceeded(true);
      setDistanceExceeded(false);
      setResult(null);
      return;
    }

    if (distance > DISTANCE_LIMIT) {
      setDistanceExceeded(true);
      setPowerExceeded(false);
      setResult(null);
      return;
    }

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

  const handleUsageTypeChange = (value: string) => {
    setUsageType(value);
    // Find the default power for the selected usage type
    const selectedType = usageTypes.find(type => type.id === value);
    if (selectedType && selectedType.defaultPower) {
      setPower(selectedType.defaultPower);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center gap-3 text-primary">
        <div className="p-2 bg-primary/10 rounded-full">
          <Calculator className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Cálculo Simplificado
        </h2>
      </div>
      
      <Card className="overflow-hidden border-primary/10 shadow-lg transition-all duration-300 hover:shadow-xl rounded-xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
        <CardContent className="pt-6">
          <form className="space-y-6">
            {/* First row - Usage Type and Power */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <UsageTypeSelect 
                usageType={usageType} 
                onUsageTypeChange={handleUsageTypeChange} 
              />
              <PowerInput 
                power={power} 
                onPowerChange={setPower} 
              />
            </div>

            {/* Second row - Voltage and Distance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VoltageInput 
                voltage={voltage} 
                onVoltageChange={setVoltage} 
              />
              <DistanceInput 
                distance={distance} 
                onDistanceChange={setDistance} 
              />
            </div>

            {/* Installation Type */}
            <InstallationTypeInput 
              installationType={installationType} 
              onInstallationTypeChange={setInstallationType} 
            />

            <Button 
              type="button" 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:shadow-xl"
              size="lg"
              onClick={handleCalculate}
            >
              Calcular Bitola do Fio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {powerExceeded && (
        <Alert variant="destructive" className="mt-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <AlertDescription className="text-red-800">
            A calculadora simples só funciona até 50.000W. Para potências maiores, sugerimos utilizar a calculadora avançada ou consultar um profissional.
          </AlertDescription>
        </Alert>
      )}
      
      {distanceExceeded && (
        <Alert variant="destructive" className="mt-4 bg-red-50 border border-red-200 rounded-xl shadow-sm">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <AlertDescription className="text-red-800">
            A calculadora simples só funciona para distâncias até 1.000m. Para distâncias maiores, sugerimos utilizar a calculadora avançada ou consultar um profissional.
          </AlertDescription>
        </Alert>
      )}
      
      {!powerExceeded && !distanceExceeded && result && <ResultDisplay result={result} />}
    </div>
  );
}
