import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCharactersInfinite, useStudents, useStaff } from "@/hooks/useCharacters";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useFavoritesFilterStore } from "@/stores/useFavoritesFilterStore";
import ShowFavorites from "../ShowFavorites";
import AllCharactersSkeleton from "./AllCharactersSkeleton";
import CharacterCard from "../CharacterCard";
import type { Character } from "@/types/character";

export default function AllCharacters({characterFilter}: {characterFilter?: 'students' | 'staff'}) {
  const infiniteQuery = useCharactersInfinite(20);
  const studentsQuery = useStudents();
  const staffQuery = useStaff();

  const activeQuery = characterFilter === 'students' 
    ? studentsQuery 
    : characterFilter === 'staff' 
    ? staffQuery 
    : infiniteQuery;

  const { data, isLoading, isError, error } = activeQuery;
  
  const { fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQuery;

  const observerTarget = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { favorites } = useFavoritesStore();
  const { showOnlyFavorites } = useFavoritesFilterStore();

  const openCharacterPage = useCallback((id: string) => () => {
    void navigate(`/character/${id}`);
  }, [navigate]);

  useEffect(() => {
    if (characterFilter) return;

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, characterFilter]);

  const allCharacters = characterFilter 
    ? (data as Character[] | undefined) ?? []
    : (data as { pages: Character[][] } | undefined)?.pages.flat() ?? [];
  
  let filteredCharacters = allCharacters;
  
  if (showOnlyFavorites) {
    filteredCharacters = filteredCharacters.filter((character) => favorites.includes(character.id));
  }

  if (isLoading) {
    return <AllCharactersSkeleton />;
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
      
      
      <div className="flex justify-evenly mb-6">
        <ShowFavorites />
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
          <CharacterCard
            key={character.id}
            character={character}
            onClick={openCharacterPage(character.id)}
          />
        ))}
      </div>

      <div ref={observerTarget} className="flex justify-center py-8">
        {!characterFilter && !showOnlyFavorites && isFetchingNextPage && (
          <p className="text-gray-600">Loading more characters...</p>
        )}
        {!characterFilter && !showOnlyFavorites && !hasNextPage && allCharacters.length > 0 && (
          <p className="text-gray-500">No more characters to load</p>
        )}
      </div>
    </div>
  );
}