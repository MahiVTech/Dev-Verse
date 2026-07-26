import { type InputHTMLAttributes, forwardRef, type ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-2">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              "w-full bg-surface-2/70 border border-border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-muted-2 outline-none transition-all duration-200",
              "focus:border-cyan/60 focus:bg-surface-2 focus:ring-2 focus:ring-cyan/15",
              icon && "pl-10",
              error && "border-danger/60",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
