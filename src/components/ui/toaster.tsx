
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className="animate-slide-in data-[state=open]:animate-slide-in data-[state=closed]:animate-fade-out data-[swipe=end]:animate-fade-out"
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="animate-fade-in">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="transition-opacity hover:opacity-100 focus:opacity-100" />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
