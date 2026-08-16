import { checkExistingSession, loginUser, registerUser } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  checkExistingSession();

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const alertBox = document.getElementById('alertBox');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');

  // Alternar entre pestañas de Login y Registro
  if (tabLoginBtn && tabRegisterBtn) {
    tabLoginBtn.addEventListener('click', () => {
      tabLoginBtn.classList.add('active');
      tabRegisterBtn.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      alertBox.style.display = 'none';
    });

    tabRegisterBtn.addEventListener('click', () => {
      tabRegisterBtn.classList.add('active');
      tabLoginBtn.classList.remove('active');
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
      alertBox.style.display = 'none';
    });
  }

  // Evento Submit de Inicio de Sesión
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      const result = loginUser(username, password);

      if (!result.success) {
        alertBox.className = 'alert-box';
        alertBox.textContent = result.message;
        alertBox.style.display = 'block';
      } else {
        alertBox.style.display = 'none';
        window.location.href = 'dashboard.html';
      }
    });
  }

  // Evento Submit de Registro
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newUser = {
        fullName: document.getElementById('regFullName').value,
        email: document.getElementById('regEmail').value,
        role: document.getElementById('regRole').value,
        username: document.getElementById('regUsername').value,
        password: document.getElementById('regPassword').value
      };

      const result = registerUser(newUser);

      if (!result.success) {
        alertBox.className = 'alert-box';
        alertBox.textContent = result.message;
        alertBox.style.display = 'block';
      } else {
        alertBox.className = 'alert-box success';
        alertBox.textContent = result.message;
        alertBox.style.display = 'block';
        registerForm.reset();

        // Cambiar automáticamente a la pestaña de login tras registrarse
        setTimeout(() => {
          tabLoginBtn.click();
        }, 1500);
      }
    });
  }
});