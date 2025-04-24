import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleCalculator } from "@/components/SimpleCalculator";
import { AdvancedCalculator } from "@/components/AdvancedCalculator";
import { Logo } from "@/components/Logo";
import { Calculator, Settings } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("simple");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Logo size="lg" />
          <div className="text-sm text-muted-foreground">
            Calculadora de Bitola de Fios Elétricos
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <section className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Cálculo de Bitola de Fios Elétricos
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Dimensionamento de condutores elétricos conforme a NBR 5410 para instalações
              seguras e eficientes.
            </p>
          </section>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-6 pt-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="simple" className="flex items-center gap-2">
                    <Calculator size={16} />
                    Calculadora Simples
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="flex items-center gap-2">
                    <Settings size={16} />
                    Calculadora Avançada
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="simple" className="mt-0">
                  <SimpleCalculator />
                </TabsContent>
                <TabsContent value="advanced" className="mt-0">
                  <AdvancedCalculator />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white shadow-sm py-6 mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-sm text-muted-foreground">
                Cálculos conforme NBR 5410
              </span>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              Desenvolvido por{" "}
              <a 
                href="https://lucasvasques.com.br/contato/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img 
                  src="https://lucasvasques.com.br/wp-content/uploads/2023/12/logo-2024-preto.svg" 
                  alt="Lucas Vasques" 
                  className="h-4 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
