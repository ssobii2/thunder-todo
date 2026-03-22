import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-slate-700 transition-opacity">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id, !todo.completed)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'active' : 'completed'}`}
        className="border-slate-500"
      />
      <span
        className={`flex-1 text-sm ${todo.completed ? 'text-slate-500' : 'text-slate-100'}`}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      >
        {todo.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.title}"`}
        className="text-slate-500 hover:text-red-400 hover:bg-slate-800"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
