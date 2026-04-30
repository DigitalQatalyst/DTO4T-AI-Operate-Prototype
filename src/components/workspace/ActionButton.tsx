import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ActionButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ElementType;
  iconPosition?: 'left' | 'right';
}

export default function ActionButton({
  loading = false,
  loadingText,
  icon: Icon,
  iconPosition = 'left',
  children,
  disabled,
  className,
  ...props
}: ActionButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Button disabled={isDisabled} className={cn(className)} {...props}>
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </Button>
  );
}
