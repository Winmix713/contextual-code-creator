import { useState, useCallback, useRef, useEffect } from 'react';

// ==================== TYPES ====================
export type ViewMode = 'preview' | 'code' | 'design';

export interface StudioNode {
  id: string;
  tag: string;
  classes: string;
  label: string;
}

export interface StudioState {
  htmlContent: string;
  cssContent: string;
  selectedNodeId: string | null;
  viewMode: ViewMode;
  projectName: string;
  nodes: StudioNode[];
}

export interface NodeStyles {
  text: string;
  width: string;
  height: string;
  padding: string;
  borderRadius: string;
  background: string;
  color: string;
  border: string;
  boxShadow: string;
  opacity: string;
  fontSize: string;
}

const STORAGE_KEY = 'studio-editor';

// ==================== DEFAULT CONTENT ====================
export const defaultHTML = `<div class="artboard">
  <section class="hud-card">
    <div class="top-strip"></div>
    <div class="mini-panel stat left-top">
      <span class="label">Power</span>
      <strong>341K</strong>
    </div>
    <div class="mini-panel stat right-top">
      <span class="label">Signal</span>
      <strong>92%</strong>
    </div>
    <div class="dial-wrap">
      <div class="dial-ring">
        <div class="dial-core"></div>
      </div>
    </div>
    <div class="mini-panel bars-panel">
      <span class="label">Metrics</span>
      <div class="bars"><span></span><span></span><span></span><span></span><span></span></div>
    </div>
    <div class="mini-panel orbit-panel">
      <div class="orbit"></div>
    </div>
    <div class="caption">Live HTML + CSS import preview</div>
  </section>
</div>`;

export const defaultCSS = `html, body {
  margin: 0;
  min-height: 100%;
  background:
    radial-gradient(circle at 50% 20%, rgba(57,216,255,.08), transparent 30%),
    linear-gradient(180deg, #070b12 0%, #04070c 100%);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color: #E7EEFC;
}
* { box-sizing: border-box; }
body { display: grid; place-items: center; padding: 36px; }
.artboard {
  width: min(100%, 920px);
  min-height: 620px;
  display: grid;
  place-items: center;
}
.hud-card {
  position: relative;
  width: min(76vw, 680px);
  aspect-ratio: 1.03 / 1;
  border-radius: 34px;
  background: linear-gradient(180deg, rgba(14,20,30,.96), rgba(6,9,15,.96));
  border: 1px solid rgba(146,177,216,.14);
  box-shadow:
    0 30px 100px rgba(0,0,0,.56),
    inset 0 1px 0 rgba(255,255,255,.04),
    inset 0 0 0 1px rgba(57,216,255,.06),
    0 0 80px rgba(57,216,255,.08);
  overflow: hidden;
}
.hud-card::before {
  content: '';
  position: absolute;
  inset: 18px;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,.04);
}
.top-strip {
  position: absolute;
  left: 50%; top: 18px;
  transform: translateX(-50%);
  width: 116px; height: 5px; border-radius: 999px;
  background: #37e3ff;
  box-shadow: 0 0 18px rgba(57,216,255,.95), 0 0 44px rgba(57,216,255,.55);
}
.mini-panel {
  position: absolute;
  border-radius: 20px;
  border: 1px solid rgba(96,126,163,.16);
  background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.015));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.025);
}
.label {
  display: block;
  font-size: 12px;
  letter-spacing: .08em;
  color: #89a4d0;
  text-transform: uppercase;
}
.stat { padding: 18px; width: 170px; height: 110px; }
.left-top { left: 46px; top: 72px; }
.right-top { right: 46px; top: 72px; }
.stat strong { display: block; margin-top: 10px; font-size: 34px; color: #39d8ff; text-shadow: 0 0 18px rgba(57,216,255,.38); }
.dial-wrap {
  position: absolute; inset: 150px 210px 170px 210px;
  display: grid; place-items: center;
}
.dial-ring {
  width: 100%; aspect-ratio: 1; border-radius: 50%;
  border: 2px solid rgba(57,216,255,.55);
  box-shadow: inset 0 0 24px rgba(57,216,255,.14), 0 0 34px rgba(57,216,255,.18);
  display: grid; place-items: center;
}
.dial-ring::before {
  content: ''; width: 76%; height: 76%; border-radius: 50%;
  border: 1px dashed rgba(57,216,255,.5);
}
.dial-core {
  position: absolute; width: 34%; height: 34%; border-radius: 50%;
  border: 1px solid rgba(57,216,255,.55); background: radial-gradient(circle, rgba(57,216,255,.12), transparent 60%);
}
.bars-panel { left: 46px; bottom: 50px; width: 200px; height: 146px; padding: 18px; }
.bars { display: flex; align-items: end; gap: 8px; height: 72px; margin-top: 18px; }
.bars span { width: 12px; border-radius: 12px 12px 4px 4px; background: linear-gradient(180deg, rgba(57,216,255,.95), rgba(57,216,255,.25)); box-shadow: 0 0 14px rgba(57,216,255,.35); }
.bars span:nth-child(1){height:28px}.bars span:nth-child(2){height:35px}.bars span:nth-child(3){height:50px}.bars span:nth-child(4){height:58px}.bars span:nth-child(5){height:42px}
.orbit-panel { right: 46px; bottom: 50px; width: 180px; height: 146px; padding: 20px; }
.orbit {
  width: 100%; height: 100%; border-radius: 50%; border: 1px solid rgba(57,216,255,.22); position: relative;
}
.orbit::before, .orbit::after {
  content: ''; position: absolute; border-radius: 50%; border: 1px dashed rgba(57,216,255,.16);
}
.orbit::before { inset: 16%; }
.orbit::after { inset: 34%; }
.caption {
  position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%);
  color: #90a3c6; font-size: 13px; letter-spacing: .08em; text-transform: uppercase;
}
@media (max-width: 720px) {
  body { padding: 18px; }
  .artboard { min-height: 480px; }
  .hud-card { width: min(92vw, 560px); border-radius: 24px; }
  .left-top, .right-top { top: 54px; width: 138px; height: 92px; }
  .left-top { left: 24px; }
  .right-top { right: 24px; }
  .bars-panel, .orbit-panel { bottom: 24px; }
  .bars-panel { left: 24px; width: 160px; height: 124px; }
  .orbit-panel { right: 24px; width: 146px; height: 124px; }
  .dial-wrap { inset: 124px 160px 150px 160px; }
}`;

