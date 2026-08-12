# CLAUDE.md — Memoria del Agente de IA

## 1. Contexto
Intranet escolar de uso interno para una institución educativa pública. El sistema permite la comunicación, gestión académica y consulta de información entre personal administrativo, docentes, estudiantes y sus familias.

## 2. Requerimientos
- Autenticación básica con control de acceso por roles (Administración, Docente, Estudiante/Familia).
- Gestión de usuarios (alta, baja y edición).
- Módulo académico: registro y consulta de calificaciones/asistencia.
- Tablón de comunicados e avisos institucionales.

## 3. Reglas
- Código modular e intuitivo en JavaScript, HTML5 y CSS3.
- Convención de nombres en inglés y formato `camelCase` para variables y funciones (`getUserById`, `saveGrades`).
- Interfaz accesible (cumplir contraste de colores y navegación adecuada).

## 4. Restricciones
- NO exponer datos personales o sensibles de estudiantes en la interfaz.
- NO almacenar contraseñas en texto plano.
- NO subir archivos pesados o dependencias no necesarias al repositorio.

## 5. Objetivos
- Implementar un prototipo funcional con pantalla de inicio de sesión según el rol seleccionado.
- Proveer tableros diferenciados para cada tipo de usuario.
- Mantener la documentación técnica completa y actualizada en formato Markdown.

## 6. Memoria del Proyecto
- 2026-08: Definición e inicialización de la estructura de archivos en Markdown y configuración inicial del repositorio local Git.

## 7. Buenas Prácticas
- Documentar el "por qué" detrás de las decisiones técnicas en lugar de solo describir el código.
- Mantener un historial de Git ordenado utilizando commits descriptivos con la convención Conventional Commits (`feat:`, `docs:`, `fix:`, `chore:`).
