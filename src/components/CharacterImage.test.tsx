import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterImage from './CharacterImage';

describe('CharacterImage', () => {
  it('renders image when src is provided', () => {
    render(
      <CharacterImage 
        src="https://example.com/image.jpg" 
        alt="Test Character" 
        name="Test Character"
      />
    );
    
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Test Character');
  });

  it('renders placeholder with initials when no src', () => {
    render(
      <CharacterImage 
        src="" 
        alt="Harry Potter" 
        name="Harry Potter"
      />
    );
    
    const initials = screen.getByText('HP');
    expect(initials).toBeInTheDocument();
  });

  it('renders placeholder when src is undefined', () => {
    render(
      <CharacterImage 
        alt="Hermione Granger" 
        name="Hermione Granger"
      />
    );
    
    const initials = screen.getByText('HG');
    expect(initials).toBeInTheDocument();
  });

  it('generates correct initials for two-word name', () => {
    render(
      <CharacterImage 
        alt="Ron Weasley" 
        name="Ron Weasley"
      />
    );
    
    expect(screen.getByText('RW')).toBeInTheDocument();
  });

  it('generates initials for single word name', () => {
    render(
      <CharacterImage 
        alt="Dumbledore" 
        name="Dumbledore"
      />
    );
    
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('generates only first two initials for multi-word name', () => {
    render(
      <CharacterImage 
        alt="Albus Percival Wulfric Brian Dumbledore" 
        name="Albus Percival Wulfric Brian Dumbledore"
      />
    );
    
    expect(screen.getByText('AP')).toBeInTheDocument();
  });

  it('converts initials to uppercase', () => {
    render(
      <CharacterImage 
        alt="harry potter" 
        name="harry potter"
      />
    );
    
    expect(screen.getByText('HP')).toBeInTheDocument();
  });

  it('applies square class to image when square prop is true', () => {
    render(
      <CharacterImage 
        src="https://example.com/image.jpg" 
        alt="Test" 
        name="Test"
        square={true}
      />
    );
    
    const image = screen.getByRole('img');
    expect(image).toHaveClass('h-64');
  });

  it('does not apply square class to image when square prop is false', () => {
    render(
      <CharacterImage 
        src="https://example.com/image.jpg" 
        alt="Test" 
        name="Test"
        square={false}
      />
    );
    
    const image = screen.getByRole('img');
    expect(image).not.toHaveClass('h-64');
  });

  it('applies square class to placeholder when square prop is true', () => {
    const { container } = render(
      <CharacterImage 
        alt="Test" 
        name="Test Name"
        square={true}
      />
    );
    
    const placeholder = container.querySelector('.h-64');
    expect(placeholder).toBeInTheDocument();
  });

  it('applies aspect-square to placeholder when square prop is false', () => {
    const { container } = render(
      <CharacterImage 
        alt="Test" 
        name="Test Name"
        square={false}
      />
    );
    
    const placeholder = container.querySelector('.aspect-square');
    expect(placeholder).toBeInTheDocument();
  });

  it('renders SVG icon in placeholder', () => {
    const { container } = render(
      <CharacterImage 
        alt="Test" 
        name="Test Name"
      />
    );
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies correct CSS classes to image', () => {
    render(
      <CharacterImage 
        src="https://example.com/image.jpg" 
        alt="Test" 
        name="Test"
      />
    );
    
    const image = screen.getByRole('img');
    expect(image).toHaveClass('w-full', 'rounded-md', 'mb-4', 'object-cover', 'object-top');
  });

  it('applies correct CSS classes to placeholder', () => {
    const { container } = render(
      <CharacterImage 
        alt="Test" 
        name="Test Name"
      />
    );
    
    const placeholder = container.querySelector('div');
    expect(placeholder).toHaveClass(
      'w-full',
      'rounded-md',
      'mb-4',
      'flex',
      'items-center',
      'justify-center',
      'bg-gradient-to-br',
      'from-house-primary',
      'to-house-secondary'
    );
  });

  it('handles empty name gracefully', () => {
    render(
      <CharacterImage 
        alt="Test" 
        name=""
      />
    );
    
    // Deve renderizar placeholder vazio se não houver nome
    const { container } = render(
      <CharacterImage 
        alt="Test" 
        name=""
      />
    );
    
    expect(container).toBeInTheDocument();
  });
});
