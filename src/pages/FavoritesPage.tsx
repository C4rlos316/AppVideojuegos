import React, { useState } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import Header from '../components/layout/Header';
import GameCard from '../components/game/GameCard';
import GameDetailModal from '../components/game/GameDetailModal';
import { useFavorites } from '../contexts/FavoritesContext';
import { Game } from '../types/game.types';

const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleSelectGame = (game: Game) => {
    setSelectedGameId(game.id);
    setDetailOpen(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
          Favoritos
        </Typography>
        {favorites.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Aún no tienes videojuegos favoritos.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((game) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={game.id}>
                <GameCard game={game} onSelect={handleSelectGame} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      <GameDetailModal
        gameId={selectedGameId}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </Box>
  );
};

export default FavoritesPage;
