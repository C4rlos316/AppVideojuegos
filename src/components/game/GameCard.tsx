import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Rating, Chip } from '@mui/material';
import { Game } from '../../types/game.types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8]
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={game.background_image || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={game.name}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography 
          variant="h6" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontSize: '1.1rem',
            fontWeight: 600,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {game.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating 
            value={game.rating} 
            precision={0.1} 
            readOnly 
            size="small"
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {game.rating.toFixed(1)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 'auto' }}>
          {game.genres.slice(0, 2).map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              size="small"
              variant="outlined"
              sx={{ 
                fontSize: '0.7rem',
                height: '20px'
              }}
            />
          ))}
          {game.genres.length > 2 && (
            <Chip
              label={`+${game.genres.length - 2}`}
              size="small"
              variant="outlined"
              sx={{ 
                fontSize: '0.7rem',
                height: '20px'
              }}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default GameCard;