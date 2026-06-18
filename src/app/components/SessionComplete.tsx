import { useParams, useLocation, useNavigate, Link } from 'react-router';
import { Trophy, Check, X, ArrowRight, Home } from 'lucide-react';
import { decks, flashcards } from '../data/mockData';
import { useEffect } from 'react';

export default function SessionComplete() {
  const { deckId } = useParams<{ deckId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || {};

  const deck = decks.find((d) => d.id === deckId);
  const cards = flashcards[deckId || '1'] || flashcards['1'];

  const masteredCount = Object.values(results).filter((r) => r === 'mastered').length;
  const hardCount = Object.values(results).filter((r) => r === 'hard').length;
  const difficultCount = Object.values(results).filter((r) => r === 'difficult').length;
  const successRate = Math.round((masteredCount / cards.length) * 100);
  const totalTime = '12:34';

  const nextDeck = decks.find((d) => d.id !== deckId && d.studied < d.total);

  useEffect(() => {
    if (masteredCount > 0) {
      import('canvas-confetti').then((confetti) => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      });
    }
  }, []);

  return (
    <div
      className="flex h-screen overflow-hidden bg-[#12131C]"
      style={{ width: '1440px', height: '900px', margin: '0 auto' }}
    >
      {/* Left Side - Trophy & Metrics */}
      <div className="w-1/2 flex flex-col items-center justify-center p-12 border-r border-white/10">
        <div className="text-center max-w-md">
          {/* Trophy Badge */}
          <div className="mb-8 relative">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-[#F2C94C] to-[#F2994A] flex items-center justify-center relative">
              <div className="absolute inset-4 rounded-full bg-[#12131C] flex items-center justify-center">
                <Trophy className="w-24 h-24 text-[#F2C94C]" />
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#6FCF97] rounded-full flex items-center justify-center text-2xl">
              {successRate}%
            </div>
          </div>

          <h1 className="mb-4">Session Complete!</h1>
          <p className="text-gray-400 mb-12">
            You've completed the <span className="text-white">{deck?.title}</span> deck
          </p>

          {/* Key Metrics */}
          <div className="space-y-6 mb-12">
            <div className="bg-[#1C1E2B] rounded-xl p-6 border border-white/5">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2 text-[#6FCF97]">{masteredCount}</div>
                  <div className="text-xs text-gray-500">Mastered</div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="text-3xl mb-2 text-[#F2C94C]">{hardCount}</div>
                  <div className="text-xs text-gray-500">Hard</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2 text-[#FF9F9F]">{difficultCount}</div>
                  <div className="text-xs text-gray-500">Difficult</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-[#1C1E2B] rounded-xl p-4 border border-white/5">
                <div className="text-2xl mb-1">{cards.length}</div>
                <div className="text-xs text-gray-500">Words Studied</div>
              </div>
              <div className="flex-1 bg-[#1C1E2B] rounded-xl p-4 border border-white/5">
                <div className="text-2xl mb-1">{totalTime}</div>
                <div className="text-xs text-gray-500">Time Spent</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {nextDeck && (
              <Link
                to={`/study/${nextDeck.id}`}
                className="w-full py-4 px-6 bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] rounded-xl transition-all flex items-center justify-center gap-3"
              >
                <span>Start Next Deck: {nextDeck.title}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            <Link
              to="/dashboard"
              className="w-full py-4 px-6 bg-[#1C1E2B] hover:bg-[#22243A] border border-white/10 rounded-xl transition-all flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Word Review List */}
      <div className="w-1/2 flex flex-col p-12 overflow-hidden">
        <div className="mb-6">
          <h2 className="mb-2">Session Review</h2>
          <p className="text-sm text-gray-500">Review your performance on each word</p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-4">
          {cards.map((card) => {
            const result = results[card.id];
            const statusConfig = {
              mastered: { icon: Check, color: '#6FCF97', bg: 'bg-[#6FCF97]/10', border: 'border-[#6FCF97]/30' },
              hard: { icon: X, color: '#F2C94C', bg: 'bg-[#F2C94C]/10', border: 'border-[#F2C94C]/30' },
              difficult: { icon: X, color: '#FF9F9F', bg: 'bg-[#FF9F9F]/10', border: 'border-[#FF9F9F]/30' },
            };

            const config = result ? statusConfig[result] : statusConfig.mastered;
            const Icon = config.icon;

            return (
              <div
                key={card.id}
                className={`bg-[#1C1E2B] rounded-xl p-4 border ${config.border} ${config.bg}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4>{card.term}</h4>
                      <span className="text-sm text-gray-500">{card.phonetic}</span>
                    </div>
                    <p className="text-sm text-gray-400">{card.definition}</p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center ml-4"
                    style={{ backgroundColor: config.color + '33', borderColor: config.color }}
                  >
                    <Icon className="w-4 h-4" style={{ color: config.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Statistics Summary */}
        <div className="mt-6 p-4 bg-[#1C1E2B] rounded-xl border border-white/5">
          <div className="text-sm text-gray-400 mb-3">Performance Breakdown</div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-[#12131C] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6FCF97] rounded-full"
                  style={{ width: `${(masteredCount / cards.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-[#6FCF97] w-12 text-right">{masteredCount}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-[#12131C] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F2C94C] rounded-full"
                  style={{ width: `${(hardCount / cards.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-[#F2C94C] w-12 text-right">{hardCount}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-[#12131C] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF9F9F] rounded-full"
                  style={{ width: `${(difficultCount / cards.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-[#FF9F9F] w-12 text-right">{difficultCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
