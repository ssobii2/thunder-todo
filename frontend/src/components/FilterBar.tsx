import type { Filter } from '../types';

interface FilterBarProps {
  current: Filter;
  onChange: (filter: Filter) => void;
}

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export function FilterBar({ current, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2">
      {FILTERS.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          aria-pressed={current === value}
          className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer ${
            current === value
              ? 'active bg-slate-50 text-slate-900 border-transparent hover:bg-slate-200'
              : 'bg-transparent text-slate-400 border-slate-600 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
