import { useStudio } from '@/hooks/useStudio';
import { StudioTopBar } from '@/components/studio/StudioTopBar';
import { CodeInputPanel } from '@/components/studio/CodeInputPanel';
import { LivePreviewCanvas } from '@/components/studio/LivePreviewCanvas';
import { DesignInspector } from '@/components/studio/DesignInspector';
import { EffectProvider, useEffects } from '@/contexts/EffectContext';

const StudioInner = () => {
  const studio = useStudio();
  const { generateCSS } = useEffects();

  const handleInjectEffectCSS = () => {
    studio.appendCSS(generateCSS());
  };

  // Force re-render preview on html/css change (debounced in hook)
  const handleRefresh = () => {
    // The iframe re-renders via srcdoc change automatically
    studio.refreshNodes();
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-outfit flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(circle at 20% 0%, hsl(var(--accent) / 0.10), transparent 30%),
          radial-gradient(circle at 100% 10%, hsl(var(--primary) / 0.08), transparent 35%),
          linear-gradient(180deg, hsl(var(--background)), hsl(var(--background)))`,
      }} />

      <div className="relative flex flex-col h-screen">
        <StudioTopBar
          projectName={studio.projectName}
          onProjectNameChange={studio.setProjectName}
          viewMode={studio.viewMode}
          onViewModeChange={studio.setViewMode}
          onExport={studio.exportCode}
        />

        <main className="flex-1 grid grid-cols-1 xl:grid-cols-[minmax(330px,420px)_minmax(0,1fr)_minmax(300px,360px)] gap-3.5 p-3.5 min-h-0 overflow-hidden">
          {/* Left: Code */}
          <div className={`min-h-0 overflow-hidden ${studio.viewMode === 'design' ? 'hidden xl:block' : ''}`}>
            <CodeInputPanel
              htmlContent={studio.htmlContent}
              cssContent={studio.cssContent}
              onHtmlChange={studio.setHtmlContent}
              onCssChange={studio.setCssContent}
              onReset={studio.resetToDefault}
              onRefresh={handleRefresh}
            />
          </div>

          {/* Center: Preview */}
          <div className={`min-h-0 overflow-hidden ${studio.viewMode === 'code' ? 'hidden xl:block' : ''}`}>
            <LivePreviewCanvas
              htmlContent={studio.htmlContent}
              cssContent={studio.cssContent}
              iframeRef={studio.iframeRef}
              selectedNodeId={studio.selectedNodeId}
              nodes={studio.nodes}
              onSelectNode={studio.selectNode}
              onRefreshNodes={studio.refreshNodes}
            />
          </div>

          {/* Right: Inspector */}
          <div className={`min-h-0 overflow-hidden ${studio.viewMode === 'code' ? 'hidden xl:block' : ''}`}>
            <DesignInspector
              nodes={studio.nodes}
              selectedNodeId={studio.selectedNodeId}
              onSelectNode={studio.selectNode}
              getNodeStyles={studio.getNodeStyles}
              applyStylesToNode={studio.applyStylesToNode}
              getInlineStyle={studio.getInlineStyle}
              onSyncToEditor={studio.syncFromFrame}
              onInjectEffectCSS={handleInjectEffectCSS}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

const Studio = () => (
  <EffectProvider>
    <StudioInner />
  </EffectProvider>
);

export default Studio;
