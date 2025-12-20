// ============================================================================
// EFFECT TYPES
// ============================================================================

export type EffectType = 'glow' | 'glass' | 'neomorph' | 'clay';
export type ThemeModeType = 'dark' | 'light' | 'auto';
export type GlowAnimationType = 'none' | 'pulse' | 'breathe' | 'wave';
export type ShapeType = 'flat' | 'concave' | 'convex' | 'pressed';
export type SurfaceTexture = 'smooth' | 'matte' | 'glossy';
export type ShadowDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

// ============================================================================
// THEME CUSTOMIZER TYPES
// ============================================================================

export type ThemeMode = 'light' | 'dark' | 'system';
export type ShapePreset = 'sharp' | 'rounded' | 'full';
export type SolidStyle = 'color' | 'inverse' | 'contrast';
export type EffectStyle = 'flat' | 'plastic';
export type SurfaceStyle = 'filled' | 'translucent';
export type DataStyle = 'categorical' | 'divergent' | 'sequential';
export type TransitionStyle = 'all' | 'micro' | 'macro' | 'none';

// ============================================================================
// EFFECT INTERFACES
// ============================================================================

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

export interface BlurSettings {
  x: number;
  y: number;
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

// ============================================================================
// THEME CONFIG INTERFACE
// ============================================================================

export interface ThemeConfig {
  mode: ThemeMode;
  shape: ShapePreset;
  colors: {
    primary: string;
    accent: string;
    neutral: 'slate' | 'gray' | 'zinc';
  };
  solidStyle: SolidStyle;
  effectStyle: EffectStyle;
  surface: SurfaceStyle;
  scaling: number;
  dataStyle: DataStyle;
  transition: TransitionStyle;
  borderWidth: number;
  depthEffect: boolean;
  noiseEffect: boolean;
  fieldBaseSize: number;
  selectorBaseSize: number;
}
