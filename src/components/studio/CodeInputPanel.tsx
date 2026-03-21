import { memo, useCallback, useRef, useEffect } from 'react';

interface CodeInputPanelProps {
  htmlContent: string;
  cssContent: string;
  onHtmlChange: (html: string) => void;
  onCssChange: (css: string) => void;
  onReset: () => void;
  onRefresh: () => void;
}

const CodeInputPanel = memo<CodeInputPanelProps>(({
  htmlContent, cssContent, onHtmlChange, onCssChange, onReset, onRefresh,
}) => {
  const htmlRef = useRef<HTMLTextAreaElement>(null);
  const cssRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounced = useCallback((fn: () => void) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fn, 110);
  }, []);

  return (
    <div className="flex flex-col h-full rounded-3xl border border-border/80 bg-card/80 shadow-[var(--shadow-panel)] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Code Inputs</p>
        <span className="px-2.5 py-1 rounded-full text-xs border border-accent/20 bg-accent/10 text-accent-foreground/80">
          HTML + CSS
        </span>
      </div>

      <div className="flex-1 overflow-auto px-3.5 pb-3.5 space-y-3">
        {/* HTML section */}
        <div className="rounded-2xl border border-border/60 bg-secondary/20 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
            <strong className="text-sm text-foreground">HTML blokk</strong>
            <span className="text-xs text-muted-foreground">Szerkeszthető szerkezet</span>
          </div>
          <div className="p-3">
            <textarea
              ref={htmlRef}
              value={htmlContent}
              onChange={e => debounced(() => onHtmlChange(e.target.value))}
              onInput={e => debounced(() => onHtmlChange((e.target as HTMLTextAreaElement).value))}
              spellCheck={false}
              className="w-full min-h-[230px] resize-y rounded-xl border border-border/60 bg-background px-3.5 py-3 font-jetbrains text-xs leading-relaxed text-foreground focus:outline-none focus:ring-1 focus:ring-accent/40"
              placeholder="HTML ide..."
            />
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Bármilyen strukturált elemet beilleszthetsz ide. Minden módosítás azonnal újrarenderelődik a preview-ban.
            </p>
          </div>
        </div>

        {/* CSS section */}
        <div className="rounded-2xl border border-border/60 bg-secondary/20 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
            <strong className="text-sm text-foreground">CSS blokk</strong>
            <span className="text-xs text-muted-foreground">Kapcsolt stílus</span>
          </div>
          <div className="p-3">
            <textarea
              ref={cssRef}
              value={cssContent}
              onChange={e => debounced(() => onCssChange(e.target.value))}
              onInput={e => debounced(() => onCssChange((e.target as HTMLTextAreaElement).value))}
              spellCheck={false}
              className="w-full min-h-[220px] resize-y rounded-xl border border-border/60 bg-background px-3.5 py-3 font-jetbrains text-xs leading-relaxed text-foreground focus:outline-none focus:ring-1 focus:ring-accent/40"
              placeholder="CSS ide..."
            />
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              A CSS külön szerkeszthető. A design panelből végzett módosítások inline style-ként jelennek meg a HTML-ben.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 pb-4">
        <button
          onClick={onReset}
          className="px-4 py-2 rounded-xl text-sm border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
        >
          Default minta
        </button>
        <button
          onClick={onRefresh}
          className="px-4 py-2 rounded-xl text-sm border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
        >
          Frissítés
        </button>
      </div>
    </div>
  );
});

CodeInputPanel.displayName = 'CodeInputPanel';
export { CodeInputPanel };
