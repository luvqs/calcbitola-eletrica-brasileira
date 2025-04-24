
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { CircleHelp } from "@/components/CircleHelp";

interface DistanceInputProps {
  distance: number;
  onDistanceChange: (value: number) => void;
}

export function DistanceInput({ distance, onDistanceChange }: DistanceInputProps) {
  const [isEditingDistance, setIsEditingDistance] = useState(false);
  const [inputValue, setInputValue] = useState(distance.toString());

  useEffect(() => {
    setInputValue(distance.toString());
  }, [distance]);

  const handleDistanceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
      onDistanceChange(numValue);
    }
  };

  const handleBlur = () => {
    setIsEditingDistance(false);
    // Ensure valid value on blur
    const numValue = parseInt(inputValue);
    if (isNaN(numValue) || numValue < 1 || numValue > 100) {
      setInputValue(distance.toString());
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label className="text-base">Distância</Label>
        <CircleHelp text="Distância entre o quadro de distribuição e o ponto de uso. Para distancias acima de 100m, use a calculadora avançada." />
        {isEditingDistance ? (
          <Input
            type="number"
            value={inputValue}
            onChange={handleDistanceInputChange}
            onBlur={handleBlur}
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
