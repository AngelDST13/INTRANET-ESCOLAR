document.addEventListener('DOMContentLoaded', function() {
  const userSession = JSON.parse(localStorage.getItem('userSession'));

  if (!userSession || !userSession.username) {
    window.location.href = 'index.html';
    return;
  }

  const welcomeElem = document.getElementById('welcomeUser');
  const badgeElem = document.getElementById('userBadge');
  
  if (welcomeElem) welcomeElem.textContent = userSession.username;
  if (badgeElem) badgeElem.textContent = userSession.role.toUpperCase();

  initDatabase();
  applyRoleSecurity(userSession.role);
  loadUserProfile(userSession.username);
  renderAllData(userSession);
  setupFormEvents(userSession);

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
      localStorage.removeItem('userSession');
      window.location.replace('index.html');
    });
  }
});

function applyRoleSecurity(role) {
  const menuAdminTeachers = document.getElementById('menuAdminTeachers');
  const menuAdminUsers = document.getElementById('menuAdminUsers');
  const menuAcademic = document.getElementById('menuAcademic');
  const menuStudent = document.getElementById('menuStudent');
  const addNoticeForm = document.getElementById('addNoticeForm');

  if (menuAdminTeachers) menuAdminTeachers.style.display = 'none';
  if (menuAdminUsers) menuAdminUsers.style.display = 'none';
  if (menuAcademic) menuAcademic.style.display = 'none';
  if (menuStudent) menuStudent.style.display = 'none';

  if (role === 'admin') {
    if (menuAdminTeachers) menuAdminTeachers.style.display = 'block';
    if (menuAdminUsers) menuAdminUsers.style.display = 'block';
    if (menuAcademic) menuAcademic.style.display = 'block';
    if (addNoticeForm) addNoticeForm.style.display = 'block';
  } else if (role === 'docente') {
    if (menuAcademic) menuAcademic.style.display = 'block';
    if (addNoticeForm) addNoticeForm.style.display = 'block';
  } else if (role === 'estudiante') {
    if (menuStudent) menuStudent.style.display = 'block';
  }
}

window.showTab = function(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.style.display = 'none');

  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => link.classList.remove('active'));

  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.style.display = 'block';
  if (window.event && window.event.currentTarget) window.event.currentTarget.classList.add('active');
};

function initDatabase() {
  if (!localStorage.getItem('announcements')) {
    localStorage.setItem('announcements', JSON.stringify([
      'Bienvenido al ciclo lectivo 2026 del Colegio Eton. Las clases inician a las 7:00 AM.',
      'Reunión general de padres de familia el próximo viernes.'
    ]));
  }
  if (!localStorage.getItem('teachersList')) {
    localStorage.setItem('teachersList', JSON.stringify([
      { name: 'Roberto Gómez', username: 'profesor_mario', subject: 'Matemáticas' }
    ]));
  }
  if (!localStorage.getItem('usersList')) {
    localStorage.setItem('usersList', JSON.stringify([
      { 
        username: 'agomez', 
        fullName: 'Ana Sofía Gómez', 
        role: 'estudiante', 
        email: 'agomez@eton.edu',
        phone: '88888888',
        grade: '10° Año', 
        section: '10-1', 
        age: '16', 
        birthdate: '2010-04-12', 
        guardian: 'Carlos Gómez',
        address: 'San José, Costa Rica' 
      }
    ]));
  }
  if (!localStorage.getItem('grades')) {
    localStorage.setItem('grades', JSON.stringify([
      { student: 'agomez', subject: 'Matemáticas', score: 95 }
    ]));
  }
  if (!localStorage.getItem('attendance')) {
    localStorage.setItem('attendance', JSON.stringify([
      { student: 'agomez', status: 'Presente' }
    ]));
  }
}

