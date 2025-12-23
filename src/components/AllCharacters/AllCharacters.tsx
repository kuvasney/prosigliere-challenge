import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCharactersInfinite } from "@/hooks/useCharacters";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import SetFavorite from "../SetFavorite";
import CharacterImage from "../CharacterImage";

export default function AllCharacters() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useCharactersInfinite(20);

  const observerTarget = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showOnlyStudents, setShowOnlyStudents] = useState(false);
  const [showOnlyStaff, setShowOnlyStaff] = useState(false);

  const openCharacterPage = (id: string) => () => {
    void navigate(`/character/${id}`);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allCharacters = data?.pages.flat() ?? [];  
  
  const filteredCharacters = showOnlyFavorites
    ? allCharacters.filter((character) => favorites.includes(character.id))
    : showOnlyStudents
    ? allCharacters.filter((character) => character.hogwartsStudent)
    : showOnlyStaff
    ? allCharacters.filter((character) => character.hogwartsStaff)
    : allCharacters;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-gray-600">Loading characters...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-almendra text-4xl mb-8 text-center text-house-secondary">All Characters</h1>
      
      <div className="flex justify-evenly mb-6">
        <button 
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className="px-6 py-2 rounded-lg font-cormorant text-lg border-2 transition-all hover:scale-105"
          style={{
            borderColor: showOnlyFavorites ? 'var(--color-primary)' : '#d1d5db',
            backgroundColor: showOnlyFavorites ? 'var(--color-primary)' : 'transparent',
            color: showOnlyFavorites ? 'var(--color-secondary)' : 'var(--color-primary)',
          }}
        >
          {showOnlyFavorites ? '❤️ Showing Favorites' : '🤍 Show Only Favorites'}
        </button>

        <button 
          onClick={() => setShowOnlyStudents(!showOnlyStudents)}
          className="px-6 py-2 rounded-lg font-cormorant text-lg border-2 transition-all hover:scale-105"
          style={{
            borderColor: showOnlyStudents ? 'var(--color-primary)' : '#d1d5db',
            backgroundColor: showOnlyStudents ? 'var(--color-primary)' : 'transparent',
            color: showOnlyStudents ? 'var(--color-secondary)' : 'var(--color-primary)',
          }}
        >
          {showOnlyStudents ? 'Showing Students' : 'Show Only Students'}
        </button>

        <button 
          onClick={() => setShowOnlyStaff(!showOnlyStaff)}
          className="px-6 py-2 rounded-lg font-cormorant text-lg border-2 transition-all hover:scale-105"
          style={{
            borderColor: showOnlyStaff ? 'var(--color-primary)' : '#d1d5db',
            backgroundColor: showOnlyStaff ? 'var(--color-primary)' : 'transparent',
            color: showOnlyStaff ? 'var(--color-secondary)' : 'var(--color-primary)',
          }}
        >
          {showOnlyStaff ? 'Showing Staff' : 'Show Only Staff'}
        </button>
      </div>

      {showOnlyFavorites && filteredCharacters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 font-cormorant">
            No favorite characters yet. Add some by clicking the heart icon! ❤️
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            className="border border-house-secondary rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer relative"
            onClick={openCharacterPage(character.id)}
          >
            <div className="absolute top-5 left-5 z-10">
              <SetFavorite characterId={character.id} />
            </div>
            <CharacterImage 
              src={character.image} 
              alt={character.name}
              name={character.name}
              square={true}
            />
            <h3 className="font-almendra text-2xl mb-2 character-name text-house-primary text-shadow-readable">
              {character.name}
            </h3>
            <p className="text-sm text-gray-600">{character.house || "No House"}</p>
            <p className="text-sm text-gray-500">
              {character.actor || "Unknown Actor"}
            </p>
          </div>
        ))}
      </div>

      <div ref={observerTarget} className="flex justify-center py-8">
        {!showOnlyFavorites && isFetchingNextPage && (
          <p className="text-gray-600">Loading more characters...</p>
        )}
        {!showOnlyFavorites && !hasNextPage && allCharacters.length > 0 && (
          <p className="text-gray-500">No more characters to load</p>
        )}
      </div>
    </div>
  );
}