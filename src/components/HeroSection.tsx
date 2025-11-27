import { Server, Link2, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      <div className="absolute inset-0 gradient-hero opacity-10" />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
          <Server className="w-4 h-4" />
          <span className="text-sm font-medium">MCP Szerverek Dokumentáció</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          Integráld a Lovable-t a{" "}
          <span className="text-primary">csapatod eszközeivel</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Kapcsold össze a Lovable-t a csapatod eszközeivel, és építs kontextus-vezérelt 
          alkalmazásokat – az ötlettől a validációig, majd az éles appig gyorsabban, mint valaha.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card shadow-card">
            <Link2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Valós idejű integráció</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card shadow-card">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Gyorsabb fejlesztés</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
