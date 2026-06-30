import { useNavigate } from 'react-router';
import { BookOpen, Play, TrendingUp, User, LogOut, Sparkles, Trophy, Target } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import { loadProgress, verbs } from '../data/verbsData';

export default function MainDashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const progress = loadProgress();

  const masteredCount = progress.filter((p) => p.mastered).length;
  const totalAttempts = progress.reduce((sum, p) => sum + p.attempts, 0);
  const masteredPercentage = Math.round((masteredCount / 16) * 100);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#12131C] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-[#1C1E2B] border-4 border-white/10 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-[#6FCF97]" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-black">Main Dashboard</h1>
              <p className="text-white/80 text-lg">Welcome, {user?.name}! 👋</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 px-6 py-3 bg-[#1C1E2B] hover:bg-[#2A2D3E] rounded-xl border-2 border-white/10 transition-all"
            >
              <User className="w-6 h-6 text-white" />
              <span className="text-white font-bold">My Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 bg-red-500/80 hover:bg-red-600 rounded-xl border-2 border-white/10 transition-all"
            >
              <LogOut className="w-6 h-6 text-white" />
              <span className="text-white font-bold">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1C1E2B] rounded-2xl p-6 border-4 border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <Trophy className="w-10 h-10 text-[#6FCF97]" />
              <div>
                <div className="text-white text-4xl font-black">{masteredCount}/{verbs.length}</div>
                <div className="text-white/80 font-bold">Mastered Verbs</div>
              </div>
            </div>
            <div className="w-full h-3 bg-[#12131C] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6FCF97] rounded-full transition-all"
                style={{ width: `${masteredPercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-[#1C1E2B] rounded-2xl p-6 border-4 border-white/10">
            <div className="flex items-center gap-4">
              <Target className="w-10 h-10 text-[#6FCF97]" />
              <div>
                <div className="text-white text-4xl font-black">{totalAttempts}</div>
                <div className="text-white/80 font-bold">Total Attempts</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1C1E2B] rounded-2xl p-6 border-4 border-white/10">
            <div className="flex items-center gap-4">
              <Sparkles className="w-10 h-10 text-[#6FCF97]" />
              <div>
                <div className="text-white text-4xl font-black">{masteredPercentage}%</div>
                <div className="text-white/80 font-bold">Total Progress</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-white/50">
          <h2 className="text-4xl font-black text-purple-900 mb-8 text-center">
            What do you want to do today?
          </h2>

          <div className="grid grid-cols-3 gap-8">
            {/* Flash Cards */}
            <button
              onClick={() => navigate('/learn')}
              className="group relative bg-[#6FCF97] hover:bg-[#5EBF87] rounded-3xl p-8 border-4 border-white/10 hover:border-[#6FCF97] shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="absolute -top-4 -right-4 bg-[#1C1E2B] rounded-full p-4 border-4 border-white shadow-xl group-hover:rotate-12 transition-transform">
                <Play className="w-8 h-8 text-[#6FCF97]" />
              </div>

              <div className="text-center">
                <div className="bg-[#12131C] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-black text-[#12131C] mb-3">FLASH CARDS</h3>
                <p className="text-[#12131C]/90 font-semibold">
                  Learn verbs with images
                </p>
              </div>
            </button>

            {/* Constructor */}
            <button
              onClick={() => navigate('/constructor')}
              className="group relative bg-[#1C1E2B] hover:bg-[#2A2D3E] rounded-3xl p-8 border-4 border-white/10 hover:border-[#6FCF97] shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="absolute -top-4 -right-4 bg-[#6FCF97] rounded-full p-4 border-4 border-white shadow-xl group-hover:rotate-12 transition-transform">
                <Sparkles className="w-8 h-8 text-[#12131C]" />
              </div>

              <div className="text-center">
                <div className="bg-[#12131C] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">SENTENCE BUILDER</h3>
                <p className="text-white/90 font-semibold">
                  Build sentences with drag & drop
                </p>
              </div>
            </button>

            {/* Progress */}
            <button
              onClick={() => navigate('/progress')}
              className="group relative bg-[#1C1E2B] hover:bg-[#2A2D3E] rounded-3xl p-8 border-4 border-white/10 hover:border-[#6FCF97] shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="absolute -top-4 -right-4 bg-[#6FCF97] rounded-full p-4 border-4 border-white shadow-xl group-hover:rotate-12 transition-transform">
                <Trophy className="w-8 h-8 text-[#12131C]" />
              </div>

              <div className="text-center">
                <div className="bg-[#12131C] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">MY PROGRESS</h3>
                <p className="text-white/90 font-semibold">
                  Review your statistics
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Tip */}
        <div className="mt-8 bg-[#1C1E2B] rounded-2xl p-6 border-2 border-white/10 text-center">
          <p className="text-white text-lg font-bold">
            💡 Tip: Practice every day to master all 16 verbs faster!
          </p>
        </div>
      </div>
    </div>
  );
}
