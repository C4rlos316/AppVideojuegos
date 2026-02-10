import React, { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  Rating,
  Chip,
  CircularProgress
} from '@mui/material';
import { GameDetails } from '../../types/game.types';
import { gameService } from '../../services/game.service';
import { useFavorites } from '../../contexts/FavoritesContext';

interface GameDetailModalProps {
  gameId: number | null;
  open: boolean;
  onClose: () => void;
}

const GameDetailModal: React.FC<GameDetailModalProps> = ({ gameId, open, onClose }) => {
  const [details, setDetails] = useState<GameDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!open || !gameId) {
      return;
    }
    setLoading(true);
    setError(null);
    gameService
      .getGameDetails(gameId)
      .then((data) => setDetails(data))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'No se pudieron cargar los detalles');
      })
      .finally(() => setLoading(false));
  }, [open, gameId]);

  useEffect(() => {
    if (!open) {
      setDetails(null);
      setError(null);
      setLoading(false);
    }
  }, [open]);

  const description = useMemo(() => {
    return details?.description_raw || details?.description || 'Sin descripción disponible';
  }, [details]);
  const ratingValue = details?.rating ?? 0;

  const handleToggleFavorite = () => {
    if (details) {
      toggleFavorite(details);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{details?.name || 'Detalles del videojuego'}</DialogTitle>
      <DialogContent dividers>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        )}
        {!loading && error && (
          <Typography color="error" sx={{ py: 2 }}>
            {error}
          </Typography>
        )}
        {!loading && !error && details && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              component="img"
              src={details.background_image || 'https://via.placeholder.com/800x450?text=No+Image'}
              alt={details.name}
              sx={{ width: '100%', borderRadius: 2, maxHeight: 360, objectFit: 'cover' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={ratingValue} precision={0.1} readOnly />
                <Typography variant="body2">{ratingValue.toFixed(1)}</Typography>
              </Box>
              {details.metacritic !== undefined && (
                <Chip label={`Metacritic: ${details.metacritic}`} color="primary" variant="outlined" />
              )}
              {details.released && <Chip label={`Lanzamiento: ${details.released}`} variant="outlined" />}
            </Box>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {description}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        {details && (
          <Button variant="contained" onClick={handleToggleFavorite}>
            {isFavorite(details.id) ? 'Quitar de favoritos' : 'Guardar en favoritos'}
          </Button>
        )}
        <Button onClick={onClose} color="inherit">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameDetailModal;