// ==================== UTILITIES ====================
export function injectNodeIds(markup: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="__root">${markup}</div>`, 'text/html');
  const root = doc.getElementById('__root');
  if (!root) return markup;
  let i = 1;
  root.querySelectorAll('*').forEach(el => {
    if (!el.hasAttribute('data-node-id')) el.setAttribute('data-node-id', `node-${i++}`);
  });
  return root.innerHTML;
}

export function buildSrcdoc(html: string, css: string): string {
  const sanitized = injectNodeIds(html);
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${css}
  [data-node-id]{transition: box-shadow .15s ease, outline-color .15s ease;}
  [data-node-id]:hover{outline:1px dashed rgba(57,216,255,.65); outline-offset:2px; cursor:pointer;}
  [data-selected="true"]{outline:2px solid rgba(57,216,255,.95)!important; outline-offset:3px; box-shadow:0 0 0 4px rgba(57,216,255,.18)!important;}
  </style></head><body>${sanitized}
  <script>
  document.addEventListener('click', function(e){
    var target = e.target.closest('[data-node-id]');
    if(!target) return;
    e.preventDefault();
    e.stopPropagation();
    parent.postMessage({type:'select-node', id: target.getAttribute('data-node-id')}, '*');
  }, true);
  parent.postMessage({type:'frame-ready'}, '*');
  <\/script></body></html>`;
}

export function nodeLabel(el: Element): string {
  const cls = el.className && typeof el.className === 'string'
    ? '.' + el.className.trim().split(/\s+/).join('.')
    : '';
  return `${el.tagName.toLowerCase()}${cls}`;
}

