import { describe, it, expect, beforeEach, vi } from 'vitest';
import { gameService } from '../../services/game.service';

describe('gameService.searchGames', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('devuelve resultados cuando la API responde OK', async () => {
    const mockData = {
      results: [
        { id: 1, name: 'Zelda', background_image: '', rating: 4.8, genres: [] },
        { id: 2, name: 'Mario', background_image: '', rating: 4.5, genres: [] }
      ],
      count: 2,
      next: null,
      previous: null
    };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData
    } as Response);

    const res = await gameService.searchGames('zelda');
    expect(res.results.length).toBe(2);
    expect(res.results[0].name).toBe('Zelda');
  });

  it('lanza error cuando la API responde con error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500
    } as Response);
    await expect(gameService.searchGames('bad')).rejects.toThrow('No se pudieron encontrar videojuegos.');
  });
});
