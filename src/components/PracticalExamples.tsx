import { User, Megaphone, Code } from "lucide-react";

const examples = [
  {
    icon: User,
    role: "Termékmenedzser",
    tool: "Linear vagy Jira",
    prompt: "Generálj egy prototípust az aktuális sprint jegyei alapján.",
    outcome: "A Lovable olvassa a jegy leírásokat és elfogadási kritériumokat, hogy illeszkedő, tesztelhető UI-t építsen.",
    color: "primary",
  },
  {
    icon: Megaphone,
    role: "Marketinges",
    tool: "Notion vagy Confluence",
    prompt: "Alakítsd a Q4 kampány briefünket landing oldallá.",
    outcome: "A Lovable a dokumentumot kontextusként használva brand-megfelelő, szerkeszthető oldalt generál.",
    color: "accent",
  },
  {
    icon: Code,
    role: "Fejlesztő",
    tool: "n8n vagy egyéni MCP",
    prompt: "Építs egy workflow UI-t, amely listázza a felhasználókat és lehetővé teszi a törlésüket.",
    outcome: "A Lovable olyan appot épít, amely élő adatokat és munkafolyamatokat használ.",
    color: "primary",
  },
];

const PracticalExamples = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Gyakorlati példák
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Minden csatlakoztatott app azonnal kontextusként válik elérhetővé. 
          Természetes nyelvű promptokkal kommunikálhatsz a csatlakoztatott eszközökkel.
        </p>

        <div className="space-y-6">
          {examples.map((example, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-card transition-all hover:shadow-card-hover"
            >
              <div className={`h-1 ${example.color === "primary" ? "bg-primary" : "bg-accent"}`} />
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    example.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                  }`}>
                    <example.icon className={`w-5 h-5 ${
                      example.color === "primary" ? "text-primary" : "text-accent"
                    }`} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{example.role}</p>
                    <p className="text-sm text-muted-foreground">csatlakoztatva: {example.tool}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Példa prompt
                    </p>
                    <p className="text-sm text-foreground italic">"{example.prompt}"</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Eredmény
                    </p>
                    <p className="text-sm text-foreground">{example.outcome}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticalExamples;
