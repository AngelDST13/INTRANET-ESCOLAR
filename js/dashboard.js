document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar datos de la sesión o crear una por defecto (ADMIN) para pruebas
  let sessionData = JSON.parse(localStorage.getItem('userSession'));

  if (!sessionData) {
    sessionData = {
      username: 'admin',
      fullName: 'Administrador Principal',
      role: 'admin',
      loggedIn: true
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
  }

  // 2. Renderizar Datos del Usuario en el Navbar y Perfil
  const userNameEl = document.getElementById('userName');
  const userRoleBadgeEl = document.getElementById('userRoleBadge');
  const userAvatarEl = document.getElementById('userAvatar');

  const profileFullNameEl = document.getElementById('profileFullName');
  const profileUsernameEl = document.getElementById('profileUsername');
  const profileRoleBadgeEl = document.getElementById('profileRoleBadge');
  const profileLargeAvatarEl = document.getElementById('profileLargeAvatar');

  const displayName = sessionData.fullName || sessionData.username || 'Usuario';
  const userRole = (sessionData.role || 'admin').toLowerCase();
  
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=2a9d8f&color=fff&bold=true`;

  if (userNameEl) userNameEl.textContent = displayName;
  if (userRoleBadgeEl) userRoleBadgeEl.textContent = userRole.toUpperCase();
  if (userAvatarEl) userAvatarEl.src = avatarUrl;

  if (profileFullNameEl) profileFullNameEl.value = displayName;
  if (profileUsernameEl) profileUsernameEl.value = sessionData.username;
  if (profileRoleBadgeEl) profileRoleBadgeEl.textContent = userRole.toUpperCase();
  if (profileLargeAvatarEl) profileLargeAvatarEl.src = avatarUrl;

  // 3. Mostrar u Ocultar Opciones de Menú según el Rol
  const menuAdminTeachers = document.getElementById('menuAdminTeachers');
  const menuAdminUsers = document.getElementById('menuAdminUsers');
  const menuAcademic = document.getElementById('menuAcademic');
  const menuStudent = document.getElementById('menuStudent');

  if (userRole === 'admin') {
    if (menuAdminTeachers) menuAdminTeachers.style.display = 'block';
    if (menuAdminUsers) menuAdminUsers.style.display = 'block';
    if (menuAcademic) menuAcademic.style.display = 'block';
  } else if (userRole === 'docente') {
    if (menuAcademic) menuAcademic.style.display = 'block';
  } else if (userRole === 'estudiante') {
    if (menuStudent) menuStudent.style.display = 'block';
  }

  // 4. Lógica de Navegación por Pestañas (Hace responder los clics del menú)
  const navButtons = document.querySelectorAll('.nav-link');
  const tabSections = document.querySelectorAll('.tab-content');

  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTabId = button.getAttribute('data-tab');

      // Desactivar todos los botones y ocultar secciones
      navButtons.forEach(btn => btn.classList.remove('active'));
      tabSections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
      });

      // Activar el botón presionado
      button.classList.add('active');

      // Mostrar el panel correspondiente
      const targetSection = document.getElementById(targetTabId);
      if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
      }
    });
  });

  // 5. Botón Cerrar Sesión
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('userSession');
      window.location.href = 'index.html';
    });
  }
});