import { User, AuthResponse } from '../types/auth.types';

const USERS_KEY = 'videogames_users';
const CURRENT_USER_KEY = 'videogames_current_user';

export const authService = {
  login(email: string, password: string): AuthResponse {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[];
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return { success: false, error: 'Credenciales inválidas' };
      }
      
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      return { success: true, user };
    } catch {
      return { success: false, error: 'Error al iniciar sesión' };
    }
  },

  register(email: string, password: string): AuthResponse {
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[];
      
      if (users.some(u => u.email === email)) {
        return { success: false, error: 'El usuario ya existe' };
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        password,
        displayName: email.split('@')[0],
        avatarUrl: '',
        bio: '',
        favoriteGenres: []
      };
      
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch {
      return { success: false, error: 'Error al registrar usuario' };
    }
  },

  logout(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser(): User | null {
    try {
      const userData = localStorage.getItem(CURRENT_USER_KEY);
      return userData ? JSON.parse(userData) as User : null;
    } catch {
      return null;
    }
  },

  updateProfile(partial: Partial<User>): AuthResponse {
    try {
      const current = this.getCurrentUser();
      if (!current) {
        return { success: false, error: 'No autenticado' };
      }
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as User[];
      const updated: User = { ...current, ...partial, id: current.id, email: current.email, password: current.password };
      const idx = users.findIndex(u => u.id === current.id);
      if (idx >= 0) {
        users[idx] = updated;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
      return { success: true, user: updated };
    } catch {
      return { success: false, error: 'No se pudo actualizar el perfil' };
    }
  },

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
};
