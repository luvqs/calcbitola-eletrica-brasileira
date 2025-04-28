
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

  useEffect(() => {
    setInputValue(distance.toString());
  }, [distance]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setInputValue(value);
    onDistanceChange(Number(value) || 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="distance" className="text-base font-medium text-slate-700">Distância</Label>
        <CircleHelp text="Distância total do circuito em metros (ida e volta)" />
      </div>
      
      <div className="relative">
        <Input
          type="text"
          id="distance"
          value={inputValue}
          onChange={handleChange}
          className="w-full pr-12 rounded-xl border-slate-300 bg-white/80 shadow-sm hover:border-primary/50 focus:border-primary focus:ring focus:ring-primary/30 transition-all"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
          m
        </span>
      </div>
    </div>
  );
}
