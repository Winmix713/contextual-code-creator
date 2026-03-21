import { memo } from 'react';
import { ArrowLeft, Undo2, Redo2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ViewMode } from '@/hooks/useStudio';

interface StudioTopBarProps {
  projectName: string;
  onProjectNameChange: (name: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onExport: () => void;
}

const VIEW_MODES: { value: ViewMode; label: string }[] = [
  { value: 'preview', label: 'Live Preview' },
  { value: 'code', label: 'Code Focus' },
  { value: 'design', label: 'Design Focus' },
];

const StudioTopBar = memo<StudioTopBarProps>(({
  projectName, onProjectNameChange, viewMode, onViewModeChange, onExport,
}) => (
  <header className="sticky top-0 z-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.9fr] gap-3 items-center px-4 lg:px-5 py-3.5 border-b border-border/60 bg-background/90 backdrop-blur-xl">
    {/* Left: back + project name */}
    <div className="flex items-center gap-3 min-w-0">
      <Link
        to="/"
        className="flex items-center justify-center h-10 w-10 rounded-xl border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary transition-colors shrink-0"
        title="Vissza az Effect Editor-hoz"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>
      <input
        value={projectName}
        onChange={e => onProjectNameChange(e.target.value)}
        className="flex-1 min-w-0 h-10 rounded-xl border border-border/80 bg-secondary/30 px-3.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent/40"
      />
    </div>

    {/* Center: view mode toggle */}
    <div className="flex gap-2 justify-center flex-wrap">
      {VIEW_MODES.map(m => (
        <button
          key={m.value}
          onClick={() => onViewModeChange(m.value)}
          className={`h-10 px-4 rounded-xl text-sm border transition-all whitespace-nowrap ${
            viewMode === m.value
              ? 'border-accent/40 bg-accent/10 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--accent)/0.16),0_0_20px_hsl(var(--accent)/0.08)]'
              : 'border-border/80 bg-secondary/30 text-muted-foreground hover:bg-secondary/50'
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>

    {/* Right: tools */}
    <div className="flex items-center gap-2.5 justify-end flex-wrap">
      <span className="px-2.5 py-1.5 rounded-full text-xs border border-accent/20 bg-accent/10 text-accent-foreground/80">
        Auto refresh: On
      </span>
      <button
        onClick={onExport}
        className="h-10 px-4 rounded-xl text-sm font-medium border border-accent/35 bg-accent/15 text-accent-foreground hover:bg-accent/25 transition-colors flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Export
      </button>
    </div>
  </header>
));

StudioTopBar.displayName = 'StudioTopBar';
export { StudioTopBar };
