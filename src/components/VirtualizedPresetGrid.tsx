import { memo, useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { Check, Trash2 } from 'lucide-react';

// ==================== TYPES ====================
interface ActiveEffects {
  glow: boolean;
  glass: boolean;
  neomorph: boolean;
  clay: boolean;
}

interface PreviewConfig {
  gradient: string;
  borderColor: string;
}

interface PresetSettings {
  activeEffects: ActiveEffects;
  [key: string]: any;
}

interface Preset {
  id: string;
  name: string;
  description: string;
  isCustom?: boolean;
  preview: PreviewConfig;
  settings: PresetSettings;
}

interface VirtualizedPresetGridProps {
  presets: Preset[];
  selectedPreset: string | null;
  onApply: (preset: Preset) => void;
  onDelete?: (presetId: string, e: React.MouseEvent) => void;
  containerHeight?: number;
}

// ==================== CONSTANTS ====================
const CARD_HEIGHT = 140; // px per card
const CARDS_PER_ROW = 2;
const GAP = 12; // gap between cards
const ROW_HEIGHT = CARD_HEIGHT + GAP;
const OVERSCAN = 2; // extra rows to render above/below viewport

// ==================== PRESET CARD ====================
const PresetCard = memo<{
  preset: Preset;
  isSelected: boolean;
  onApply: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}>(({ preset, isSelected, onApply, onDelete }) => (
  <div
    onClick={onApply}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === 'Enter' && onApply()}
    className="preset-card group p-3 text-left relative transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer h-[140px]"
    aria-label={`${preset.name} preset alkalmazása`}
    data-testid={`preset-card-${preset.id}`}
  >
    {preset.isCustom && onDelete && (
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 p-1 rounded bg-destructive/80 hover:bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label={`${preset.name} törlése`}
      >
        <Trash2 className="w-3 h-3" />
      </button>
    )}
    
    <div 
      className="h-16 rounded-lg mb-2 relative overflow-hidden"
      style={{ background: preset.preview.gradient }}
    >
      <div className="absolute inset-0 bg-black/20" />
      {isSelected && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="p-1.5 rounded-full bg-primary">
            <Check className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
      )}
      {preset.isCustom && (
        <div className="absolute top-1 left-1 px-1.5 py-0.5 text-[8px] rounded bg-primary/80 text-primary-foreground font-medium">
          Egyéni
        </div>
      )}
    </div>
    
    <div className="space-y-0.5">
      <div className="flex items-center gap-1.5">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: preset.preview.borderColor }}
        />
        <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
          {preset.name}
        </span>
      </div>
      <p className="text-[10px] text-muted-foreground line-clamp-1">
        {preset.description}
      </p>
    </div>
    
    <div className="flex gap-1 mt-2 flex-wrap">
      {Object.entries(preset.settings.activeEffects).map(([effect, isActive]) => (
        isActive && (
          <span 
            key={effect}
            className="px-1.5 py-0.5 text-[9px] rounded bg-secondary text-muted-foreground capitalize"
          >
            {effect}
          </span>
        )
      ))}
    </div>
  </div>
));

PresetCard.displayName = 'PresetCard';

// ==================== VIRTUALIZED GRID ====================
export const VirtualizedPresetGrid = memo<VirtualizedPresetGridProps>(({
  presets,
  selectedPreset,
  onApply,
  onDelete,
  containerHeight = 400,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  // Calculate total rows and content height
  const totalRows = Math.ceil(presets.length / CARDS_PER_ROW);
  const contentHeight = totalRows * ROW_HEIGHT;

  // Calculate visible range with overscan
  const visibleRange = useMemo(() => {
    const startRow = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const visibleRows = Math.ceil(containerHeight / ROW_HEIGHT) + OVERSCAN * 2;
    const endRow = Math.min(totalRows, startRow + visibleRows);
    
    return { startRow, endRow };
  }, [scrollTop, containerHeight, totalRows]);

  // Get visible presets
  const visiblePresets = useMemo(() => {
    const startIndex = visibleRange.startRow * CARDS_PER_ROW;
    const endIndex = visibleRange.endRow * CARDS_PER_ROW;
    
    return presets.slice(startIndex, endIndex).map((preset, index) => ({
      preset,
      index: startIndex + index,
    }));
  }, [presets, visibleRange]);

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // For small lists (< 20 items), don't virtualize
  if (presets.length < 20) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset) => (
          <PresetCard
            key={preset.id}
            preset={preset}
            isSelected={selectedPreset === preset.id}
            onApply={() => onApply(preset)}
            onDelete={preset.isCustom && onDelete ? (e) => onDelete(preset.id, e) : undefined}
          />
        ))}
      </div>
    );
  }

  // Virtualized rendering for large lists
  return (
    <div
      ref={containerRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div 
        className="relative"
        style={{ height: contentHeight }}
      >
        <div
          className="absolute left-0 right-0 grid grid-cols-2 gap-3"
          style={{ 
            top: visibleRange.startRow * ROW_HEIGHT,
          }}
        >
          {visiblePresets.map(({ preset, index }) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              isSelected={selectedPreset === preset.id}
              onApply={() => onApply(preset)}
              onDelete={preset.isCustom && onDelete ? (e) => onDelete(preset.id, e) : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

VirtualizedPresetGrid.displayName = 'VirtualizedPresetGrid';
