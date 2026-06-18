import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Volume2, ArrowLeft, ArrowRight, ArrowUp, Check } from 'lucide-react';
import { decks, flashcards, Flashcard } from '../data/mockData';

export default function StudySession() {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState<Record<string, 'difficult' | 'hard' | 'mastered'>>({});

  const deck = decks.find((d) => d.id === deckId);
  const cards = flashcards[deckId || '1'] || flashcards['1'];
  const currentCard = cards[currentIndex];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(!isFlipped);
      } else if (isFlipped) {
        if (e.code === 'ArrowLeft') {
          handleResponse('difficult');
        } else if (e.code === 'ArrowUp') {
          handleResponse('hard');
        } else if (e.code === 'ArrowRight') {
          handleResponse('mastered');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFlipped, currentIndex]);

  const handleResponse = (response: 'difficult' | 'hard' | 'mastered') => {
    setResults({ ...results, [currentCard.id]: response });

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    } else {
      navigate(`/complete/${deckId}`, { state: { results } });
    }
  };

  const handlePlayAudio = () => {
    const utterance = new SpeechSynthesisUtterance(currentCard.term);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ width: '1440px', height: '900px', margin: '0 auto' }}>
      {/* Left Mini-Index */}
      <aside className="w-[30%] bg-[#1C1E2B] border-r border-white/10 p-6 overflow-y-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h2 className="mb-1">{deck?.title}</h2>
          <p className="text-sm text-gray-500">
            {currentIndex + 1} of {cards.length} cards
          </p>
        </div>

        <div className="space-y-2">
          {cards.map((card, index) => {
            const status = results[card.id];
            return (
              <div
                key={card.id}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  index === currentIndex
                    ? 'bg-[#12131C] border-white/20'
                    : 'bg-transparent border-white/5 hover:border-white/10'
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsFlipped(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm mb-1">{card.term}</div>
                    <div className="text-xs text-gray-500">{card.phonetic}</div>
                  </div>
                  {status && (
                    <div
                      className={`w-2 h-2 rounded-full ${
                        status === 'mastered'
                          ? 'bg-[#6FCF97]'
                          : status === 'hard'
                          ? 'bg-[#F2C94C]'
                          : 'bg-[#FF9F9F]'
                      }`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Flashcard Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-12 bg-[#12131C]">
        <div className="w-full max-w-3xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full h-1 bg-[#1C1E2B] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6FCF97] transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div
            className="relative w-full bg-[#1C1E2B] rounded-2xl p-12 shadow-2xl border border-white/10 cursor-pointer min-h-[400px] flex flex-col items-center justify-center"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            }}
          >
            {!isFlipped ? (
              <div className="text-center">
                <h1 className="mb-6">{currentCard.term}</h1>
                <div className="flex items-center justify-center gap-4 mb-8">
                  <p className="text-gray-400">{currentCard.phonetic}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayAudio();
                    }}
                    className="w-10 h-10 rounded-full bg-[#12131C] flex items-center justify-center hover:bg-[#22243A] transition-colors"
                  >
                    <Volume2 className="w-5 h-5 text-[#6FCF97]" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">Press [Space] to Flip Card</p>
              </div>
            ) : (
              <div className="text-center w-full">
                <div className="mb-8">
                  <h3 className="mb-4">Definition</h3>
                  <p className="text-gray-300">{currentCard.definition}</p>
                </div>
                <div className="p-4 bg-[#12131C] rounded-xl border border-white/5">
                  <p className="text-sm text-gray-400 mb-2">Example</p>
                  <p className="text-sm italic">"{currentCard.example}"</p>
                </div>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          {isFlipped && (
            <div className="flex gap-4 mt-8 justify-center">
              <button
                onClick={() => handleResponse('difficult')}
                className="flex-1 max-w-xs py-4 px-6 bg-[#FF9F9F]/20 hover:bg-[#FF9F9F]/30 border border-[#FF9F9F]/40 rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Difficult</span>
                <span className="text-xs text-gray-500">[←]</span>
              </button>
              <button
                onClick={() => handleResponse('hard')}
                className="flex-1 max-w-xs py-4 px-6 bg-[#F2C94C]/20 hover:bg-[#F2C94C]/30 border border-[#F2C94C]/40 rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <ArrowUp className="w-5 h-5" />
                <span>Hard</span>
                <span className="text-xs text-gray-500">[↑]</span>
              </button>
              <button
                onClick={() => handleResponse('mastered')}
                className="flex-1 max-w-xs py-4 px-6 bg-[#6FCF97]/20 hover:bg-[#6FCF97]/30 border border-[#6FCF97]/40 rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <Check className="w-5 h-5" />
                <span>Mastered</span>
                <span className="text-xs text-gray-500">[→]</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
