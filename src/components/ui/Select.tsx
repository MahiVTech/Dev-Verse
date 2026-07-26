import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export function Select({ options, className = '', ...props }: SelectProps) {
  return (
    <div className="relative">
      <select {...props} className={`input-field appearance-none pr-9 cursor-pointer ${className}`}>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink-700">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
    </div>
  );
}
