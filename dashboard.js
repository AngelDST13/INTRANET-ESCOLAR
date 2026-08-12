document.addEventListener('DOMContentLoaded', function() {
  const sessionData = localStorage.getItem('userSession');
  
  if (!sessionData) {
    window.location.href = 'index.html';
    return;
  }

  const userSession = JSON.parse(sessionData);
  document.getElementById('welcomeUser').textContent = `${userSession.username} (${userSession.role.toUpperCase()})`;

  initDatabase();
  setupRoleView(userSession.role);
  renderAllData();
  setupFormEvents();

  document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('userSession');
    window.location.href = 'index.html';
  });
});

function initDatabase() {
  if (!localStorage.getItem('announcements')) {
    localStorage.setItem('announcements', JSON.stringify([
      'Bienvenido al ciclo lectivo 2026. Las clases inician a las 7:00 AM.',
      'Reunión general de padres de familia el próximo viernes.'
    ]));
  }
  if (!localStorage.getItem('grades')) {
    localStorage.setItem('grades', JSON.stringify([
      { student: 'Ana Gómez', subject: 'Matemáticas', score: 95 },
      { student: 'Carlos López', subject: 'Español', score: 88 }
    ]));
  }
  if (!localStorage.getItem('attendance')) {
    localStorage.setItem('attendance', JSON.stringify([
      { student: 'Ana Gómez', status: 'Presente' },
      { student: 'Carlos López', status: 'Ausente' }
    ]));
  }
  if (!localStorage.getItem('usersList')) {
    localStorage.setItem('usersList', JSON.stringify([
      { username: 'profesor_mario', role: 'docente' },
      { username: 'familia_gomez', role: 'estudiante' }
    ]));
  }
}

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

function renderAllData() {
  renderAnnouncements();
  renderGrades();
  renderUsers();
  renderAttendance();
}

function renderAnnouncements() {
  const list = document.getElementById('announcementsList');
  const notices = JSON.parse(localStorage.getItem('announcements')) || [];
  list.innerHTML = notices.map(notice => `<li>${notice}</li>`).join('');
}

function renderGrades() {
  const tbody = document.getElementById('gradesTableBody');
  const grades = JSON.parse(localStorage.getItem('grades')) || [];
  tbody.innerHTML = grades.map(g => `
    <tr>
      <td>${g.student}</td>
      <td>${g.subject}</td>
      <td>${g.score}</td>
      <td><strong>${g.score >= 70 ? 'Aprobado' : 'Reprobado'}</strong></td>
    </tr>
  `).join('');
}

function renderAttendance() {
  const tbody = document.getElementById('attendanceTableBody');
  const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
  tbody.innerHTML = attendance.map(a => `
    <tr>
      <td>${a.student}</td>
      <td><strong>${a.status}</strong></td>
    </tr>
  `).join('');
}

function renderUsers() {
  const tbody = document.getElementById('usersTableBody');
  const users = JSON.parse(localStorage.getItem('usersList')) || [];
  tbody.innerHTML = users.map((u, index) => `
    <tr>
      <td>${u.username}</td>
      <td>${u.role}</td>
      <td>
        <button onclick="editUser(${index})" class="btn-action" style="margin:0; padding:0.25rem 0.5rem; background:#2b6cb0;">Editar</button>
        <button onclick="deleteUser(${index})" class="btn-logout" style="margin:0; padding:0.25rem 0.5rem;">Baja</button>
      </td>
    </tr>
  `).join('');
}

// Funciones globales para Editar y Eliminar (Baja) usuarios
window.deleteUser = function(index) {
  const users = JSON.parse(localStorage.getItem('usersList')) || [];
  if (confirm(`¿Dar de baja al usuario "${users[index].username}"?`)) {
    users.splice(index, 1);
    localStorage.setItem('usersList', JSON.stringify(users));
    renderUsers();
  }
};

window.editUser = function(index) {
  const users = JSON.parse(localStorage.getItem('usersList')) || [];
  const user = users[index];
  document.getElementById('newUsername').value = user.username;
  document.getElementById('newUserRole').value = user.role;
  document.getElementById('editIndex').value = index;
  document.getElementById('btnUserForm').textContent = 'Guardar Cambios';
};

function setupFormEvents() {
  // Publicar Aviso
  document.getElementById('addNoticeForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.getElementById('noticeInput').value;
    const notices = JSON.parse(localStorage.getItem('announcements'));
    notices.push(text);
    localStorage.setItem('announcements', JSON.stringify(notices));
    document.getElementById('noticeInput').value = '';
    renderAnnouncements();
  });

  // Guardar / Editar Usuario (Admin)
  document.getElementById('addUserForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const role = document.getElementById('newUserRole').value;
    const editIndex = parseInt(document.getElementById('editIndex').value);
    const users = JSON.parse(localStorage.getItem('usersList')) || [];

    if (editIndex >= 0) {
      users[editIndex] = { username, role };
      document.getElementById('editIndex').value = "-1";
      document.getElementById('btnUserForm').textContent = "+ Registrar Usuario";
    } else {
      users.push({ username, role });
    }

    localStorage.setItem('usersList', JSON.stringify(users));
    document.getElementById('newUsername').value = '';
    renderUsers();
  });

  // Guardar Calificación
  document.getElementById('addGradeForm')?.addEventListener('submit', function(e) {
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
    alert('Calificación guardada.');
    renderGrades();
  });

  // Guardar Asistencia
  document.getElementById('attendanceForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const student = document.getElementById('attendanceStudent').value;
    const status = document.getElementById('attendanceStatus').value;

    const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    attendance.push({ student, status });
    localStorage.setItem('attendance', JSON.stringify(attendance));

    document.getElementById('attendanceStudent').value = '';
    alert('Asistencia registrada.');
    renderAttendance();
  });
}