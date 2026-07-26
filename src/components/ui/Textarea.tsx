import { type TextareaHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const areaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={areaId}
            className="block text-xs font-medium text-muted mb-1.5 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={areaId}
          className={clsx(
            "w-full bg-surface-2/70 border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted-2 outline-none transition-all duration-200 resize-none",
            "focus:border-cyan/60 focus:bg-surface-2 focus:ring-2 focus:ring-cyan/15",
            error && "border-danger/60",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
