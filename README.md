# 🎮 VideoGames App

Una aplicación web moderna para explorar videojuegos por categorías con autenticación de usuarios.

## ✨ Características

- **Autenticación completa**: Login y registro con validación
- **Catálogo de videojuegos**: Explora juegos por categorías (Acción, RPG, Shooter, Indie, etc.)
- **Diseño responsivo**: Adaptable a dispositivos móviles, tablets y desktop
- **Interfaz moderna**: Construida con Material-UI y CSS Grid
- **API de videojuegos**: Integración con RAWG Video Games API

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI v5
- **Estilos**: CSS Grid + Material Design
- **Autenticación**: localStorage (mock)
- **API**: RAWG Video Games API
- **Routing**: React Router v7

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone [url-del-repositorio]
   cd AppVideojuegos
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_RAWG_API_KEY=tu_clave_api_rawg
   VITE_RAWG_BASE_URL=https://api.rawg.io/api
   VITE_APP_NAME=VideoGames App
   ```
   
   📝 **Nota**: Necesitas obtener una API key gratuita de [RAWG Video Games API](https://rawg.io/apidocs)

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre la aplicación**
   
   Visita `http://localhost:5173` en tu navegador

## 🎯 Flujo de la Aplicación

1. **Pantalla de Login**: Los usuarios pueden iniciar sesión con email y contraseña
2. **Pantalla de Registro**: Los nuevos usuarios pueden crear una cuenta
3. **Pantalla Principal**: Muestra un grid de videojuegos organizados por categorías
4. **Filtros por Categoría**: Los usuarios pueden filtrar juegos por género

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── auth/         # Formularios de autenticación
│   ├── common/       # Componentes comunes (loading, errores)
│   ├── game/         # Componentes de videojuegos
│   └── layout/       # Componentes de layout
├── contexts/         # Contextos de React
├── pages/            # Páginas principales
├── services/         # Servicios y APIs
├── types/            # Definiciones TypeScript
├── utils/            # Utilidades y validadores
└── App.tsx           # Componente principal
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta ESLint
- `npm run check` - Verifica TypeScript sin emitir archivos

## 🎨 Diseño

- **Colores primarios**: Azul oscuro (#1976D2)
- **Colores secundarios**: Gris claro (#F5F5F5)
- **Tipografía**: Roboto
- **Breakpoints**: 1200px (desktop), 768px (tablet), 480px (móvil)

## 🔐 Autenticación

La aplicación utiliza un sistema de autenticación mock basado en localStorage:

- Los usuarios se almacenan en `localStorage` con sus credenciales
- La sesión se mantiene mediante `localStorage`
- Las rutas protegidas requieren autenticación

## 📱 Responsividad

- **Desktop**: Grid de 4 columnas
- **Tablet**: Grid de 2 columnas  
- **Móvil**: Grid de 1 columna

## 🚀 Despliegue

Para construir y desplegar la aplicación:

1. **Build de producción**
   ```bash
   npm run build
   ```

2. **Los archivos generados estarán en la carpeta `dist/`**

3. **Puedes desplegar en cualquier servicio de hosting estático** (Vercel, Netlify, GitHub Pages, etc.)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [RAWG Video Games API](https://rawg.io/apidocs) por proporcionar la API de videojuegos
- [Material-UI](https://mui.com/) por el framework de componentes
- [React](https://reactjs.org/) por la librería de UI

---

**Desarrollado con ❤️ por [Tu Nombre]**