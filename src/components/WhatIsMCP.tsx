import { Database, FileText, GitBranch } from "lucide-react";

const WhatIsMCP = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
          Mi az MCP?
        </h2>
        
        <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Az <strong className="text-foreground">MCP (Model Context Protocol)</strong> egy nyílt szabvány, 
            amely összekapcsolja az AI rendszereket – mint a Lovable – külső eszközökkel, 
            szolgáltatásokkal és adatforrásokkal.
          </p>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Amikor összekapcsolod a Lovable-t olyan eszközökkel, mint a Notion, Atlassian vagy Linear, 
            a Lovable Agent valós csapat-kontextust használhat a pontosabb kódgeneráláshoz, 
            prototípus-készítéshez és dokumentáció-íráshoz.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-xl p-6 shadow-card transition-all hover:shadow-card-hover">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Strukturált adatok</h3>
            <p className="text-muted-foreground text-sm">
              Dokumentumok, jegyek és diagramok olvasása közvetlenül a csapat eszközeiből.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card transition-all hover:shadow-card-hover">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Automatikus műveletek</h3>
            <p className="text-muted-foreground text-sm">
              Elemek létrehozása és frissítése a kapcsolódó eszközökben támogatott esetekben.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card transition-all hover:shadow-card-hover">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <GitBranch className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Előre épített szerverek</h3>
            <p className="text-muted-foreground text-sm">
              Minden csomagban elérhető, egyéni szerverekkel bővíthető Business és Enterprise csomagokban.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsMCP;
