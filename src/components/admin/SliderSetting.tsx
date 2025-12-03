import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface SliderSettingProps {
  label: string;
  description?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onValueChange: (value: number) => void;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
}

export const SliderSetting = ({
  label,
  description,
  value,
  min,
  max,
  step = 1,
  onValueChange,
  formatValue,
  disabled = false,
  className,
}: SliderSettingProps) => {
  const displayValue = formatValue ? formatValue(value) : String(value);

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-foreground">{label}</label>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        <span className="text-sm font-mono text-muted-foreground">{displayValue}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([val]) => onValueChange(val)}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
};

export default SliderSetting;