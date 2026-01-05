# EFFECT STUDIO - Alkalmazás Dokumentáció

> Utoljára frissítve: 2026-01-05

## 📋 Összefoglaló

Az **Effect Studio** egy React alapú vizuális CSS effekt szerkesztő, amely lehetővé teszi különböző vizuális effektek (Glow, Glass, Neomorph, Clay) valós idejű szerkesztését és exportálását.

---

## 🏗️ Projekt Struktúra

```
src/
├── components/          # UI komponensek
│   ├── ui/              # shadcn/ui komponensek (50+ fájl)
│   ├── ClayEditor.tsx   # Clay effekt szerkesztő
│   ├── EffectEditorTabs.tsx  # Effekt fülek
│   ├── ExportPanel.tsx  # CSS/JSON exportálás
│   ├── GlassEditor.tsx  # Glass effekt szerkesztő
│   ├── GlowEditor.tsx   # Glow effekt szerkesztő
│   ├── HistoryTimeline.tsx   # Visszavonás előzmények
│   ├── MultiEffectEditor.tsx # Fő effekt kezelő
│   ├── NeomorphEditor.tsx    # Neomorph effekt szerkesztő
│   ├── PhonePreview.tsx      # Telefon előnézet
│   ├── PhonePreviewTemplates.tsx # Előnézet sablonok
│   ├── PresetsGallery.tsx    # Preset galéria
│   ├── PropertyInspector.tsx # Tulajdonság vizsgáló
│   ├── QuickActionsPanel.tsx # Gyors műveletek
│   ├── ThemeCustomizer.tsx   # Téma testreszabó
│   └── VirtualizedPresetGrid.tsx # Virtualizált preset lista
├── contexts/            # React Context állapotkezelés
│   ├── EffectContext.tsx     # Effekt állapotok
│   ├── SelectionContext.tsx  # Kijelölés kezelés
│   ├── ThemeContext.tsx      # Téma beállítások
│   └── types.ts              # Közös típusdefiníciók
├── hooks/               # Egyéni React hook-ok
│   ├── use-mobile.tsx        # Mobil detektálás
│   ├── use-toast.ts          # Toast értesítések
│   ├── useDebounce.ts        # Debounce segédlet
│   └── useHistory.ts         # Undo/Redo kezelés
├── lib/                 # Segédkönyvtárak
│   ├── color-conversion.ts   # Hex ↔ OKLCH konverzió
│   └── utils.ts              # Általános segédfüggvények
├── pages/               # Oldalak
│   ├── Index.tsx             # Főoldal
│   └── NotFound.tsx          # 404 oldal
└── integrations/        # Külső integrációk
    └── supabase/             # Supabase kliens (előkészített)
```

---

## 🎨 Effekt Típusok

### 1. Glow Effect
Ragyogó fényeffekt OKLCH színtérrel.

| Tulajdonság | Típus | Alapérték | Leírás |
|-------------|-------|-----------|--------|
| `lightness` | number | 78 | Világosság (0-100) |
| `chroma` | number | 0.18 | Színtelítettség (0-0.4) |
| `hue` | number | 70 | Színárnyalat (0-360) |
| `baseColor` | string | #FF9F00 | Alap szín hex |
| `animation` | string | none | none/pulse/breathe/wave |
| `animationSpeed` | number | 2 | Sebesség másodpercben |
| `animationIntensity` | number | 50 | Intenzitás (0-100) |
| `maskSize` | number | 0.3 | Maszk méret |
| `glowScale` | number | 0.9 | Glow skálázás |
| `noiseEnabled` | boolean | true | Zaj textúra |
| `noiseIntensity` | number | 0.35 | Zaj intenzitás |

### 2. Glass Effect
Üveg/homályos háttér effekt.

| Tulajdonság | Típus | Alapérték | Leírás |
|-------------|-------|-----------|--------|
| `blur` | number | 12 | Homályosság (px) |
| `opacity` | number | 20 | Átlátszóság (%) |
| `saturation` | number | 120 | Telítettség (%) |
| `borderWidth` | number | 1 | Keret vastagság |
| `borderOpacity` | number | 20 | Keret átlátszóság |
| `tint` | string | #ffffff | Tónusszín |
| `tintStrength` | number | 10 | Tónus erősség |

### 3. Neomorph Effect
Puha árnyékok és kiemelések.

| Tulajdonság | Típus | Alapérték | Leírás |
|-------------|-------|-----------|--------|
| `distance` | number | 10 | Árnyék távolság |
| `blur` | number | 30 | Homályosság |
| `intensity` | number | 50 | Intenzitás |
| `shape` | string | flat | flat/concave/convex/pressed |
| `lightSource` | number | 145 | Fényforrás szög (fok) |
| `surfaceColor` | string | #2a2a2a | Felület szín |

### 4. Clay Effect
Agyagszerű 3D megjelenés.

| Tulajdonság | Típus | Alapérték | Leírás |
|-------------|-------|-----------|--------|
| `depth` | number | 10 | Mélység |
| `spread` | number | 10 | Terjedés |
| `borderRadius` | number | 24 | Lekerekítés |
| `highlightColor` | string | #ffffff | Kiemelés szín |
| `shadowColor` | string | #000000 | Árnyék szín |
| `surfaceTexture` | string | smooth | smooth/matte/glossy |
| `bendAngle` | number | 0 | Hajlítási szög |
| `shadowDirection` | string | bottom-right | Árnyék irány |

---

## 🧩 Fő Komponensek

### MultiEffectEditor
A fő effekt kezelő panel, ami megjeleníti az aktív effekteket és lehetővé teszi azok be/kikapcsolását.

