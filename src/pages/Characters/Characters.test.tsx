import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Characters from './Characters';

const renderWithRouter = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Characters Page', () => {
  it('renders the page title', () => {
    renderWithRouter(<Characters />);
    
    const title = screen.getByRole('heading', { name: /all characters/i });
    expect(title).toBeInTheDocument();
  });

  it('applies correct styling classes to the title', () => {
    renderWithRouter(<Characters />);
    
    const title = screen.getByRole('heading', { name: /all characters/i });
    expect(title).toHaveClass('font-almendra', 'text-4xl', 'mb-8', 'text-center', 'text-house-secondary');
  });

  it('renders the AllCharacters component', () => {
    const { container } = renderWithRouter(<Characters />);
    
    const allCharactersContainer = container.querySelector('.container.mx-auto');
    expect(allCharactersContainer).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    const { container } = renderWithRouter(<Characters />);
    
    expect(container.firstChild).toBeInTheDocument();
    
    const title = screen.getByRole('heading', { name: /all characters/i });
    const allCharactersContainer = container.querySelector('.container.mx-auto');
    
    expect(title).toBeInTheDocument();
    expect(allCharactersContainer).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = renderWithRouter(<Characters />);
    expect(container).toBeInTheDocument();
  });
});
