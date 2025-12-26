import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShowFavorites from './ShowFavorites';
import { useFavoritesFilterStore } from '@/stores/useFavoritesFilterStore';

describe('ShowFavorites', () => {
  beforeEach(() => {
    // Resetar filtro antes de cada teste
    const store = useFavoritesFilterStore.getState();
    store.setShowOnlyFavorites(false);
  });

  it('renders with initial text', () => {
    render(<ShowFavorites />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🤍 Show Only Favorites');
  });

  it('toggles text on click', async () => {
    const user = userEvent.setup();
    render(<ShowFavorites />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🤍 Show Only Favorites');
    
    await user.click(button);
    
    expect(button).toHaveTextContent('❤️ Showing Favorites');
  });

  it('toggles back to initial state on second click', async () => {
    const user = userEvent.setup();
    render(<ShowFavorites />);
    
    const button = screen.getByRole('button');
    
    await user.click(button);
    expect(button).toHaveTextContent('❤️ Showing Favorites');
    
    await user.click(button);
    expect(button).toHaveTextContent('🤍 Show Only Favorites');
  });

  it('applies correct CSS classes', () => {
    render(<ShowFavorites />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(
      'px-4',
      'py-2',
      'rounded-lg',
      'font-almendra',
      'text-lg',
      'border-2',
      'transition-all',
      'hover:scale-105',
      'text-shadow-readable'
    );
  });

  it('changes styles when active', async () => {
    const user = userEvent.setup();
    render(<ShowFavorites />);
    
    const button = screen.getByRole('button');
    
    // Verificar que o style é aplicado inline
    expect(button).toHaveAttribute('style');
    
    await user.click(button);
    
    // Após click, style deve conter a variável CSS
    const style = button.getAttribute('style');
    expect(style).toContain('var(--color-primary)');
  });

  it('updates store state on toggle', async () => {
    const user = userEvent.setup();
    render(<ShowFavorites />);
    
    const store = useFavoritesFilterStore.getState();
    expect(store.showOnlyFavorites).toBe(false);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(useFavoritesFilterStore.getState().showOnlyFavorites).toBe(true);
  });

  it('renders correctly when initially active', () => {
    const store = useFavoritesFilterStore.getState();
    store.setShowOnlyFavorites(true);
    
    render(<ShowFavorites />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('❤️ Showing Favorites');
  });
});
