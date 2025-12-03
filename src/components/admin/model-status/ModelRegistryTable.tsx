import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database } from "lucide-react";
import type { ModelRegistry } from "@/types/models";

interface ModelRegistryTableProps {
  models?: ModelRegistry[];
  onSelect?: (model: ModelRegistry) => void;
}

export const ModelRegistryTable = ({ models = [], onSelect }: ModelRegistryTableProps) => {
  const getTypeVariant = (type?: string) => {
    switch (type) {
      case "champion": return "default";
      case "challenger": return "secondary";
      case "retired": return "outline";
      default: return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Model Registry
        </CardTitle>
      </CardHeader>
      <CardContent>
        {models.length === 0 ? (
          <p className="text-muted-foreground">No models registered.</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>Predictions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((model) => (
                <TableRow 
                  key={model.id} 
                  className={onSelect ? "cursor-pointer hover:bg-muted/50" : ""}
                  onClick={() => onSelect?.(model)}
                >
                  <TableCell className="font-medium">{model.model_name}</TableCell>
                  <TableCell>{model.model_version}</TableCell>
                  <TableCell>
                    <Badge variant={getTypeVariant(model.model_type)}>{model.model_type}</Badge>
                  </TableCell>
                  <TableCell>{model.accuracy ? `${model.accuracy.toFixed(1)}%` : "–"}</TableCell>
                  <TableCell>{model.total_predictions ?? 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelRegistryTable;
