
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";
import { calculateWireGauge, type WireResult } from "@/lib/calculations";
import { ResultDisplay } from "@/components/ResultDisplay";
import { usageTypes } from "@/constants/calculator";
import { UsageTypeSelect } from "./calculator/UsageTypeSelect";
import { PowerInput } from "./calculator/PowerInput";
import { VoltageInput } from "./calculator/VoltageInput";
import { DistanceInput } from "./calculator/DistanceInput";
import { InstallationTypeInput } from "./calculator/InstallationTypeInput";

export function SimpleCalculator() {
  const [usageType, setUsageType] = useState("general");
  const [power, setPower] = useState(600);
  const [voltage, setVoltage] = useState("220");
  const [distance, setDistance] = useState(15);
  const [installationType, setInstallationType] = useState("wall");
  const [result, setResult] = useState<WireResult | null>(null);
  const [suggestions, setSuggestions] = useState(usageTypes[1].suggestions);

  useEffect(() => {
    setResult(null);
  }, [usageType, power, voltage, distance, installationType]);

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

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Calculator className="w-5 h-5" />
        <h2 className="text-lg font-medium">Cálculo Simplificado</h2>
      </div>
      
      <Card>
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
                suggestions={suggestions} 
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
