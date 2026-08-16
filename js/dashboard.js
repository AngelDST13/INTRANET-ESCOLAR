document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar Sesión y Tema
  let sessionData = JSON.parse(localStorage.getItem('userSession')) || {
    username: 'admin',
    fullName: 'Angel Salazar',
    role: 'admin',
    idNumber: '112345678',
    email: 'admin@eton.edu',
    phone: '88888888',
    avatarUrl: '',
    theme: 'dark'
  };

  // Configurar Tema
  const htmlEl = document.documentElement;
  const btnThemeToggle = document.getElementById('btnThemeToggle');
  
  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    sessionData.theme = theme;
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    if (btnThemeToggle) {
      btnThemeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
  }

  applyTheme(sessionData.theme || 'dark');

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  }

  // 2. Sistema de Notificaciones Toast Flotantes
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `custom-toast toast-${type}`;
    
    let icon = 'fa-circle-check';
    if (type === 'warning') icon = 'fa-triangle-exclamation';
    if (type === 'error') icon = 'fa-circle-xmark';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // 3. Render de Datos de Usuario
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

  const userRole = (sessionData.role || 'admin').toLowerCase();
  const displayName = sessionData.fullName || sessionData.username || 'Usuario';
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0d9488&color=fff&bold=true`;
  const currentAvatar = sessionData.avatarUrl || defaultAvatar;

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

  // 4. VALIDACIONES EN TIEMPO REAL: Bloquear entrada de caracteres no válidos
  if (profileIdNumberEl) {
    profileIdNumberEl.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Solo números
    });
  }

  if (profilePhoneEl) {
    profilePhoneEl.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Solo números
    });
  }

  if (profileFullNameEl) {
    profileFullNameEl.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Solo letras y espacios
    });
  }

  // 5. Gestión de Foto de Perfil
  const avatarInput = document.getElementById('avatarInput');
  const btnDeleteAvatar = document.getElementById('btnDeleteAvatar');

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
          showToast('Foto de perfil actualizada con éxito', 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (btnDeleteAvatar) {
    btnDeleteAvatar.addEventListener('click', () => {
      if (userRole === 'estudiante') {
        showToast('Aviso Estudiantil: Es obligatorio mantener una foto visible en su expediente.', 'warning');
      }

      sessionData.avatarUrl = '';
      const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(sessionData.fullName)}&background=0d9488&color=fff&bold=true`;
      userAvatarEl.src = fallback;
      profileLargeAvatarEl.src = fallback;
      localStorage.setItem('userSession', JSON.stringify(sessionData));
      
      if (userRole !== 'estudiante') {
        showToast('Foto de perfil eliminada', 'success');
      }
    });
  }

  // 6. Guardar Perfil con Validación Estricta
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = profileFullNameEl.value.trim();
      const idNumber = profileIdNumberEl.value.trim();
      const email = profileEmailEl.value.trim();
      const phone = profilePhoneEl.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let valid = true;

      if (!fullName) {
        document.getElementById('errFullName').textContent = 'Nombre requerido.';
        valid = false;
      } else { document.getElementById('errFullName').textContent = ''; }

      if (idNumber.length < 8) {
        document.getElementById('errIdNumber').textContent = 'Cédula debe tener al menos 8 dígitos.';
        valid = false;
      } else { document.getElementById('errIdNumber').textContent = ''; }

      if (!emailRegex.test(email)) {
        document.getElementById('errEmail').textContent = 'Correo con formato inválido.';
        valid = false;
      } else { document.getElementById('errEmail').textContent = ''; }

      if (phone.length < 8) {
        document.getElementById('errPhone').textContent = 'Teléfono debe tener 8 dígitos.';
        valid = false;
      } else { document.getElementById('errPhone').textContent = ''; }

      if (!valid) {
        showToast('Por favor, corrija los datos requeridos', 'warning');
        return;
      }

      sessionData.fullName = fullName;
      sessionData.idNumber = idNumber;
      sessionData.email = email;
      sessionData.phone = phone;

      localStorage.setItem('userSession', JSON.stringify(sessionData));
      if (userNameEl) userNameEl.textContent = fullName;
      showToast('¡Información guardada correctamente!', 'success');
    });
  }

  // 7. Tablón Dinámico de Comunicados
  const announcements = [
    { title: 'Bienvenidos al Ciclo Lectivo — Colegio Eton', author: 'Dirección General', body: 'Les damos la más cordial bienvenida a nuestra Intranet Escolar. A través de este portal podrán consultar expedientes y notas.' },
    { title: 'Próxima Entrega de Reportes de Calificaciones', author: 'Coordinación Académica', body: 'Se recuerda que la entrega de notas del primer periodo estará disponible este viernes en el módulo académico.' }
  ];

  function renderAnnouncements() {
    const list = document.getElementById('announcementList');
    if (!list) return;
    list.innerHTML = announcements.map(item => `
      <article style="background: var(--card-inner-bg); border: 1px solid var(--glass-border); padding: 16px; border-radius: 12px;">
        <h3 style="font-size: 1.1rem; margin-bottom: 6px;">${item.title}</h3>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">
          <i class="fa-regular fa-clock"></i> Publicado por ${item.author}
        </p>
        <p style="font-size: 0.92rem;">${item.body}</p>
      </article>
    `).join('');
  }
  renderAnnouncements();

  // Permisos según Rol
  if (userRole === 'admin' || userRole === 'docente') {
    const annContainer = document.getElementById('announcementFormContainer');
    if (annContainer) annContainer.style.display = 'block';
  }

  const annForm = document.getElementById('announcementForm');
  if (annForm) {
    annForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('annTitle').value.trim();
      const body = document.getElementById('annBody').value.trim();
      
      if (title && body) {
        announcements.unshift({ title, author: displayName, body });
        renderAnnouncements();
        annForm.reset();
        showToast('¡Comunicado publicado exitosamente!', 'success');
      }
    });
  }

  // Visibilidad Menús Navegación
  if (userRole === 'admin') {
    document.getElementById('menuAdminUsers').style.display = 'block';
    document.getElementById('menuAcademic').style.display = 'block';
  } else if (userRole === 'docente' || userRole === 'estudiante') {
    document.getElementById('menuAcademic').style.display = 'block';
  }

  // Navegación por Pestañas
  const navButtons = document.querySelectorAll('.nav-link');
  const tabSections = document.querySelectorAll('.tab-content');

  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTabId = button.getAttribute('data-tab');

      navButtons.forEach(btn => btn.classList.remove('active'));
      tabSections.forEach(section => section.style.display = 'none');

      button.classList.add('active');
      const targetSection = document.getElementById(targetTabId);
      if (targetSection) targetSection.style.display = 'block';
    });
  });

  // Reserva de Recursos
  const resForm = document.getElementById('resourceForm');
  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Reserva registrada en el sistema.', 'success');
      resForm.reset();
    });
  }

  // Logout
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      localStorage.removeItem('userSession');
      window.location.href = 'index.html';
    });
  }
});