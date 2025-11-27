import { Settings, Link2, CheckCircle2 } from "lucide-react";

const SetupGuide = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Hogyan csatlakoztass egy MCP szervert?
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Kövesd ezeket az egyszerű lépéseket az előre épített integrációk beállításához.
        </p>

        <div className="bg-card rounded-2xl p-8 shadow-card mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6">Előre épített szerverek csatlakoztatása</h3>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                1
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Navigálj a beállításokhoz</p>
                <p className="text-muted-foreground text-sm">
                  Menj a <strong>Settings → Integrations → MCP servers</strong> menüpontba.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                2
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Válassz egy MCP szervert</p>
                <p className="text-muted-foreground text-sm">
                  Válaszd ki a kívánt szervert (pl. Notion, Linear vagy Atlassian).
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full gradient-hero flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                3
              </div>
              <div>
                <p className="font-medium text-foreground mb-1">Csatlakozz és adj hozzáférést</p>
                <p className="text-muted-foreground text-sm">
                  Kattints a <strong>Connect</strong> gombra, jelentkezz be, és adj hozzáférést a Lovable számára a fiókodhoz.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-card border-l-4 border-accent">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent" />
            Speciális: n8n beállítás
          </h3>
          <p className="text-muted-foreground mb-4">
            Az n8n esetében további lépések szükségesek:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground text-sm">
                Menj a <strong>Settings → MCP access</strong> menübe, és kapcsold be az <strong>Enable MCP access</strong> opciót (tulajdonosi vagy admin jogosultság szükséges).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground text-sm">
                Minden munkafolyamatnál, amit elérhetővé szeretnél tenni, menj a workflow <strong>Settings</strong> menüjébe, és kapcsold be az <strong>Available in MCP</strong> opciót.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SetupGuide;
