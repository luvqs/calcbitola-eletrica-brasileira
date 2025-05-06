
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleX, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WireResult } from "@/lib/calculations";

interface ResultDisplayProps {
  result: WireResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  const { wireGauge, breakerSize, safetyAlert } = result;
  
  const alertType = safetyAlert.type;
  const AlertIcon = alertType === 'success' ? CircleCheck : 
                    alertType === 'warning' ? AlertTriangle : CircleX;
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Resultado do Cálculo</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden border-primary/10 shadow-lg relative hover-lift rounded-xl">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-secondary pointer-events-none"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-slate-600">Bitola de Fio Recomendada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-md">
                <span className="text-lg text-white font-bold">Ø</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-slate-800">{wireGauge} mm²</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              Espessura do fio necessária para este circuito
            </p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden border-secondary/10 shadow-lg relative hover-lift rounded-xl">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-secondary to-primary pointer-events-none"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-slate-600">Disjuntor Recomendado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center shadow-md">
                <span className="text-lg text-white font-bold">A</span>
              </div>
              <div>
                <span className="text-4xl font-bold text-slate-800">{breakerSize} A</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-3">
              Capacidade do disjuntor para proteção do circuito
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Alert 
        className={`
          ${alertType === 'success' ? 'border-green-500 bg-gradient-to-r from-green-50 to-green-100 text-green-800' : ''}
          ${alertType === 'warning' ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800' : ''}
          ${alertType === 'error' ? 'border-error bg-gradient-to-r from-red-50 to-red-100 text-red-800' : ''}
          shadow-sm rounded-xl
        `}
      >
        <AlertIcon className={`
          h-5 w-5 
          ${alertType === 'success' ? 'text-green-600' : ''}
          ${alertType === 'warning' ? 'text-amber-600' : ''}
          ${alertType === 'error' ? 'text-red-600' : ''}
        `} />
        <AlertTitle className="font-semibold">Alerta de Segurança</AlertTitle>
        <AlertDescription>
          {safetyAlert.message}
        </AlertDescription>
      </Alert>
      
      <div className="space-y-3 text-sm text-slate-600 bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <span>Resultado baseado na NBR 5410 - Instalações Elétricas de Baixa Tensão</span>
        </div>
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-primary" />
          <span>Aviso Legal: Ferramenta para referência de cálculos. Consulte sempre um profissional qualificado.</span>
        </div>
      </div>
    </div>
  );
}
