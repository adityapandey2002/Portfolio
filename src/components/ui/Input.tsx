import { clsx } from 'clsx';

export interface InputProps {
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
}: InputProps) {
  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={id || undefined}
          className="mb-1 block text-[11px] font-mono uppercase tracking-wider text-ink-3 dark:text-ink-4 leading-none"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={clsx(
          // Surface fill, 2px border, zero radius, white text, hard offset shadow.
        'rounded-0 border-2 border-primary dark:border-white bg-surface dark:bg-surface-l1 text-white placeholder:text-ink-3 dark:placeholder:text-ink-4 shadow-[4px_4px_0_#000000] dark:shadow-[4px_4px_0_#000000]',
          // Instant, non-blurred focus ring in accent yellow (#facc15) in both themes.
        'focus:outline-none focus:border-primary-yellow dark:focus:border-primary-yellow focus:shadow-[4px_4px_0_#000000,3px_3px_0_#facc15] dark:focus:shadow-[4px_4px_0_#000000,3px_3px_0_#facc15] transition-colors duration-75',
        )}
      />
    </div>
  );
}
