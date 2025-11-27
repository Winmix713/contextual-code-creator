import { Shield, User, Settings, Users } from "lucide-react";

const Security = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Biztonság és jogosultságok
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Az MCP szerver kapcsolatok felhasználó-alapúak és személyesek. 
          Bármikor áttekintheted vagy visszavonhatod a kapcsolatokat.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Személyes kapcsolatok
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Minden kapcsolat a te fiókodhoz kötött. A kapcsolatokat bármikor áttekintheted 
              vagy visszavonhatod a <strong>Settings → Integrations</strong> menüben.
            </p>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">
                💡 Gyors hozzáférés projekt szinten: kattints a <strong>+</strong> gombra a prompt mezőben, 
                majd válaszd az <strong>Integrations</strong> opciót.
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-3">
              Munkaterület-szintű kezelés
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              <strong>Business</strong> és <strong>Enterprise</strong> csomagokon a munkaterület 
              adminjai és tulajdonosai kezelhetik, mely szerverek érhetők el minden felhasználó számára.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span><strong>Settings → Privacy & Security</strong>: Teljes MCP hozzáférés be/ki</span>
              </li>
              <li className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-accent" />
                <span><strong>Settings → Integrations → Manage servers</strong>: Egyedi szerverek kezelése</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
