

# Terv: Build Hibak Javitasa + Studio Integracio

## 1. fazis: Build hibak azonnali javitasa (3 fajl)

### 1.1 `src/App.tsx` - `process.env` hiba
- `process.env.NODE_ENV` csereje `import.meta.env.DEV`-re (Vite kornyezetben ez a helyes)
- 99. sor: `{import.meta.env.DEV && (<ReactQueryDevtools .../>)}`
- 151. sor: `if (import.meta.env.DEV) {`

### 1.2 `src/hooks/useHistory.ts` - `NodeJS.Timeout` hiba
- 361. sor: `NodeJS.Timeout` csereje `ReturnType<typeof setTimeout>`-ra (bongeszo-kompatibilis tipus)

## 2. fazis: Studio oldal letrehozasa

### 2.1 `src/hooks/useStudio.ts` - allapotkezeles
- `htmlContent`, `cssContent` state (defaultHTML/defaultCSS a csatolt HTML-bol)
- `selectedNodeId`, `viewMode` state
- Debounced localStorage mentes (meglevo `useDebouncedCallback` ujrahasznositasa)
- `injectNodeIds()`, `buildSrcdoc()` fuggvenyek (a vanilla JS logikabol atirva)

### 2.2 `src/components/studio/LivePreviewCanvas.tsx`
- iframe `srcdoc` alapu preview
- `postMessage` listener: `frame-ready` es `select-node` esemenyek
- Hover/selection kiemeles CSS-sel (`data-node-id`, `data-selected` attributumok)
- Canvas toolbar: kivalasztas label, node szamlalo, Fit gomb

### 2.3 `src/components/studio/CodeInputPanel.tsx`
- HTML textarea + CSS textarea monospace szerkesztokkel
- "Default minta" es "Frissites" gombok
- Input/keyup/change esemenyek → debounced rendereles
- A csatolt HTML `defaultHTML` es `defaultCSS` tartalma mint alapertelmezett

### 2.4 `src/components/studio/DesignInspector.tsx`
- Node lista: DOM elemek listaja, kattinthato, aktiv kiemelese
- Tulajdonsag szerkeszto: text, width, height, padding, radius, background, color, border, shadow, opacity slider, font-size slider
- Inline style megjelenitese (code-mini)
- "Apply style" es "Szinkron HTML-be" gombok
- **"Effekt CSS beillesztese" gomb**: `useEffects().generateCSS()` kimenetet hozzafuzi a CSS textarea-hoz

### 2.5 `src/components/studio/StudioTopBar.tsx`
- Projekt nev input
- Nezet valto: Live Preview / Code Focus / Design Focus
- Auto refresh badge
- Export gomb (HTML+CSS letoltes)
- "Vissza az Effect Editor-hoz" link (`/`)

### 2.6 `src/pages/Studio.tsx`
- Harom paneles grid layout: Code Inputs | Live Preview | Design Inspector
- Reszponziv: 1200px alatt egymasra rendezes, 720px alatt mobil
- EffectProvider wrapper (az effekt CSS injection-hoz)
- Design: a csatolt HTML stilusa (sotet tema, cyan akcentus, kerekitett panelek, backdrop-blur)
- A `skill.md` design elvei alapjan: egyedi tipografia, cyan dominant szin akcentussal, atmoszerikus hatterek

### 2.7 `src/App.tsx` - uj route
- `/studio` route hozzaadasa lazy loading-gal
- `const Studio = lazy(() => import("./pages/Studio"))`

### 2.8 `src/pages/Index.tsx` - navigacio
- "Studio megnyitasa" gomb hozzaadasa a felso savhoz vagy a QuickActionsPanel-hez

## Fajl lista

```text
Modositando:
  src/App.tsx                          (build fix + /studio route)
  src/hooks/useHistory.ts              (build fix)
  src/pages/Index.tsx                  (Studio link)

Uj fajlok:
  src/hooks/useStudio.ts
  src/pages/Studio.tsx
  src/components/studio/StudioTopBar.tsx
  src/components/studio/CodeInputPanel.tsx
  src/components/studio/LivePreviewCanvas.tsx
  src/components/studio/DesignInspector.tsx
```

## Megvalositas sorrendje

1. Build hibak javitasa (App.tsx, useHistory.ts)
2. `useStudio.ts` hook
3. `LivePreviewCanvas.tsx`
4. `CodeInputPanel.tsx`
5. `DesignInspector.tsx` (effekt CSS injection-nel)
6. `StudioTopBar.tsx`
7. `Studio.tsx` oldal osszeallitasa
8. Route + navigacio

