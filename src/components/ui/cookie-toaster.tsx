import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from 'components/ui/toast';
import { useToast } from 'components/ui/use-toast';

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, htmlId, title, description, action, hideClose, ...props }) => {
        console.log(props);

        return (
          <Toast key={id} id={htmlId} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            {!hideClose && <ToastClose />}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
