
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { calculateWireGaugeAdvanced, WireResult } from "@/lib/calculations";
import { ResultDisplay } from "@/components/ResultDisplay";
import { DetailedResultDisplay } from "@/components/DetailedResultDisplay";
import { 
  Calculator, 
  Gauge, 
  Settings, 
  Cable, 
  ArrowRight 
} from "lucide-react";
import { CircleHelp } from "@/components/CircleHelp";

export function AdvancedCalculator() {
  // Circuit characteristics
  const [systemType, setSystemType] = useState("mono");
  const [voltage, setVoltage] = useState(220);
  const [frequency, setFrequency] = useState(60);
  const [powerFactor, setPowerFactor] = useState(0.92);

  // Load characteristics
  const [loadMethod, setLoadMethod] = useState("power");
  const [activePower, setActivePower] = useState(2000);
  const [apparentPower, setApparentPower] = useState(2200);
  const [current, setCurrent] = useState(10);
  const [demandFactor, setDemandFactor] = useState(1);
  const [simultaneityFactor, setSimultaneityFactor] = useState(1);

  // Installation characteristics
  const [installationMethod, setInstallationMethod] = useState("B1");
  const [circuitLength, setCircuitLength] = useState(15);
  const [voltageDrop, setVoltageDrop] = useState(4);

  // Conductor characteristics
  const [conductorMaterial, setConductorMaterial] = useState("copper");
  const [insulationType, setInsulationType] = useState("PVC");
  const [ambientTemperature, setAmbientTemperature] = useState(30);
  const [soilTemperature, setSoilTemperature] = useState(20);
  const [soilThermalResistivity, setSoilThermalResistivity] = useState(2.5);

  // Correction factors
  const [circuitGrouping, setCircuitGrouping] = useState(1);
  const [installationDepth, setInstallationDepth] = useState(0.7);

  // Results
  const [result, setResult] = useState<WireResult | null>(null);

  const installationMethods = [
    { id: "A1", label: "A1: Condutores isolados em eletroduto na parede termicamente isolante" },
    { id: "A2", label: "A2: Cabo multipolar em eletroduto na parede termicamente isolante" },
    { id: "B1", label: "B1: Condutores isolados em eletroduto aparente" },
    { id: "B2", label: "B2: Cabo multipolar em eletroduto aparente" },
    { id: "C", label: "C: Cabo multipolar diretamente fixado em parede/teto" },
    { id: "D", label: "D: Cabo multipolar em eletroduto enterrado" },
    { id: "E", label: "E: Cabo multipolar ao ar livre" },
    { id: "F", label: "F: Cabos unipolares justapostos ao ar livre" },
    { id: "G", label: "G: Cabos unipolares espaçados ao ar livre" }
  ];

  const isSubterranean = installationMethod === "D";

  const handleCalculate = () => {
    // Create parameters object for advanced calculation
    const params = {
      systemType,
      voltage,
      frequency,
      powerFactor,
      loadMethod,
      activePower,
      apparentPower,
      current,
      demandFactor,
      simultaneityFactor,
      installationMethod,
      circuitLength,
      voltageDrop,
      conductorMaterial,
      insulationType,
      ambientTemperature,
      soilTemperature: isSubterranean ? soilTemperature : undefined,
      soilThermalResistivity: isSubterranean ? soilThermalResistivity : undefined,
      circuitGrouping,
      installationDepth: isSubterranean ? installationDepth : undefined
    };

    const result = calculateWireGaugeAdvanced(params);
    setResult(result);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Calculator className="w-5 h-5" />
        <h2 className="text-lg font-medium">Cálculo Avançado</h2>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <form className="space-y-8">
            {/* Circuit Characteristics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary font-medium">
                <Gauge className="w-4 h-4" />
                <h3>Características do Circuito</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="systemType">Tipo de Sistema</Label>
                    <CircleHelp text="Selecione o tipo de sistema elétrico" />
                  </div>
                  <Select value={systemType} onValueChange={setSystemType}>
                    <SelectTrigger id="systemType">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dc">Corrente Contínua (CC)</SelectItem>
                      <SelectItem value="mono">Corrente Alternada Monofásica</SelectItem>
                      <SelectItem value="bi">Corrente Alternada Bifásica</SelectItem>
                      <SelectItem value="tri">Corrente Alternada Trifásica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="voltage">Tensão Nominal (V)</Label>
                    <CircleHelp text="Tensão nominal do circuito" />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      id="voltage"
                      value={voltage}
                      onChange={(e) => setVoltage(Number(e.target.value))}
                    />
                    <div className="flex gap-1">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setVoltage(127)}
                        className={voltage === 127 ? "bg-primary/10" : ""}
                      >
                        127V
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setVoltage(220)}
                        className={voltage === 220 ? "bg-primary/10" : ""}
                      >
                        220V
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setVoltage(380)}
                        className={voltage === 380 ? "bg-primary/10" : ""}
                      >
                        380V
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="frequency">Frequência (Hz)</Label>
                    <CircleHelp text="Frequência da rede elétrica" />
                  </div>
                  <Input
                    type="number"
                    id="frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="powerFactor">Fator de Potência</Label>
                    <CircleHelp text="Fator de potência da carga" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      type="number"
                      id="powerFactor"
                      min="0"
                      max="1"
                      step="0.01"
                      value={powerFactor}
                      onChange={(e) => setPowerFactor(Number(e.target.value))}
                    />
                    <div className="flex gap-1">
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPowerFactor(0.8)}
                        className={powerFactor === 0.8 ? "bg-primary/10" : ""}
                      >
                        0.8 (Indutivo)
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPowerFactor(0.92)}
                        className={powerFactor === 0.92 ? "bg-primary/10" : ""}
                      >
                        0.92 (Geral)
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setPowerFactor(1)}
                        className={powerFactor === 1 ? "bg-primary/10" : ""}
                      >
                        1.0 (Resistivo)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Load Characteristics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary font-medium">
                <Gauge className="w-4 h-4" />
                <h3>Características da Carga</h3>
              </div>
              
              <Tabs value={loadMethod} onValueChange={setLoadMethod} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="power">Por Potência</TabsTrigger>
                  <TabsTrigger value="current">Por Corrente</TabsTrigger>
                </TabsList>
                
                <TabsContent value="power" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="activePower">Potência Ativa (W)</Label>
                        <CircleHelp text="Potência ativa total do circuito" />
                      </div>
                      <Input
                        type="number"
                        id="activePower"
                        value={activePower}
                        onChange={(e) => setActivePower(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="apparentPower">Potência Aparente (VA)</Label>
                        <CircleHelp text="Potência aparente total do circuito" />
                      </div>
                      <Input
                        type="number"
                        id="apparentPower"
                        value={apparentPower}
                        onChange={(e) => setApparentPower(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="current" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="current">Corrente de Projeto (A)</Label>
                      <CircleHelp text="Corrente de projeto do circuito" />
                    </div>
                    <Input
                      type="number"
                      id="current"
                      value={current}
                      onChange={(e) => setCurrent(Number(e.target.value))}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="demandFactor">Fator de Demanda</Label>
                    <CircleHelp text="Fator de demanda aplicável ao circuito" />
                  </div>
                  <Input
                    type="number"
                    id="demandFactor"
                    min="0"
                    max="1"
                    step="0.01"
                    value={demandFactor}
                    onChange={(e) => setDemandFactor(Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="simultaneityFactor">Fator de Simultaneidade</Label>
                    <CircleHelp text="Fator de simultaneidade para múltiplas cargas" />
                  </div>
                  <Input
                    type="number"
                    id="simultaneityFactor"
                    min="0"
                    max="1"
                    step="0.01"
                    value={simultaneityFactor}
                    onChange={(e) => setSimultaneityFactor(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
            
            {/* Installation Characteristics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary font-medium">
                <Settings className="w-4 h-4" />
                <h3>Características da Instalação</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="installationMethod">Método de Instalação</Label>
                  <CircleHelp text="Método de instalação conforme tabelas da NBR 5410" />
                </div>
                <Select value={installationMethod} onValueChange={setInstallationMethod}>
                  <SelectTrigger id="installationMethod">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    {installationMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="circuitLength">
                      Comprimento do Circuito: {circuitLength} m
                    </Label>
                    <CircleHelp text="Comprimento total do circuito" />
                  </div>
                  <Slider
                    id="circuitLength"
                    value={[circuitLength]}
                    min={1}
                    max={200}
                    step={1}
                    onValueChange={(values) => setCircuitLength(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="voltageDrop">
                      Queda de Tensão Máxima: {voltageDrop}%
                    </Label>
                    <CircleHelp text="Queda de tensão máxima admissível conforme NBR 5410" />
                  </div>
                  <Slider
                    id="voltageDrop"
                    value={[voltageDrop]}
                    min={1}
                    max={7}
                    step={0.5}
                    onValueChange={(values) => setVoltageDrop(values[0])}
                  />
                </div>
              </div>
            </div>
            
            {/* Conductor Characteristics */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary font-medium">
                <Cable className="w-4 h-4" />
                <h3>Características do Condutor</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="block">Material do Condutor</Label>
                  <RadioGroup
                    value={conductorMaterial}
                    onValueChange={setConductorMaterial}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="copper" id="copper" />
                      <Label htmlFor="copper">Cobre</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="aluminum" id="aluminum" />
                      <Label htmlFor="aluminum">Alumínio</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="insulationType">Tipo de Isolação</Label>
                    <CircleHelp text="Tipo de isolação do condutor" />
                  </div>
                  <Select value={insulationType} onValueChange={setInsulationType}>
                    <SelectTrigger id="insulationType">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PVC">PVC (70°C)</SelectItem>
                      <SelectItem value="EPR">EPR (90°C)</SelectItem>
                      <SelectItem value="XLPE">XLPE (90°C)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="ambientTemperature">
                      Temperatura Ambiente: {ambientTemperature}°C
                    </Label>
                    <CircleHelp text="Temperatura ambiente no local da instalação" />
                  </div>
                  <Slider
                    id="ambientTemperature"
                    value={[ambientTemperature]}
                    min={0}
                    max={60}
                    step={1}
                    onValueChange={(values) => setAmbientTemperature(values[0])}
                  />
                </div>
                
                {isSubterranean && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="soilTemperature">
                          Temperatura do Solo: {soilTemperature}°C
                        </Label>
                        <CircleHelp text="Temperatura do solo para instalações subterrâneas" />
                      </div>
                      <Slider
                        id="soilTemperature"
                        value={[soilTemperature]}
                        min={0}
                        max={40}
                        step={1}
                        onValueChange={(values) => setSoilTemperature(values[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="soilThermalResistivity">
                          Resistividade Térmica do Solo: {soilThermalResistivity} K.m/W
                        </Label>
                        <CircleHelp text="Resistividade térmica do solo" />
                      </div>
                      <Slider
                        id="soilThermalResistivity"
                        value={[soilThermalResistivity]}
                        min={0.5}
                        max={5}
                        step={0.1}
                        onValueChange={(values) => setSoilThermalResistivity(values[0])}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Correction Factors */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary font-medium">
                <Settings className="w-4 h-4" />
                <h3>Fatores de Correção</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="circuitGrouping">Agrupamento de Circuitos</Label>
                    <CircleHelp text="Número de circuitos agrupados" />
                  </div>
                  <Select 
                    value={circuitGrouping.toString()} 
                    onValueChange={(value) => setCircuitGrouping(Number(value))}
                  >
                    <SelectTrigger id="circuitGrouping">
                      <SelectValue placeholder="Selecione a quantidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 20].map((value) => (
                        <SelectItem key={value} value={value.toString()}>
                          {value} {value === 1 ? 'circuito' : 'circuitos'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {isSubterranean && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="installationDepth">
                        Profundidade de Instalação: {installationDepth} m
                      </Label>
                      <CircleHelp text="Profundidade da instalação subterrânea" />
                    </div>
                    <Slider
                      id="installationDepth"
                      value={[installationDepth]}
                      min={0.5}
                      max={2}
                      step={0.1}
                      onValueChange={(values) => setInstallationDepth(values[0])}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              type="button" 
              className="w-full" 
              size="lg"
              onClick={handleCalculate}
            >
              Calcular Bitola do Fio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <>
          <ResultDisplay result={result} />
          <DetailedResultDisplay result={result} />
        </>
      )}
    </div>
  );
}
