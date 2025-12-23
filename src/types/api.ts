export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  isDev: boolean;
  retry: {
    attempts: number;
    delay: number;
  };
}

export interface ApiEndpoints {
  characters: string;
  character: string;
  students: string;
  staff: string;
  house: string;
  spells: string;
}