import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavoritesFilterStore } from './useFavoritesFilterStore';

describe('useFavoritesFilterStore', () => {
  beforeEach(() => {
    // Resetar o store antes de cada teste
    const { result } = renderHook(() => useFavoritesFilterStore());
    act(() => {
      result.current.setShowOnlyFavorites(false);
    });
  });

  it('initializes with showOnlyFavorites as false', () => {
    const { result } = renderHook(() => useFavoritesFilterStore());
    expect(result.current.showOnlyFavorites).toBe(false);
  });

  it('toggles showOnlyFavorites from false to true', () => {
    const { result } = renderHook(() => useFavoritesFilterStore());
    
    expect(result.current.showOnlyFavorites).toBe(false);

    act(() => {
      result.current.toggleShowOnlyFavorites();
    });

    expect(result.current.showOnlyFavorites).toBe(true);
  });

  it('toggles showOnlyFavorites from true to false', () => {
    const { result } = renderHook(() => useFavoritesFilterStore());
    
    act(() => {
      result.current.setShowOnlyFavorites(true);
    });

    expect(result.current.showOnlyFavorites).toBe(true);

    act(() => {
      result.current.toggleShowOnlyFavorites();
    });

    expect(result.current.showOnlyFavorites).toBe(false);
  });

  it('toggles multiple times correctly', () => {
    const { result } = renderHook(() => useFavoritesFilterStore());
    
    expect(result.current.showOnlyFavorites).toBe(false);

    act(() => {
      result.current.toggleShowOnlyFavorites(); // true
      result.current.toggleShowOnlyFavorites(); // false
      result.current.toggleShowOnlyFavorites(); // true
    });

    expect(result.current.showOnlyFavorites).toBe(true);
  });

  it('sets showOnlyFavorites to true', () => {
    const { result } = renderHook(() => useFavoritesFilterStore());
    
    act(() => {
      result.current.setShowOnlyFavorites(true);
    });

    expect(result.current.showOnlyFavorites).toBe(true);
  });

  it('sets showOnlyFavorites to false', () => {
    const { result } = renderHook(() => useFavoritesFilterStore());
    
    act(() => {
      result.current.setShowOnlyFavorites(true);
    });

    act(() => {
      result.current.setShowOnlyFavorites(false);
    });

    expect(result.current.showOnlyFavorites).toBe(false);
  });

  it('setShowOnlyFavorites overrides previous state', () => {
    const { result } = renderHook(() => useFavoritesFilterStore());
    
    act(() => {
      result.current.toggleShowOnlyFavorites();
      result.current.toggleShowOnlyFavorites();
    });

    // Estado é false após 2 toggles
    expect(result.current.showOnlyFavorites).toBe(false);

    act(() => {
      result.current.setShowOnlyFavorites(true);
    });

    expect(result.current.showOnlyFavorites).toBe(true);
  });
});
