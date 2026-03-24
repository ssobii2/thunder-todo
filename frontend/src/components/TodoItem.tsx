import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div
      className="todo-item group flex items-center gap-3 p-3 rounded-lg border bg-card text-card-foreground transition-all duration-200 hover:scale-[1.01] hover:shadow-md focus-within:ring-2 focus-within:ring-primary/50"
    >
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id, !todo.completed)}
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'active' : 'completed'}`}
        className="transition-transform duration-150 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />
      <span
        className={`flex-1 text-sm transition-all duration-200 ${
          todo.completed ? 'text-muted-foreground line-through' : 'text-foreground'
        }`}
      >
        {todo.title}
      </span>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete "${todo.title}"`}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 focus-visible:opacity-100 h-8 w-8"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
