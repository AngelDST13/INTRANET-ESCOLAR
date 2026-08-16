document.addEventListener('DOMContentLoaded', () => {
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Cambiar a pestaña de Login
  if (tabLoginBtn) {
    tabLoginBtn.addEventListener('click', () => {
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });
  }

  // Cambiar a pestaña de Registro
  if (tabRegisterBtn) {
    tabRegisterBtn.addEventListener('click', () => {
      tabRegisterBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  }

  // Manejo de inicio de sesión
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;

      const session = {
        username: username,
        fullName: username === 'admin' ? 'Administrador Principal' : username,
        role: username === 'admin' ? 'admin' : 'estudiante',
        loggedIn: true
      };

      localStorage.setItem('userSession', JSON.stringify(session));
      window.location.href = 'dashboard.html';
    });
  }
});