export interface Genre {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  genres: Genre[];
}

export interface GamesResponse {
  results: Game[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface GameCategory {
  name: string;
  slug: string;
  color: string;
}