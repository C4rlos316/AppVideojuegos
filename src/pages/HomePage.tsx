import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from '../components/layout/Header';
import GameGrid from '../components/game/GameGrid';
import CategoryFilter from '../components/game/CategoryFilter';
import GameDetailModal from '../components/game/GameDetailModal';
import { Game, GameCategory } from '../types/game.types';
import { gameCategories } from '../services/game.service';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);
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
        <CategoryFilter
          categories={gameCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <GameGrid category={selectedCategory} onSelectGame={handleSelectGame} />
      </Container>
      <GameDetailModal
        gameId={selectedGameId}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </Box>
  );
};

export default HomePage;
