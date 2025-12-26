import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Students from './Students';

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

describe('Students Page', () => {
  it('renders the page title', () => {
    renderWithProviders(<Students />);
    
    const title = screen.getByRole('heading', { name: /all students/i });
    expect(title).toBeInTheDocument();
  });

  it('applies correct styling classes to the title', () => {
    renderWithProviders(<Students />);
    
    const title = screen.getByRole('heading', { name: /all students/i });
    expect(title).toHaveClass('font-almendra', 'text-4xl', 'mb-8', 'text-center', 'text-house-secondary');
  });

  it('renders the AllCharacters component with students filter', () => {
    const { container } = renderWithProviders(<Students />);
    
    const allCharactersContainer = container.querySelector('.container.mx-auto');
    expect(allCharactersContainer).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Students />);
    expect(container).toBeInTheDocument();
  });
});
