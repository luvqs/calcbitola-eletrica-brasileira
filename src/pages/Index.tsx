
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SimpleCalculator } from "@/components/SimpleCalculator";
import { AdvancedCalculator } from "@/components/AdvancedCalculator";
import { Logo } from "@/components/Logo";
import { Calculator, Settings } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("simple");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 border-b border-slate-100">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Logo size="lg" className="hover-scale" />
          <div className="text-lg font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Calculadora de Bitola de Fios Elétricos
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-5xl mx-auto">
          <section className="mb-10 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-5">
              Cálculo de Bitola de Fios Elétricos
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Dimensionamento de condutores elétricos conforme a NBR 5410 para instalações
              seguras e eficientes.
            </p>
          </section>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-2xl">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-6 pt-6">
                <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl">
                  <TabsTrigger 
                    value="simple" 
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200"
                  >
                    <Calculator size={18} />
                    Calculadora Simples
                  </TabsTrigger>
                  <TabsTrigger 
                    value="advanced"
                    className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md transition-all duration-200"
                  >
                    <Settings size={18} />
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
      <footer className="w-full bg-white shadow-inner py-6 mt-8 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="text-sm font-medium text-slate-600">
                Cálculos conforme NBR 5410
              </span>
            </div>
            <div className="text-sm text-slate-600 flex items-center gap-1">
              Desenvolvido por{" "}
              <a 
                href="https://lucasvasques.com.br/contato/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105 ml-1"
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
