import React, { useMemo, useState, useEffect } from 'react';
import { Grid, Typography, Box, Chip, Stack, Slider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import GameCard from './GameCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Game, GameCategory } from '../../types/game.types';
import { gameService } from '../../services/game.service';

interface GameGridProps {
  category?: GameCategory;
  onSelectGame?: (game: Game) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ category, onSelectGame }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [order, setOrder] = useState<'rating_desc' | 'rating_asc'>('rating_desc');

  const fetchGames = async (selectedCategory?: GameCategory) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      if (selectedCategory) {
        response = await gameService.getGamesByGenre(selectedCategory.slug);
      } else {
        response = await gameService.getGamesByGenre('action');
      }
      
      setGames(response.results.slice(0, 12));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar videojuegos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(category);
  }, [category]);

  const displayedGames = useMemo(() => {
    const filtered = games.filter((g) => (g.rating ?? 0) >= minRating);
    const sorted = filtered.sort((a, b) => {
      const diff = (a.rating ?? 0) - (b.rating ?? 0);
      return order === 'rating_desc' ? -diff : diff;
    });
    return sorted;
  }, [games, minRating, order]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => fetchGames(category)} />;
  }

  return (
    <Box>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 600, 
          mb: 4,
          color: 'primary.main'
        }}
      >
        {category ? `Videojuegos de ${category.name}` : 'Videojuegos Populares'}
      </Typography>

      {category && (
        <Chip
          label={category.name}
          sx={{
            backgroundColor: category.color,
            color: 'white',
            fontWeight: 600,
            mb: 3
          }}
        />
      )}

      <Stack direction="row" spacing={3} sx={{ mb: 3, alignItems: 'center' }}>
        <Box sx={{ minWidth: 220 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>Rating mínimo</Typography>
          <Slider
            value={minRating}
            min={0}
            max={5}
            step={0.5}
            valueLabelDisplay="auto"
            onChange={(_, value) => setMinRating(value as number)}
          />
        </Box>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="order-label">Orden</InputLabel>
          <Select
            labelId="order-label"
            value={order}
            label="Orden"
            onChange={(e) => setOrder(e.target.value as 'rating_desc' | 'rating_asc')}
          >
            <MenuItem value="rating_desc">Rating: mayor a menor</MenuItem>
            <MenuItem value="rating_asc">Rating: menor a mayor</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Grid container spacing={3}>
        {displayedGames.map((game) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.id}>
            <GameCard game={game} onSelect={onSelectGame} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameGrid;
