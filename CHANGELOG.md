### Cambiado
- Estructura del proyecto refactorizada: separación de responsabilidades en `index.html`, `style.css` y `app.js`.
- Reestructuración completa del archivo `style.css` implementando Variables CSS (`:root`), comentarios organizados por componentes y separación de estilos globales.

- Lógica de persistencia de datos interactiva en `dashboard.js`: alta de usuarios (Admin), registro de notas (Docente), tabla dinámica de calificaciones (Familia) y publicación de avisos oficiales.

## [0.2.0] - 2026-08-12

### Añadido
- Módulo de baja (eliminación) y edición de usuarios en el panel administrativo.
- Registro y consulta de control de asistencia para docentes y familias.
- Mejoras de accesibilidad con etiquetas ARIA y estados de enfoque por teclado.

## [0.3.0] - 2026-08-12

### Añadido
- Restricción de seguridad: el registro público solo permite perfiles de Estudiantes/Familias; el personal docente es gestionado únicamente por Administración/Dirección[cite: 1].
- Menú lateral de navegación protegido por roles con ocultamiento de secciones[cite: 1].
- Módulo "Mi Perfil" con actualización de foto de avatar, datos personales y biografía.
- Rediseño de interfaz completa con estilo Glassmorphism y la paleta oficial de colores de la institución.

## [Unreleased] - 2026-08-12

### Añadido
- Formulario de registro para estudiantes y encargados con expediente completo (Grado, Sección, Edad, Cumpleaños, Dirección, Encargado, Correo).
- Identidad visual e institucional actualizada a **Colegio Eton**.
- Privacidad estricta para estudiantes: filtrado de calificaciones y asistencia para que solo vean sus propios datos.

### Corregido
- Validaciones nativas en campos numéricos (Teléfono, Edad, Notas) para impedir la entrada de letras.
- Resolución de parpadeo y bucle de redirección en el flujo de inicio/cierre de sesión.

## [Unreleased] - 2026-08-16

### Añadido
- Rediseño visual completo de la pantalla de inicio de sesión (`index.html`) con estilo Glassmorphism (efecto mica/cristal, desenfoque de fondo y luces de acento)[cite: 1, 11].
- Cuadro de alerta dinámico (`#alertBox`) para mensajes de error al autenticarse.

### Corregido
- Solución al fallo de inicio de sesión integrando `main.js` y `auth.js` con ES Modules (`import/export`)[cite: 9, 10].
- Validaciones completas de campos obligatorios en el formulario de inicio de sesión[cite: 9, 10].

## [Unreleased] - 2026-08-16

### Añadido
- Pestañas interactivas en `index.html` para alternar fluidamente entre "Iniciar Sesión" y "Crear Cuenta".
- Formulario de registro institucional solicitando Nombre Completo, Correo, Puesto/Rol, Usuario y Contraseña.
- Base de usuarios predeterminados para inicio de sesión inmediato (`admin` / `123`, `profesor1` / `123`, `estudiante1` / `123`).

### Corregido
- Persistencia de usuarios registrados dinámicamente en `localStorage`.
- Sistema de autenticación con validación de contraseña real.

## [Unreleased] - 2026-08-16

### Añadido
- Integración completa del maquetado Glassmorphism en `dashboard.html` (`navbar-glass`, `sidebar-glass` y tarjetas dinámicas)[cite: 1, 11].
- Script de control de dashboard (`js/dashboard.js`) con verificación de sesión activa, cierre de sesión y generación de avatares automáticos.
- Menú lateral condicional con visibilidad estricta basada en el rol del usuario en sesión (`admin`, `docente`, `estudiante`)[cite: 1, 7].

### Corregido
- Solución al problema de renderizado sin estilos CSS en el dashboard[cite: 11].
- Enlace dinámico de datos del perfil del usuario activo en la barra superior y en la pestaña de configuración[cite: 1, 7].

## [Unreleased] - 2026-08-16

### Corregido
- Corrección de sintaxis en `dashboard.html`: Se envolvió el script JS en la etiqueta `<script type="module">` correspondiente para evitar renderizado de código como texto plano en el navegador.

## [Unreleased] - 2026-08-16

### Añadido
- Interfaz renovada con diseño Glassmorphism para `index.html` y `dashboard.html`[cite: 1, 11].
- Pestañas interactivas de Inicio de Sesión y Registro con campos institucionales completos.
- Base de usuarios de prueba predeterminados (`admin` / `123`).

### Corregido
- Solución al error de sintaxis en `dashboard.html` encapsulando la lógica JS en `<script type="module">`.
- Control de sesión activo y cierre de sesión con redirección automática[cite: 9].

### Gestión del Proyecto
- Sincronización y publicación de la versión actualizada en el repositorio de GitHub.

## [Unreleased] - 2026-08-16

### Corregido
- Solución al error de carga de CSS en el Navbar y la Barra Lateral de `dashboard.html`[cite: 11].
- Reestructuración de script `js/dashboard.js` para asegurar la carga inmediata de avatares, nombres de usuario y roles dinámicos[cite: 1, 7].

