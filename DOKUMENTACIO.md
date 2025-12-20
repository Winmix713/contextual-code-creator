# Effect Studio - Rendszer Dokumentáció

## 📋 Áttekintés

Az **Effect Studio** egy modern, React-alapú vizuális CSS effekt szerkesztő alkalmazás. Lehetővé teszi különböző vizuális effektek (Glow, Glass, Neomorph, Clay) valós idejű testreszabását és exportálását.

---

## 🏗️ Architektúra

### Technológiai Stack

| Technológia | Verzió | Cél |
|-------------|--------|-----|
| React | ^18.3.1 | UI keretrendszer |
| TypeScript | - | Típusbiztos fejlesztés |
| Vite | - | Build eszköz |
| Tailwind CSS | - | Utility-first CSS |
| Framer Motion | ^12.23.26 | Animációk |
| React Router DOM | ^6.30.1 | Routing |
| TanStack React Query | ^5.83.0 | Adat kezelés |
| Supabase | ^2.87.3 | Backend (Lovable Cloud) |

### Fontok

- **Outfit** - Fő betűtípus
- **Sora** - Alternatív sans-serif
- **JetBrains Mono** - Kód megjelenítés

---

## 📁 Projektstruktúra

```
src/
├── components/           # UI komponensek
│   ├── ui/              # shadcn/ui alap komponensek
│   ├── ClayEditor.tsx   # Clay effekt szerkesztő
│   ├── EffectEditorTabs.tsx  # Effekt szerkesztő fülek
│   ├── ExportPanel.tsx  # Kód exportálás panel
│   ├── GlassEditor.tsx  # Glass effekt szerkesztő
│   ├── GlowEditor.tsx   # Glow effekt szerkesztő
│   ├── HistoryTimeline.tsx   # Visszavonás idővonalja
│   ├── MultiEffectEditor.tsx # Aktív effektek kezelő
│   ├── NeomorphEditor.tsx    # Neomorph effekt szerkesztő
│   ├── PhonePreview.tsx      # Telefon előnézet
│   ├── PhonePreviewTemplates.tsx  # Előnézet sablonok
│   ├── PresetsGallery.tsx    # Preset galéria
│   ├── PropertyInspector.tsx # Tulajdonság vizsgáló
│   ├── QuickActionsPanel.tsx # Gyors műveletek
│   └── ThemeCustomizer.tsx   # Téma testreszabó
├── contexts/            # React Contextek
│   ├── SelectionContext.tsx  # Kijelölés kezelés
│   └── ThemeContext.tsx      # Effektek és téma állapot
├── hooks/               # Egyéni hookok
│   ├── use-mobile.tsx   # Mobil detektálás
│   ├── use-toast.ts     # Toast üzenetek
│   └── useHistory.ts    # Visszavonás/Újra rendszer
├── lib/                 # Segédfüggvények
│   ├── color-conversion.ts   # Szín konverziók
│   └── utils.ts         # Általános segédfüggvények
├── pages/               # Oldalak
│   ├── Index.tsx        # Főoldal
│   └── NotFound.tsx     # 404 oldal
└── integrations/        # Külső integrációk
    └── supabase/        # Supabase kliens
```

---

## 🎨 Effekt Típusok

### 1. Glow Effekt
Meleg, puha fényfolt effekt OKLCH színtérben.

**Beállítások:**
| Tulajdonság | Típus | Leírás |
|-------------|-------|--------|
| `lightness` | number (0-100) | Fényerő |
| `chroma` | number (0-0.4) | Színtelítettség |
| `hue` | number (0-360) | Színárnyalat |
| `baseColor` | string (hex) | Alap szín |
| `animation` | 'none' \| 'pulse' \| 'breathe' \| 'wave' | Animáció típus |
| `animationSpeed` | number | Animáció sebessége (mp) |
| `animationIntensity` | number | Animáció intenzitása (%) |
| `maskSize` | number | Maszk méret |
| `glowScale` | number | Glow skálázás |
| `noiseEnabled` | boolean | Zaj textúra engedélyezése |
| `noiseIntensity` | number | Zaj intenzitás |

### 2. Glass Effekt
Üveg szerű átlátszóság és elmosás.

**Beállítások:**
| Tulajdonság | Típus | Leírás |
|-------------|-------|--------|
| `blur` | number | Háttér elmosás (px) |
| `opacity` | number | Átlátszóság (%) |
| `saturation` | number | Telítettség (%) |
| `borderWidth` | number | Szegély vastagság |
| `borderOpacity` | number | Szegély átlátszóság |
| `tint` | string | Színezés |
| `tintStrength` | number | Színezés erőssége |

### 3. Neomorph Effekt
Puha, domború felület hatás.

**Beállítások:**
| Tulajdonság | Típus | Leírás |
|-------------|-------|--------|
| `distance` | number | Árnyék távolság |
| `blur` | number | Árnyék elmosás |
| `intensity` | number | Hatás erőssége |
| `shape` | 'flat' \| 'concave' \| 'convex' \| 'pressed' | Forma típus |
| `lightSource` | number | Fényforrás szöge (°) |
| `surfaceColor` | string | Felület színe |

### 4. Clay Effekt
Plasztikus, agyagszerű megjelenés.

**Beállítások:**
| Tulajdonság | Típus | Leírás |
|-------------|-------|--------|
| `depth` | number | Mélység |
| `spread` | number | Kiterjedés |
| `borderRadius` | number | Lekerekítés |
| `highlightColor` | string | Kiemelés színe |
| `shadowColor` | string | Árnyék színe |
| `surfaceTexture` | 'smooth' \| 'matte' \| 'glossy' | Textúra típus |
| `bendAngle` | number | Hajlítási szög |

---

## 🧩 Fő Komponensek

