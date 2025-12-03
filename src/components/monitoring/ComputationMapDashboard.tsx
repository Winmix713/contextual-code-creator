import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ComputationNode {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error';
  connections: string[];
  metrics?: {
    cpu?: number;
    memory?: number;
    requests?: number;
  };
}

export interface ComputationMapDashboardProps {
  nodes: ComputationNode[];
}

export default function ComputationMapDashboard({ nodes }: ComputationMapDashboardProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Computation Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-48 text-muted-foreground">
            No computation nodes available
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Computation Graph</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nodes.map((node) => (
            <div 
              key={node.id} 
              className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{node.name}</span>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(node.status)}`} />
              </div>
              <Badge variant="outline" className="mb-2">{node.type}</Badge>
              
              {node.metrics && (
                <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                  {node.metrics.cpu !== undefined && (
                    <div>
                      <span className="text-muted-foreground">CPU</span>
                      <div className="font-medium">{node.metrics.cpu}%</div>
                    </div>
                  )}
                  {node.metrics.memory !== undefined && (
                    <div>
                      <span className="text-muted-foreground">Memory</span>
                      <div className="font-medium">{node.metrics.memory}%</div>
                    </div>
                  )}
                  {node.metrics.requests !== undefined && (
                    <div>
                      <span className="text-muted-foreground">Requests</span>
                      <div className="font-medium">{node.metrics.requests}</div>
                    </div>
                  )}
                </div>
              )}
              
              {node.connections.length > 0 && (
                <div className="mt-3 text-xs text-muted-foreground">
                  Connected to: {node.connections.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
