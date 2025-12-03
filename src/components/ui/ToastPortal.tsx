import React from 'react';
import { Toaster as SonnerToaster } from 'sonner';

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

interface ToastPortalProps {
  position?: ToastPosition;
  richColors?: boolean;
  expand?: boolean;
  closeButton?: boolean;
}

const ToastPortal: React.FC<ToastPortalProps> = ({
  position = 'top-right',
  richColors = true,
  expand = false,
  closeButton = true,
}) => {
  return (
    <SonnerToaster
      position={position}
      richColors={richColors}
      expand={expand}
      closeButton={closeButton}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
    />
  );
};

export default ToastPortal;