### EffectEditorTabs
Fülekkel ellátott szerkesztő panel az egyes effekt típusokhoz (Glow, Glass, Neomorph, Clay).

### PhonePreview
Telefon formájú előnézet, ami valós időben mutatja az effektek eredményét.

### PresetsGallery
Előre definiált és egyéni preset-ek gyűjteménye. **Virtualizált lista** a teljesítmény érdekében.

### ExportPanel
CSS és JSON exportálási lehetőségek. Másolható kód generálás.

### PropertyInspector
Részletes tulajdonság vizsgáló kijelölt elemekhez.

### ThemeCustomizer
Globális téma beállítások (színek, mód, alakzatok).

### QuickActionsPanel
Gyors műveletek és billentyűparancsok.

---

## 🔧 Context-ek és Állapotkezelés

### EffectContext
Az összes effekt állapotának központi kezelése.

```typescript
interface EffectContextType {
  state: EffectState;
  togglePower: () => void;
  toggleEffect: (effect: EffectType) => void;
  updateGlowSettings: (settings: Partial<GlowSettings>) => void;
  updateGlassSettings: (settings: Partial<GlassSettings>) => void;
  updateNeomorphSettings: (settings: Partial<NeomorphSettings>) => void;
  updateClaySettings: (settings: Partial<ClaySettings>) => void;
  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  // Export
  generateCSS: () => string;
  exportState: () => string;
  importState: (json: string) => boolean;
}
```

### ThemeContext
Általános téma konfiguráció.

```typescript
interface ThemeConfig {
  mode: 'light' | 'dark' | 'system';
  shape: 'sharp' | 'rounded' | 'full';
  colors: { primary: string; accent: string; neutral: string };
  solidStyle: 'color' | 'inverse' | 'contrast';
  effectStyle: 'flat' | 'plastic';
  surface: 'filled' | 'translucent';
  // ... további beállítások
}
```

### SelectionContext
Kijelölt elem és tulajdonságai kezelése.

---

## ⚡ Teljesítmény Optimalizációk

### Implementált optimalizációk:
1. **Debounced LocalStorage mentés** - 500ms késleltetés a túl gyakori írások elkerülésére
2. **Virtualizált preset lista** - Csak a látható elemek renderelése
3. **Lazy loading** - Oldalak dinamikus betöltése
4. **React.memo** - Komponens újrarenderelés minimalizálás
5. **useMemo/useCallback** - Számítások és függvények gyorsítótárazása

### LocalStorage kulcsok:
- `effect-editor` - Effekt állapotok
- `theme-customizer` - Téma beállítások
- `custom-presets` - Egyéni preset-ek

---

## ⌨️ Billentyűparancsok

| Parancs | Művelet |
|---------|---------|
| `Ctrl+Z` | Visszavonás (Undo) |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Újra (Redo) |

---

## 🎨 Design System

### Színpaletta (HSL)
```css
--primary: 262 83% 58%;       /* Lila */
--accent: 173 80% 40%;        /* Cián */
--background: 240 10% 4%;     /* Sötét háttér */
--foreground: 0 0% 95%;       /* Világos szöveg */
--card: 240 6% 10%;           /* Kártya háttér */
--border: 240 4% 16%;         /* Szegély */
```

### Brand színek
```css
--violet: 262 83% 58%;
--cyan: 173 80% 40%;
--rose: 350 89% 60%;
--amber: 38 92% 50%;
--emerald: 160 84% 39%;
```

### Betűtípusok
- **Outfit** - Fő betűtípus
- **Sora** - Alternatív sans-serif
- **JetBrains Mono** - Monospace (kód)

---

## 📦 Függőségek

### Fő függőségek:
- **React 18.3** - UI keretrendszer
- **TypeScript** - Típusbiztonság
- **Vite** - Build eszköz
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animációk
- **shadcn/ui** - UI komponenskönyvtár
- **TanStack Query** - Adatlekérdezés
- **React Router DOM** - Routing
- **Supabase** - Backend (előkészített)

### UI könyvtárak:
- **Lucide React** - Ikonok
- **react-colorful** - Színválasztó
- **Recharts** - Diagramok
- **Sonner** - Toast értesítések

---

## 🚧 Tervezett Fejlesztések

### Sürgős (TODO):
- [ ] Autentikáció implementálása (App.tsx placeholder)
- [ ] Monaco Editor eltávolítása (nem használt, nagy bundle)

### Rövid távú:
- [ ] Unit tesztek (color-conversion.ts, useHistory.ts)
- [ ] Export formátumok bővítése (SCSS, Styled Components)
- [ ] Preset kategóriák

### Hosszú távú:
- [ ] Felhasználói fiókok (Lovable Cloud)
- [ ] Közösségi preset megosztás
- [ ] AI alapú preset javaslatok

---

## 📁 Fájl Méretek

| Komponens | Sorok |
|-----------|-------|
| EffectContext.tsx | ~454 |
| ThemeContext.tsx | ~150 |
| types.ts | ~113 |
| color-conversion.ts | ~117 |
| useHistory.ts | ~100+ |

---

## 🔌 Integrációk

### Supabase (előkészített)
- Kliens konfiguráció: `src/integrations/supabase/client.ts`
- Típusok: `src/integrations/supabase/types.ts`
- Még nincs aktívan használva

---

## 📝 Megjegyzések

1. Az alkalmazás jelenleg **kliens-oldali** - minden adat LocalStorage-ban tárolódik
2. Az autentikáció **placeholder** állapotban van (`isAuthenticated = true`)
3. A **Monaco Editor** telepítve van, de nem használt - eltávolítása csökkenti a bundle méretet
4. A projekt **dark mode** optimalizált designt használ
