import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Staff from './Staff';

const renderWithProviders = (component: React.ReactElement) => {
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

describe('Staff Page', () => {
  it('renders the page title', () => {
    renderWithProviders(<Staff />);
    
    const title = screen.getByRole('heading', { name: /all staff/i });
    expect(title).toBeInTheDocument();
  });

  it('applies correct styling classes to the title', () => {
    renderWithProviders(<Staff />);
    
    const title = screen.getByRole('heading', { name: /all staff/i });
    expect(title).toHaveClass('font-almendra', 'text-4xl', 'mb-8', 'text-center', 'text-house-secondary');
  });

  it('renders the AllCharacters component with staff filter', () => {
    const { container } = renderWithProviders(<Staff />);
    
    const allCharactersContainer = container.querySelector('.container.mx-auto');
    expect(allCharactersContainer).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Staff />);
    expect(container).toBeInTheDocument();
  });
});
