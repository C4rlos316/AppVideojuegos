import React, { useEffect, useMemo, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Autocomplete,
  TextField
} from '@mui/material';
import { SportsEsports as GameIcon, Logout as LogoutIcon, Favorite as FavoriteIcon } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { gameService } from '../../services/game.service';
import { Game } from '../../types/game.types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);

  const canSearch = useMemo(() => query.trim().length >= 2, [query]);

  useEffect(() => {
    let active = true;
    const handler = setTimeout(async () => {
      if (!canSearch) {
        setOptions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await gameService.searchGames(query);
        if (active) {
          setOptions(res.results.slice(0, 8));
        }
      } catch {
        if (active) setOptions([]);
      } finally {
        if (active) setLoading(false);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(handler);
    };
  }, [query, canSearch]);

  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <GameIcon />
        </IconButton>
        
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          VideoGames App
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {user.email}
            </Typography>
            <Autocomplete
              sx={{ minWidth: 280, maxWidth: 380, flexGrow: 1 }}
              loading={loading}
              options={options}
              getOptionLabel={(opt) => opt.name}
              onChange={(_, value) => {
                if (value) {
                  navigate('/home', { state: { selectedGameId: value.id } });
                  setQuery('');
                  setOptions([]);
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="Buscar videojuegos..."
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
            <Button
              color="inherit"
              onClick={() => navigate('/favorites')}
              startIcon={
                <Badge badgeContent={favorites.length} color="secondary">
                  <FavoriteIcon />
                </Badge>
              }
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Favoritos
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate('/profile')}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Perfil
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ 
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
