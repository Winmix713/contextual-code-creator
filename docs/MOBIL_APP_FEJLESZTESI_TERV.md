# 📱 Effect Studio - Mobil Alkalmazás Fejlesztési Terv

> Verzió: 1.0 | Dátum: 2026-01-05

---

## 1. PROJEKT ÁTTEKINTÉS

| Tulajdonság | Érték |
|-------------|-------|
| **Alkalmazás neve** | Effect Studio Mobile |
| **Leírás** | Fények, árnyékok és hangulatok valós idejű finomhangolása - CSS effekt szerkesztő |
| **Alap projekt** | React + TypeScript + Vite web alkalmazás |
| **Mobil megközelítés** | Capacitor (natív iOS/Android) VAGY PWA |
| **Célközönség** | Designerek, frontend fejlesztők, UI/UX szakemberek |

---

## 2. TECHNOLÓGIAI DÖNTÉS

### 2.1 Opció A: Progressive Web App (PWA)
**Ajánlott egyszerűbb esetekhez**

| Előny | Hátrány |
|-------|---------|
| Nincs app store publikálás | Korlátozott natív funkciók |
| Gyors telepítés böngészőből | iOS-en limitált push notification |
| Egy kódbázis minden platformon | Kevésbé "natív" élmény |
| Offline működés | |

### 2.2 Opció B: Capacitor Native App
**Ajánlott teljes funkcionalitáshoz**

| Előny | Hátrány |
|-------|---------|
| Teljes natív hozzáférés | Xcode/Android Studio szükséges |
| App Store publikálás | Bonyolultabb build folyamat |
| Legjobb teljesítmény | Külön iOS/Android karbantartás |
| Push notifications | |

### 2.3 Javasolt megközelítés
**Capacitor** - mivel a meglévő React kódbázis könnyedén csomagolható natív appba, és a valós idejű preview funkcióhoz a legjobb teljesítmény szükséges.

---

## 3. FUNKCIONÁLIS KÖVETELMÉNYEK

### 3.1 Négy Effekt Típus (a desktop verzióból)

