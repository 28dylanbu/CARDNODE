import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Home, Trophy, Star, TrendingUp, Target, Award, Play, Sparkles } from 'lucide-react';
import { verbs, loadProgress, VerbProgress } from '../data/verbsData';

export default function ProgressScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<VerbProgress[]>(loadProgress());

  const masteredVerbs = progress.filter((p) => p.mastered);
  const weakVerbs = progress.filter((p) => p.attempts > 0 && !p.mastered && p.correctAttempts / p.attempts < 0.5);
  const totalAttempts = progress.reduce((sum, p) => sum + p.attempts, 0);
  const totalCorrect = progress.reduce((sum, p) => sum + p.correctAttempts, 0);
  const masteredPercentage = Math.round((masteredVerbs.length / verbs.length) * 100);
  const successRate = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  const getVerbById = (id: number) => verbs.find((v) => v.id === id);

  return (
    <div className="min-h-screen bg-[#12131C] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-[#1C1E2B] hover:bg-[#2A2D3E] p-4 rounded-2xl border-2 border-white/10 transition-all"
          >
            <Home className="w-7 h-7 text-white" />
          </button>

          <div className="bg-[#1C1E2B] rounded-2xl px-8 py-4 border-2 border-white/10">
            <div className="text-white font-black text-3xl flex items-center gap-3">
              <Trophy className="w-10 h-10 text-[#6FCF97]" />
              MY PROGRESS
            </div>
          </div>

          <button
            onClick={() => navigate('/learn')}
            className="bg-[#1C1E2B] hover:bg-[#2A2D3E] p-4 rounded-2xl border-2 border-white/10 transition-all"
          >
            <Play className="w-8 h-8 text-[#6FCF97]" />
          </button>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1C1E2B] rounded-3xl p-8 border-4 border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-12 h-12 text-[#6FCF97]" />
              <Sparkles className="w-8 h-8 text-[#6FCF97]" />
            </div>
            <div className="text-white text-5xl font-black mb-2">{masteredVerbs.length}</div>
            <div className="text-white/90 text-xl font-bold">Mastered Verbs</div>
          </div>

          <div className="bg-[#1C1E2B] rounded-3xl p-8 border-4 border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <Target className="w-12 h-12 text-[#6FCF97]" />
              <Star className="w-8 h-8 text-[#6FCF97]" />
            </div>
            <div className="text-white text-5xl font-black mb-2">{totalAttempts}</div>
            <div className="text-white/90 text-xl font-bold">Total Attempts</div>
          </div>

          <div className="bg-[#1C1E2B] rounded-3xl p-8 border-4 border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-12 h-12 text-[#6FCF97]" />
              <Trophy className="w-8 h-8 text-[#6FCF97]" />
            </div>
            <div className="text-white text-5xl font-black mb-2">{successRate}%</div>
            <div className="text-white/90 text-xl font-bold">Success Rate</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-4 border-white/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-black text-purple-900">
              Total Mastery Percentage
            </h2>
            <div className="text-5xl font-black text-purple-600">{masteredPercentage}%</div>
          </div>

          <div className="relative w-full h-16 bg-[#12131C] rounded-full overflow-hidden border-4 border-white/10">
            <div
              className="absolute inset-0 bg-[#6FCF97] transition-all duration-1000 flex items-center justify-end pr-6"
              style={{ width: `${masteredPercentage}%` }}
            >
              {masteredPercentage > 10 && (
                <span className="text-white font-black text-2xl drop-shadow-lg">
                  {masteredVerbs.length} / {verbs.length}
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 text-center text-lg font-bold text-gray-600">
            {masteredPercentage < 50 && 'Keep it up! 💪 You\'re on the right track'}
            {masteredPercentage >= 50 && masteredPercentage < 80 && 'Excellent progress! 🌟 You\'re halfway there'}
            {masteredPercentage >= 80 && masteredPercentage < 100 && 'Almost there! 🎯 Just a little more'}
            {masteredPercentage === 100 && 'YOU DID IT! 🎉🏆 You\'re a champion'}
          </div>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-2 gap-8">
          {/* Mastered Verbs */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-green-300">
            <div className="flex items-center gap-3 mb-6">
              <Trophy className="w-10 h-10 text-green-600" />
              <h3 className="text-2xl font-black text-green-700">
                MASTERED VERBS 🎉
              </h3>
            </div>

            {masteredVerbs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg font-semibold mb-2">You haven't mastered any verbs yet</p>
                <p className="text-sm">Keep practicing!</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {masteredVerbs.map((p) => {
                  const verb = getVerbById(p.verbId);
                  if (!verb) return null;
                  return (
                    <div
                      key={p.verbId}
                      className="bg-green-50 border-3 border-green-300 rounded-xl p-4 flex items-center justify-between hover:bg-green-100 transition-colors"
                    >
                      <div>
                        <div className="font-black text-xl text-green-800">{verb.infinitive}</div>
                        <div className="text-sm text-green-600">{verb.spanish}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-700 font-bold">
                          {p.correctAttempts}/{p.attempts}
                        </div>
                        <div className="text-xs text-green-600">attempts</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Weak Verbs */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-orange-300">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-10 h-10 text-orange-600" />
              <h3 className="text-2xl font-black text-orange-700">
                VERBS TO REINFORCE 💪
              </h3>
            </div>

            {weakVerbs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-lg font-semibold mb-2">Excellent!</p>
                <p className="text-sm">You have no weak verbs</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {weakVerbs.map((p) => {
                  const verb = getVerbById(p.verbId);
                  if (!verb) return null;
                  const successRate = Math.round((p.correctAttempts / p.attempts) * 100);
                  return (
                    <div
                      key={p.verbId}
                      className="bg-orange-50 border-3 border-orange-300 rounded-xl p-4 flex items-center justify-between hover:bg-orange-100 transition-colors"
                    >
                      <div>
                        <div className="font-black text-xl text-orange-800">{verb.infinitive}</div>
                        <div className="text-sm text-orange-600">{verb.spanish}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-orange-700 font-bold">
                          {successRate}%
                        </div>
                        <div className="text-xs text-orange-600">
                          {p.correctAttempts}/{p.attempts} correct
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/learn')}
            className="bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] font-black text-2xl py-6 px-12 rounded-2xl border-4 border-[#6FCF97]/30 shadow-2xl transform hover:scale-105 transition-all inline-flex items-center gap-4"
          >
            <Play className="w-10 h-10" />
            CONTINUE LEARNING
            <Sparkles className="w-10 h-10" />
          </button>
        </div>
      </div>
    </div>
  );
}
