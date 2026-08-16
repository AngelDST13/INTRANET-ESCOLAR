# Arquitectura del Sistema — Intranet Escolar

## Módulos del Frontend
- **Vista Autenticación (`index.html`)**: Interfaz de inicio de sesión y registro centrado con diseño glassmorphism y pestañas dinámicas.
- **Vista Principal (`dashboard.html`)**: Panel adaptativo basado en el rol de usuario registrado (`admin`, `docente`, `estudiante`).
- **Iconografía Externa**: Integración de **FontAwesome (v6)** mediante CDN para asegurar una interfaz limpia y profesional en sustitución de emojis.

## Controladores y Scripts
- `js/auth.js`: Gestión de login, cambio de pestañas y persistencia inicial de la sesión en `localStorage`.
- `js/dashboard.js`: Controlador dinámico del panel principal. Maneja:
  - Renderizado del perfil y avatar del usuario.
  - Visibilidad de menús laterales según el rol activo.
  - Navegación entre secciones (Tablón, Usuarios, Módulo Académico, Perfil).
  - Cierre de sesión y limpieza de estado.