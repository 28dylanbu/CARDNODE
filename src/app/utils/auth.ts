export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

// Mock admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@english.com',
  password: 'admin123',
};

export const checkIsAdmin = (email: string, password: string): boolean => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) return null;
  return JSON.parse(userJson);
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.role === 'admin';
};

export const logout = (): void => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userName');
};

export const createUser = (name: string, email: string, password: string): User => {
  const isAdminUser = checkIsAdmin(email, password);

  const user: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
    role: isAdminUser ? 'admin' : 'student',
    createdAt: new Date(),
  };

  return user;
};
