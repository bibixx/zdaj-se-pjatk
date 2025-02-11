import { cn } from 'utils';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from 'components/ui/toast';
import { useToast } from 'components/ui/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, htmlId, title, description, action, hideClose, className, ...props }) => {
        return (
          <Toast
            key={id}
            id={htmlId}
            className={cn(
              'data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-top-full mb-4',
              className,
            )}
            {...props}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
              {action && <div>{action}</div>}
            </div>
            {!hideClose && <ToastClose />}
          </Toast>
        );
      })}
      <ToastViewport className="sm:top-0" />
    </ToastProvider>
  );
}
