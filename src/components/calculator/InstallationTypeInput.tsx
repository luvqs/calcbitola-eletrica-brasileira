
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CircleHelp } from "@/components/CircleHelp";
import { installationTypes } from "@/constants/calculator";

interface InstallationTypeInputProps {
  installationType: string;
  onInstallationTypeChange: (value: string) => void;
}

export function InstallationTypeInput({
  installationType,
  onInstallationTypeChange,
}: InstallationTypeInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-base">Tipo de Instalação</Label>
        <CircleHelp text="Como os fios serão instalados" />
      </div>
      
      <RadioGroup
        value={installationType}
        onValueChange={onInstallationTypeChange}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {installationTypes.map((type) => (
          <label
            key={type.id}
            htmlFor={type.id}
            className={`border rounded-lg p-4 ${
              installationType === type.id
                ? "border-primary bg-primary/5"
                : "border-border"
            } transition-colors cursor-pointer`}
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
              <div>
                <div className="font-medium">{type.label}</div>
                <p className="text-muted-foreground text-sm">
                  {type.description}
                </p>
              </div>
            </div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
}
