import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="ml-0 md:ml-[84px] lg:ml-64 border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-primary mb-4">WinMix TipsterHub</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Az AI-alapú futball predikciós platform, amely segít megalapozott 
              döntéseket hozni a mérkőzések kimenetelével kapcsolatban.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Gyors linkek</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/predictions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Predikciók
                </Link>
              </li>
              <li>
                <Link to="/matches" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Mérkőzések
                </Link>
              </li>
              <li>
                <Link to="/teams" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Csapatok
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Jogi információk</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground">
                  Adatvédelmi tájékoztató
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Felhasználási feltételek
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground">
                  Cookie szabályzat
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} WinMix TipsterHub. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
