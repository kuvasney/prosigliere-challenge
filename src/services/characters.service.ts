import { API_CONFIG, API_ENDPOINTS } from "@/config/api";
import type { Character } from "@/types/character";

export const charactersService = {
  getAll: async (): Promise<Character[]> => {
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.characters}`, {
      method: "GET",
      headers: API_CONFIG.headers,
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch characters: ${response.statusText}`);
    }

    return response.json() as Promise<Character[]>;
  },

  getPaginated: async (page: number, pageSize: number): Promise<Character[]> => {
    const allCharacters = await charactersService.getAll();
    const start = page * pageSize;
    const end = start + pageSize;
    return allCharacters.slice(start, end);
  },

  getById: async (id: string): Promise<Character> => {
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.character}/${id}`, {
      method: "GET",
      headers: API_CONFIG.headers,
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch character: ${response.statusText}`);
    }

    const data = await response.json() as Character[];
    return data[0];
  },

  getByHouse: async (name: string): Promise<Character> => {
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.house}/${name}`, {
      method: "GET",
      headers: API_CONFIG.headers,
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch characters by house: ${response.statusText}`);
    }

    const data = await response.json() as Character[];
    return data[0];
  },

  getStudents: async (): Promise<Character[]> => {
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.students}`, {
      method: "GET",
      headers: API_CONFIG.headers,
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch students: ${response.statusText}`);
    }

    return response.json() as Promise<Character[]>;
  },

  getStaff: async (): Promise<Character[]> => {
    const response = await fetch(`${API_CONFIG.baseURL}${API_ENDPOINTS.staff}`, {
      method: "GET",
      headers: API_CONFIG.headers,
      signal: AbortSignal.timeout(API_CONFIG.timeout),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch staff: ${response.statusText}`);
    }

    return response.json() as Promise<Character[]>;
  },
};
