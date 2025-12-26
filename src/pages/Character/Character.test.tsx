import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Character from './Character';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: 'test-character-id' }),
  };
});

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

describe('Character Page', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Character />);
    expect(container).toBeInTheDocument();
  });

  it('renders the SingleCharacter component', () => {
    const { container } = renderWithProviders(<Character />);
    
    const singleCharacterContainer = container.querySelector('.container.mx-auto');
    expect(singleCharacterContainer).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    const { container } = renderWithProviders(<Character />);
    
    expect(container.firstChild).toBeInTheDocument();
  });
});
