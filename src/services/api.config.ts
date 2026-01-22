export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_RAWG_BASE_URL || 'https://api.rawg.io/api',
  API_KEY: import.meta.env.VITE_RAWG_API_KEY || '',
  PAGE_SIZE: 12
};

export const buildUrl = (endpoint: string, params: Record<string, string | number> = {}): string => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, String(params[key]));
  });
  
  if (API_CONFIG.API_KEY) {
    url.searchParams.append('key', API_CONFIG.API_KEY);
  }
  
  return url.toString();
};