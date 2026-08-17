document.addEventListener('DOMContentLoaded', () => {
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Alternar a Iniciar Sesión
  if (tabLoginBtn) {
    tabLoginBtn.addEventListener('click', () => {
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });
  }

  // Alternar a Crear Cuenta
  if (tabRegisterBtn) {
    tabRegisterBtn.addEventListener('click', () => {
      tabRegisterBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  }

  // Procesar Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const selectedRole = document.getElementById('loginRole').value;

      const session = {
        username: username,
        fullName: username,
        role: selectedRole,
        loggedIn: true
      };

      localStorage.setItem('userSession', JSON.stringify(session));
      window.location.href = 'dashboard.html';
    });
  }

  // Procesar Registro
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('regFullName').value;
      const username = document.getElementById('regUsername').value;
      const role = document.getElementById('regRole').value;

      const session = {
        username: username,
        fullName: fullName,
        role: role,
        loggedIn: true
      };

      localStorage.setItem('userSession', JSON.stringify(session));
      window.location.href = 'dashboard.html';
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const authForm = document.getElementById('authForm');

  if (authForm) {
    authForm.addEventListener('submit', (event) => {
      // Prevenir que la página se recargue por defecto
      event.preventDefault();

      // Obtener el rol y usuario (por si deseas guardarlos en LocalStorage)
      const rol = document.getElementById('rol').value;
      const username = document.getElementById('username').value;

      // Guardar sesión simple
      localStorage.setItem('userRole', rol);
      localStorage.setItem('username', username);

      // Redirigir a la vista del dashboard
      window.location.href = 'dashboard.html';
    });
  }
});

