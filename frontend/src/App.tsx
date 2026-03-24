import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from './api';
import { AddTodoForm } from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import { TodoItem } from './components/TodoItem';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import type { Todo } from './types';

type Filter = 'all' | 'active' | 'completed';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = async (status: Filter) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTodos(status);
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTodos(filter);
  }, [filter]);

  const handleAdd = async (title: string) => {
    try {
      await createTodo(title);
      await loadTodos(filter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await toggleTodo(id, completed);
      await loadTodos(filter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      await loadTodos(filter);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
    }
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Thunder Todo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AddTodoForm onAdd={(title) => { void handleAdd(title); }} />
          <FilterBar current={filter} onChange={setFilter} />

          {loading && <p className="text-center text-muted-foreground py-4">Loading...</p>}

          {error && <p className="text-destructive text-sm">{error}</p>}

          {!loading && todos.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No todos here!</p>
          )}

          <div className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={(id, completed) => { void handleToggle(id, completed); }}
                onDelete={(id) => { void handleDelete(id); }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
