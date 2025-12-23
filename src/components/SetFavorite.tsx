import { useFavoritesStore } from "@/stores/useFavoritesStore";

interface SetFavoriteProps {
  characterId: string;
}

export default function SetFavorite({ characterId }: SetFavoriteProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(characterId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    toggleFavorite(characterId);
  };

  return (
    <button
      onClick={handleClick}
      className="text-2xl hover:scale-110 transition-transform"
      title={favorite ? "Remove from favorites" : "Add to favorites"}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      {favorite ? "❤️" : "🤍"}
    </button>
  );
}