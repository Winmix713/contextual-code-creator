import React, { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  useMemo, 
  useEffect,
  ReactNode 
} from 'react';
import type { ThemeConfig } from './types';

// Re-export types for backward compatibility
export type {
  EffectType,
  ThemeModeType,
  GlowAnimationType,
  ShapeType,
  SurfaceTexture,
  ShadowDirection,
  ThemeMode,
  ShapePreset,
  SolidStyle,
  EffectStyle,
  SurfaceStyle,
  DataStyle,
  TransitionStyle,
  GlowSettings,
  BlurSettings,
  GlassSettings,
  NeomorphSettings,
  ClaySettings,
  EffectState,
  ThemeConfig,
} from './types';

// Re-export from EffectContext for backward compatibility
export {
  EffectProvider,
  useEffects,
  useEffectToggle,
  useGlowControls,
  useBlurControls,
  defaultEffectState,
} from './EffectContext';

// ============================================================================
// CONSTANTS
// ============================================================================

const THEME_STORAGE_KEY = 'theme-customizer';

export const defaultThemeConfig: ThemeConfig = {
  mode: 'dark',
  shape: 'rounded',
  colors: {
    primary: '217 91% 60%',
    accent: '280 85% 65%',
    neutral: 'slate',
  },
  solidStyle: 'color',
  effectStyle: 'flat',
  surface: 'filled',
  scaling: 100,
  dataStyle: 'categorical',
  transition: 'all',
  borderWidth: 1,
  depthEffect: false,
  noiseEffect: false,
  fieldBaseSize: 4,
  selectorBaseSize: 4,
};

// ============================================================================
// CONTEXT TYPE
// ============================================================================

interface ThemeContextType {
  theme: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeConfig>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultThemeConfig,
          ...parsed,
          colors: {
            ...defaultThemeConfig.colors,
            ...(parsed.colors || {}),
          },
        };
      }
      return defaultThemeConfig;
    } catch {
      localStorage.removeItem(THEME_STORAGE_KEY);
      return defaultThemeConfig;
    }
  });

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const updateTheme = useCallback((updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({
      ...prev,
      ...updates,
      colors: updates.colors ? { ...prev.colors, ...updates.colors } : prev.colors,
    }));
  }, []);

  const resetTheme = useCallback(() => {
    setTheme(defaultThemeConfig);
    localStorage.removeItem(THEME_STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({ theme, updateTheme, resetTheme }), [theme, updateTheme, resetTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================================
// HOOK
// ============================================================================

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: defaultThemeConfig,
      updateTheme: () => {},
      resetTheme: () => {},
    };
  }
  return context;
};