function renderAllData(userSession) {
  // Tablón
  const notices = JSON.parse(localStorage.getItem('announcements')) || [];
  const announcementsList = document.getElementById('announcementsList');
  if (announcementsList) announcementsList.innerHTML = notices.map(n => `<li>${n}</li>`).join('');

  // Docentes
  const teachers = JSON.parse(localStorage.getItem('teachersList')) || [];
  const teachersTableBody = document.getElementById('teachersTableBody');
  if (teachersTableBody) {
    teachersTableBody.innerHTML = teachers.map((t, i) => `
      <tr>
        <td>${t.name}</td>
        <td>${t.username}</td>
        <td>${t.subject}</td>
        <td><button onclick="deleteTeacher(${i})" class="btn-logout" style="padding:0.2rem 0.5rem;">Baja</button></td>
      </tr>
    `).join('');
  }

  // Lista General de Usuarios (Administración)
  const users = JSON.parse(localStorage.getItem('usersList')) || [];
  const usersTableBody = document.getElementById('usersTableBody');
  if (usersTableBody) {
    usersTableBody.innerHTML = users.map((u, i) => `
      <tr>
        <td>${u.username}</td>
        <td>${u.fullName || u.username}</td>
        <td>${u.grade ? `${u.grade} (${u.section})` : 'N/A'}</td>
        <td><strong>${u.role}</strong></td>
        <td><button onclick="deleteUser(${i})" class="btn-logout" style="padding:0.2rem 0.5rem;">Eliminar</button></td>
      </tr>
    `).join('');
  }

  // VISTA PRIVADA DEL ESTUDIANTE: Filtra para mostrar ÚNICAMENTE sus datos
  if (userSession.role === 'estudiante') {
    const currentUsername = userSession.username.toLowerCase();

    // 1. Ficha de Datos Personales del Estudiante
    const studentData = users.find(u => u.username.toLowerCase() === currentUsername);
    const studentInfoContainer = document.getElementById('studentInfoContainer');
    if (studentInfoContainer && studentData) {
      studentInfoContainer.innerHTML = `
        <p><strong>Nombre:</strong> ${studentData.fullName || studentData.username}</p>
        <p><strong>Correo:</strong> ${studentData.email || 'N/A'}</p>
        <p><strong>Grado:</strong> ${studentData.grade || 'N/A'}</p>
        <p><strong>Sección:</strong> ${studentData.section || 'N/A'}</p>
        <p><strong>Edad:</strong> ${studentData.age || 'N/A'} años</p>
        <p><strong>Cumpleaños:</strong> ${studentData.birthdate || 'N/A'}</p>
        <p><strong>Encargado:</strong> ${studentData.guardian || 'N/A'}</p>
        <p><strong>Dirección:</strong> ${studentData.address || 'N/A'}</p>
      `;
    }

    // 2. Notas Privadas
    const grades = JSON.parse(localStorage.getItem('grades')) || [];
    const myGrades = grades.filter(g => g.student.toLowerCase() === currentUsername);
    const studentGradesBody = document.getElementById('studentGradesBody');
    if (studentGradesBody) {
      studentGradesBody.innerHTML = myGrades.length ? myGrades.map(g => `
        <tr>
          <td>${g.subject}</td>
          <td>${g.score}</td>
          <td><strong>${g.score >= 70 ? 'Aprobado' : 'Reprobado'}</strong></td>
        </tr>
      `).join('') : '<tr><td colspan="3">No hay calificaciones registradas.</td></tr>';
    }

    // 3. Asistencia Privada
    const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    const myAttendance = attendance.filter(a => a.student.toLowerCase() === currentUsername);
    const studentAttendanceBody = document.getElementById('studentAttendanceBody');
    if (studentAttendanceBody) {
      studentAttendanceBody.innerHTML = myAttendance.length ? myAttendance.map(a => `
        <tr>
          <td>Registro General</td>
          <td><strong>${a.status}</strong></td>
        </tr>
      `).join('') : '<tr><td colspan="2">Sin registro de asistencia.</td></tr>';
    }
  }
}

function loadUserProfile(username) {
  const profileKey = `profile_${username}`;
  const users = JSON.parse(localStorage.getItem('usersList')) || [];
  const matchedUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());

  const profileData = JSON.parse(localStorage.getItem(profileKey)) || {
    fullName: matchedUser ? matchedUser.fullName : username,
    email: matchedUser ? matchedUser.email : '',
    phone: matchedUser ? matchedUser.phone : '',
    bio: '',
    photoUrl: 'https://via.placeholder.com/120'
  };

  if (document.getElementById('profileFullName')) document.getElementById('profileFullName').value = profileData.fullName;
  if (document.getElementById('profileEmail')) document.getElementById('profileEmail').value = profileData.email;
  if (document.getElementById('profilePhone')) document.getElementById('profilePhone').value = profileData.phone;
  if (document.getElementById('profileBio')) document.getElementById('profileBio').value = profileData.bio;
  if (document.getElementById('photoUrl')) document.getElementById('photoUrl').value = profileData.photoUrl;
  if (document.getElementById('profilePreview')) document.getElementById('profilePreview').src = profileData.photoUrl;
  if (document.getElementById('navAvatar')) document.getElementById('navAvatar').src = profileData.photoUrl;
}

