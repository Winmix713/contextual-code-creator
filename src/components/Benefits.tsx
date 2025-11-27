import { Download, Upload } from "lucide-react";

const Benefits = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Miért érdemes MCP szervereket csatlakoztatni?
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A Lovable erősebbé válik, ha megérti a csapatod világát – kiküszöböli a találgatást, 
          felgyorsítja az iterációt.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-6">
              <Download className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Meglévő kontextus bevitele
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Lovable Agent képes olvasni a csapatod dokumentációját, jegyeit és tervezési fájljait, 
              hogy prototípusokat és folyamatokat építsen a szabványaitoknak megfelelően.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                Dokumentáció olvasása
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                Jegyek és feladatok feldolgozása
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                Tervezési fájlok értelmezése
              </li>
            </ul>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-card">
            <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-6">
              <Upload className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Appok összekapcsolása munkafolyamatokkal
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Lovable Agent utánkövető műveleteket végezhet a csatlakoztatott eszközökben – 
              például frissítheti a jegy státuszát vagy hozzáadhat prototípus linkeket megjegyzésként.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Jegyek státuszának frissítése
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Linkek hozzáadása megjegyzésként
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Új elemek létrehozása
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
