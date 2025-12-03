import { Outlet } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const WinmixProLayout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-4xl font-bold">WinMix Pro</h1>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="w-3 h-3" />
            Premium
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Haladó funkciók és részletes elemzések
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Részletes Statisztikák</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Mélyreható csapat- és liga-statisztikák elemzése.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Pattern Felismerés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              AI-alapú mintafelismerés a jobb predikciókért.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Értesítések</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Valós idejű értesítések a fontos eseményekről.
            </p>
          </CardContent>
        </Card>
      </div>

      <Outlet />
    </div>
  );
};

export default WinmixProLayout;
