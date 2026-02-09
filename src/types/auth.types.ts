export interface User {
  id: string;
  email: string;
  password: string;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  favoriteGenres?: string[];
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}
