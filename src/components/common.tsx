import { useState, ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  text: string;
  successMessage?: string;
  children?: ReactNode;
}

export const CopyButton = ({
  text,
  successMessage = "Copied to clipboard",
  children,
  ...buttonProps
}: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: successMessage });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleCopy} {...buttonProps}>
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Copied
        </>
      ) : (
        children || (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </>
        )
      )}
    </Button>
  );
};

interface CopyBadgeProps {
  text: string;
  label?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export const CopyBadge = ({
  text,
  label,
  variant = "secondary",
}: CopyBadgeProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: "Copied to clipboard" });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
      });
    }
  };

  return (
    <Badge
      variant={variant}
      className="cursor-pointer hover:opacity-80 transition-opacity"
      onClick={handleCopy}
    >
      {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
      {label || text}
    </Badge>
  );
};
