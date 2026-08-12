document.addEventListener('DOMContentLoaded', function() {
  const sessionData = localStorage.getItem('userSession');
  
  if (!sessionData) {
    window.location.href = 'index.html';
    return;
  }

  const userSession = JSON.parse(sessionData);
  
  // Cargar datos del usuario en la barra superior
  document.getElementById('welcomeUser').textContent = userSession.username;
  document.getElementById('userBadge').textContent = userSession.role;

  initDatabase();
  applyRoleSecurity(userSession.role);
  loadUserProfile(userSession.username);
  renderAllData();
  setupFormEvents(userSession);

  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('userSession');
    window.location.href = 'index.html';
  });
});

// Control Estricto de Menú por Roles
function applyRoleSecurity(role) {
  // Ocultar todas las secciones dinámicas al inicio
  document.getElementById('menuAdminTeachers').style.display = 'none';
  document.getElementById('menuAdminUsers').style.display = 'none';
  document.getElementById('menuAcademic').style.display = 'none';
  document.getElementById('menuStudent').style.display = 'none';

  if (role === 'admin') {
    // Administrador/Director: Acceso total a Docentes y Usuarios
    document.getElementById('menuAdminTeachers').style.display = 'block';
    document.getElementById('menuAdminUsers').style.display = 'block';
    document.getElementById('menuAcademic').style.display = 'block';
    document.getElementById('addNoticeForm').style.display = 'block';
  } else if (role === 'docente') {
    // Docente: Acceso solo a Módulo Académico y Comunicados
    document.getElementById('menuAcademic').style.display = 'block';
    document.getElementById('addNoticeForm').style.display = 'block';
  } else if (role === 'estudiante') {
    // Estudiante / Familia: Acceso solo a Notas y Perfil
    document.getElementById('menuStudent').style.display = 'block';
  }
}

// Navegación entre pestañas
window.showTab = function(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => link.classList.remove('active'));

  document.getElementById(tabId).style.display = 'block';
  event.currentTarget.classList.add('active');
};

function initDatabase() {
  if (!localStorage.getItem('announcements')) {
    localStorage.setItem('announcements', JSON.stringify([
      'Bienvenido al ciclo lectivo 2026. Las clases inician a las 7:00 AM.',
      'Reunión general de padres de familia el próximo viernes.'
    ]));
  }
  if (!localStorage.getItem('teachersList')) {
    localStorage.setItem('teachersList', JSON.stringify([
      { name: 'Roberto Gómez', username: 'profesor_mario', subject: 'Matemáticas' }
    ]));
  }
  if (!localStorage.getItem('grades')) {
    localStorage.setItem('grades', JSON.stringify([
      { student: 'Ana Gómez', subject: 'Matemáticas', score: 95 }
    ]));
  }
  if (!localStorage.getItem('attendance')) {
    localStorage.setItem('attendance', JSON.stringify([
      { student: 'Ana Gómez', status: 'Presente' }
    ]));
  }
}

function renderAllData() {
  // Renderizar comunicados
  const notices = JSON.parse(localStorage.getItem('announcements')) || [];
  document.getElementById('announcementsList').innerHTML = notices.map(n => `<li>${n}</li>`).join('');

  // Renderizar docentes (Admin)
  const teachers = JSON.parse(localStorage.getItem('teachersList')) || [];
  document.getElementById('teachersTableBody').innerHTML = teachers.map((t, i) => `
    <tr>
      <td>${t.name}</td>
      <td>${t.username}</td>
      <td>${t.subject}</td>
      <td><button onclick="deleteTeacher(${i})" class="btn-logout" style="padding:0.2rem 0.5rem;">Baja</button></td>
    </tr>
  `).join('');

  // Renderizar notas
  const grades = JSON.parse(localStorage.getItem('grades')) || [];
  document.getElementById('gradesTableBody').innerHTML = grades.map(g => `
    <tr>
      <td>${g.student}</td>
      <td>${g.subject}</td>
      <td>${g.score}</td>
      <td><strong>${g.score >= 70 ? 'Aprobado' : 'Reprobado'}</strong></td>
    </tr>
  `).join('');

  // Renderizar asistencia
  const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
  document.getElementById('attendanceTableBody').innerHTML = attendance.map(a => `
    <tr>
      <td>${a.student}</td>
      <td><strong>${a.status}</strong></td>
    </tr>
  `).join('');
}

// Perfil de Usuario y Foto
function loadUserProfile(username) {
  const profileKey = `profile_${username}`;
  const profileData = JSON.parse(localStorage.getItem(profileKey)) || {
    fullName: username,
    email: '',
    phone: '',
    bio: '',
    photoUrl: 'https://via.placeholder.com/120'
  };

  document.getElementById('profileFullName').value = profileData.fullName;
  document.getElementById('profileEmail').value = profileData.email;
  document.getElementById('profilePhone').value = profileData.phone;
  document.getElementById('profileBio').value = profileData.bio;
  document.getElementById('photoUrl').value = profileData.photoUrl;
  document.getElementById('profilePreview').src = profileData.photoUrl;
  document.getElementById('navAvatar').src = profileData.photoUrl;
}

function setupFormEvents(userSession) {
  // Guardar Perfil
  document.getElementById('profileForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const profileData = {
      fullName: document.getElementById('profileFullName').value,
      email: document.getElementById('profileEmail').value,
      phone: document.getElementById('profilePhone').value,
      bio: document.getElementById('profileBio').value,
      photoUrl: document.getElementById('photoUrl').value || 'https://via.placeholder.com/120'
    };

    localStorage.setItem(`profile_${userSession.username}`, JSON.stringify(profileData));
    document.getElementById('navAvatar').src = profileData.photoUrl;
    document.getElementById('profilePreview').src = profileData.photoUrl;
    alert('Perfil actualizado con éxito.');
  });

  // Registrar Docente (Exclusivo Admin)
  document.getElementById('addTeacherForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('teacherName').value;
    const username = document.getElementById('teacherUser').value;
    const subject = document.getElementById('teacherSubject').value;

    const teachers = JSON.parse(localStorage.getItem('teachersList')) || [];
    teachers.push({ name, username, subject });
    localStorage.setItem('teachersList', JSON.stringify(teachers));

    document.getElementById('teacherName').value = '';
    document.getElementById('teacherUser').value = '';
    document.getElementById('teacherSubject').value = '';
    renderAllData();
  });
}

window.deleteTeacher = function(index) {
  const teachers = JSON.parse(localStorage.getItem('teachersList')) || [];
  teachers.splice(index, 1);
  localStorage.setItem('teachersList', JSON.stringify(teachers));
  renderAllData();
};