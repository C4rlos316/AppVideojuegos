import React, { useEffect, useState } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { GameCategory } from '../../types/game.types';
import { gameService } from '../../services/game.service';

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
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          categories.map(async (c) => {
            try {
              const count = await gameService.getCountByGenre(c.slug);
              return { slug: c.slug, count };
            } catch {
              return { slug: c.slug, count: 0 };
            }
          })
        );
        if (!mounted) return;
        const map: Record<string, number> = {};
        results.forEach(r => { map[r.slug] = r.count; });
        setCounts(map);
      } catch (e) {
        if (!mounted) return;
        setError('No se pudo cargar el conteo por categoría');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [categories]);

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
            label={
              counts[category.slug] !== undefined
                ? `${category.name} (${counts[category.slug]})`
                : loading
                ? `${category.name} (···)`
                : category.name
            }
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
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default CategoryFilter;
