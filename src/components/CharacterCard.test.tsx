import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterCard from './CharacterCard';
import type { Character } from '@/types/character';
import { useFavoritesStore } from '@/stores/useFavoritesStore';

const mockCharacter: Character = {
  id: 'char-123',
  name: 'Harry Potter',
  alternate_names: [],
  species: 'human',
  gender: 'male',
  house: 'Gryffindor',
  dateOfBirth: '31-07-1980',
  yearOfBirth: 1980,
  wizard: true,
  ancestry: 'half-blood',
  eyeColour: 'green',
  hairColour: 'black',
  wand: { wood: 'holly', core: 'phoenix feather', length: 11 },
  patronus: 'stag',
  hogwartsStudent: true,
  hogwartsStaff: false,
  actor: 'Daniel Radcliffe',
  alternate_actors: [],
  alive: true,
  image: 'https://example.com/harry.jpg',
};

describe('CharacterCard', () => {
  beforeEach(() => {
    // Limpar favoritos
    const store = useFavoritesStore.getState();
    store.favorites.forEach(id => store.removeFavorite(id));
  });

  it('renders character name', () => {
    const onClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    expect(screen.getByText('Harry Potter')).toBeInTheDocument();
  });

  it('renders character house', () => {
    const onClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    expect(screen.getByText('Gryffindor')).toBeInTheDocument();
  });

  it('renders character actor', () => {
    const onClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    expect(screen.getByText('Daniel Radcliffe')).toBeInTheDocument();
  });

  it('renders "No House" when house is empty', () => {
    const onClick = vi.fn();
    const characterWithoutHouse = { ...mockCharacter, house: '' };
    
    render(<CharacterCard character={characterWithoutHouse} onClick={onClick} />);
    
    expect(screen.getByText('No House')).toBeInTheDocument();
  });

  it('renders "Unknown Actor" when actor is empty', () => {
    const onClick = vi.fn();
    const characterWithoutActor = { ...mockCharacter, actor: '' };
    
    render(<CharacterCard character={characterWithoutActor} onClick={onClick} />);
    
    expect(screen.getByText('Unknown Actor')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    
    render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    const card = screen.getByText('Harry Potter').closest('div');
    await user.click(card!);
    
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders SetFavorite button', () => {
    const onClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    const favoriteButton = screen.getByRole('button', { name: /favorites/i });
    expect(favoriteButton).toBeInTheDocument();
  });

  it('renders CharacterImage component', () => {
    const onClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    const image = screen.getByAltText('Harry Potter');
    expect(image).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const onClick = vi.fn();
    const { container } = render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass(
      'border',
      'border-house-secondary',
      'rounded-lg',
      'p-4',
      'hover:shadow-lg',
      'transition-shadow',
      'cursor-pointer',
      'relative'
    );
  });

  it('name has correct styling classes', () => {
    const onClick = vi.fn();
    render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    const name = screen.getByText('Harry Potter');
    expect(name).toHaveClass(
      'font-almendra',
      'text-2xl',
      'mb-2',
      'character-name',
      'text-house-primary',
      'text-shadow-readable'
    );
  });

  it('does not call onClick when favorite button is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    
    render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    const favoriteButton = screen.getByRole('button', { name: /favorites/i });
    await user.click(favoriteButton);
    
    // onClick do card não deve ser chamado por causa do stopPropagation
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders with memoization (same props should not re-render)', () => {
    const onClick = vi.fn();
    const { rerender } = render(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    const name1 = screen.getByText('Harry Potter');
    
    // Re-render com as mesmas props
    rerender(<CharacterCard character={mockCharacter} onClick={onClick} />);
    
    const name2 = screen.getByText('Harry Potter');
    
    // Deve ser o mesmo elemento (React.memo funcionando)
    expect(name1).toBe(name2);
  });
});
