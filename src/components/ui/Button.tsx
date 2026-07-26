import { type ButtonHTMLAttributes, type ReactNode, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  loading?: boolean;
}

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3.5 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-sm gap-2',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'primary', size = 'md', icon, loading, className, disabled, ...props },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-cyan-glow';

    const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary:
        'text-ink-900 bg-gradient-to-r from-cyan-glow to-violet-glow shadow-glow-sm hover:shadow-glow hover:scale-[1.02]',
      secondary: 'glass text-white/90 hover:bg-white/[0.08] hover:border-cyan-glow/30',
      ghost: 'text-white/70 hover:text-white hover:bg-white/[0.06]',
      danger:
        'bg-danger/90 hover:bg-danger text-white shadow-[0_0_20px_rgba(248,113,113,0.35)]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(base, SIZE_CLASSES[size], variantClasses[variant], className)}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          icon && <span className="flex-shrink-0">{icon}</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
