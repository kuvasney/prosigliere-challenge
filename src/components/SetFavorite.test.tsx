import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SetFavorite from './SetFavorite';
import { useFavoritesStore } from '@/stores/useFavoritesStore';

describe('SetFavorite', () => {
  beforeEach(() => {
    // Limpar favoritos antes de cada teste
    const store = useFavoritesStore.getState();
    store.favorites.forEach(id => store.removeFavorite(id));
  });

  it('renders with heart icon when not favorite', () => {
    render(<SetFavorite characterId="char-123" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🤍');
    expect(button).toHaveAttribute('title', 'Add to favorites');
    expect(button).toHaveAttribute('aria-label', 'Add to favorites');
  });

  it('renders with filled heart when is favorite', () => {
    const store = useFavoritesStore.getState();
    store.addFavorite('char-123');
    
    render(<SetFavorite characterId="char-123" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('❤️');
    expect(button).toHaveAttribute('title', 'Remove from favorites');
    expect(button).toHaveAttribute('aria-label', 'Remove from favorites');
  });

  it('toggles favorite on click', async () => {
    const user = userEvent.setup();
    render(<SetFavorite characterId="char-123" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🤍');
    
    await user.click(button);
    
    expect(button).toHaveTextContent('❤️');
  });

  it('removes from favorites when clicked twice', async () => {
    const user = userEvent.setup();
    render(<SetFavorite characterId="char-123" />);
    
    const button = screen.getByRole('button');
    
    await user.click(button); // Add to favorites
    expect(button).toHaveTextContent('❤️');
    
    await user.click(button); // Remove from favorites
    expect(button).toHaveTextContent('🤍');
  });

  it('stops event propagation on click', async () => {
    const user = userEvent.setup();
    const parentClickHandler = vi.fn();
    
    const { container } = render(
      <div onClick={parentClickHandler}>
        <SetFavorite characterId="char-123" />
      </div>
    );
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Parent click handler não deve ser chamado
    expect(parentClickHandler).not.toHaveBeenCalled();
  });

  it('applies correct CSS classes', () => {
    render(<SetFavorite characterId="char-123" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-2xl', 'hover:scale-110', 'transition-transform');
  });

  it('handles multiple different characters', async () => {
    const user = userEvent.setup();
    
    const { rerender } = render(<SetFavorite characterId="char-1" />);
    const button1 = screen.getByRole('button');
    await user.click(button1);
    expect(button1).toHaveTextContent('❤️');
    
    rerender(<SetFavorite characterId="char-2" />);
    const button2 = screen.getByRole('button');
    expect(button2).toHaveTextContent('🤍');
    
    await user.click(button2);
    expect(button2).toHaveTextContent('❤️');
  });
});
