import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Clock, CheckCircle, XCircle, Loader2 } from "lucide-react";

export interface JobSummary {
  id: string;
  job_name: string;
  job_type: string;
  cron_schedule: string;
  enabled: boolean;
  last_run_at?: string | null;
  next_run_at?: string | null;
  last_status?: 'success' | 'failed' | 'running' | null;
  run_count?: number;
  error_count?: number;
}

interface JobStatusCardProps {
  job: JobSummary;
  onToggle?: (jobId: string, enabled: boolean) => void;
  onTrigger?: (jobId: string) => void;
  onViewLogs?: (jobId: string) => void;
}

export const JobStatusCard = ({
  job,
  onToggle,
  onTrigger,
  onViewLogs,
}: JobStatusCardProps) => {
  const getStatusIcon = (status?: string | null) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running': return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      default: return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="border-border/60 bg-card/60">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(job.last_status)}
            <CardTitle className="text-lg">{job.job_name}</CardTitle>
          </div>
          <Badge variant={job.enabled ? 'default' : 'secondary'}>
            {job.enabled ? 'Active' : 'Disabled'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Type</span>
              <div className="font-medium">{job.job_type}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Schedule</span>
              <div className="font-medium font-mono text-xs">{job.cron_schedule}</div>
            </div>
            {job.last_run_at && (
              <div>
                <span className="text-muted-foreground">Last Run</span>
                <div className="font-medium text-xs">
                  {new Date(job.last_run_at).toLocaleString()}
                </div>
              </div>
            )}
            {job.next_run_at && (
              <div>
                <span className="text-muted-foreground">Next Run</span>
                <div className="font-medium text-xs">
                  {new Date(job.next_run_at).toLocaleString()}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggle?.(job.id, !job.enabled)}
            >
              {job.enabled ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {job.enabled ? 'Pause' : 'Resume'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onTrigger?.(job.id)}
              disabled={!job.enabled}
            >
              <Play className="w-4 h-4 mr-1" />
              Run Now
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewLogs?.(job.id)}
            >
              View Logs
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobStatusCard;
