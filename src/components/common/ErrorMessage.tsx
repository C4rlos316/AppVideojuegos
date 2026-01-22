import React from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';
import { Error as ErrorIcon } from '@mui/icons-material';

interface ErrorMessageProps {
  message: string;
  title?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, title = 'Error', onRetry }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Alert 
        severity="error" 
        icon={<ErrorIcon />}
        action={onRetry ? (
          <Box component="button" onClick={onRetry} sx={{ cursor: 'pointer', border: 'none', background: 'transparent', color: 'error.main' }}>
            Reintentar
          </Box>
        ) : undefined}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;