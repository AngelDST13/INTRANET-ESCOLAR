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
- Formulario de registro de estudiantes y encargados con expediente completo (Grado, Sección, Edad, Cumpleaños, Dirección, Encargado, Correo).
- Identidad visual e institucional actualizada a **Colegio Eton**.
- Privacidad estricta para estudiantes: filtrado de calificaciones y asistencia para que solo vean sus propios datos.

### Corregido
- Validaciones nativas en campos numéricos (Teléfono, Edad, Notas) para impedir la entrada de letras.
- Resolución de parpadeo y bucle de redirección en el flujo de inicio/cierre de sesión.