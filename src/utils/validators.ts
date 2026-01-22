export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 6) {
    return { valid: false, error: 'La contraseña debe tener al menos 6 caracteres' };
  }
  
  if (password.length > 50) {
    return { valid: false, error: 'La contraseña no puede exceder 50 caracteres' };
  }
  
  return { valid: true };
};

export const validatePasswordMatch = (password: string, confirmPassword: string): { valid: boolean; error?: string } => {
  if (password !== confirmPassword) {
    return { valid: false, error: 'Las contraseñas no coinciden' };
  }
  
  return { valid: true };
};