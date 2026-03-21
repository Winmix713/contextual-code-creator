import { memo, useState, useEffect, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import type { StudioNode, NodeStyles } from '@/hooks/useStudio';

interface DesignInspectorProps {
  nodes: StudioNode[];
  selectedNodeId: string | null;
  onSelectNode: (id: string | null) => void;
  getNodeStyles: () => NodeStyles | null;
  applyStylesToNode: (styles: Partial<NodeStyles>) => void;
  getInlineStyle: () => string;
  onSyncToEditor: () => void;
  onInjectEffectCSS?: () => void;
}

const DesignInspector = memo<DesignInspectorProps>(({
  nodes, selectedNodeId, onSelectNode,
  getNodeStyles, applyStylesToNode, getInlineStyle,
  onSyncToEditor, onInjectEffectCSS,
}) => {
  const [styles, setStyles] = useState<NodeStyles | null>(null);
  const [inlineCode, setInlineCode] = useState('/* Nincs elem kijelölve */');

  // Sync styles when selection changes
  useEffect(() => {
    const s = getNodeStyles();
    setStyles(s);
    setInlineCode(getInlineStyle());
  }, [selectedNodeId, getNodeStyles, getInlineStyle]);

  const handleFieldChange = useCallback((field: keyof NodeStyles, value: string) => {
    setStyles(prev => prev ? { ...prev, [field]: value } : prev);
    applyStylesToNode({ [field]: value });
    setInlineCode(getInlineStyle());
  }, [applyStylesToNode, getInlineStyle]);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div className="flex flex-col h-full rounded-3xl border border-border/80 bg-card/80 shadow-[var(--shadow-panel)] backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Design Inspector</p>
        <span className="px-2.5 py-1 rounded-full text-xs border border-accent/20 bg-accent/10 text-accent-foreground/80">
          Selected Node
        </span>
      </div>

      <div className="flex-1 overflow-auto px-3.5 pb-3.5 space-y-3">
        {/* Node lista */}
        <div className="rounded-2xl border border-border/60 bg-secondary/20 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
            <strong className="text-sm text-foreground">Node lista</strong>
            <span className="text-xs text-muted-foreground">Kattintható DOM</span>
          </div>
          <div className="p-3 space-y-2 max-h-[200px] overflow-auto scrollbar-dark">
            {nodes.length === 0 ? (
              <p className="text-xs text-muted-foreground p-3 rounded-xl bg-secondary/30">
                Nincs elérhető node. Frissítsd a preview-t.
              </p>
            ) : (
              nodes.map(node => (
                <button
                  key={node.id}
                  onClick={() => onSelectNode(node.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all border ${
                    node.id === selectedNodeId
                      ? 'border-accent/30 bg-accent/10 shadow-[inset_0_0_0_1px_hsl(var(--accent)/0.1)] text-foreground'
                      : 'border-transparent bg-secondary/20 text-muted-foreground hover:bg-secondary/40'
                  }`}
                >
                  {node.label}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Properties */}
        <div className="rounded-2xl border border-border/60 bg-secondary/20 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
            <strong className="text-sm text-foreground">Alap tulajdonságok</strong>
            <span className="text-xs text-muted-foreground">
              {selectedNode ? `${selectedNode.tag} · ${selectedNode.id}` : 'Nincs elem'}
            </span>
          </div>
          <div className="p-3">
            {!styles ? (
              <p className="text-xs text-muted-foreground p-3 rounded-xl bg-secondary/30">
                Válassz ki egy elemet a preview-ból vagy a node listából.
              </p>
            ) : (
              <div className="space-y-3">
                <Field label="Szöveg" value={styles.text} onChange={v => handleFieldChange('text', v)} placeholder="Inner text" />
                <div className="h-px bg-border/40" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Width" value={styles.width} onChange={v => handleFieldChange('width', v)} placeholder="auto / 280px" />
                  <Field label="Height" value={styles.height} onChange={v => handleFieldChange('height', v)} placeholder="auto / 160px" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Padding" value={styles.padding} onChange={v => handleFieldChange('padding', v)} placeholder="24px" />
                  <Field label="Radius" value={styles.borderRadius} onChange={v => handleFieldChange('borderRadius', v)} placeholder="20px" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Background" value={styles.background} onChange={v => handleFieldChange('background', v)} placeholder="#101722" />
                  <Field label="Text color" value={styles.color} onChange={v => handleFieldChange('color', v)} placeholder="#E7EEFC" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Border" value={styles.border} onChange={v => handleFieldChange('border', v)} placeholder="1px solid rgba(...)" />
                  <Field label="Box-shadow" value={styles.boxShadow} onChange={v => handleFieldChange('boxShadow', v)} placeholder="0 10px 30px rgba(...)" />
                </div>
                {/* Opacity */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Opacity</span><span>{styles.opacity}</span>
                  </div>
                  <Slider
                    min={0} max={1} step={0.01}
                    value={[parseFloat(styles.opacity) || 1]}
                    onValueChange={([v]) => handleFieldChange('opacity', String(v))}
                  />
                </div>
                {/* Font size */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Font size</span><span>{styles.fontSize}px</span>
                  </div>
                  <Slider
                    min={10} max={42} step={1}
                    value={[parseInt(styles.fontSize) || 16]}
                    onValueChange={([v]) => handleFieldChange('fontSize', String(v))}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Inline code preview */}
          <div className="px-3 py-3 border-t border-border/30 bg-background/90">
            <pre className="text-xs font-jetbrains leading-relaxed text-emerald-400/80 whitespace-pre-wrap">
              {inlineCode}
            </pre>
          </div>
        </div>

        {/* Effect CSS Injection */}
        {onInjectEffectCSS && (
          <button
            onClick={onInjectEffectCSS}
            className="w-full px-4 py-3 rounded-xl text-sm font-medium border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            ✨ Effekt CSS beillesztése
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 pb-4">
        <button
          onClick={onSyncToEditor}
          className="px-4 py-2 rounded-xl text-sm border border-border/80 bg-secondary/50 text-foreground hover:bg-secondary transition-colors"
        >
          Szinkron HTML-be
        </button>
        <button
          onClick={() => { applyStylesToNode(styles || {}); setInlineCode(getInlineStyle()); }}
          className="px-4 py-2 rounded-xl text-sm border border-accent/30 bg-accent/10 text-accent-foreground hover:bg-accent/20 transition-colors"
        >
          Apply style
        </button>
      </div>
    </div>
  );
});

DesignInspector.displayName = 'DesignInspector';

// ==================== FIELD COMPONENT ====================
const Field = memo<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}>(({ label, value, onChange, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</label>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-9 rounded-xl border border-border/60 bg-background/90 px-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent/40"
    />
  </div>
));
Field.displayName = 'Field';

export { DesignInspector };
