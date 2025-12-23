import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { charactersService } from "@/services/characters.service";
import type { Character } from "@/types/character";

export const useCharacters = () => {
  return useQuery<Character[], Error>({
    queryKey: ["characters"],
    queryFn: charactersService.getAll,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 10,
  });
};

export const useCharacter = (id: string) => {
  return useQuery<Character, Error>({
    queryKey: ["character", id],
    queryFn: () => charactersService.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCharactersInfinite = (pageSize: number = 20) => {
  return useInfiniteQuery<Character[], Error>({
    queryKey: ["characters", "infinite", pageSize],
    queryFn: ({ pageParam = 0 }) => charactersService.getPaginated(pageParam as number, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === pageSize ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  });
};
