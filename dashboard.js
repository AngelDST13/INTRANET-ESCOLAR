document.addEventListener('DOMContentLoaded', function() {
  const sessionData = localStorage.getItem('userSession');
  
  // Si no hay sesión iniciada, redirigir al login
  if (!sessionData) {
    window.location.href = 'index.html';
    return;
  }

  const userSession = JSON.parse(sessionData);
  document.getElementById('welcomeUser').textContent = `${userSession.username} (${userSession.role.toUpperCase()})`;

  // Mostrar sección según el rol
  if (userSession.role === 'admin') {
    document.getElementById('adminSection').style.display = 'block';
  } else if (userSession.role === 'docente') {
    document.getElementById('teacherSection').style.display = 'block';
  } else if (userSession.role === 'estudiante') {
    document.getElementById('studentSection').style.display = 'block';
  }

  // Lógica de Cierre de Sesión
  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('userSession');
    window.location.href = 'index.html';
  });
});