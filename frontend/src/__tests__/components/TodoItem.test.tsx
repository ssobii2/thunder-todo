import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem } from '../../components/TodoItem';
import { Todo } from '../../types';

const mockTodo: Todo = {
  id: 'todo-1',
  title: 'Buy groceries',
  completed: false,
  createdAt: '2026-03-22T00:00:00.000Z',
};

const completedTodo: Todo = {
  ...mockTodo,
  completed: true,
};

describe('TodoItem', () => {
  it('renders the todo title, a checkbox, and a delete button', () => {
    render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('checkbox is checked when todo.completed is true', () => {
    render(<TodoItem todo={completedTodo} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('checkbox is not checked when todo.completed is false', () => {
    render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('clicking checkbox calls onToggle with (todo.id, !todo.completed)', async () => {
    const onToggle = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={() => {}} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('todo-1', true);
  });

  it('clicking checkbox on completed todo calls onToggle with false', async () => {
    const onToggle = vi.fn();
    render(<TodoItem todo={completedTodo} onToggle={onToggle} onDelete={() => {}} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith('todo-1', false);
  });

  it('clicking delete button calls onDelete with todo.id', async () => {
    const onDelete = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={onDelete} />);
    await userEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(onDelete).toHaveBeenCalledWith('todo-1');
  });

  // Regression: completed state uses CSS class on the div (not inline style on the span)
  it('completed todo has line-through via CSS class on the container', () => {
    render(<TodoItem todo={completedTodo} onToggle={() => {}} onDelete={() => {}} />);
    const container = screen.getByText('Buy groceries').parentElement;
    expect(container).toHaveClass('completed');
  });

  it('non-completed todo does not have the completed class', () => {
    render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />);
    const container = screen.getByText('Buy groceries').parentElement;
    expect(container).not.toHaveClass('completed');
  });

  // Regression: delete button must have className="delete-btn" for CSS targeting
  it('delete button has className="delete-btn" so it can be styled via CSS', () => {
    render(<TodoItem todo={mockTodo} onToggle={() => {}} onDelete={() => {}} />);
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    expect(deleteBtn).toHaveClass('delete-btn');
  });

  // Regression: completed state is applied via CSS class on the container div, not inline style on the span
  it('completed todo renders the div with className containing "completed"', () => {
    render(<TodoItem todo={completedTodo} onToggle={() => {}} onDelete={() => {}} />);
    const container = screen.getByText('Buy groceries').parentElement;
    expect(container).toHaveClass('completed');
  });
});
