document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar datos de la sesión guardada o establecer valores por defecto
  let sessionData = JSON.parse(localStorage.getItem('userSession'));

  if (!sessionData) {
    sessionData = {
      username: 'admin',
      fullName: 'Administrador Principal',
      role: 'admin',
      idNumber: '1-0000-0000',
      email: 'admin@eton.edu',
      phone: '+506 8888-0000',
      avatarUrl: '',
      loggedIn: true
    };
    localStorage.setItem('userSession', JSON.stringify(sessionData));
  }

  // 2. Referencias a elementos del DOM
  const userNameEl = document.getElementById('userName');
  const userRoleBadgeEl = document.getElementById('userRoleBadge');
  const userAvatarEl = document.getElementById('userAvatar');

  const profileFullNameEl = document.getElementById('profileFullName');
  const profileUsernameEl = document.getElementById('profileUsername');
  const profileIdNumberEl = document.getElementById('profileIdNumber');
  const profileEmailEl = document.getElementById('profileEmail');
  const profilePhoneEl = document.getElementById('profilePhone');
  const profileRoleBadgeEl = document.getElementById('profileRoleBadge');
  const profileLargeAvatarEl = document.getElementById('profileLargeAvatar');
  const avatarInput = document.getElementById('avatarInput');
  const profileForm = document.getElementById('profileForm');

  const displayName = sessionData.fullName || sessionData.username || 'Usuario';
  const userRole = (sessionData.role || 'admin').toLowerCase();
  
  // Asignar avatar guardado o generar uno por defecto con UI-Avatars
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=2a9d8f&color=fff&bold=true`;
  const currentAvatar = sessionData.avatarUrl || defaultAvatar;

  // 3. Renderizar información en la interfaz
  if (userNameEl) userNameEl.textContent = displayName;
  if (userRoleBadgeEl) userRoleBadgeEl.textContent = userRole.toUpperCase();
  if (userAvatarEl) userAvatarEl.src = currentAvatar;

  if (profileFullNameEl) profileFullNameEl.value = displayName;
  if (profileUsernameEl) profileUsernameEl.value = sessionData.username || '';
  if (profileIdNumberEl) profileIdNumberEl.value = sessionData.idNumber || '';
  if (profileEmailEl) profileEmailEl.value = sessionData.email || '';
  if (profilePhoneEl) profilePhoneEl.value = sessionData.phone || '';
  if (profileRoleBadgeEl) profileRoleBadgeEl.textContent = userRole.toUpperCase();
  if (profileLargeAvatarEl) profileLargeAvatarEl.src = currentAvatar;

  // 4. Lógica para Cambiar Foto de Perfil
  if (avatarInput) {
    avatarInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newAvatarUrl = event.target.result;
          userAvatarEl.src = newAvatarUrl;
          profileLargeAvatarEl.src = newAvatarUrl;
          
          sessionData.avatarUrl = newAvatarUrl;
          localStorage.setItem('userSession', JSON.stringify(sessionData));
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 5. Guardar Cambios del Formulario de Perfil
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      sessionData.fullName = profileFullNameEl.value;
      sessionData.idNumber = profileIdNumberEl.value;
      sessionData.email = profileEmailEl.value;
      sessionData.phone = profilePhoneEl.value;

      localStorage.setItem('userSession', JSON.stringify(sessionData));
      if (userNameEl) userNameEl.textContent = sessionData.fullName;
      alert('¡Perfil e información personal guardados exitosamente!');
    });
  }

  // 6. Configurar accesibilidad y menús por Rol
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
  } else if (userRole === 'estudiante' || userRole === 'padre') {
    if (menuStudent) menuStudent.style.display = 'block';
  }

  // 7. Navegación por Pestañas
  const navButtons = document.querySelectorAll('.nav-link');
  const tabSections = document.querySelectorAll('.tab-content');

  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTabId = button.getAttribute('data-tab');

      navButtons.forEach(btn => btn.classList.remove('active'));
      tabSections.forEach(section => {
        section.classList.remove('active');
        section.style.display = 'none';
      });

      button.classList.add('active');

      const targetSection = document.getElementById(targetTabId);
      if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
      }
    });
  });

  // 8. Cerrar Sesión
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('userSession');
      window.location.href = 'index.html';
    });
  }
});