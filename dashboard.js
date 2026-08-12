document.addEventListener('DOMContentLoaded', function() {
  const sessionData = localStorage.getItem('userSession');
  
  if (!sessionData) {
    window.location.href = 'index.html';
    return;
  }

  const userSession = JSON.parse(sessionData);
  document.getElementById('welcomeUser').textContent = `${userSession.username} (${userSession.role.toUpperCase()})`;

  // Inicializar bases de datos simuladas si están vacías
  initDatabase();

  // Configurar vista según el Rol
  setupRoleView(userSession.role);

  // Cargar información en pantalla
  renderAnnouncements();
  renderGrades();
  renderUsers();

  // Eventos de Formularios
  setupFormEvents();

  // Evento Cierre de Sesión
  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('userSession');
    window.location.href = 'index.html';
  });
});

// Inicialización de datos por defecto en localStorage
function initDatabase() {
  if (!localStorage.getItem('announcements')) {
    const defaultNotices = [
      'Bienvenido al ciclo lectivo 2026. Las clases inician a las 7:00 AM.',
      'Reunión general de padres de familia el próximo viernes.'
    ];
    localStorage.setItem('announcements', JSON.stringify(defaultNotices));
  }

  if (!localStorage.getItem('grades')) {
    const defaultGrades = [
      { student: 'Ana Gómez', subject: 'Matemáticas', score: 95 },
      { student: 'Carlos López', subject: 'Español', score: 88 }
    ];
    localStorage.setItem('grades', JSON.stringify(defaultGrades));
  }

  if (!localStorage.getItem('usersList')) {
    const defaultUsers = [
      { username: 'profesor_mario', role: 'docente' },
      { username: 'familia_gomez', role: 'estudiante' }
    ];
    localStorage.setItem('usersList', JSON.stringify(defaultUsers));
  }
}

// Control de vistas por Rol
function setupRoleView(role) {
  if (role === 'admin') {
    document.getElementById('adminSection').style.display = 'block';
    document.getElementById('addNoticeForm').style.display = 'block';
  } else if (role === 'docente') {
    document.getElementById('teacherSection').style.display = 'block';
    document.getElementById('addNoticeForm').style.display = 'block';
  } else if (role === 'estudiante') {
    document.getElementById('studentSection').style.display = 'block';
  }
}

// Renderizar Comunicados
function renderAnnouncements() {
  const list = document.getElementById('announcementsList');
  const notices = JSON.parse(localStorage.getItem('announcements')) || [];
  list.innerHTML = notices.map(notice => `<li>${notice}</li>`).join('');
}

// Renderizar Calificaciones
function renderGrades() {
  const tbody = document.getElementById('gradesTableBody');
  const grades = JSON.parse(localStorage.getItem('grades')) || [];
  
  tbody.innerHTML = grades.map(g => {
    const status = g.score >= 70 ? 'Aprobado' : 'Reprobado';
    return `
      <tr>
        <td>${g.student}</td>
        <td>${g.subject}</td>
        <td>${g.score}</td>
        <td><strong>${status}</strong></td>
      </tr>
    `;
  }).join('');
}

// Renderizar Lista de Usuarios (Admin)
function renderUsers() {
  const list = document.getElementById('usersList');
  const users = JSON.parse(localStorage.getItem('usersList')) || [];
  list.innerHTML = users.map(u => `<li><strong>${u.username}</strong> — Rol: ${u.role}</li>`).join('');
}

// Manejo de Envíos de Formularios
function setupFormEvents() {
  // Publicar Aviso
  const noticeForm = document.getElementById('addNoticeForm');
  if (noticeForm) {
    noticeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const text = document.getElementById('noticeInput').value;
      const notices = JSON.parse(localStorage.getItem('announcements'));
      notices.push(text);
      localStorage.setItem('announcements', JSON.stringify(notices));
      document.getElementById('noticeInput').value = '';
      renderAnnouncements();
    });
  }

  // Registrar Usuario (Admin)
  const userForm = document.getElementById('addUserForm');
  if (userForm) {
    userForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('newUsername').value;
      const role = document.getElementById('newUserRole').value;
      const users = JSON.parse(localStorage.getItem('usersList'));
      users.push({ username, role });
      localStorage.setItem('usersList', JSON.stringify(users));
      document.getElementById('newUsername').value = '';
      renderUsers();
    });
  }

  // Registrar Calificación (Docente)
  const gradeForm = document.getElementById('addGradeForm');
  if (gradeForm) {
    gradeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const student = document.getElementById('studentName').value;
      const subject = document.getElementById('subjectName').value;
      const score = Number(document.getElementById('gradeScore').value);
      
      const grades = JSON.parse(localStorage.getItem('grades'));
      grades.push({ student, subject, score });
      localStorage.setItem('grades', JSON.stringify(grades));
      
      document.getElementById('studentName').value = '';
      document.getElementById('subjectName').value = '';
      document.getElementById('gradeScore').value = '';
      
      alert('Calificación guardada con éxito.');
      renderGrades();
    });
  }
}