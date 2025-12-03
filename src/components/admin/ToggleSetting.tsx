import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ToggleSettingProps {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const ToggleSetting = ({
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
  className,
}: ToggleSettingProps) => {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex-1">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
};

export default ToggleSetting;