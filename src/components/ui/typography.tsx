/* eslint-disable jsx-a11y/heading-has-content */
import { cn } from 'utils';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function TypographyH2({ className, ...props }: TypographyProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-1 text-2xl font-semibold tracking-tight transition-colors mt-4',
        className,
      )}
      {...props}
    />
  );
}

export function TypographyH3({ className, ...props }: TypographyProps) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight mt-2',
        className,
      )}
      {...props}
    />
  );
}