// ==================== HOOK ====================
export function useStudio() {
  const [htmlContent, setHtmlContent] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.html || defaultHTML;
      }
    } catch {}
    return defaultHTML;
  });

  const [cssContent, setCssContent] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.css || defaultCSS;
      }
    } catch {}
    return defaultCSS;
  });

  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [projectName, setProjectName] = useState('Project Studio');
  const [nodes, setNodes] = useState<StudioNode[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced save to localStorage
  useEffect(() => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ html: htmlContent, css: cssContent }));
      } catch {}
    }, 500);
  }, [htmlContent, cssContent]);

  const getFrameDoc = useCallback(() => {
    return iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document || null;
  }, []);

  const refreshNodes = useCallback(() => {
    const doc = getFrameDoc();
    if (!doc) return;
    const els = doc.body.querySelectorAll('[data-node-id]');
    const newNodes: StudioNode[] = [];
    els.forEach(el => {
      const id = el.getAttribute('data-node-id') || '';
      newNodes.push({
        id,
        tag: el.tagName.toLowerCase(),
        classes: typeof el.className === 'string' ? el.className : '',
        label: nodeLabel(el),
      });
    });
    setNodes(newNodes.slice(0, 40));
  }, [getFrameDoc]);

  const selectNode = useCallback((id: string | null) => {
    setSelectedNodeId(id);
    const doc = getFrameDoc();
    if (!doc) return;
    doc.querySelectorAll('[data-selected="true"]').forEach(el => el.removeAttribute('data-selected'));
    if (id) {
      const el = doc.querySelector(`[data-node-id="${id}"]`);
      if (el) el.setAttribute('data-selected', 'true');
    }
  }, [getFrameDoc]);

  const getSelectedElement = useCallback(() => {
    const doc = getFrameDoc();
    if (!doc || !selectedNodeId) return null;
    return doc.querySelector(`[data-node-id="${selectedNodeId}"]`) as HTMLElement | null;
  }, [getFrameDoc, selectedNodeId]);

  const getNodeStyles = useCallback((): NodeStyles | null => {
    const el = getSelectedElement();
    if (!el) return null;
    const s = getComputedStyle(el);
    return {
      text: el.children.length === 0 ? el.textContent?.trim() || '' : '',
      width: el.style.width || '',
      height: el.style.height || '',
      padding: el.style.padding || '',
      borderRadius: el.style.borderRadius || '',
      background: el.style.background || s.background,
      color: el.style.color || s.color,
      border: el.style.border || s.border,
      boxShadow: el.style.boxShadow || s.boxShadow,
      opacity: String(parseFloat(s.opacity || '1')),
      fontSize: String(parseInt(s.fontSize, 10) || 16),
    };
  }, [getSelectedElement]);

  const applyStylesToNode = useCallback((styles: Partial<NodeStyles>) => {
    const el = getSelectedElement();
    if (!el) return;

    if (styles.text !== undefined && el.children.length === 0) el.textContent = styles.text;
    const setOrClear = (prop: string, val?: string) => {
      if (val !== undefined) (el.style as any)[prop] = val.trim() || '';
    };
    setOrClear('width', styles.width);
    setOrClear('height', styles.height);
    setOrClear('padding', styles.padding);
    setOrClear('borderRadius', styles.borderRadius);
    setOrClear('background', styles.background);
    setOrClear('color', styles.color);
    setOrClear('border', styles.border);
    setOrClear('boxShadow', styles.boxShadow);
    if (styles.opacity !== undefined) el.style.opacity = styles.opacity;
    if (styles.fontSize !== undefined) el.style.fontSize = styles.fontSize + 'px';

    // Sync back to editor
    const doc = getFrameDoc();
    if (doc) setHtmlContent(doc.body.innerHTML.trim());
  }, [getSelectedElement, getFrameDoc]);

  const getInlineStyle = useCallback((): string => {
    const el = getSelectedElement();
    if (!el) return '/* Nincs elem kijelölve */';
    return `${nodeLabel(el)} {\n  ${el.getAttribute('style') || '/* nincs inline style */'}\n}`;
  }, [getSelectedElement]);

  const resetToDefault = useCallback(() => {
    setHtmlContent(defaultHTML);
    setCssContent(defaultCSS);
    setSelectedNodeId(null);
  }, []);

  const syncFromFrame = useCallback(() => {
    const doc = getFrameDoc();
    if (doc) setHtmlContent(doc.body.innerHTML.trim());
  }, [getFrameDoc]);

  const exportCode = useCallback(() => {
    const blob = new Blob([`<!-- HTML -->\n${htmlContent}\n\n/* CSS */\n${cssContent}`], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'studio-export.txt';
    a.click();
    URL.revokeObjectURL(a.href);
  }, [htmlContent, cssContent]);

  const appendCSS = useCallback((css: string) => {
    setCssContent(prev => prev + '\n\n/* Effect Studio CSS */\n' + css);
  }, []);

  return {
    htmlContent, setHtmlContent,
    cssContent, setCssContent,
    selectedNodeId, selectNode,
    viewMode, setViewMode,
    projectName, setProjectName,
    nodes, refreshNodes,
    iframeRef,
    getNodeStyles,
    applyStylesToNode,
    getInlineStyle,
    resetToDefault,
    syncFromFrame,
    exportCode,
    appendCSS,
    getFrameDoc,
  };
}
