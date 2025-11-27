import { FileCode, LayoutDashboard, FileText, Workflow } from "lucide-react";

const servers = [
  {
    name: "Atlassian",
    icon: LayoutDashboard,
    description: "Jira jegyek és Confluence oldalak elérése",
    useCase: "Termékdokumentáció prototípussá alakítása",
    details: "A Lovable képes olvasni a termékdokumentációt és a kapcsolódó Jira epiceket (PRD-k, specifikációk, architektúra dokumentumok), hogy a csapat szabványainak megfelelő prototípusokat generáljon. A generált prototípusokat visszaágyazhatod a Confluence-be visszajelzéshez.",
  },
  {
    name: "Linear",
    icon: FileCode,
    description: "Linear jegyek és projektadatok elérése",
    useCase: "Prototípus készítése valós jegyekből",
    details: "A Lovable képes Linear jegyeket olvasni, beleértve a leírásokat és elfogadási kritériumokat, hogy funkcionális prototípusokat generáljon. Az elkészült appokat visszacsatolhatod a Linearba felülvizsgálatra.",
  },
  {
    name: "Notion",
    icon: FileText,
    description: "Notion oldalak és adatbázisok elérése",
    useCase: "Építés a csapat Notion munkaterületéből",
    details: "A Lovable képes PRD-ket, tervezési specifikációkat vagy marketing briefeket olvasni, és működő appokká, landing oldalakká vagy prototípusokká alakítani. A generált Lovable appokat visszaágyazhatod a Notionba a zökkenőmentes együttműködéshez.",
  },
  {
    name: "n8n",
    icon: Workflow,
    description: "n8n munkafolyamatok elérése és használata",
    useCase: "Munkafolyamat-gazdag appok építése élő adatokkal",
    details: "Csatlakoztasd az n8n automatizációidat a Lovable-höz, hogy adatokat húzz be olyan eszközökből, mint a HubSpot, Google Sheets vagy Slack, és felhasználói felületeket építs a meglévő automatizációk alapján.",
  },
];

const BuiltInServers = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Előre épített MCP szerverek
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Ezek az integrációk minden csomagban elérhetők, és azonnal használhatók.
        </p>

        <div className="space-y-6">
          {servers.map((server) => (
            <div
              key={server.name}
              className="bg-card rounded-2xl p-6 shadow-card transition-all hover:shadow-card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <server.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-foreground">{server.name}</h3>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent/10 text-accent">
                      Beépített
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-3">{server.description}</p>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-sm font-medium text-foreground mb-2">
                      💡 {server.useCase}
                    </p>
                    <p className="text-sm text-muted-foreground">{server.details}</p>
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

export default BuiltInServers;
