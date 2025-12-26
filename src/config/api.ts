import type { ApiConfig, ApiEndpoints } from "@/types/api";

export const API_CONFIG: ApiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL as string || "",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT as string || "10000", 10),
  headers: {
    "Content-Type": "application/json",
  },
  retry: {
    attempts: 3,
    delay: 1000,
  },
  isDev: import.meta.env.DEV
};

export const API_ENDPOINTS: ApiEndpoints = {
  characters: "/api/characters",
  character: "/api/character",
  students: "/api/characters/students",
  staff: "/api/characters/staff",
  house: "/api/characters/house/",
  spells: "/api/spells",
};