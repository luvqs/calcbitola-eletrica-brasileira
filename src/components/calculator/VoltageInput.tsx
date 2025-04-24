
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CircleHelp } from "@/components/CircleHelp";

interface VoltageInputProps {
  voltage: string;
  onVoltageChange: (value: string) => void;
}

export function VoltageInput({ voltage, onVoltageChange }: VoltageInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label className="text-base">Tensão da Rede</Label>
        <CircleHelp text="Tensão da rede elétrica disponível no local da instalação" />
      </div>
      
      <RadioGroup
        value={voltage}
        onValueChange={onVoltageChange}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="127" id="127v" />
          <Label htmlFor="127v" className="cursor-pointer">127V</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="220" id="220v" />
          <Label htmlFor="220v" className="cursor-pointer">220V</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
