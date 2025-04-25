
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
        <Label htmlFor="distance" className="text-base">Distância</Label>
        <CircleHelp text="Distância total do circuito em metros (ida e volta)" />
      </div>
      
      <div className="relative">
        <Input
          type="text"
          id="distance"
          value={inputValue}
          onChange={handleChange}
          className="w-full pr-8"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7b738c]">
          m
        </span>
      </div>
    </div>
  );
}
