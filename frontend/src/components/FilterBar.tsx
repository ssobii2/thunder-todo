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
    <div className="filter-bar">
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
              className="cursor-pointer"
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
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
