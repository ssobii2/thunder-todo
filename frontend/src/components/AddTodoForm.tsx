import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        aria-label="New todo title"
        className="flex-1 bg-slate-900 border-slate-600 text-slate-50 placeholder:text-slate-500"
      />
      <Button
        type="submit"
        variant="default"
        className="bg-slate-50 text-slate-900 hover:bg-slate-200"
      >
        Add
      </Button>
    </form>
  );
}
