import { describe, it, expect, beforeEach } from 'vitest';
import { gameService } from '../services/game.service';

const originalFetch = globalThis.fetch;

describe('gameService.getCountByGenre', () => {
  beforeEach(() => {
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ count: 123, results: [], next: null, previous: null })
    }) as any;
  });

  it('devuelve el conteo total por género', async () => {
    const count = await gameService.getCountByGenre('action');
    expect(count).toBe(123);
  });
});

globalThis.fetch = originalFetch as any;
