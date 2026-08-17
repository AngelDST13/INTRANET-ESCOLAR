# 🏫 Intranet Escolar — Colegio Eton

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![FontAwesome](https://img.shields.io/badge/FontAwesome-528DD7?style=flat-square&logo=fontawesome&logoColor=white)](https://fontawesome.com/)

Plataforma web para la gestión académica e institucional del **Colegio Eton**. Este sistema permite el control de acceso diferenciado por roles (Administrador, Docente y Estudiante), visualización de comunicados oficiales y administración de expedientes educativos mediante una interfaz moderna basada en *Glassmorphism*.

---

## ✨ Características Principales

* **🔐 Control de Acceso y Roles**:
  * Autenticación responsiva con inicio de sesión y registro.
  * Renderizado dinámico del menú lateral según el rol activo (`admin`, `docente`, `estudiante`).
* **🎨 Interfaz Moderna y Estética**:
  * Diseño basado en tarjetas de cristal (*Mica / Glassmorphism*).
  * Iconografía vectorial estilizada mediante FontAwesome v6.
* **📢 Tablón Oficial de Anuncios**: Sección central para avisos e información institucional.
* **📂 Gestión Académica y Expedientes**: Espacios dedicados para la administración de docentes, alumnos y calificaciones.
* **💾 Persistencia de Sesión**: Manejo de estado del usuario mediante `localStorage`.

---

## 📁 Estructura del Proyecto

```text
INTRANET-ESCOLAR/
├── css/
│   └── style.css          # Estilos globales y diseño Glassmorphism
├── docs/
│   ├── arquitectura.md    # Documentación técnica de arquitectura
│   └── requerimientos.md  # Especificaciones funcionales y RNF
├── js/
│   ├── auth.js            # Lógica de autenticación y cambio de pestañas
│   ├── clientes.js        # Manejo de datos y usuarios
│   ├── dashboard.js       # Controlador del panel principal y roles
│   └── main.js            # Funciones y utilidades generales
├── CHANGELOG.md           # Historial de versiones del proyecto
├── CLAUDE.md              # Instrucciones y normas de desarrollo
├── CONTRIBUTING.md        # Guía para contribuciones
├── dashboard.html         # Panel de control principal
├── index.html             # Pantalla de inicio de sesión y registro
└── README.md              # Documentación general del repositorio

## 🚀 Características
- **Autenticación y Control de Sesión:** Manejo de roles (Admin, Docente, Estudiante) guardados en `localStorage`.
- **Perfil de Usuario:** Actualización en tiempo real de datos personales y fotografía (soporte Base64/Avatar).
- **Tablón Oficial:** Publicación de comunicados persistentes con adjuntos multimedia.
- **Tema Personalizado:** Modo noche/día con persistencia automática de preferencia.