#### Glow Effect
| Beállítás | Típus | Tartomány | Leírás |
|-----------|-------|-----------|--------|
| `lightness` | number | 0-100 | OKLCH világosság |
| `chroma` | number | 0-0.4 | Színtelítettség |
| `hue` | number | 0-360 | Színárnyalat |
| `baseColor` | string | HEX | Alap szín (#FF9F00) |
| `animation` | enum | none/pulse/breathe/wave | Animáció típus |
| `animationSpeed` | number | 1-10 | Sebesség (mp) |
| `animationIntensity` | number | 0-100 | Intenzitás |
| `maskSize` | number | 0-1 | Maszk méret |
| `glowScale` | number | 0-2 | Glow skálázás |
| `noiseEnabled` | boolean | - | Zaj textúra |
| `noiseIntensity` | number | 0-1 | Zaj intenzitás |

#### Glass Effect
| Beállítás | Típus | Tartomány | Leírás |
|-----------|-------|-----------|--------|
| `blur` | number | 0-50 | Homályosság (px) |
| `opacity` | number | 0-100 | Átlátszóság (%) |
| `saturation` | number | 0-200 | Telítettség (%) |
| `borderWidth` | number | 0-5 | Keret vastagság |
| `borderOpacity` | number | 0-100 | Keret átlátszóság |
| `tint` | string | HEX | Tónusszín |
| `tintStrength` | number | 0-100 | Tónus erősség |

#### Neomorph Effect
| Beállítás | Típus | Tartomány | Leírás |
|-----------|-------|-----------|--------|
| `distance` | number | 0-50 | Árnyék távolság |
| `blur` | number | 0-100 | Homályosság |
| `intensity` | number | 0-100 | Intenzitás |
| `shape` | enum | flat/concave/convex/pressed | Forma típus |
| `lightSource` | number | 0-360 | Fényforrás szög |
| `surfaceColor` | string | HEX | Felület szín |

#### Clay Effect
| Beállítás | Típus | Tartomány | Leírás |
|-----------|-------|-----------|--------|
| `depth` | number | 0-50 | Mélység |
| `spread` | number | 0-50 | Terjedés |
| `borderRadius` | number | 0-100 | Lekerekítés |
| `highlightColor` | string | HEX | Kiemelés szín |
| `shadowColor` | string | HEX | Árnyék szín |
| `surfaceTexture` | enum | smooth/matte/glossy | Textúra |
| `bendAngle` | number | -45 to 45 | Hajlítási szög |
| `shadowDirection` | enum | top-left/top-right/bottom-left/bottom-right | Árnyék irány |

### 3.2 Fő Funkciók
- ✅ Valós idejű előnézet (telefon keretben)
- ✅ Effekt be/kikapcsolás
- ✅ Preset rendszer (beépített + egyéni)
- ✅ Undo/Redo támogatás
- ✅ CSS/JSON exportálás
- ✅ Téma testreszabás
- ✅ LocalStorage perzisztencia

---

## 4. KÉPERNYŐ ARCHITEKTÚRA

### 4.1 Tab Navigáció (5 fül - desktop alapján)

```
┌─────────────────────────────────────────────────────────┐
│                   Effect Studio                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                  [Előnézet Panel]                        │
│                  (Telefon preview)                       │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  ⚡       │  ✨        │  ⚙️      │  📋       │  </>     │
│ Műveletek│ Presetek  │ Téma    │ Vizsgáló │ Export   │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Képernyő Részletek

#### Tab 1: Műveletek (QuickActionsPanel)
**Cél:** Gyors effekt ki/bekapcsolás és alapműveletek

**Komponensek:**
- Power gomb (összes effekt be/ki)
- Effekt toggle gombok (Glow, Glass, Neomorph, Clay)
- Undo/Redo gombok
- Reset gomb
- Aktív effektek számláló

#### Tab 2: Presetek (PresetsGallery)
**Cél:** Előre definiált és egyéni effekt kombinációk

**Komponensek:**
- Beépített preset kártyák (Glow, Glass, Neomorph, Clay alapú)
- Egyéni preset lista
- "Mentés presetként" gomb
- Preset törlés/szerkesztés
- Virtualizált lista (teljesítmény)

#### Tab 3: Téma (ThemeCustomizer)
**Cél:** Globális megjelenés beállítások

**Komponensek:**
- Mód választó (Light/Dark/System)
- Forma preset (Sharp/Rounded/Full)
- Elsődleges szín választó
- Akcentus szín választó
- Felület stílus (Filled/Translucent)
- Skálázás slider
- Border width beállítás

#### Tab 4: Vizsgáló (PropertyInspector)
**Cél:** Részletes tulajdonság szerkesztés

**Komponensek:**
- Kijelölt elem információk
- Layout beállítások (width, height, margin, padding)
- Megjelenés beállítások (background, border, shadow)
- Transform beállítások
- CSS/Tailwind generálás

#### Tab 5: Exportálás (ExportPanel)
**Cél:** Kód exportálás és megosztás

**Komponensek:**
- CSS kód előnézet (szintaxis kiemelés)
- JSON konfiguráció nézet
- Másolás gomb
- Formátum választó (CSS/Tailwind/JSON)
- Megosztás opciók

---

## 5. ADATSTRUKTÚRA (TypeScript - projekt alapján)

```typescript
// ============================================================================
// EFFEKT TÍPUSOK (src/contexts/types.ts alapján)
// ============================================================================

export type EffectType = 'glow' | 'glass' | 'neomorph' | 'clay';
export type ThemeModeType = 'dark' | 'light' | 'auto';
export type GlowAnimationType = 'none' | 'pulse' | 'breathe' | 'wave';
export type ShapeType = 'flat' | 'concave' | 'convex' | 'pressed';
export type SurfaceTexture = 'smooth' | 'matte' | 'glossy';
export type ShadowDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface GlowSettings {
  lightness: number;
  chroma: number;
  hue: number;
  baseColor: string;
  animation: GlowAnimationType;
  animationSpeed: number;
  animationIntensity: number;
  maskSize: number;
  glowScale: number;
  noiseEnabled: boolean;
  noiseIntensity: number;
}

export interface GlassSettings {
  blur: number;
  opacity: number;
  saturation: number;
  borderWidth: number;
  borderOpacity: number;
  tint: string;
  tintStrength: number;
}

export interface NeomorphSettings {
  distance: number;
  blur: number;
  intensity: number;
  shape: ShapeType;
  lightSource: number;
  surfaceColor: string;
}

export interface ClaySettings {
  depth: number;
  spread: number;
  borderRadius: number;
  highlightColor: string;
  shadowColor: string;
  surfaceTexture: SurfaceTexture;
  bendAngle: number;
  opacity?: number;
  blur?: number;
  shadowDirection?: ShadowDirection;
}

export interface EffectState {
  powerOn: boolean;
  activeEffects: Record<EffectType, boolean>;
  themeMode: ThemeModeType;
  glowSettings: GlowSettings;
  blurSettings: BlurSettings;
  glassSettings: GlassSettings;
  neomorphSettings: NeomorphSettings;
  claySettings: ClaySettings;
}

// Preset típus
export interface Preset {
  id: string;
  name: string;
  description: string;
  state: EffectState;
  isBuiltIn: boolean;
  createdAt: string;
}
```

---

## 6. KOMPONENS MAPPING (Desktop → Mobil)

| Desktop Komponens | Mobil Megfelelő | Megjegyzés |
|-------------------|-----------------|------------|
| `MultiEffectEditor` | `EffectsScreen` | Fő effekt panel |
| `EffectEditorTabs` | Tab navigáción belül | Effekt-specifikus szerkesztők |
| `GlowEditor` | `GlowEditorMobile` | Touch-optimalizált sliderek |
| `GlassEditor` | `GlassEditorMobile` | Touch-optimalizált sliderek |
| `NeomorphEditor` | `NeomorphEditorMobile` | Touch-optimalizált sliderek |
| `ClayEditor` | `ClayEditorMobile` | Touch-optimalizált sliderek |
| `PhonePreview` | `PreviewPanel` | Kisebb méret, gesztus zoom |
| `PresetsGallery` | `PresetsScreen` | Virtualizált lista |
| `ThemeCustomizer` | `ThemeScreen` | Téma beállítások |
| `PropertyInspector` | `InspectorScreen` | Tulajdonság vizsgáló |
| `ExportPanel` | `ExportScreen` | Export funkciók |
| `QuickActionsPanel` | `ActionsScreen` | Gyors műveletek |
| `HistoryTimeline` | `HistorySheet` | Bottom sheet-ként |

---

## 7. MOBIL FÁJLSTRUKTÚRA

```
src/
├── App.tsx                           # Fő komponens (Capacitor wrapper)
├── screens/
│   ├── ActionsScreen.tsx             # Tab 1: Műveletek
│   ├── PresetsScreen.tsx             # Tab 2: Presetek
│   ├── ThemeScreen.tsx               # Tab 3: Téma
│   ├── InspectorScreen.tsx           # Tab 4: Vizsgáló
│   └── ExportScreen.tsx              # Tab 5: Exportálás
├── components/
│   ├── mobile/
│   │   ├── MobileSlider.tsx          # Touch-optimalizált slider
│   │   ├── MobileColorPicker.tsx     # Mobil színválasztó
│   │   ├── MobilePreviewPanel.tsx    # Előnézet (pinch-zoom)
│   │   ├── EffectToggleButton.tsx    # Effekt ki/be gomb
│   │   ├── PresetCard.tsx            # Preset kártya
│   │   └── BottomSheet.tsx           # Alsó panel (history, stb.)
│   ├── editors/
│   │   ├── GlowEditorMobile.tsx
│   │   ├── GlassEditorMobile.tsx
│   │   ├── NeomorphEditorMobile.tsx
│   │   └── ClayEditorMobile.tsx
│   └── navigation/
│       └── TabNavigator.tsx          # Alsó tab navigáció
├── contexts/                         # Meglévő context-ek újrahasználva
│   ├── EffectContext.tsx             # ✅ Változatlan
│   ├── ThemeContext.tsx              # ✅ Változatlan
│   └── types.ts                      # ✅ Változatlan
├── hooks/                            # Meglévő hook-ok újrahasználva
│   ├── useHistory.ts                 # ✅ Változatlan
│   ├── useDebounce.ts                # ✅ Változatlan
│   └── useMobileGestures.ts          # ÚJ: gesztus kezelés
├── lib/
│   ├── color-conversion.ts           # ✅ Változatlan
│   ├── utils.ts                      # ✅ Változatlan
│   └── haptics.ts                    # ÚJ: taptic feedback
└── capacitor.config.ts               # Capacitor konfiguráció
```

---

## 8. MOBIL-SPECIFIKUS UI/UX TERVEZÉS

### 8.1 Szín Paletta (desktop alapján)
```css
/* Elsődleges színek */
--primary: hsl(262 83% 58%);        /* Lila */
--accent: hsl(173 80% 40%);         /* Cián */

/* Háttér színek */
--background: hsl(240 10% 4%);      /* Sötét háttér */
--card: hsl(240 6% 10%);            /* Kártya háttér */

/* Szöveg színek */
--foreground: hsl(0 0% 95%);        /* Világos szöveg */
--muted-foreground: hsl(240 5% 65%); /* Halvány szöveg */

/* Effekt színek */
--glow-amber: hsl(38 92% 50%);
--glow-cyan: hsl(173 80% 40%);
--glow-rose: hsl(350 89% 60%);
```

### 8.2 Tipográfia
| Használat | Méret | Súly | Font |
|-----------|-------|------|------|
| Heading | 20px | Bold | Outfit |
| Subheading | 16px | SemiBold | Outfit |
| Body | 14px | Regular | Outfit |
| Label | 12px | Medium | Outfit |
| Code | 13px | Regular | JetBrains Mono |

### 8.3 Spacing
| Token | Érték | Használat |
|-------|-------|-----------|
| xs | 4px | Ikonok közötti |
| sm | 8px | Elemek közötti |
| md | 16px | Szekciók közötti |
| lg | 24px | Panel padding |
| xl | 32px | Képernyő szélei |

### 8.4 Mobil Komponens Méretek
| Komponens | Min. magasság | Megjegyzés |
|-----------|---------------|------------|
| Tab bar | 56px | iOS/Android szabvány |
| Button (primary) | 48px | Touch-friendly |
| Slider thumb | 24px | Könnyű megfogás |
| Preset card | 80px | Tartalom + ikon |
| Input field | 44px | iOS szabvány |

---

## 9. GESZTUS KEZELÉS

| Gesztus | Művelet | Komponens |
|---------|---------|-----------|
| Tap | Kiválasztás/Toggle | Gombok, preset-ek |
| Long press | Kontextus menü | Preset-ek (törlés/szerkesztés) |
| Swipe left/right | Tab váltás | Tab navigáció |
| Pinch zoom | Előnézet nagyítás | Preview panel |
| Pan | Slider állítás | Slider komponensek |
| Double tap | Reset értékre | Sliderek |

---

## 10. CAPACITOR KONFIGURÁCIÓ

```typescript
// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.effectstudio',
  appName: 'Effect Studio',
  webDir: 'dist',
  server: {
    // Fejlesztéshez - sandbox URL
    url: 'https://da0f4602-3b50-4977-a5ba-dc8c3a7030f0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0a0a0f',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0a0a0f'
    },
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true
    }
  },
  ios: {
    contentInset: 'automatic'
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
```

---

## 11. FEJLESZTÉSI FÁZISOK

### Fázis 1: Alapok (1-2 nap)
- [ ] Capacitor projekt inicializálás
- [ ] Tab navigáció beállítása
- [ ] Meglévő context-ek integrálása
- [ ] Alap képernyők létrehozása

### Fázis 2: Effekt Szerkesztők (2-3 nap)
- [ ] Touch-optimalizált slider komponens
- [ ] Mobil színválasztó
- [ ] GlowEditorMobile
- [ ] GlassEditorMobile
- [ ] NeomorphEditorMobile
- [ ] ClayEditorMobile

### Fázis 3: Előnézet és Presetek (1-2 nap)
- [ ] Mobil preview panel (pinch-zoom)
- [ ] Preset galéria
- [ ] Egyéni preset mentés
- [ ] Virtualizált lista

### Fázis 4: Export és Téma (1 nap)
- [ ] CSS/JSON export
- [ ] Clipboard API integráció
- [ ] Téma beállítások
- [ ] Dark/Light mód

### Fázis 5: Polish és Tesztelés (1-2 nap)
- [ ] Haptic feedback
- [ ] Animációk finomhangolása
- [ ] iOS/Android tesztelés
- [ ] Teljesítmény optimalizálás

---

## 12. MÉRFÖLDKÖVEK

| Verzió | Funkciók | Becsült idő |
|--------|----------|-------------|
| v0.1 | Alap navigáció + 1 effekt szerkesztő | 2 nap |
| v0.2 | Összes effekt szerkesztő + preview | 3 nap |
| v0.3 | Preset rendszer + export | 2 nap |
| v0.4 | Téma + polish | 1 nap |
| v1.0 | Release Ready | 1 nap |
| **Összesen** | | **~9 nap** |

---

## 13. ÚJRAHASZNÁLHATÓ KOMPONENSEK

A következő desktop komponensek **változtatás nélkül** használhatók:

| Komponens/Modul | Fájl |
|-----------------|------|
| EffectContext | `src/contexts/EffectContext.tsx` |
| ThemeContext | `src/contexts/ThemeContext.tsx` |
| Type definitions | `src/contexts/types.ts` |
| Color conversion | `src/lib/color-conversion.ts` |
| History hook | `src/hooks/useHistory.ts` |
| Debounce hook | `src/hooks/useDebounce.ts` |
| Utils | `src/lib/utils.ts` |

---

## 14. NATÍV FUNKCIÓK (Capacitor Plugins)

| Plugin | Használat |
|--------|-----------|
| `@capacitor/haptics` | Taptic feedback sliderek mozgatásakor |
| `@capacitor/clipboard` | CSS kód másolása |
| `@capacitor/share` | Preset/CSS megosztás |
| `@capacitor/status-bar` | Státuszsor stílus |
| `@capacitor/splash-screen` | Splash screen |
| `@capacitor/keyboard` | Billentyűzet kezelés |

---

## 15. TELEPÍTÉSI LÉPÉSEK (Capacitor)

```bash
# 1. Függőségek telepítése
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android

# 2. Capacitor inicializálás
npx cap init "Effect Studio" "app.lovable.effectstudio"

# 3. Platformok hozzáadása
npx cap add ios
npx cap add android

# 4. Build és sync
npm run build
npx cap sync

# 5. Futtatás
npx cap run ios      # iOS emulátor
npx cap run android  # Android emulátor
```

---

## 16. JÖVŐBELI FEJLESZTÉSEK

| Funkció | Prioritás | Leírás |
|---------|-----------|--------|
| Cloud sync | Magas | Supabase preset szinkronizálás |
| Közösségi presetek | Közepes | Preset megosztás más felhasználókkal |
| Widget | Alacsony | iOS/Android widget gyors hozzáféréshez |
| Apple Watch | Alacsony | Companion app |
| Offline mód | Közepes | Teljes offline funkcionalitás |

---

## 📚 Kapcsolódó Dokumentumok

- [APP_TARTALMA.md](./APP_TARTALMA.md) - Desktop app dokumentáció
- [DOKUMENTACIO.md](../DOKUMENTACIO.md) - Fejlesztői dokumentáció
- [Capacitor Docs](https://capacitorjs.com/docs) - Hivatalos Capacitor dokumentáció
