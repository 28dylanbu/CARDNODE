import { Link, useNavigate } from 'react-router';
import { BookOpen, BarChart3, Play, Settings, TrendingUp, LogOut, User } from 'lucide-react';
import { decks } from '../data/mockData';
import { logout } from '../utils/auth';

export default function Dashboard() {
  const navigate = useNavigate();
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const streakData = [true, true, true, false, true, true, false];
  const todayProgress = 68;
  const todayGoal = 100;
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ width: '1440px', height: '900px', margin: '0 auto' }}>
      {/* Left Sidebar */}
      <aside className="w-20 bg-[#12131C] border-r border-white/10 flex flex-col items-center py-8 gap-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6FCF97] to-[#56CCF2] flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-[#12131C]" />
        </div>

        <nav className="flex flex-col gap-6">
          <button className="w-12 h-12 rounded-xl bg-[#1C1E2B] flex items-center justify-center hover:bg-[#2A2D3E] transition-colors">
            <BookOpen className="w-6 h-6 text-white" />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#2A2D3E] transition-colors text-gray-400">
            <BarChart3 className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#2A2D3E] transition-colors text-gray-400">
            <Play className="w-6 h-6" />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#2A2D3E] transition-colors text-gray-400">
            <Settings className="w-6 h-6" />
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Central Column - Decks Grid */}
        <div className="flex-1 p-12 overflow-y-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="mb-2">My Learning Decks</h1>
              <p className="text-gray-400">Select a deck to continue your English mastery journey</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 bg-[#1C1E2B] rounded-xl border border-white/5">
                <User className="w-5 h-5 text-[#6FCF97]" />
                <span className="text-sm">{userName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-[#1C1E2B] hover:bg-[#22243A] rounded-xl border border-white/10 transition-all"
              >
                <LogOut className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">Logout</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {decks.map((deck) => {
              const progress = (deck.studied / deck.total) * 100;
              return (
                <Link
                  key={deck.id}
                  to={`/study/${deck.id}`}
                  className="group bg-[#1C1E2B] rounded-2xl p-6 hover:bg-[#22243A] transition-all border border-white/5 hover:border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-1 group-hover:text-white/90">{deck.title}</h3>
                      <p className="text-sm text-gray-500">{deck.category}</p>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: deck.color }}
                    />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-gray-300">
                        {deck.studied}/{deck.total}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#12131C] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: deck.color,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {deck.total - deck.studied} remaining
                    </span>
                    <Play className="w-5 h-5 text-gray-400 group-hover:text-white/70" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column - Analytics Panel */}
        <aside className="w-80 bg-[#1C1E2B] border-l border-white/10 p-8 overflow-y-auto">
          <div className="mb-8">
            <h3 className="mb-6">Weekly Streak</h3>
            <div className="flex gap-2 justify-between">
              {weekDays.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                      streakData[index]
                        ? 'bg-[#6FCF97] text-[#12131C]'
                        : 'bg-[#12131C] text-gray-600'
                    }`}
                  >
                    {streakData[index] ? '✓' : '○'}
                  </div>
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="mb-6">Today's Goal</h3>
            <div className="relative w-40 h-40 mx-auto">
              <svg className="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#12131C"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#6FCF97"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - todayProgress / todayGoal)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl mb-1">{todayProgress}</div>
                <div className="text-sm text-gray-500">of {todayGoal}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-6">Vocabulary Retention</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Mastered</span>
                  <span className="text-[#6FCF97]">78%</span>
                </div>
                <div className="w-full h-2 bg-[#12131C] rounded-full overflow-hidden">
                  <div className="h-full bg-[#6FCF97] rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">In Progress</span>
                  <span className="text-[#F2C94C]">15%</span>
                </div>
                <div className="w-full h-2 bg-[#12131C] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F2C94C] rounded-full" style={{ width: '15%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Difficult</span>
                  <span className="text-[#FF9F9F]">7%</span>
                </div>
                <div className="w-full h-2 bg-[#12131C] rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF9F9F] rounded-full" style={{ width: '7%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-[#12131C] rounded-xl border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-[#6FCF97]" />
              <span className="text-sm">On track!</span>
            </div>
            <p className="text-xs text-gray-500">
              You're 23% ahead of your weekly goal. Keep up the great work!
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
