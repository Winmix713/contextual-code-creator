import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground mb-4">
          További információkért látogasd meg a hivatalos dokumentációt:
        </p>
        <a
          href="https://docs.lovable.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-hero text-primary-foreground font-medium transition-all hover:opacity-90"
        >
          Lovable Dokumentáció
          <ExternalLink className="w-4 h-4" />
        </a>
        <p className="text-sm text-muted-foreground mt-8">
          © {new Date().getFullYear()} MCP Szerverek Dokumentáció • Készült Lovable segítségével
        </p>
      </div>
    </footer>
  );
};

export default Footer;
