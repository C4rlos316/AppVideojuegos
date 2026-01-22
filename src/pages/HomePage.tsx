import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from '../components/layout/Header';
import GameGrid from '../components/game/GameGrid';
import CategoryFilter from '../components/game/CategoryFilter';
import { GameCategory } from '../types/game.types';
import { gameCategories } from '../services/game.service';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<GameCategory | null>(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <CategoryFilter
          categories={gameCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <GameGrid category={selectedCategory} />
      </Container>
    </Box>
  );
};

export default HomePage;