
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleHelp } from "@/components/CircleHelp";
import { useState, useEffect } from "react";

interface PowerInputProps {
  power: number;
  onPowerChange: (value: number) => void;
}

export function PowerInput({ power, onPowerChange }: PowerInputProps) {
  const [inputValue, setInputValue] = useState(power.toString());

  useEffect(() => {
    setInputValue(power.toString());
  }, [power]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setInputValue(value);
    onPowerChange(Number(value) || 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="power" className="text-base font-medium text-slate-700">
          Potência do Equipamento (Watts)
        </Label>
        <CircleHelp text="Potência do equipamento em Watts. Verifique na etiqueta do produto ou manual." />
      </div>
      
      <div className="relative">
        <Input
          type="text"
          id="power"
          value={inputValue}
          onChange={handleChange}
          className="w-full pr-12 rounded-xl border-slate-300 bg-white/80 shadow-sm hover:border-primary/50 focus:border-primary focus:ring focus:ring-primary/30 transition-all"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
          W
        </span>
      </div>
    </div>
  );
}
