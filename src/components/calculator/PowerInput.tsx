
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleHelp } from "@/components/CircleHelp";

interface PowerInputProps {
  power: number;
  suggestions: number[];
  onPowerChange: (value: number) => void;
}

export function PowerInput({ power, suggestions, onPowerChange }: PowerInputProps) {
  return (
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
          onChange={(e) => onPowerChange(Number(e.target.value))}
          className="w-full"
        />
        
        <div className="flex flex-wrap gap-2">
          {suggestions.map((value) => (
            <Button
              key={value}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onPowerChange(value)}
              className={power === value ? "bg-primary/10" : ""}
            >
              {value} W
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
