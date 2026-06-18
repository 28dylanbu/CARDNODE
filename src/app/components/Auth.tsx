import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Mail, Lock, User, Eye, EyeOff, BookOpen } from 'lucide-react';
import { createUser, setCurrentUser, checkIsAdmin } from '../utils/auth';

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    // Check if there's a tab specified in the navigation state
    if (location.state?.tab) {
      setActiveTab(location.state.tab as 'login' | 'register');
    }

    // If already authenticated, redirect based on role
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
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'register') {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (formData.password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
    }

    // Create user with role detection
    const user = createUser(
        formData.name || formData.email.split('@')[0],
        formData.email,
        formData.password
    );

    // --- AQUÍ ENTRA TU NUEVO CÓDIGO ---
    // Solo guardamos en el JSON si el usuario se está registrando
    if (activeTab === 'register') {
      try {
        await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user) // Guardamos el objeto user que se acaba de crear
        });
        console.log('Usuario guardado exitosamente en usuarios.json');
      } catch (error) {
        console.error('Error al guardar el usuario en json-server:', error);
        alert('Hubo un problema al conectar con la base de datos local.');
        return; // Detenemos la ejecución si falla la base de datos
      }
    }
    // -----------------------------------

    // Save authentication (MANTENEMOS ESTO)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', user.name);
    setCurrentUser(user);

    // Redirect based on role
    if (user.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
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

            {/* Forgot Password - Only for Login */}
            {activeTab === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-[#6FCF97] hover:text-[#5EBF87] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] rounded-xl transition-all"
            >
              {activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#12131C] text-gray-500">or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="py-3 px-4 bg-[#1C1E2B] hover:bg-[#22243A] border border-white/10 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-sm">Google</span>
              </button>
              <button
                type="button"
                className="py-3 px-4 bg-[#1C1E2B] hover:bg-[#22243A] border border-white/10 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-sm">GitHub</span>
              </button>
            </div>

            {/* Terms */}
            {activeTab === 'register' && (
              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-[#6FCF97] hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#6FCF97] hover:underline">
                  Privacy Policy
                </a>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
