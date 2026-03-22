import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Regression test: UI enhancement from plain HTML to Shadcn UI components.
// Previously the app used plain <div> wrappers, <input> and <button> elements.
// After the Shadcn UI upgrade, these should still be accessible and functional.
describe('UI Enhancement: Shadcn UI components', () => {
  it('renders the app with Shadcn Card structure', () => {
    render(<App />);
    // The app title should be present in the Card
    expect(screen.getByText('Thunder Todo')).toBeInTheDocument();
  });

  it('renders the Add todo input and button', () => {
    render(<App />);
    expect(screen.getByRole('textbox', { name: 'New todo title' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /^all$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^active$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^completed$/i })).toBeInTheDocument();
  });

  it('filter buttons are accessible with aria-pressed', () => {
    render(<App />);
    const allBtn = screen.getByRole('button', { name: /^all$/i });
    const activeBtn = screen.getByRole('button', { name: /^active$/i });
    const completedBtn = screen.getByRole('button', { name: /^completed$/i });

    expect(allBtn).toHaveAttribute('aria-pressed', 'true');
    expect(activeBtn).toHaveAttribute('aria-pressed', 'false');
    expect(completedBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('filter buttons call onChange with correct values', async () => {
    render(<App />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /^active$/i }));
    expect(screen.getByRole('button', { name: /^active$/i })).toHaveAttribute('aria-pressed', 'true');
  });
});
