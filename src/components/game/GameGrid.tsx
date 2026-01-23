import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Chip } from '@mui/material';
import GameCard from './GameCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { Game, GameCategory } from '../../types/game.types';
import { gameService } from '../../services/game.service';

interface GameGridProps {
  category?: GameCategory;
}

const GameGrid: React.FC<GameGridProps> = ({ category }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      <Grid container spacing={3}>
        {games.map((game) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.id}>
            <GameCard game={game} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GameGrid;
