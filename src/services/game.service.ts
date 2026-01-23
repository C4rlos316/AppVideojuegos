import { Game, GamesResponse, GameCategory } from '../types/game.types';
import { API_CONFIG, buildUrl } from './api.config';

export const gameCategories: GameCategory[] = [
  { name: 'Acción', slug: 'action', color: '#FF6B6B' },
  { name: 'RPG', slug: 'role-playing-games-rpg', color: '#4ECDC4' },
  { name: 'Shooter', slug: 'shooter', color: '#45B7D1' },
  { name: 'Indie', slug: 'indie', color: '#96CEB4' },
  { name: 'Aventura', slug: 'adventure', color: '#FFEAA7' },
  { name: 'Estrategia', slug: 'strategy', color: '#DDA0DD' }
];

export const gameService = {
  async getGamesByGenre(genre: string, page: number = 1): Promise<GamesResponse> {
    try {
      const url = buildUrl('/games', {
        genres: genre,
        page: page,
        page_size: API_CONFIG.PAGE_SIZE
      });

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener juegos por género:', error);
      throw new Error('No se pudieron cargar los videojuegos. Por favor, intenta nuevamente.');
    }
  },

  async getCountByGenre(genre: string): Promise<number> {
    try {
      const url = buildUrl('/games', {
        genres: genre,
        page_size: 1
      });
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: GamesResponse = await response.json();
      return data.count;
    } catch (error) {
      console.error('Error al obtener conteo por género:', error);
      throw new Error('No se pudo cargar el conteo de videojuegos.');
    }
  },

  async getGameDetails(id: number): Promise<Game> {
    try {
      const url = buildUrl(`/games/${id}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al obtener detalles del juego:', error);
      throw new Error('No se pudieron cargar los detalles del videojuego.');
    }
  },

  async searchGames(query: string): Promise<GamesResponse> {
    try {
      const url = buildUrl('/games', {
        search: query,
        page_size: API_CONFIG.PAGE_SIZE
      });

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error al buscar juegos:', error);
      throw new Error('No se pudieron encontrar videojuegos.');
    }
  }
};
