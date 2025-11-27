import { Server, Plus, Shield, Key } from "lucide-react";

const CustomServers = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
            Business & Enterprise
          </span>
        </div>
        
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Egyéni MCP szerverek
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A teljes rugalmasság érdekében egyéni MCP szervereket is csatlakoztathatsz, 
          hogy belső vagy harmadik féltől származó rendszereket integrálj – ideális privát API-khoz, 
          belső CRM-ekhez vagy egyéni adatforrásokhoz.
        </p>

        <div className="bg-card rounded-2xl p-8 shadow-card">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Egyéni MCP szerver csatlakoztatása
          </h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Server className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">1. Navigálj az integrációkhoz</p>
                <p className="text-muted-foreground text-sm">
                  Menj a <strong>Settings → Integrations</strong> menübe.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">2. Adj hozzá új szervert</p>
                <p className="text-muted-foreground text-sm">
                  Kattints az <strong>Add</strong> gombra a <strong>New MCP server</strong> mellett.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">3. Add meg a szerver adatait</p>
                <ul className="text-muted-foreground text-sm space-y-1 mt-2">
                  <li>• <strong>Server name</strong>: Egyértelmű név (pl. "Belső CRM" vagy "Analytics API")</li>
                  <li>• <strong>Server URL</strong>: A cím, ahol a Lovable eléri az MCP szerveredet</li>
                  <li>• <strong>Authentication</strong>: Bearer token vagy API kulcs, ha szükséges</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">4. Kattints az Add server gombra</p>
                <p className="text-muted-foreground text-sm">
                  Az egyéni MCP szerver megjelenik a listában, és kontextuális adatokat biztosíthat a buildekhez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomServers;
