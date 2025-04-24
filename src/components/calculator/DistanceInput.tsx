import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CircleHelp } from "@/components/CircleHelp";

interface DistanceInputProps {
  distance: number;
  onDistanceChange: (value: number) => void;
}

export function DistanceInput({ distance, onDistanceChange }: DistanceInputProps) {
  const [isEditingDistance, setIsEditingDistance] = useState(false);

  const handleDistanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 100) {
      onDistanceChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base flex items-center gap-2">
          Distância
          <CircleHelp text="Distância entre o quadro de distribuição e o ponto de uso. Para distancias acima de 100m, use a calculadora avançada." />
          {isEditingDistance ? (
            <input
              type="number"
              value={distance}
              onChange={handleDistanceInputChange}
              onBlur={() => setIsEditingDistance(false)}
              className="w-16 inline-block ml-1 px-2 py-0.5 border rounded"
              min="1"
              max="100"
              autoFocus
            />
          ) : (
            <span 
              onClick={() => setIsEditingDistance(true)}
              className="cursor-pointer hover:text-primary ml-1"
            >
              {distance}
            </span>
          )} metros
        </Label>
      </div>
      
      <Slider
        value={[distance]}
        min={1}
        max={100}
        step={1}
        onValueChange={(values) => onDistanceChange(values[0])}
      />
    </div>
  );
}
