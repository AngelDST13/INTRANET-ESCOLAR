document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. CARGA DE SESIÓN Y MODO DÍA / NOCHE
  // ==========================================
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

  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    
    htmlEl.setAttribute('data-theme', theme);
    htmlEl.classList.toggle('dark-mode', isDark);
    document.body.classList.toggle('dark-mode', isDark);

    sessionData.theme = theme;
    localStorage.setItem('userSession', JSON.stringify(sessionData));
    localStorage.setItem('theme', theme);

    if (themeIcon) {
      themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    if (themeText) {
      themeText.textContent = isDark ? 'Modo Día' : 'Modo Noche';
    }
  }

  // Cargar tema previo guardado
  const savedTheme = localStorage.getItem('theme') || sessionData.theme || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-mode');
      applyTheme(isCurrentlyDark ? 'light' : 'dark');
    });
  }

  // ==========================================
  // 2. SISTEMA DE NOTIFICACIONES TOAST
  // ==========================================
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

  // ==========================================
  // 3. RENDER DE DATOS DEL USUARIO EN PERFIL Y HEADER
  // ==========================================
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

  // ==========================================
  // 4. VALIDACIONES EN TIEMPO REAL
  // ==========================================
  if (profileIdNumberEl) {
    profileIdNumberEl.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  if (profilePhoneEl) {
    profilePhoneEl.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  if (profileFullNameEl) {
    profileFullNameEl.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    });
  }

  // ==========================================
  // 5. GESTIÓN DE FOTO DE PERFIL
  // ==========================================
  const avatarInput = document.getElementById('avatarInput');
  const btnDeleteAvatar = document.getElementById('btnDeleteAvatar');

  if (avatarInput) {
    avatarInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newAvatarUrl = event.target.result;
          if (userAvatarEl) userAvatarEl.src = newAvatarUrl;
          if (profileLargeAvatarEl) profileLargeAvatarEl.src = newAvatarUrl;
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
        showToast('Aviso Estudiantil: Es obligatorio mantener una foto visible.', 'warning');
        return;
      }

      sessionData.avatarUrl = '';
      const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(sessionData.fullName)}&background=0d9488&color=fff&bold=true`;
      if (userAvatarEl) userAvatarEl.src = fallback;
      if (profileLargeAvatarEl) profileLargeAvatarEl.src = fallback;
      localStorage.setItem('userSession', JSON.stringify(sessionData));
      showToast('Foto de perfil eliminada', 'success');
    });
  }

  // ==========================================
  // 6. GUARDAR PERFIL Y VALIDACIONES
  // ==========================================
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

      const setErr = (id, msg) => {
        const el = document.getElementById(id);
        if (el) el.textContent = msg;
      };

      if (!fullName) { setErr('errFullName', 'Nombre requerido.'); valid = false; } else { setErr('errFullName', ''); }
      if (idNumber.length < 8) { setErr('errIdNumber', 'Mínimo 8 dígitos.'); valid = false; } else { setErr('errIdNumber', ''); }
      if (!emailRegex.test(email)) { setErr('errEmail', 'Correo inválido.'); valid = false; } else { setErr('errEmail', ''); }
      if (phone.length < 8) { setErr('errPhone', 'Mínimo 8 dígitos.'); valid = false; } else { setErr('errPhone', ''); }

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

  // ==========================================
  // 7. TABLÓN DINÁMICO DE COMUNICADOS (PERSISTENTE EN LOCALSTORAGE)
  // ==========================================
  const defaultAnnouncements = [
    { title: 'Bienvenidos al Ciclo Lectivo — Colegio Eton', author: 'Dirección General', body: 'Les damos la más cordial bienvenida a nuestra Intranet Escolar.' },
    { title: 'Próxima Entrega de Reportes de Calificaciones', author: 'Coordinación Académica', body: 'Se recuerda que la entrega de notas estará disponible este viernes.' }
  ];

  let announcements = JSON.parse(localStorage.getItem('announcements')) || defaultAnnouncements;

  function renderAnnouncements() {
    const list = document.getElementById('announcementList') || document.getElementById('postsContainer');
    if (!list) return;
    
    list.innerHTML = announcements.map(item => `
      <article class="post-card" style="background: var(--card-inner-bg, #1e293b); border: 1px solid var(--border-color, #334155); padding: 16px; border-radius: 12px; margin-bottom: 15px;">
        <h3 class="post-title" style="font-size: 1.1rem; margin-bottom: 6px;">${item.title}</h3>
        <p class="post-meta" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">
          <i class="fa-regular fa-clock"></i> Publicado por ${item.author}
        </p>
        <p class="post-body" style="font-size: 0.92rem;">${item.body}</p>
        ${item.image ? `<img src="${item.image}" style="max-width: 100%; max-height: 250px; border-radius: 8px; margin-top: 10px; display: block;">` : ''}
      </article>
    `).join('');
  }
  renderAnnouncements();

  const annForm = document.getElementById('announcementForm') || document.getElementById('postForm');
  if (annForm) {
    annForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleEl = document.getElementById('annTitle') || document.getElementById('postTitle');
      const bodyEl = document.getElementById('annBody') || document.getElementById('postContent');
      const imageEl = document.getElementById('postImage');

      const title = titleEl ? titleEl.value.trim() : '';
      const body = bodyEl ? bodyEl.value.trim() : '';

      const saveAnnouncement = (imageData = null) => {
        if (title && body) {
          announcements.unshift({ title, author: displayName, body, image: imageData });
          localStorage.setItem('announcements', JSON.stringify(announcements));
          renderAnnouncements();
          annForm.reset();
          showToast('¡Comunicado publicado exitosamente!', 'success');
        }
      };

      if (imageEl && imageEl.files && imageEl.files[0]) {
        const reader = new FileReader();
        reader.onload = (evt) => saveAnnouncement(evt.target.result);
        reader.readAsDataURL(imageEl.files[0]);
      } else {
        saveAnnouncement();
      }
    });
  }

  // ==========================================
  // 8. NAVEGACIÓN UNIFICADA DE PESTAÑAS / SIDEBAR
  // ==========================================
  const navItems = document.querySelectorAll('.sidebar .nav-item, .nav-link');
  const sections = document.querySelectorAll('.dashboard-section, .tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-section') || item.getAttribute('data-tab');
      if (!target) return;

      navItems.forEach(btn => btn.classList.remove('active'));
      item.classList.add('active');

      sections.forEach(sec => {
        if (sec.id === `section-${target}` || sec.id === target) {
          sec.style.display = 'block';
        } else {
          sec.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 9. CERRAR SESIÓN (LOGOUT)
  // ==========================================
  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('userSession');
      window.location.href = 'index.html';
    });
  }

  // ==========================================
  // 10. MÓDULO ACADÉMICO: TABLA DINÁMICA, EXPORTACIÓN E IMPORTACIÓN
  // ==========================================

  const defaultStudents = [
    { id: '118230491', name: 'Valeria Morales', grade: '11', math: 98, spanish: 95, english: 100 },
    { id: '209380122', name: 'Carlos Alvarado', grade: '10', math: 85, spanish: 88, english: 90 },
    { id: '119300482', name: 'Lucía Fernández', grade: '11', math: 92, spanish: 90, english: 94 },
    { id: '308220193', name: 'Diego Sanabria', grade: '10', math: 78, spanish: 82, english: 80 }
  ];

  let studentsData = JSON.parse(localStorage.getItem('studentsData')) || defaultStudents;

  function calculateAverage(s) {
    return Math.round((s.math + s.spanish + s.english) / 3);
  }

  function renderStudentsTable(filterText = '', filterGrade = 'all') {
    const tbody = document.getElementById('studentsTableBody');
    if (!tbody) return;

    const filtered = studentsData.filter(s => {
      const matchText = s.name.toLowerCase().includes(filterText.toLowerCase()) || s.id.includes(filterText);
      const matchGrade = filterGrade === 'all' || s.grade === filterGrade;
      return matchText && matchGrade;
    });

    tbody.innerHTML = filtered.map(s => {
      const avg = calculateAverage(s);
      const badgeColor = avg >= 90 ? '#10b981' : (avg >= 70 ? '#f59e0b' : '#ef4444');

      return `
        <tr style="border-bottom: 1px solid var(--border-color, #334155);">
          <td style="padding: 12px; font-weight: 500;">${s.name}</td>
          <td style="padding: 12px;">${s.id}</td>
          <td style="padding: 12px;">${s.grade}° Año</td>
          <td style="padding: 12px;">${s.math}</td>
          <td style="padding: 12px;">${s.spanish}</td>
          <td style="padding: 12px;">${s.english}</td>
          <td style="padding: 12px;"><span style="background: ${badgeColor}; color: white; padding: 4px 8px; border-radius: 6px; font-weight: bold; font-size: 0.8rem;">${avg} pts</span></td>
          <td style="padding: 12px;">
            <button onclick="downloadSinglePDF('${s.id}')" style="background: transparent; border: none; color: #ef4444; cursor: pointer;" title="Descargar Boleta PDF"><i class="fa-solid fa-file-pdf"></i></button>
          </td>
        </tr>
      `;
    }).join('');

    updateAcademicStats();
  }

  function updateAcademicStats() {
    const totalEl = document.getElementById('statTotalStudents');
    const avgEl = document.getElementById('statAverage');
    const topEl = document.getElementById('statTopStudent');

    if (studentsData.length === 0) return;

    if (totalEl) totalEl.textContent = studentsData.length;

    const globalAvg = Math.round(studentsData.reduce((acc, curr) => acc + calculateAverage(curr), 0) / studentsData.length);
    if (avgEl) avgEl.textContent = `${globalAvg} pts`;

    const sorted = [...studentsData].sort((a, b) => calculateAverage(b) - calculateAverage(a));
    const topStudent = sorted[0];
    if (topEl) topEl.textContent = `${topStudent.name} (${calculateAverage(topStudent)} pts)`;
  }

  renderStudentsTable();

  const searchInput = document.getElementById('searchStudent');
  const gradeSelect = document.getElementById('filterGrade');

  if (searchInput) {
    searchInput.addEventListener('input', () => renderStudentsTable(searchInput.value, gradeSelect ? gradeSelect.value : 'all'));
  }

  if (gradeSelect) {
    gradeSelect.addEventListener('change', () => renderStudentsTable(searchInput ? searchInput.value : '', gradeSelect.value));
  }

  const btnExportJSON = document.getElementById('btnExportJSON');
  if (btnExportJSON) {
    btnExportJSON.addEventListener('click', () => {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(studentsData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', 'Reporte_Estudiantes_Eton.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Archivo JSON exportado con éxito', 'success');
    });
  }

  const btnExportExcel = document.getElementById('btnExportExcel');
  if (btnExportExcel) {
    btnExportExcel.addEventListener('click', () => {
      if (typeof XLSX === 'undefined') {
        showToast('Librería XLSX cargando...', 'warning');
        return;
      }

      const worksheet = XLSX.utils.json_to_sheet(studentsData.map(s => ({
        'Cédula': s.id,
        'Estudiante': s.name,
        'Nivel': `${s.grade}° Año`,
        'Matemáticas': s.math,
        'Español': s.spanish,
        'Inglés': s.english,
        'Promedio': calculateAverage(s)
      })));

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Notas');
      XLSX.writeFile(workbook, 'Calificaciones_Colegio_Eton.xlsx');
      showToast('Archivo Excel generado exitosamente', 'success');
    });
  }

  const btnExportPDF = document.getElementById('btnExportPDF');
  if (btnExportPDF) {
    btnExportPDF.addEventListener('click', () => {
      const element = document.getElementById('pdfReportContainer');
      if (!element) return;

      const opt = {
        margin: 10,
        filename: 'Reporte_Notas_Colegio_Eton.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      };

      html2pdf().set(opt).from(element).save();
      showToast('Generando documento PDF...', 'success');
    });
  }

  const importFileInput = document.getElementById('importFile');
  if (importFileInput) {
    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      if (file.name.endsWith('.json')) {
        reader.onload = (event) => {
          try {
            const imported = JSON.parse(event.target.result);
            studentsData = imported;
            localStorage.setItem('studentsData', JSON.stringify(studentsData));
            renderStudentsTable();
            showToast('Datos cargados desde archivo JSON', 'success');
          } catch (err) {
            showToast('Error al leer el archivo JSON', 'error');
          }
        };
        reader.readAsText(file);
      }
    });
  }

  window.downloadSinglePDF = function(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    const tempDiv = document.createElement('div');
    tempDiv.style.padding = '20px';
    tempDiv.style.fontFamily = 'sans-serif';
    tempDiv.innerHTML = `
      <h2 style="color: #0d9488;">COLEGIO ETON — REPORTES ACADÉMICOS</h2>
      <hr>
      <h3>Boleta de Calificaciones</h3>
      <p><strong>Estudiante:</strong> ${student.name}</p>
      <p><strong>Cédula:</strong> ${student.id}</p>
      <p><strong>Nivel:</strong> ${student.grade}° Año</p>
      <br>
      <table border="1" cellpadding="8" cellspacing="0" style="width:100%; text-align:left;">
        <tr><th>Materia</th><th>Nota</th></tr>
        <tr><td>Matemáticas</td><td>${student.math}</td></tr>
        <tr><td>Español</td><td>${student.spanish}</td></tr>
        <tr><td>Inglés</td><td>${student.english}</td></tr>
        <tr><th>PROMEDIO FINAL</th><th>${calculateAverage(student)} pts</th></tr>
      </table>
    `;

    html2pdf().set({ margin: 10, filename: `Boleta_${student.name}.pdf` }).from(tempDiv).save();
    showToast(`Descargando boleta de ${student.name}`, 'success');
  };

});