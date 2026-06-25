import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Mail, Lock, User, Eye, EyeOff, BookOpen } from 'lucide-react';
import { createUser, setCurrentUser } from '../utils/auth';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab as 'login' | 'register');
    }

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        const user = JSON.parse(userJson);
        navigate(user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [location.state, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'register') {
      // --- REGISTRO DE USUARIOS ---
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }

      const userBase = createUser(
          formData.name || formData.email.split('@')[0],
          formData.email,
          formData.password
      );

      const user = {
        ...userBase,
        createdAt: userBase.createdAt || new Date().toISOString(), // CORRECCIÓN AQUÍ
        stats: {
          flashcardsAttempts: 0,
          flashcardsFailed: [],
          constructorAttempts: 0,
          constructorFailed: []
        }
      };

      fetch('http://localhost:5000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
          .then(() => {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', user.name);
            setCurrentUser(user);
            navigate(user.role === 'admin' ? '/admin' : '/dashboard');
          })
          .catch((error) => {
            console.error('Error al guardar el usuario:', error);
            alert('Hubo un problema al conectar con la base de datos local en el puerto 5000.');
          });

    } else {
      // --- INICIO DE SESIÓN (LOGIN) ---

      // Fallback de seguridad local por si no se encuentra en el JSON
      if (formData.email === 'admin@admin.com' && formData.password === '123456') {
        const localAdmin = {
          id: 'admin-local',
          name: 'Admin Sistema',
          email: 'admin@admin.com',
          password: '123456',
          role: 'admin',
          createdAt: new Date().toISOString(),
          stats: { flashcardsAttempts: 0, flashcardsFailed: [], constructorAttempts: 0, constructorFailed: [] }
        };
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', localAdmin.name);
        setCurrentUser(localAdmin as any);
        navigate('/admin');
        return;
      }

      fetch('http://localhost:5000/usuarios')
          .then(res => res.json())
          .then(data => {
            const usersArray = Array.isArray(data) ? data : (data.usuarios || []);

            let userFound = null;
            for (let i = 0; i < usersArray.length; i++) {
              if (usersArray[i].email === formData.email) {
                userFound = usersArray[i];
                break;
              }
            }

            if (!userFound) {
              alert('El correo electrónico no está registrado.');
              return;
            }

            if (userFound.password !== formData.password) {
              alert('La contraseña es incorrecta.');
              return;
            }

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userName', userFound.name);
            setCurrentUser(userFound);

            if (userFound.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/dashboard');
            }
          })
          .catch(err => {
            console.error("Error al conectar con la base de datos:", err);
            alert('Hubo un error al conectar con el servidor en el puerto 5000. Verifica que pnpm run data esté activo.');
          });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
      <div
          className="flex h-screen overflow-hidden bg-[#12131C]"
          style={{ width: '1440px', height: '900px', margin: '0 auto' }}
      >
        {/* Left Side - Branding */}
        <div className="w-1/2 flex flex-col items-center justify-center p-12 border-r border-white/10">
          <div className="max-w-md text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#6FCF97] to-[#56CCF2] flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-[#12131C]" />
            </div>
            <h1 className="mb-4">Master English with Flashcards</h1>
            <p className="text-gray-400 mb-8">
              A premium learning experience designed for ambitious learners. Track your progress,
              master vocabulary, and achieve fluency through scientifically-proven spaced repetition.
            </p>

            <div className="grid grid-cols-3 gap-4 mt-12">
              <div className="bg-[#1C1E2B] rounded-xl p-4 border border-white/5">
                <div className="text-2xl mb-2 text-[#6FCF97]">50K+</div>
                <div className="text-xs text-gray-500">Active Learners</div>
              </div>
              <div className="bg-[#1C1E2B] rounded-xl p-4 border border-white/5">
                <div className="text-2xl mb-2 text-[#F2C94C]">1M+</div>
                <div className="text-xs text-gray-500">Cards Studied</div>
              </div>
              <div className="bg-[#1C1E2B] rounded-xl p-4 border border-white/5">
                <div className="text-2xl mb-2 text-[#FF9F9F]">95%</div>
                <div className="text-xs text-gray-500">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-1/2 flex flex-col items-center justify-center p-12">
          <div className="w-full max-w-md">
            {/* Tab Switcher */}
            <div className="flex gap-2 mb-8 bg-[#1C1E2B] p-2 rounded-xl">
              <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                      activeTab === 'login'
                          ? 'bg-[#6FCF97] text-[#12131C]'
                          : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
              >
                Login
              </button>
              <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-3 px-6 rounded-lg transition-all ${
                      activeTab === 'register'
                          ? 'bg-[#6FCF97] text-[#12131C]'
                          : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
              >
                Register
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="mb-2">{activeTab === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="text-sm text-gray-500">
                  {activeTab === 'login'
                      ? 'Enter your credentials to continue learning'
                      : 'Fill in your details to start your learning journey'}
                </p>
              </div>

              {/* Name Field - Only for Register */}
              {activeTab === 'register' && (
                  <div>
                    <label className="block text-sm mb-2 text-gray-400">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="John Doe"
                          required
                          className="w-full bg-[#1C1E2B] border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#6FCF97] transition-colors"
                      />
                    </div>
                  </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-[#1C1E2B] border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#6FCF97] transition-colors"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm mb-2 text-gray-400">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="w-full bg-[#1C1E2B] border border-white/10 rounded-xl py-4 pl-12 pr-12 focus:outline-none focus:border-[#6FCF97] transition-colors"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field - Only for Register */}
              {activeTab === 'register' && (
                  <div>
                    <label className="block text-sm mb-2 text-gray-400">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          placeholder="••••••••"
                          required
                          minLength={6}
                          className="w-full bg-[#1C1E2B] border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#6FCF97] transition-colors"
                      />
                    </div>
                  </div>
              )}

              {/* Submit Button */}
              <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] rounded-xl transition-all"
              >
                {activeTab === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
  );
}