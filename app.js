document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const role = document.getElementById('role').value;
  const alertBox = document.getElementById('alertBox');

  if (!username || !role) {
    alertBox.textContent = 'Por favor completa todos los campos.';
    alertBox.style.display = 'block';
    return;
  }

  // Guardar la sesión simulada en localStorage
  const userSession = { username, role, loggedIn: true };
  localStorage.setItem('userSession', JSON.stringify(userSession));

  alertBox.style.display = 'none';
  window.location.href = 'dashboard.html';
});