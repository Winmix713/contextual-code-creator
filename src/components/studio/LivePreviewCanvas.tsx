import { memo, useEffect, useCallback, RefObject } from 'react';
import { buildSrcdoc } from '@/hooks/useStudio';
import type { StudioNode } from '@/hooks/useStudio';

interface LivePreviewCanvasProps {
  htmlContent: string;
  cssContent: string;
  iframeRef: RefObject<HTMLIFrameElement>;
  selectedNodeId: string | null;
  nodes: StudioNode[];
  onSelectNode: (id: string | null) => void;
  onRefreshNodes: () => void;
}

const LivePreviewCanvas = memo<LivePreviewCanvasProps>(({
  htmlContent, cssContent, iframeRef, selectedNodeId, nodes,
  onSelectNode, onRefreshNodes,
}) => {
  // Listen for postMessage from iframe
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data) return;
      if (e.data.type === 'frame-ready') {
        onRefreshNodes();
        if (selectedNodeId) onSelectNode(selectedNodeId);
      }
      if (e.data.type === 'select-node') {
        onSelectNode(e.data.id);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [onSelectNode, onRefreshNodes, selectedNodeId]);

  // Update srcdoc when content changes
  const srcdoc = buildSrcdoc(htmlContent, cssContent);

  const handleFit = useCallback(() => {
    iframeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [iframeRef]);

  return (
    <div className="flex flex-col h-full rounded-3xl border border-border/80 bg-card/80 shadow-[var(--shadow-panel)] backdrop-blur-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-5 pt-4 pb-3 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Interactive Canvas</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Élő preview, kattintható elemekkel</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs border border-accent/20 bg-accent/10 text-accent-foreground/80">
            Kijelölés: {selectedNodeId ? nodes.find(n => n.id === selectedNodeId)?.label || selectedNodeId : 'nincs'}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs border border-accent/20 bg-accent/10 text-accent-foreground/80">
            Node-ok: {nodes.length}
          </span>
          <button
            onClick={handleFit}
            className="px-3 py-1.5 rounded-xl text-xs border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
          >
            Fit
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className="relative flex-1 mx-3.5 mb-3.5 rounded-3xl overflow-hidden border border-border/80"
        style={{
          minHeight: 'clamp(420px, 64vh, 920px)',
          background: `
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px),
            radial-gradient(circle at 50% 40%, hsl(var(--accent) / 0.06), transparent 35%),
            hsl(var(--editor-bg))`,
          backgroundSize: '22px 22px, 22px 22px, auto, auto',
        }}
      >
        <iframe
          ref={iframeRef}
          srcDoc={srcdoc}
          title="Live Preview"
          className="absolute inset-0 w-full h-full border-0"
          style={{ background: 'hsl(var(--editor-bg))' }}
          sandbox="allow-scripts allow-same-origin"
        />
        <div className="absolute left-3.5 bottom-3.5 px-3 py-2.5 rounded-xl bg-background/80 border border-border/40 text-xs text-muted-foreground backdrop-blur-md">
          Kattints egy elemre a preview-ban az inspector szerkesztéshez.
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-5 pb-4 text-xs text-muted-foreground">
        <span>Preview szinkronizálva a kóddal.</span>
        <span>HTML ↔ Design ↔ Preview szinkron</span>
      </div>
    </div>
  );
});

LivePreviewCanvas.displayName = 'LivePreviewCanvas';
export { LivePreviewCanvas };
