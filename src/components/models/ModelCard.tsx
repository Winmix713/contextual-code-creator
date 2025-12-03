import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, TrendingUp, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ModelRegistry } from "@/types/models";
import type { ModelAction } from "@/types/admin";

interface ModelCardProps {
  id?: string;
  name?: string;
  version?: string;
  status?: "active" | "archived" | "training" | "pending" | "production" | "staging";
  accuracy?: number;
  lastUpdated?: string;
  model?: ModelRegistry;
  onPromote?: (id: string | ModelRegistry) => void;
  onArchive?: (id: string) => void;
  onEdit?: (model: ModelRegistry) => void;
  onDelete?: (id: string) => void;
  onAction?: (action: ModelAction, model: ModelRegistry) => void;
  actions?: ModelAction[];
}

const ModelCard = ({
  id,
  name,
  version,
  status,
  accuracy,
  lastUpdated,
  model,
  onPromote,
  onArchive,
  onEdit,
  onDelete,
  onAction,
  actions = [],
}: ModelCardProps) => {
  // Support both direct props and model prop
  const modelId = model?.id || id || '';
  const modelName = model?.model_name || name || 'Unknown Model';
  const modelVersion = model?.model_version || version;
  const modelStatus = model?.model_type || status || 'pending';
  const modelAccuracy = model?.accuracy ?? accuracy;
  const modelLastUpdated = model?.updated_at || lastUpdated;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
      case "production":
      case "champion":
        return "default";
      case "staging":
      case "challenger":
        return "secondary";
      case "training":
        return "outline";
      case "archived":
      case "retired":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Aktív";
      case "production":
      case "champion":
        return "Champion";
      case "staging":
      case "challenger":
        return "Challenger";
      case "training":
        return "Tanítás alatt";
      case "archived":
      case "retired":
        return "Archivált";
      case "pending":
        return "Függőben";
      default:
        return status;
    }
  };

  const handlePromote = () => {
    if (onPromote) {
      onPromote(model || modelId);
    }
  };

  return (
    <Card className="glass-card hover:border-primary/50 transition-colors">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">{modelName}</CardTitle>
          {modelVersion && (
            <p className="text-sm text-muted-foreground">v{modelVersion}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={getStatusVariant(modelStatus)}>{getStatusLabel(modelStatus)}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.length > 0 ? (
                actions.map((action) => (
                  <DropdownMenuItem
                    key={action.type}
                    onClick={() => model && onAction?.(action, model)}
                  >
                    {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                    {action.label}
                  </DropdownMenuItem>
                ))
              ) : (
                <>
                  {onPromote && modelStatus !== "champion" && modelStatus !== "production" && (
                    <DropdownMenuItem onClick={handlePromote}>
                      Előléptetés
                    </DropdownMenuItem>
                  )}
                  {onEdit && model && (
                    <DropdownMenuItem onClick={() => onEdit(model)}>
                      Szerkesztés
                    </DropdownMenuItem>
                  )}
                  {onArchive && modelStatus !== "archived" && modelStatus !== "retired" && (
                    <DropdownMenuItem onClick={() => onArchive(modelId)}>
                      Archiválás
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem onClick={() => onDelete(modelId)} className="text-destructive">
                      Törlés
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {modelAccuracy !== undefined && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Pontosság</p>
                <p className="font-medium">{(modelAccuracy * 100).toFixed(1)}%</p>
              </div>
            </div>
          )}
          {modelLastUpdated && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Frissítve</p>
                <p className="font-medium text-sm">
                  {new Date(modelLastUpdated).toLocaleDateString("hu-HU")}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelCard;
