import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import { gameService } from '../services/game.service';

const originalFetch = globalThis.fetch;

describe('gameService.getCountByGenre', () => {
  beforeEach(() => {
    const mockFetch: typeof fetch = async () => {
      const mockResponse: Pick<Response, 'ok' | 'json'> = {
        ok: true,
        json: async () => ({ count: 123, results: [], next: null, previous: null })
      };
      return mockResponse as unknown as Response;
    };
    globalThis.fetch = mockFetch;
  });

  it('devuelve el conteo total por género', async () => {
    const count = await gameService.getCountByGenre('action');
    expect(count).toBe(123);
  });

  afterAll(() => {
    globalThis.fetch = originalFetch;
  });
});
