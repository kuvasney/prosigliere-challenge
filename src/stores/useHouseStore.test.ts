import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHouseStore } from './useHouseStore';

describe('useHouseStore', () => {
  beforeEach(() => {
    // Limpar sessionStorage antes de cada teste
    sessionStorage.clear();
    const { result } = renderHook(() => useHouseStore());
    act(() => {
      result.current.setSelectedHouse('');
    });
  });

  it('initializes with empty house', () => {
    const { result } = renderHook(() => useHouseStore());
    expect(result.current.selectedHouse).toBe('');
  });

  it('sets selected house', () => {
    const { result } = renderHook(() => useHouseStore());
    
    act(() => {
      result.current.setSelectedHouse('Gryffindor');
    });

    expect(result.current.selectedHouse).toBe('Gryffindor');
  });

  it('updates selected house', () => {
    const { result } = renderHook(() => useHouseStore());
    
    act(() => {
      result.current.setSelectedHouse('Gryffindor');
    });

    expect(result.current.selectedHouse).toBe('Gryffindor');

    act(() => {
      result.current.setSelectedHouse('Slytherin');
    });

    expect(result.current.selectedHouse).toBe('Slytherin');
  });

  it('persists house selection in sessionStorage', () => {
    const { result } = renderHook(() => useHouseStore());
    
    act(() => {
      result.current.setSelectedHouse('Ravenclaw');
    });

    const stored = sessionStorage.getItem('house-storage');
    expect(stored).toBeTruthy();
    
    if (stored) {
      const parsed = JSON.parse(stored) as { state: { selectedHouse: string } };
      expect(parsed.state.selectedHouse).toBe('Ravenclaw');
    }
  });

  it('clears house selection', () => {
    const { result } = renderHook(() => useHouseStore());
    
    act(() => {
      result.current.setSelectedHouse('Hufflepuff');
    });

    expect(result.current.selectedHouse).toBe('Hufflepuff');

    act(() => {
      result.current.setSelectedHouse('');
    });

    expect(result.current.selectedHouse).toBe('');
  });

  it('handles all Hogwarts houses', () => {
    const { result } = renderHook(() => useHouseStore());
    const houses = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];

    houses.forEach(house => {
      act(() => {
        result.current.setSelectedHouse(house);
      });
      expect(result.current.selectedHouse).toBe(house);
    });
  });
});