### ThemeContext (Állapotkezelés)

A központi állapotkezelő context, amely tartalmazza:

```typescript
interface EffectContextType {
  state: EffectState;              // Jelenlegi állapot
  togglePower: () => void;         // Be/Ki kapcsolás
  toggleEffect: (effect) => void;  // Effekt váltás
  setThemeMode: (mode) => void;    // Téma mód beállítás
  updateGlowSettings: (settings) => void;
  updateGlassSettings: (settings) => void;
  updateNeomorphSettings: (settings) => void;
  updateClaySettings: (settings) => void;
  resetToDefaults: () => void;     // Alapértékek visszaállítása
  generateCSS: () => string;       // CSS generálás
  exportState: () => string;       // JSON export
  importState: (json) => boolean;  // JSON import
  // Visszavonás rendszer
  history: HistoryState;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}
```

### MultiEffectEditor

Kezeli az aktív effekteket:
- Effekt ki/be kapcsolók (toggle)
- Téma mód választó
- Gyors effekt rács

### PhonePreview

Valós idejű előnézet telefon keretben:
- Húzható glow pozíció
- 4 előnézet sablon: Onboarding, Dashboard, Profile, Cards
- Véletlenszerű szín generátor
- Glass és Neomorph rétegek

### PresetsGallery

Előre definiált és egyéni presetek:
- 6 beépített preset (Aurora, Sunset, Neon, Ocean, Rose Gold, Midnight)
- Egyéni presetek mentése/törlése
- JSON import/export
- LocalStorage perzisztencia

### ExportPanel

Kód exportálás:
- CSS kimenet
- Tailwind config
- JSON beállítások
- Vágólapra másolás
- Fájl letöltés

---

## 🎯 Preset Rendszer

### Beépített Presetek

| Név | Leírás | Aktív Effektek |
|-----|--------|----------------|
| Aurora Borealis | Északi fény hatás | Glow, Glass |
| Golden Sunset | Meleg arany-rózsaszín | Glow, Clay |
| Neon Nights | Elektromos lila cyberpunk | Glow, Glass, Neomorph |
| Ocean Depth | Mélytengeri kék-cián | Glow, Glass |
| Rose Gold | Elegáns rózsaarany | Glow, Neomorph |
| Midnight | Sötét mód kék világítással | Glow, Neomorph |

### Egyéni Presetek

- LocalStorage-ban tárolva (`effect-editor-custom-presets`)
- Név és leírás megadható
- Törlési lehetőség

---

## ⌨️ Billentyűparancsok

| Parancs | Művelet |
|---------|---------|
| `Ctrl+Z` | Visszavonás (Undo) |
| `Ctrl+Y` | Újra (Redo) |

---

## 🎨 Design System

### Színek (HSL)

```css
--background: 240 10% 4%;      /* Háttér */
--foreground: 0 0% 95%;        /* Szöveg */
--primary: 262 83% 58%;        /* Elsődleges (lila) */
--accent: 173 80% 40%;         /* Kiegészítő (cián) */
--destructive: 0 72% 51%;      /* Hibák (piros) */

/* Brand színek */
--violet: 262 83% 58%;
--cyan: 173 80% 40%;
--rose: 350 89% 60%;
--amber: 38 92% 50%;
--emerald: 160 84% 39%;
```

### Utility Osztályok

```css
.glow-amber   /* Borostyán fényeffekt */
.glow-sky     /* Égkék fényeffekt */
.glow-purple  /* Lila fényeffekt */
.glow-rose    /* Rózsaszín fényeffekt */
.glow-cyan    /* Cián fényeffekt */
.glass        /* Üveg effekt */
.glass-strong /* Erős üveg effekt */
.text-gradient-primary  /* Gradiens szöveg */
.preset-card  /* Preset kártya stílus */
```

### Animációk

```css
.animate-glow-pulse    /* Pulzáló animáció */
.animate-glow-breathe  /* Lélegző animáció */
.animate-glow-wave     /* Hullámzó animáció */
```

---

## 💾 Adattárolás

### LocalStorage Kulcsok

| Kulcs | Tartalom |
|-------|----------|
| `effect-editor` | Jelenlegi effekt állapot |
| `theme-customizer` | Téma beállítások |
| `effect-editor-custom-presets` | Egyéni presetek |

---

## 🔧 Fejlesztői Információk

### Komponens Minta

```tsx
import { memo, useCallback } from 'react';
import { useEffects } from '@/contexts/ThemeContext';

export const MyComponent = memo(() => {
  const { state, updateGlowSettings } = useEffects();
  
  const handleChange = useCallback((value: number) => {
    updateGlowSettings({ lightness: value });
  }, [updateGlowSettings]);
  
  return (
    // JSX
  );
});

MyComponent.displayName = 'MyComponent';
```

### Teljesítmény Optimalizációk

- `memo()` komponenseken
- `useCallback()` és `useMemo()` hook-ok
- Lazy loading az App komponensen
- Code splitting route-okra

---

## 📱 Előnézet Sablonok

| Sablon | Leírás |
|--------|--------|
| Onboarding | Üdvözlő képernyő |
| Dashboard | Irányítópult kártyákkal |
| Profile | Felhasználói profil |
| Cards | Bankkártya megjelenítés |

---

## 🚀 Jövőbeli Fejlesztési Lehetőségek

1. **Felhasználói fiókok** - Presetek mentése felhőbe
2. **Megosztás** - Presetek megosztása linkkel
3. **Több export formátum** - SCSS, Styled Components
4. **Animáció idővonalja** - Komplex animációk szerkesztése
5. **Kollaboráció** - Valós idejű együttműködés

---

## 📝 Verzió

- **Aktuális verzió**: 1.0
- **Utolsó frissítés**: 2025-12-17
