import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Gender from './Gender';

describe('Gender', () => {
  it('renders male symbol for male gender', () => {
    render(<Gender gender="male" />);
    
    const span = screen.getByTitle('Male');
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent('♂️');
  });

  it('renders female symbol for female gender', () => {
    render(<Gender gender="female" />);
    
    const span = screen.getByTitle('Female');
    expect(span).toBeInTheDocument();
    expect(span).toHaveTextContent('♀️');
  });

  it('renders empty span for null gender', () => {
    render(<Gender gender={null} />);
    
    const span = screen.getByTitle('Unknown');
    expect(span).toBeInTheDocument();
    expect(span).toBeEmptyDOMElement();
  });

  it('renders empty span for undefined gender', () => {
    render(<Gender gender={undefined} />);
    
    const span = screen.getByTitle('Unknown');
    expect(span).toBeInTheDocument();
    expect(span).toBeEmptyDOMElement();
  });

  it('renders empty span for unknown gender string', () => {
    render(<Gender gender="other" />);
    
    const span = screen.getByTitle('Unknown');
    expect(span).toBeInTheDocument();
    expect(span).toBeEmptyDOMElement();
  });

  it('is case sensitive for gender values', () => {
    const { rerender } = render(<Gender gender="Male" />);
    
    // Não deve renderizar male symbol com "Male" capitalizado
    let span = screen.getByTitle('Unknown');
    expect(span).toBeEmptyDOMElement();
    
    rerender(<Gender gender="male" />);
    span = screen.getByTitle('Male');
    expect(span).toHaveTextContent('♂️');
  });

  it('renders correctly for empty string', () => {
    render(<Gender gender="" />);
    
    const span = screen.getByTitle('Unknown');
    expect(span).toBeInTheDocument();
    expect(span).toBeEmptyDOMElement();
  });
});
