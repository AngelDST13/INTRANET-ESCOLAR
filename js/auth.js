document.addEventListener('DOMContentLoaded', function() {
  // Si ya hay una sesión activa, redirige inmediatamente al dashboard sin parpadear
  const userSession = JSON.parse(localStorage.getItem('userSession'));
  if (userSession && userSession.username) {
    window.location.href = 'dashboard.html';
    return;
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const usernameInput = document.getElementById('username').value.trim();
      const roleInput = document.getElementById('role').value;

      if (!usernameInput) {
        alert('Por favor, ingresa tu nombre de usuario.');
        return;
      }

      // Guardar la sesión limpia
      const sessionData = {
        username: usernameInput,
        role: roleInput
      };

      localStorage.setItem('userSession', JSON.stringify(sessionData));

      // Redirigir al panel principal
      window.location.href = 'dashboard.html';
    });
  }
});