import { useFavoritesFilterStore } from "@/stores/useFavoritesFilterStore";

export default function ShowFavorites() {
  const { showOnlyFavorites, toggleShowOnlyFavorites } = useFavoritesFilterStore();

  return (
    <button 
      onClick={toggleShowOnlyFavorites}
      className="px-4 py-2 rounded-lg font-almendra text-lg border-2 transition-all hover:scale-105 text-shadow-readable"
      style={{
        borderColor: showOnlyFavorites ? 'var(--color-primary)' : '#d1d5db',
        backgroundColor: showOnlyFavorites ? 'var(--color-primary)' : 'transparent',
        color: showOnlyFavorites ? 'var(--color-secondary)' : 'var(--color-primary)',
      }}
    >
      {showOnlyFavorites ? '❤️ Showing Favorites' : '🤍 Show Only Favorites'}
    </button>
  );
}