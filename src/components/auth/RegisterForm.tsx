import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  Link
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { validateEmail, validatePassword, validatePasswordMatch } from '../../utils/validators';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.error || 'Contraseña inválida');
      return;
    }

    const passwordMatch = validatePasswordMatch(password, confirmPassword);
    if (!passwordMatch.valid) {
      setError(passwordMatch.error || 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    
    try {
      const success = await register(email, password);
      if (success) {
        navigate('/home');
      } else {
        setError('El usuario ya existe');
      }
    } catch (err) {
      setError('Error al registrar usuario. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 600 }}>
        Registrarse
      </Typography>
      
      <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
        Crea tu cuenta de videojuegos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          autoComplete="email"
        />
        
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="new-password"
          helperText="Mínimo 6 caracteres"
        />

        <TextField
          fullWidth
          label="Confirmar Contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
          autoComplete="new-password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 2, py: 1.5 }}
        >
          {loading ? 'Registrando...' : 'Crear Cuenta'}
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        ¿Ya tienes una cuenta?{' '}
        <Link
          component="button"
          type="button"
          onClick={onSwitchToLogin}
          sx={{ cursor: 'pointer' }}
        >
          Inicia sesión aquí
        </Link>
      </Typography>
    </Paper>
  );
};

export default RegisterForm;