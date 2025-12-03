import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, Network, Clock } from "lucide-react";

interface Phase9DashboardProps {
  collaborativeEnabled?: boolean;
  temporalDecayEnabled?: boolean;
  marketMode?: 'off' | 'test' | 'prod';
  crossLeagueEnabled?: boolean;
}

const Phase9Dashboard = ({
  collaborativeEnabled = false,
  temporalDecayEnabled = true,
  marketMode = 'test',
  crossLeagueEnabled = true,
}: Phase9DashboardProps) => {
  const features = [
    {
      id: 'collaborative',
      title: 'Collaborative Intelligence',
      description: 'AI-alapú együttműködési elemzés',
      icon: Brain,
      enabled: collaborativeEnabled,
    },
    {
      id: 'temporal',
      title: 'Temporal Decay',
      description: 'Időbeli relevanciasúlyozás',
      icon: Clock,
      enabled: temporalDecayEnabled,
    },
    {
      id: 'market',
      title: 'Market Integration',
      description: 'Piaci adatok integrációja',
      icon: Zap,
      enabled: marketMode !== 'off',
      status: marketMode,
    },
    {
      id: 'crossleague',
      title: 'Cross-League Analysis',
      description: 'Liga-közi korrelációk',
      icon: Network,
      enabled: crossLeagueEnabled,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Phase 9 Features</h2>
        <p className="text-muted-foreground">Haladó predikciós funkciók állapota</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature) => (
          <Card key={feature.id} className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <feature.icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
              <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                {feature.enabled ? 'Aktív' : 'Inaktív'}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              {feature.status && (
                <Badge variant="outline" className="mt-2">
                  Mode: {feature.status}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Phase9Dashboard;
