import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Home, Trophy, Volume2, RotateCcw, Check, ArrowRight, X, Award, TrendingUp, Star, Play } from 'lucide-react';
import { verbs } from '../data/verbsData';

const playAudio = (text: string) => {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
};

interface DraggableWordProps {
  word: string;
  index: number;
  fromZone?: 'present' | 'past' | 'future';
}

interface DropZoneProps {
  tense: 'present' | 'past' | 'future';
  label: string;
  tenseForm: string;
  color: { bg: string; border: string; hover: string; text: string; badge: string };
  words: string[];
  onDrop: (word: string, tense: 'present' | 'past' | 'future') => void;
  onRemove: (index: number, tense: 'present' | 'past' | 'future') => void;
  disabled: boolean;
}

const DraggableWord = ({ word, index, fromZone }: DraggableWordProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'word',
    item: { word, fromZone, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }), [word, fromZone, index]);

  return (
      <div
          ref={drag}
          className={`px-4 py-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white font-bold text-base rounded-xl border-2 border-blue-300 shadow cursor-move select-none transition-all ${
              isDragging ? 'opacity-30 scale-90' : 'opacity-100 hover:scale-105'
          }`}
      >
        {word}
      </div>
  );
};

const DropZone = ({ tense, label, tenseForm, color, words, onDrop, onRemove, disabled }: DropZoneProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'word',
    drop: (item: { word: string; fromZone?: string; index?: number }) => {
      if (disabled) return;
      if (item.fromZone && item.fromZone === tense) return;
      if (item.fromZone && item.index !== undefined) {
        onRemove(item.index, item.fromZone as 'present' | 'past' | 'future');
      }
      onDrop(item.word, tense);
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  }), [tense, onDrop, onRemove, disabled]);

  return (
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-black ${color.text}`}>{label}</span>
          <span className={`px-2 py-0.5 ${color.badge} ${color.text} rounded-full text-xs font-bold`}>{tenseForm}</span>
        </div>
        <div
            ref={drop}
            className={`min-h-14 ${color.bg} ${color.border} ${
                isOver && !disabled ? `${color.hover} scale-[1.01] shadow-md` : ''
            } border-2 border-dashed rounded-xl p-3 transition-all`}
        >
          <div className="flex flex-wrap gap-2 min-h-8">
            {words.length === 0 ? (
                <span className="text-gray-400 text-sm font-medium">Drag words here...</span>
            ) : (
                words.map((word, i) => (
                    <div key={`${tense}-${i}`} className="relative group">
                      <DraggableWord word={word} index={i} fromZone={tense} />
                      {!disabled && (
                          <button
                              onClick={() => onRemove(i, tense)}
                              className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                          >
                            ✕
                          </button>
                      )}
                    </div>
                ))
            )}
          </div>
          {words.length > 0 && (
              <div className={`mt-2 flex items-center gap-2 text-xs font-semibold ${color.text} opacity-80`}>
                <button
                    onClick={() => playAudio(words.join(' '))}
                    className="p-1 rounded-md hover:bg-black/10 transition-colors"
                    title="Escuchar"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <span>{words.join(' ')}</span>
              </div>
          )}
        </div>
      </div>
  );
};

function ConstructorContent() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [presentSentence, setPresentSentence] = useState<string[]>([]);
  const [pastSentence, setPastSentence] = useState<string[]>([]);
  const [futureSentence, setFutureSentence] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [stats, setStats] = useState({ correct: 0, attempts: 0 });

  const currentVerb = verbs[currentIndex];

  useEffect(() => {
    const words = [...new Set([
      ...currentVerb.examplePresent,
      ...currentVerb.examplePast,
      ...currentVerb.exampleFuture,
    ])];
    const shuffled = [...words];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledWords(shuffled);
    setPresentSentence([]);
    setPastSentence([]);
    setFutureSentence([]);
    setShowFeedback(false);
    setIsCorrect(false);
  }, [currentIndex]);

  const handleDrop = (word: string, tense: 'present' | 'past' | 'future') => {
    if (tense === 'present') setPresentSentence(p => [...p, word]);
    else if (tense === 'past') setPastSentence(p => [...p, word]);
    else setFutureSentence(p => [...p, word]);
  };

  const handleRemove = (index: number, tense: 'present' | 'past' | 'future') => {
    if (tense === 'present') setPresentSentence(p => p.filter((_, i) => i !== index));
    else if (tense === 'past') setPastSentence(p => p.filter((_, i) => i !== index));
    else setFutureSentence(p => p.filter((_, i) => i !== index));
  };

  const handleVerify = () => {
    const presentOk = JSON.stringify(presentSentence) === JSON.stringify(currentVerb.examplePresent);
    const pastOk = JSON.stringify(pastSentence) === JSON.stringify(currentVerb.examplePast);
    const futureOk = JSON.stringify(futureSentence) === JSON.stringify(currentVerb.exampleFuture);
    const correct = presentOk && pastOk && futureOk;
    setIsCorrect(correct);
    setShowFeedback(true);
    setStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      attempts: prev.attempts + 1,
    }));
  };

  const handleReset = () => {
    setPresentSentence([]);
    setPastSentence([]);
    setFutureSentence([]);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handleNext = () => {
    if (currentIndex < verbs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowComplete(true);
    }
  };

  const canVerify = presentSentence.length > 0 && pastSentence.length > 0 && futureSentence.length > 0;

  if (showComplete) {
    const successRate = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;
    return (
        <div className="min-h-screen bg-[#12131C] p-8 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-3xl shadow-2xl p-12 border-4 border-white/50 text-center">
              <div className="w-24 h-24 bg-[#6FCF97] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-[#6FCF97]/30 shadow-xl">
                <Trophy className="w-14 h-14 text-[#12131C]" />
              </div>
              <h1 className="text-4xl font-black text-purple-900 mb-2">Sentence Builder Complete!</h1>
              <p className="text-gray-500 text-lg mb-10">Here's how you performed across all {verbs.length} verbs</p>

              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="bg-green-50 rounded-2xl p-6 border-4 border-green-200">
                  <Award className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <div className="text-4xl font-black text-green-700">{stats.correct}</div>
                  <div className="text-sm font-bold text-green-600">Correct Verbs</div>
                </div>
                <div className="bg-blue-50 rounded-2xl p-6 border-4 border-blue-200">
                  <TrendingUp className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <div className="text-4xl font-black text-blue-700">{stats.attempts}</div>
                  <div className="text-sm font-bold text-blue-600">Total Attempts</div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-6 border-4 border-purple-200">
                  <Star className="w-10 h-10 text-purple-600 mx-auto mb-2" />
                  <div className="text-4xl font-black text-purple-700">{successRate}%</div>
                  <div className="text-sm font-bold text-purple-600">Success Rate</div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 font-bold">Overall Mastery</span>
                  <span className="text-purple-700 font-black">{stats.correct}/{verbs.length} verbs</span>
                </div>
                <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200">
                  <div
                      className="h-full bg-[#6FCF97] rounded-full transition-all duration-1000"
                      style={{ width: `${(stats.correct / verbs.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="text-lg font-bold text-gray-600 mb-8">
                {successRate < 50 && 'Keep practicing! Every attempt builds your skills. 💪'}
                {successRate >= 50 && successRate < 80 && "Good job! You're getting the hang of it. 🌟"}
                {successRate >= 80 && "Excellent work! You're mastering English sentences. 🎉"}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => { setShowComplete(false); setCurrentIndex(0); setStats({ correct: 0, attempts: 0 }); }}
                    className="py-4 px-6 bg-[#1C1E2B] hover:bg-[#2A2D3E] text-white font-black text-lg rounded-2xl border-4 border-white/10 flex items-center justify-center gap-3 transition-all"
                >
                  <Play className="w-6 h-6" />
                  Try Again
                </button>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="py-4 px-6 bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] font-black text-lg rounded-2xl border-4 border-[#6FCF97]/30 flex items-center justify-center gap-3 transition-all"
                >
                  <Home className="w-6 h-6" />
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  const zoneColors = {
    present: { bg: 'bg-green-50', border: 'border-green-400', hover: 'bg-green-100', text: 'text-green-700', badge: 'bg-green-100' },
    past:    { bg: 'bg-yellow-50', border: 'border-yellow-400', hover: 'bg-yellow-100', text: 'text-yellow-700', badge: 'bg-yellow-100' },
    future:  { bg: 'bg-purple-50', border: 'border-purple-400', hover: 'bg-purple-100', text: 'text-purple-700', badge: 'bg-purple-100' },
  };

  return (
      <div className="min-h-screen bg-[#12131C] p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
                onClick={() => navigate('/dashboard')}
                className="bg-[#1C1E2B] hover:bg-[#2A2D3E] p-4 rounded-2xl border-2 border-white/10 transition-all"
            >
              <Home className="w-7 h-7 text-white" />
            </button>

            <div className="bg-[#1C1E2B] rounded-2xl px-8 py-4 border-2 border-white/10 text-center">
              <div className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Sentence Builder</div>
              <div className="text-white font-black text-xl">
                Verb {currentIndex + 1} of {verbs.length}
              </div>
            </div>

            <button
                onClick={() => navigate('/progress')}
                className="bg-[#1C1E2B] hover:bg-[#2A2D3E] p-4 rounded-2xl border-2 border-white/10 transition-all"
            >
              <Trophy className="w-7 h-7 text-[#6FCF97]" />
            </button>
          </div>

          {/* Main Card Reestructurada: Dos Columnas */}
          <div className="bg-white rounded-3xl shadow-2xl border-4 border-white/50 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-stretch">

              {/* Columna Izquierda: Imagen del Verbo Limpia */}
              <div className="w-full lg:w-2/5 p-6 lg:p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-gray-100 bg-gray-50 flex flex-col justify-center items-center">
                <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                      src={currentVerb.imageUrl}
                      alt={currentVerb.infinitive}
                      className="w-full h-full object-cover"
                  />
                  {/* Degradado y texto eliminados de aquí */}
                </div>
                <p className="text-center text-gray-400 font-bold mt-6 uppercase tracking-widest text-sm">
                  Target Verb
                </p>
              </div>

              {/* Columna Derecha: Banco de palabras y zonas de arrastre */}
              <div className="w-full lg:w-3/5 p-6 lg:p-8">
                {/* Word Bank */}
                <div className="mb-8">
                  <div className="text-sm font-black text-purple-900 uppercase tracking-widest mb-3">Word Bank</div>
                  <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200 min-h-16 shadow-inner">
                    {shuffledWords.map((word, i) => (
                        <DraggableWord key={`bank-${i}`} word={word} index={i} />
                    ))}
                  </div>
                </div>

                {/* Drop Zones */}
                <div className="space-y-4">
                  <DropZone tense="present" label="🟢 PRESENT" tenseForm={currentVerb.present} color={zoneColors.present} words={presentSentence} onDrop={handleDrop} onRemove={handleRemove} disabled={showFeedback} />
                  <DropZone tense="past"    label="🟡 PAST"    tenseForm={currentVerb.past}    color={zoneColors.past}    words={pastSentence}    onDrop={handleDrop} onRemove={handleRemove} disabled={showFeedback} />
                  <DropZone tense="future"  label="🟣 FUTURE"  tenseForm={currentVerb.future}  color={zoneColors.future}  words={futureSentence}  onDrop={handleDrop} onRemove={handleRemove} disabled={showFeedback} />
                </div>

                {/* Feedback */}
                {showFeedback && (
                    <div className={`mt-6 p-5 rounded-2xl border-4 ${isCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'} animate-fade-in`}>
                      <div className="flex items-center gap-4">
                        {isCorrect ? (
                            <Check className="w-10 h-10 text-green-600 flex-shrink-0" />
                        ) : (
                            <X className="w-10 h-10 text-red-600 flex-shrink-0" />
                        )}
                        <div>
                          <div className={`text-xl font-black ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {isCorrect ? 'All sentences correct! 🎉' : 'Not quite — check the order and try again 💪'}
                          </div>
                        </div>
                      </div>
                    </div>
                )}
              </div>

            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <button
                onClick={handleReset}
                disabled={showFeedback}
                className="bg-[#1C1E2B] hover:bg-[#2A2D3E] text-white font-black text-lg py-5 rounded-2xl border-4 border-white/10 hover:border-red-500/50 shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-6 h-6" />
              RESET
            </button>

            <button
                onClick={handleVerify}
                disabled={!canVerify || showFeedback}
                className="bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] font-black text-lg py-5 rounded-2xl border-4 border-[#6FCF97]/30 shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-6 h-6" />
              VERIFY
            </button>

            <button
                onClick={handleNext}
                disabled={!showFeedback}
                className="bg-[#1C1E2B] hover:bg-[#2A2D3E] text-white font-black text-lg py-5 rounded-2xl border-4 border-white/10 hover:border-[#6FCF97] shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              NEXT
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 bg-[#1C1E2B] rounded-2xl p-6 border-2 border-white/10">
            <div className="flex justify-between mb-3">
              <span className="text-white font-bold text-lg">Progress</span>
              <span className="text-white font-bold text-lg">{Math.round(((currentIndex + 1) / verbs.length) * 100)}%</span>
            </div>
            <div className="w-full h-5 bg-[#12131C] rounded-full overflow-hidden border-2 border-white/10">
              <div
                  className="h-full bg-[#6FCF97] transition-all duration-500 rounded-full"
                  style={{ width: `${((currentIndex + 1) / verbs.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
  );
}

export default function Constructor() {
  return (
      <DndProvider backend={HTML5Backend}>
        <ConstructorContent />
      </DndProvider>
  );
}