# Changelog

## [1.1.0] - Modificaciones UI y Controladores Frontend

### Añadido
- Creado el archivo controlador `js/dashboard.js` para manejar la navegación por pestañas, permisos por rol y el avatar del usuario.
- Integrada la librería FontAwesome v6 en `index.html` y `dashboard.html`.

### Cambiado
- Rediseñado el formulario de login/registro en `index.html`: ahora centrado en pantalla con tarjeta flotante glassmorphism.
- Sustituidos todos los emojis del menú y botones por iconos vectoriales profesionales.
- Actualizados los estilos generales en `css/style.css` para mejorar la responsividad y jerarquía visual.
-Añadido selector de rol en el formulario de inicio de sesión (Administrador, Docente, Estudiante y Padre de Familia)
## [1.2.0] - 2026-08-16

### Añadido
- **Validaciones estrictas en tiempo real**:
  - Filtro para impedir el ingreso de caracteres no numéricos en los campos de Identificación/Cédula y Teléfono.
  - Filtro para restringir caracteres especiales y números en el campo de Nombre Completo.
  - Formato de correo electrónico verificado mediante expresión regular.
- **Notificaciones Toast personalizadas**:
  - Reemplazo total de las alertas nativas del navegador (`alert()`) por banners modernos con animaciones alineados a la estética *Glassmorphism*.
- **Gestión de Foto de Perfil**:
  - Botón de eliminación de foto de perfil con sustitución automática por un avatar genérico basado en iniciales.
  - Aviso contextual obligatorio para usuarios con rol **Estudiante** sobre la importancia de mantener una fotografía oficial visible.
- **Documentación de Memoria de IA**:
  - Archivo `CLAUDE.md` / `AGENTS.md` estructurado en 7 secciones oficiales para asistentes y agentes de IA.

### Corregido
- Eliminación de ventanas emergentes nativas del sistema operativo/navegador que rompían el flujo visual de la intranet.
- Bloqueo de envío del formulario cuando existan campos requeridos vacíos o con formato inválido.

---

## [1.1.0] - 2026-08-15

### Añadido
- Módulo de configuración de perfil completo con soporte para cargar avatar desde archivo local (`FileReader`).
- Campos de datos personales extensivos: Correo Electrónico, Teléfono de Contacto e Identificación/Cédula.
- Rediseño de interfaz con estilo *Glassmorphism / Mica*, tarjetas translúcidas e iconografía de FontAwesome v6.

---

## [1.0.0] - 2026-08-10

### Añadido
- Estructura base de la Intranet Escolar.
- Sistema de autenticación simulado con roles: `admin`, `docente`, `estudiante`, `padre`.
- Vistas personalizadas y menús de navegación dinámicos según el rol del usuario conectado.
- Persistencia de sesión mediante `localStorage`.
- Tablón oficial de comunicados.

## [1.1.0] - 2026-08-16

### Añadido
- Formulario de edición de perfil dinámico en `dashboard.html`.
- Sistema de notificaciones *Toast* flotantes para confirmar acciones guardadas.
- Persistencia de comunicados con soporte para imágenes adjuntas en `localStorage`.

### Corregido
- Unificación del listener `DOMContentLoaded` en `js/dashboard.js` para eliminar conflictos de eventos duplicados.
- Reparación del toggle de modo noche/día para sincronizarse globalmente mediante `localStorage`.
- Corrección del contenedor de avatar superior (`#userAvatar`) para proyectar imágenes en lugar de texto estático.


## [1.2.0] - 2026-08-16

### Añadido
- Control de acceso basado en roles (RBAC) para ADMIN, DOCENTE y TUTOR.
- Vista aislada en el Módulo Académico para el perfil **TUTOR** (restricción para visualizar únicamente el expediente de su representado/hijo).

### Cambios & Ajustes
- Ocultamiento dinámico de secciones sensibles (Gestión de Usuarios) en la barra de navegación lateral para usuarios sin privilegios administrativos.
- Deshabilitación de exportaciones masivas e ingreso de notas para el rol TUTOR.

## [1.2.1] - 2026-08-16

### Corregido
- Filtro estricto de privacidad en el Módulo Académico para impedir la divulgación de calificaciones entre diferentes alumnos/tutores.
- Ocultamiento de herramientas masivas de exportación e importación de datos en los perfiles TUTOR y ESTUDIANTE.

### Añadido
- Selector dinámico de simulación de roles en la barra superior para probar instantáneamente las vistas entre ADMIN, DOCENTE, TUTOR y ESTUDIANTE.

## [1.2.2] - 2026-08-16

### Removido
- Se eliminó el selector manual de "Modo Vista" en el encabezado.

### Corregido
- El sistema ahora determina los permisos y visibilidad de secciones de forma automática según la sesión real iniciada (`userSession` en LocalStorage).