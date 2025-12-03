import { Loader2 } from "lucide-react";

interface PageLoadingProps {
  message?: string;
}

const PageLoading = ({ message = "Betöltés..." }: PageLoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
};

export default PageLoading;
