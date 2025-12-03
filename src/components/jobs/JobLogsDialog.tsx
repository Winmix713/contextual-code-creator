import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export interface JobLog {
  id: string;
  job_id: string;
  status: 'success' | 'failed' | 'running';
  started_at: string;
  completed_at?: string | null;
  duration_ms?: number | null;
  error_message?: string | null;
  output?: string | null;
}

interface JobLogsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobName?: string;
  logs: JobLog[];
}

export const JobLogsDialog = ({
  isOpen,
  onClose,
  jobName = "Job",
  logs,
}: JobLogsDialogProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success': return <Badge className="bg-green-500/20 text-green-400">Success</Badge>;
      case 'failed': return <Badge className="bg-red-500/20 text-red-400">Failed</Badge>;
      case 'running': return <Badge className="bg-blue-500/20 text-blue-400">Running</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>{jobName} - Execution Logs</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          {logs.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              No logs available
            </div>
          ) : (
            <div className="space-y-3 pr-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg border border-border bg-muted/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.started_at).toLocaleString()}
                    </span>
                    {getStatusBadge(log.status)}
                  </div>
                  {log.duration_ms !== undefined && log.duration_ms !== null && (
                    <div className="text-xs text-muted-foreground mb-2">
                      Duration: {log.duration_ms}ms
                    </div>
                  )}
                  {log.error_message && (
                    <div className="text-sm text-red-400 bg-red-500/10 p-2 rounded mt-2">
                      {log.error_message}
                    </div>
                  )}
                  {log.output && (
                    <pre className="text-xs font-mono bg-black/20 p-2 rounded mt-2 overflow-x-auto">
                      {log.output}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default JobLogsDialog;
