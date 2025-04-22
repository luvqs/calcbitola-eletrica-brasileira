
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WireResult } from "@/lib/calculations";

interface ResultDisplayProps {
  result: WireResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const { wireGauge, breakerSize, safetyAlert } = result;
  
  const alertType = safetyAlert.type;
  const AlertIcon = alertType === 'success' ? CircleCheck : CircleX;
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Resultado do Cálculo</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Bitola de Fio Recomendada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs text-white font-bold">Ø</span>
              </div>
              <div>
                <span className="text-2xl font-bold">{wireGauge} mm²</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Espessura do fio necessária para este circuito
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-muted-foreground">Disjuntor Recomendado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-xs text-white font-bold">A</span>
              </div>
              <div>
                <span className="text-2xl font-bold">{breakerSize} A</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Capacidade do disjuntor para proteção do circuito
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Alert 
        className={`
          ${alertType === 'success' ? 'border-green-500 bg-green-50 text-green-800' : ''}
          ${alertType === 'warning' ? 'border-amber-500 bg-amber-50 text-amber-800' : ''}
          ${alertType === 'error' ? 'border-error bg-red-50 text-red-800' : ''}
        `}
      >
        <AlertIcon className="h-4 w-4" />
        <AlertTitle>Alerta de Segurança</AlertTitle>
        <AlertDescription>
          {safetyAlert.message}
        </AlertDescription>
      </Alert>
      
      <div className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
        <Info className="h-4 w-4" />
        <span>Resultado baseado na NBR 5410 - Instalações Elétricas de Baixa Tensão</span>
      </div>
    </div>
  );
}