function setupFormEvents(userSession) {
  // Guardar Mi Perfil con validaciones estrictas
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const phoneVal = document.getElementById('profilePhone').value;
      if (!/^\d+$/.test(phoneVal)) {
        alert('El número de teléfono solo puede contener caracteres numéricos.');
        return;
      }

      const profileData = {
        fullName: document.getElementById('profileFullName').value,
        email: document.getElementById('profileEmail').value,
        phone: phoneVal,
        bio: document.getElementById('profileBio').value,
        photoUrl: document.getElementById('photoUrl').value || 'https://via.placeholder.com/120'
      };

      localStorage.setItem(`profile_${userSession.username}`, JSON.stringify(profileData));
      if (document.getElementById('navAvatar')) document.getElementById('navAvatar').src = profileData.photoUrl;
      if (document.getElementById('profilePreview')) document.getElementById('profilePreview').src = profileData.photoUrl;
      alert('Perfil actualizado con éxito.');
    });
  }

  // Registrar Estudiante / Padre con Expediente Completo
  const registerStudentForm = document.getElementById('registerStudentForm');
  if (registerStudentForm) {
    registerStudentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const newStudent = {
        username: document.getElementById('regUsername').value.trim(),
        fullName: document.getElementById('regFullName').value.trim(),
        email: document.getElementById('regEmail').value.trim(),
        phone: document.getElementById('regPhone').value.trim(),
        grade: document.getElementById('regGrade').value,
        section: document.getElementById('regSection').value.trim(),
        age: document.getElementById('regAge').value.trim(),
        birthdate: document.getElementById('regBirthdate').value,
        guardian: document.getElementById('regGuardian').value.trim(),
        address: document.getElementById('regAddress').value.trim(),
        role: 'estudiante'
      };

      const users = JSON.parse(localStorage.getItem('usersList')) || [];
      users.push(newStudent);
      localStorage.setItem('usersList', JSON.stringify(users));

      alert('Expediente de estudiante registrado en Colegio Eton.');
      registerStudentForm.reset();
      renderAllData(userSession);
    });
  }

  // Formulario Calificaciones
  const addGradeForm = document.getElementById('addGradeForm');
  if (addGradeForm) {
    addGradeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const student = document.getElementById('studentName').value.trim();
      const subject = document.getElementById('subjectName').value.trim();
      const score = document.getElementById('gradeScore').value;

      const grades = JSON.parse(localStorage.getItem('grades')) || [];
      grades.push({ student, subject, score: Number(score) });
      localStorage.setItem('grades', JSON.stringify(grades));

      addGradeForm.reset();
      renderAllData(userSession);
      alert('Nota agregada.');
    });
  }

  // Formulario Asistencia
  const attendanceForm = document.getElementById('attendanceForm');
  if (attendanceForm) {
    attendanceForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const student = document.getElementById('attendanceStudent').value.trim();
      const status = document.getElementById('attendanceStatus').value;

      const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
      attendance.push({ student, status });
      localStorage.setItem('attendance', JSON.stringify(attendance));

      attendanceForm.reset();
      renderAllData(userSession);
      alert('Asistencia registrada.');
    });
  }
}

window.deleteTeacher = function(index) {
  const teachers = JSON.parse(localStorage.getItem('teachersList')) || [];
  teachers.splice(index, 1);
  localStorage.setItem('teachersList', JSON.stringify(teachers));
  location.reload();
};

window.deleteUser = function(index) {
  const users = JSON.parse(localStorage.getItem('usersList')) || [];
  users.splice(index, 1);
  localStorage.setItem('usersList', JSON.stringify(users));
  location.reload();
};