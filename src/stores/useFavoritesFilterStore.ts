import { create } from 'zustand';

interface FavoritesFilterState {
  showOnlyFavorites: boolean;
  toggleShowOnlyFavorites: () => void;
  setShowOnlyFavorites: (show: boolean) => void;
}

export const useFavoritesFilterStore = create<FavoritesFilterState>((set) => ({
  showOnlyFavorites: false,
  toggleShowOnlyFavorites: () => set((state) => ({ showOnlyFavorites: !state.showOnlyFavorites })),
  setShowOnlyFavorites: (show) => set({ showOnlyFavorites: show }),
}));
