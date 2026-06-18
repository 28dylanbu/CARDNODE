import { useNavigate } from 'react-router';
import { BookOpen, Play, BarChart3, Sparkles, Trophy, Target } from 'lucide-react';

export default function EducationalHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#12131C] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header with decorative elements */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#6FCF97] rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <Sparkles className="w-16 h-16 text-[#6FCF97] relative z-10" />
            </div>
          </div>

          <div className="bg-[#1C1E2B] rounded-3xl p-8 border-4 border-white/10 shadow-2xl">
            <div className="flex items-center justify-center gap-4 mb-4">
              <BookOpen className="w-16 h-16 text-yellow-300" />
              <h1 className="text-5xl font-black text-white drop-shadow-lg">
                Learning English
              </h1>
            </div>
            <div className="bg-[#6FCF97] rounded-2xl px-8 py-3 inline-block">
              <h2 className="text-3xl font-bold text-[#12131C]">with Flash Cards</h2>
            </div>
            <p className="text-white/90 text-xl mt-4 font-medium">
              Learn 16 English verbs in a fun way! 🎉
            </p>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Comenzar Button */}
          <button
            onClick={() => navigate('/learn')}
            className="group relative bg-[#6FCF97] hover:bg-[#5EBF87] rounded-3xl p-8 border-4 border-white/10 hover:border-[#6FCF97] shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute -top-4 -right-4 bg-[#6FCF97] rounded-full p-3 border-4 border-white shadow-xl group-hover:rotate-12 transition-transform">
              <Play className="w-8 h-8 text-[#12131C]" />
            </div>

            <div className="text-center">
              <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Target className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2">START</h3>
              <p className="text-white/90 text-lg font-semibold">
                Start learning now!
              </p>
            </div>
          </button>

          {/* Mi Progreso Button */}
          <button
            onClick={() => navigate('/progress')}
            className="group relative bg-[#1C1E2B] hover:bg-[#2A2D3E] rounded-3xl p-8 border-4 border-white/10 hover:border-[#6FCF97] shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="absolute -top-4 -right-4 bg-[#6FCF97] rounded-full p-3 border-4 border-white shadow-xl group-hover:rotate-12 transition-transform">
              <Trophy className="w-8 h-8 text-[#12131C]" />
            </div>

            <div className="text-center">
              <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <BarChart3 className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-black text-white mb-2">MY PROGRESS</h3>
              <p className="text-white/90 text-lg font-semibold">
                See how much you've learned
              </p>
            </div>
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#1C1E2B] rounded-2xl p-6 border-2 border-white/10 text-center">
            <div className="text-4xl font-black text-[#6FCF97] mb-2">16</div>
            <div className="text-white font-semibold">Verbs to Learn</div>
          </div>
          <div className="bg-[#1C1E2B] rounded-2xl p-6 border-2 border-white/10 text-center">
            <div className="text-4xl font-black text-[#6FCF97] mb-2">3</div>
            <div className="text-white font-semibold">Verb Tenses</div>
          </div>
          <div className="bg-[#1C1E2B] rounded-2xl p-6 border-2 border-white/10 text-center">
            <div className="text-4xl font-black text-[#6FCF97] mb-2">∞</div>
            <div className="text-white font-semibold">Unlimited Practice</div>
          </div>
        </div>

        {/* Footer message */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-lg font-medium">
            💪 You can master English! 💪
          </p>
        </div>
      </div>

      {/* Animated background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#6FCF97]/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#6FCF97]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-20 w-24 h-24 bg-[#6FCF97]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}
