import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Volume2, Check, ArrowRight, Home, Trophy, X, Award, TrendingUp, Star, Play } from 'lucide-react';
import { verbs, loadProgress, saveProgress, VerbProgress } from '../data/verbsData';
import { getCurrentUser } from '../utils/auth';

export default function FlashCards() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [progress, setProgress] = useState<VerbProgress[]>(loadProgress());
  const [showComplete, setShowComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, attempts: 0 });

  const currentVerb = verbs[currentIndex];

  const handleListen = () => {
    const utterance = new SpeechSynthesisUtterance(currentVerb.infinitive);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  };

  const handleVerify = () => {
    const correct = userAnswer.toLowerCase().trim() === currentVerb.infinitive.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);

    setSessionStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      attempts: prev.attempts + 1,
    }));

    const updatedProgress = progress.map((p) => {
      if (p.verbId === currentVerb.id) {
        return {
          ...p,
          attempts: p.attempts + 1,
          correctAttempts: correct ? p.correctAttempts + 1 : p.correctAttempts,
          lastAttempt: new Date(),
          mastered: correct && p.correctAttempts + 1 >= 3,
        };
      }
      return p;
    });
    setProgress(updatedProgress);
    saveProgress(updatedProgress);
  };

  const handleNext = () => {
    if (currentIndex < verbs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      setShowComplete(true);

      // --- GUARDAR ESTADÍSTICAS EN BASE DE DATOS ---
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.id) {
        fetch(`${import.meta.env.VITE_API_URL}/usuarios/${currentUser.id}`)
            .then(res => res.json())
            .then(userData => {
              const existingStats = userData.stats || { flashcardsAttempts: 0, flashcardsFailed: [], constructorAttempts: 0, constructorFailed: [] };

              const verbosFallados: string[] = [];
              for (let i = 0; i < progress.length; i++) {
                if (progress[i].attempts > progress[i].correctAttempts) {
                  for (let j = 0; j < verbs.length; j++) {
                    if (verbs[j].id === progress[i].verbId) {
                      verbosFallados.push(verbs[j].infinitive);
                      break;
                    }
                  }
                }
              }

              const newStats = {
                flashcardsAttempts: existingStats.flashcardsAttempts + sessionStats.attempts,
                flashcardsFailed: verbosFallados,
                constructorAttempts: existingStats.constructorAttempts,
                constructorFailed: existingStats.constructorFailed
              };

              fetch(`${import.meta.env.VITE_API_URL}/usuarios/${currentUser.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stats: newStats })
              });
            })
            .catch(err => console.error("Error guardando progreso:", err));
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !showFeedback && userAnswer.trim()) {
      handleVerify();
    }
  };

  if (showComplete) {
    const successRate = sessionStats.attempts > 0 ? Math.round((sessionStats.correct / sessionStats.attempts) * 100) : 0;
    const masteredThisSession = progress.filter(p => p.mastered).length;

    return (
        <div className="min-h-screen bg-[#12131C] p-8 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-white/50 text-center">
              <div className="w-24 h-24 bg-[#6FCF97] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#6FCF97]/30 shadow-xl">
                <Trophy className="w-14 h-14 text-[#12131C]" />
              </div>
              <h1 className="text-4xl font-black text-purple-900 mb-2">Flash Cards Complete!</h1>
              <p className="text-gray-500 text-lg mb-10">Here's how you performed across all {verbs.length} cards</p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="bg-green-50 rounded-2xl p-6 border-4 border-green-200">
                  <Award className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <div className="text-4xl font-black text-green-700">{sessionStats.correct}</div>
                  <div className="text-sm font-bold text-green-600">Correct Answers</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border-4 border-blue-200">
                  <TrendingUp className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <div className="text-4xl font-black text-blue-700">{sessionStats.attempts}</div>
                  <div className="text-sm font-bold text-blue-600">Total Attempts</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-6 border-4 border-purple-200">
                  <Star className="w-10 h-10 text-purple-600 mx-auto mb-2" />
                  <div className="text-4xl font-black text-purple-700">{successRate}%</div>
                  <div className="text-sm font-bold text-purple-600">Success Rate</div>
                </div>
              </div>

              <div className="mb-8 bg-[#6FCF97]/10 rounded-2xl p-5 border-2 border-[#6FCF97]/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-bold">Verbs Mastered</span>
                  <span className="text-[#6FCF97] font-black">{masteredThisSession}/{verbs.length}</span>
                </div>
                <div className="w-full h-4 bg-white rounded-full overflow-hidden border-2 border-[#6FCF97]/20">
                  <div className="h-full bg-[#6FCF97] rounded-full transition-all duration-1000" style={{ width: `${(masteredThisSession / verbs.length) * 100}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => { setShowComplete(false); setCurrentIndex(0); setUserAnswer(''); setShowFeedback(false); setIsCorrect(false); setSessionStats({ correct: 0, attempts: 0 }); }} className="py-4 px-6 bg-[#1C1E2B] hover:bg-[#2A2D3E] text-white font-black text-lg rounded-2xl border-4 border-white/10 flex items-center justify-center gap-3 transition-all">
                  <Play className="w-6 h-6" /> Try Again
                </button>
                <button onClick={() => navigate('/dashboard')} className="py-4 px-6 bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] font-black text-lg rounded-2xl border-4 border-[#6FCF97]/30 flex items-center justify-center gap-3 transition-all">
                  <Home className="w-6 h-6" /> Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-[#12131C] p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigate('/dashboard')} className="bg-[#1C1E2B] hover:bg-[#2A2D3E] p-4 rounded-2xl border-2 border-white/10 transition-all">
              <Home className="w-8 h-8 text-white" />
            </button>
            <div className="bg-[#1C1E2B] rounded-2xl px-8 py-4 border-2 border-white/10">
              <div className="text-white font-black text-xl md:text-2xl">Card {currentIndex + 1} of {verbs.length}</div>
            </div>
            <button onClick={() => navigate('/progress')} className="bg-[#1C1E2B] hover:bg-[#2A2D3E] p-4 rounded-2xl border-2 border-white/10 transition-all">
              <Trophy className="w-8 h-8 text-[#6FCF97]" />
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-white/50">
            <div className="flex flex-col lg:flex-row gap-10 items-stretch">
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border-4 border-purple-200 shadow-xl">
                  <img src={currentVerb.imageUrl} alt={currentVerb.infinitive} className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="mb-6">
                  <label className="block text-2xl font-black text-purple-900 mb-4">Write the verb in English:</label>
                  <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={showFeedback}
                      placeholder="Type here..."
                      className="w-full text-2xl md:text-3xl font-bold px-6 md:px-8 py-4 md:py-6 border-4 border-purple-300 rounded-2xl focus:outline-none focus:border-purple-500 transition-all disabled:bg-gray-100 text-black"
                  />
                </div>

                {showFeedback && (
                    <div className={`mb-6 p-5 rounded-2xl border-4 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
                      <div className="flex items-center gap-4">
                        {isCorrect ? (
                            <>
                              <Check className="w-10 h-10 text-green-600 flex-shrink-0" />
                              <div>
                                <div className="text-xl font-black text-green-700">Correct! 🎉</div>
                                <div className="text-base text-green-600">The answer is: <span className="font-bold">{currentVerb.infinitive}</span></div>
                              </div>
                            </>
                        ) : (
                            <>
                              <X className="w-10 h-10 text-red-600 flex-shrink-0" />
                              <div><div className="text-xl font-black text-red-700">Try again 💪</div></div>
                            </>
                        )}
                      </div>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
                  <button onClick={handleListen} disabled={!(showFeedback && isCorrect)} className="bg-[#1C1E2B] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-40"><Volume2 className="w-6 h-6" /> LISTEN</button>
                  <button onClick={handleVerify} disabled={!userAnswer.trim() || showFeedback} className="bg-[#6FCF97] text-[#12131C] font-black py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50"><Check className="w-6 h-6" /> VERIFY</button>
                  <button onClick={handleNext} disabled={!showFeedback} className="bg-[#1C1E2B] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 disabled:opacity-50">NEXT <ArrowRight className="w-6 h-6" /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-[#1C1E2B] rounded-2xl p-6 border-2 border-white/10">
            <div className="flex justify-between mb-3">
              <span className="text-white font-bold text-lg">Your Progress</span>
              <span className="text-white font-bold text-lg">{Math.round(((currentIndex + 1) / verbs.length) * 100)}%</span>
            </div>
            <div className="w-full h-6 bg-[#12131C] rounded-full overflow-hidden border-2 border-white/10">
              <div className="h-full bg-[#6FCF97] transition-all duration-500 rounded-full" style={{ width: `${((currentIndex + 1) / verbs.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
  );
}