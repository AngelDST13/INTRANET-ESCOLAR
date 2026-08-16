document.addEventListener('DOMContentLoaded', () => {
  let sessionData = JSON.parse(localStorage.getItem('userSession')) || {
    username: 'admin',
    fullName: 'Administrador Principal',
    role: 'admin',
    idNumber: '112345678',
    email: 'admin@eton.edu',
    phone: '88880000',
    avatarUrl: '',
    loggedIn: true
  };

  // Referencias UI
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
  const btnDeleteAvatar = document.getElementById('btnDeleteAvatar');
  const profileForm = document.getElementById('profileForm');

  const displayName = sessionData.fullName || sessionData.username || 'Usuario';
  const userRole = (sessionData.role || 'admin').toLowerCase();
  
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=2a9d8f&color=fff&bold=true`;
  let currentAvatar = sessionData.avatarUrl || defaultAvatar;

  // Render inicial
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

  // Sistema de Notificaciones Toast (Reemplaza los alert)
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // VALIDACIONES EN TIEMPO REAL: Bloquear entrada de letras donde solo van números
  if (profileIdNumberEl) {
    profileIdNumberEl.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Remueve cualquier letra
    });
  }

  if (profilePhoneEl) {
    profilePhoneEl.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Remueve cualquier letra
    });
  }

  if (profileFullNameEl) {
    profileFullNameEl.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Solo letras y espacios
    });
  }

  // Subir Foto
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
          showToast('Foto de perfil actualizada correctamente', 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Borrar Foto
  if (btnDeleteAvatar) {
    btnDeleteAvatar.addEventListener('click', () => {
      if (userRole === 'estudiante') {
        showToast('Atención Estudiante: Es un requisito institucional mantener una foto de perfil visible.', 'warning');
      }

      sessionData.avatarUrl = '';
      const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(sessionData.fullName)}&background=2a9d8f&color=fff&bold=true`;
      userAvatarEl.src = fallbackAvatar;
      profileLargeAvatarEl.src = fallbackAvatar;
      localStorage.setItem('userSession', JSON.stringify(sessionData));
      
      if (userRole !== 'estudiante') {
        showToast('Foto de perfil eliminada.', 'success');
      }
    });
  }

  // Validar y Guardar Formulario
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = profileFullNameEl.value.trim();
      const idNumber = profileIdNumberEl.value.trim();
      const email = profileEmailEl.value.trim();
      const phone = profilePhoneEl.value.trim();

      // Expresión regular para correo válido
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isValid = true;

      if (!fullName) {
        document.getElementById('errFullName').textContent = 'El nombre es obligatorio.';
        isValid = false;
      } else {
        document.getElementById('errFullName').textContent = '';
      }

      if (!idNumber || idNumber.length < 8) {
        document.getElementById('errIdNumber').textContent = 'Ingrese una cédula válida (mínimo 8 dígitos).';
        isValid = false;
      } else {
        document.getElementById('errIdNumber').textContent = '';
      }

      if (!email || !emailRegex.test(email)) {
        document.getElementById('errEmail').textContent = 'Ingrese un correo electrónico válido.';
        isValid = false;
      } else {
        document.getElementById('errEmail').textContent = '';
      }

      if (!phone || phone.length < 8) {
        document.getElementById('errPhone').textContent = 'El teléfono debe tener 8 dígitos.';
        isValid = false;
      } else {
        document.getElementById('errPhone').textContent = '';
      }

      if (!isValid) {
        showToast('Por favor corrija los errores del formulario.', 'warning');
        return;
      }

      // Guardar
      sessionData.fullName = fullName;
      sessionData.idNumber = idNumber;
      sessionData.email = email;
      sessionData.phone = phone;

      localStorage.setItem('userSession', JSON.stringify(sessionData));
      if (userNameEl) userNameEl.textContent = fullName;
      
      showToast('¡Perfil e información guardados con éxito!', 'success');
    });
  }

  // Visibilidad por Rol y Navegación
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

  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('userSession');
      window.location.href = 'index.html';
    });
  }
});