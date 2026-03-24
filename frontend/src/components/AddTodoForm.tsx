import { useState, FormEvent } from 'react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

interface AddTodoFormProps {
  onAdd: (title: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo title"
        className="flex-1 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />
      <Button
        type="submit"
        variant="default"
        className="shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Add
      </Button>
    </form>
  );
}
