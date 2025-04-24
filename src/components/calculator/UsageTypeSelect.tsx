
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CircleHelp } from "@/components/CircleHelp";
import { usageTypes } from "@/constants/calculator";

interface UsageTypeSelectProps {
  usageType: string;
  onUsageTypeChange: (value: string) => void;
}

export function UsageTypeSelect({ usageType, onUsageTypeChange }: UsageTypeSelectProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label htmlFor="usageType" className="text-base">
          Tipo de Uso
        </Label>
        <CircleHelp text="Selecione o tipo de equipamento ou circuito que você deseja instalar" />
      </div>
      
      <Select value={usageType} onValueChange={onUsageTypeChange}>
        <SelectTrigger id="usageType" className="w-full">
          <SelectValue placeholder="Selecione o tipo de uso" />
        </SelectTrigger>
        <SelectContent>
          {usageTypes.map((type) => (
            <SelectItem key={type.id} value={type.id} className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {type.icon}
                <span>{type.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
