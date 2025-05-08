
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleHelp } from "@/components/CircleHelp";
import { useState, useEffect } from "react";

interface DistanceInputProps {
  distance: number;
  onDistanceChange: (value: number) => void;
}

export function DistanceInput({ distance, onDistanceChange }: DistanceInputProps) {
  const [inputValue, setInputValue] = useState(distance.toString());
  const [isExceeded, setIsExceeded] = useState(false);
  const MAX_DISTANCE = 200; // 200 meters maximum (changed from 1,000)

  useEffect(() => {
    setInputValue(distance.toString());
    setIsExceeded(distance > MAX_DISTANCE);
  }, [distance]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setInputValue(value);
    const numValue = Number(value) || 0;
    setIsExceeded(numValue > MAX_DISTANCE);
    onDistanceChange(numValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="distance" className="text-base font-medium text-slate-700">Distância</Label>
        <CircleHelp text="Distância total do circuito em metros (ida e volta). Máximo de 200 metros." />
      </div>
      
      <div className="relative">
        <Input
          type="text"
          id="distance"
          value={inputValue}
          onChange={handleChange}
          className={`w-full pr-12 rounded-xl border-slate-300 bg-white/80 shadow-sm hover:border-primary/50 focus:border-primary focus:ring focus:ring-primary/30 transition-all ${isExceeded ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
          m
        </span>
      </div>
      {isExceeded && (
        <p className="text-xs text-red-500 mt-1">A distância máxima suportada é de 200 metros.</p>
      )}
    </div>
  );
}
