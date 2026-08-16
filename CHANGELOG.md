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

Añadido selector de rol en el formulario de inicio de sesión (Administrador, Docente, Estudiante y Padre de Familia)