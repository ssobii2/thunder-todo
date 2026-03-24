import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';

type Filter = 'all' | 'active' | 'completed';

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
    <div className="flex gap-2" role="group" aria-label="Filter todos">
      {FILTERS.map(({ label, value }) => {
        const isActive = current === value;
        if (isActive) {
          return (
            <Badge
              key={value}
              variant="default"
              role="button"
              onClick={() => onChange(value)}
              aria-pressed={true}
              className="cursor-pointer px-3 py-1 text-xs font-medium focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {label}
            </Badge>
          );
        }
        return (
          <Button
            key={value}
            variant="ghost"
            size="sm"
            onClick={() => onChange(value)}
            aria-pressed={false}
            className="text-xs px-3 py-1 h-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
