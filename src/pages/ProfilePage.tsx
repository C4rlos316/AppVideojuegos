import React, { useState } from 'react';
import { Container, Box, Paper, Typography, TextField, Button, Avatar, Chip, Autocomplete } from '@mui/material';
import Header from '../components/layout/Header';
import { useAuth } from '../contexts/AuthContext';
import { gameCategories } from '../services/game.service';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  type Option = { label: string; value: string };
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>(user?.favoriteGenres || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setSaving(true);
    const ok = await updateProfile({
      displayName: displayName.trim() || user?.email.split('@')[0],
      avatarUrl: avatarUrl.trim(),
      bio: bio.trim(),
      favoriteGenres
    });
    setSaving(false);
    if (ok) {
      setSuccess('Perfil actualizado');
    } else {
      setError('No se pudo actualizar el perfil');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar src={avatarUrl} sx={{ width: 64, height: 64 }}>
              {displayName ? displayName[0]?.toUpperCase() : user?.email[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Perfil de Usuario
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            <TextField
              label="Nombre visible"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              fullWidth
            />
            <TextField
              label="Avatar URL"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              fullWidth
            />
            <TextField
              label="Biografía"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              fullWidth
              multiline
              minRows={3}
            />
            <Autocomplete<Option, true, false, false>
              multiple
              options={gameCategories.map(c => ({ label: c.name, value: c.slug }))}
              value={favoriteGenres.map(v => ({ label: gameCategories.find(c => c.slug === v)?.name || v, value: v }))}
              onChange={(_, newValue) => setFavoriteGenres(newValue.map(v => v.value))}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip label={option.label} {...getTagProps({ index })} key={option.value} />
                ))
              }
              renderInput={(params) => <TextField {...params} label="Géneros favoritos" />}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button variant="contained" onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              {success}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfilePage;
