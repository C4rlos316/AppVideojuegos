import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { GameCategory } from '../../types/game.types';

interface CategoryFilterProps {
  categories: GameCategory[];
  selectedCategory: GameCategory | null;
  onCategoryChange: (category: GameCategory | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Categorías
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <Chip
          label="Todos"
          onClick={() => onCategoryChange(null)}
          color={selectedCategory === null ? 'primary' : 'default'}
          variant={selectedCategory === null ? 'filled' : 'outlined'}
          sx={{ fontWeight: 600 }}
        />
        
        {categories.map((category) => (
          <Chip
            key={category.slug}
            label={category.name}
            onClick={() => onCategoryChange(category)}
            color={selectedCategory?.slug === category.slug ? 'primary' : 'default'}
            variant={selectedCategory?.slug === category.slug ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: selectedCategory?.slug === category.slug ? category.color : undefined,
              fontWeight: 600,
              '&:hover': {
                backgroundColor: selectedCategory?.slug === category.slug ? category.color : undefined,
                opacity: 0.8
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryFilter;