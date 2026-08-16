// Base de datos de prueba predeterminada
const DEFAULT_USERS = [
  { username: 'admin', password: '123', role: 'admin', fullName: 'Administrador Principal' },
  { username: 'admin1', password: '1234', role: 'admin', fullName: 'Dirección Académica' },
  { username: 'profesor1', password: '123', role: 'docente', fullName: 'Prof. Roberto Gómez' },
  { username: 'estudiante1', password: '123', role: 'estudiante', fullName: 'Ana Sofía Gómez' }
];

// Inicializar base de usuarios en LocalStorage si no existe
const getUsersDB = () => {
  const users = localStorage.getItem('registered_users');
  if (!users) {
    localStorage.setItem('registered_users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  return JSON.parse(users);
};

export const checkExistingSession = () => {
  const userSession = JSON.parse(localStorage.getItem('userSession'));
  if (userSession && userSession.username) {
    window.location.href = 'dashboard.html';
  }
};

export const loginUser = (username, password) => {
  const users = getUsersDB();
  const user = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password);

  if (!user) {
    return { success: false, message: 'Usuario o contraseña incorrectos.' };
  }

  // Guardar datos de sesión activa
  const sessionData = {
    username: user.username,
    role: user.role,
    fullName: user.fullName || user.username,
    loggedIn: true,
    loginTime: new Date().toISOString()
  };

  localStorage.setItem('userSession', JSON.stringify(sessionData));
  return { success: true };
};

export const registerUser = (newUser) => {
  const users = getUsersDB();

  // Verificar si el usuario ya existe
  const exists = users.some(u => u.username.toLowerCase() === newUser.username.trim().toLowerCase());
  if (exists) {
    return { success: false, message: 'El nombre de usuario ya está registrado.' };
  }

  users.push(newUser);
  localStorage.setItem('registered_users', JSON.stringify(users));
  return { success: true, message: '¡Cuenta creada con éxito! Ya puedes iniciar sesión.' };
};