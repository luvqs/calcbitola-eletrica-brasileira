
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WireResult } from "@/lib/calculations";

interface DetailedResultDisplayProps {
  result: WireResult;
}

export function DetailedResultDisplay({ result }: DetailedResultDisplayProps) {
  const { 
    wireGauge, 
    calculatedGauge, 
    current, 
    voltageDrop, 
    breakerSize,
    detailedResults,
    correctionFactors
  } = result;

  // Only show if we have detailed results (advanced mode)
  if (!detailedResults) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Resultados Detalhados</h2>
      
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Resultados por Critério</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Critério</TableHead>
                  <TableHead className="text-right">Seção Calculada</TableHead>
                  <TableHead className="text-right">Determinante</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(detailedResults).map(([criterion, value]) => (
                  <TableRow key={criterion}>
                    <TableCell className="font-medium">
                      {criterion === 'currentCapacity' && 'Capacidade de condução de corrente'}
                      {criterion === 'minSection' && 'Seção mínima'}
                      {criterion === 'voltageDrop' && 'Queda de tensão'}
                      {criterion === 'overloadProtection' && 'Proteção contra sobrecarga'}
                      {criterion === 'shortCircuitProtection' && 'Proteção contra curto-circuito'}
                      {criterion === 'indirectContactProtection' && 'Proteção contra contatos indiretos'}
                    </TableCell>
                    <TableCell className="text-right">{value.toFixed(2)} mm²</TableCell>
                    <TableCell className="text-right">
                      {value === calculatedGauge && 
                        <span className="px-2 py-1 rounded-full bg-primary text-white text-xs font-medium">Sim</span>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {correctionFactors && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Fatores de Correção Aplicados</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fator</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(correctionFactors).map(([factor, value]) => (
                    <TableRow key={factor}>
                      <TableCell className="font-medium">
                        {factor === 'temperature' && 'Fator de temperatura'}
                        {factor === 'grouping' && 'Fator de agrupamento'}
                        {factor === 'soilResistivity' && 'Fator de resistividade térmica do solo'}
                        {factor === 'depth' && 'Fator de profundidade'}
                        {factor === 'total' && 'Fator de correção total'}
                      </TableCell>
                      <TableCell className="text-right">{typeof value === 'number' ? value.toFixed(2) : value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Dados Elétricos do Circuito</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Corrente de Projeto</p>
                <p className="text-xl font-semibold">{current?.toFixed(2) || '-'} A</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Queda de Tensão Calculada</p>
                <p className="text-xl font-semibold">{voltageDrop?.percentage?.toFixed(2) || '-'}%</p>
                <p className="text-sm text-muted-foreground">({voltageDrop?.voltage?.toFixed(2) || '-'} V)</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seção Comercial</p>
                <p className="text-xl font-semibold">{wireGauge} mm²</p>
                <p className="text-sm text-muted-foreground">(Calculado: {calculatedGauge?.toFixed(2) || '-'} mm²)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
