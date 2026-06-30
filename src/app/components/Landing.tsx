import { useNavigate } from 'react-router';
import {
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Award,
  Zap,
  Globe,
  Users,
  BarChart,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { useEffect } from 'react';

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  const handleLogin = () => {
    navigate('/auth', { state: { tab: 'login' } });
  };

  const handleRegister = () => {
    navigate('/auth', { state: { tab: 'register' } });
  };

  return (
    <div className="min-h-screen bg-[#12131C] overflow-y-auto">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-12 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Logo */}
          <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-[#6FCF97] to-[#56CCF2] flex items-center justify-center shadow-2xl">
            <BookOpen className="w-16 h-16 text-[#12131C]" />
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-6xl">
            Master English with
            <br />
            <span className="bg-gradient-to-r from-[#6FCF97] to-[#56CCF2] bg-clip-text text-transparent">
              Interactive Flashcards xd
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your English learning journey with scientifically-proven spaced repetition,
            personalized study plans, and real-time progress tracking. Join thousands of learners
            achieving fluency faster.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-6 justify-center mb-16">
            <button
              onClick={handleLogin}
              className="px-10 py-5 bg-[#1C1E2B] hover:bg-[#22243A] border-2 border-white/10 hover:border-[#6FCF97]/50 rounded-xl transition-all flex items-center gap-3"
            >
              <span className="text-lg">Sign In</span>
            </button>
            <button
                onClick={handleRegister}
                className="px-10 py-5 bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] rounded-xl transition-all flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <span className="text-lg">Sign Up</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#1C1E2B] rounded-2xl p-6 border border-white/5">
              <div className="text-3xl mb-2 text-[#6FCF97]">50K+</div>
              <div className="text-sm text-gray-500">Active Learners</div>
            </div>
            <div className="bg-[#1C1E2B] rounded-2xl p-6 border border-white/5">
              <div className="text-3xl mb-2 text-[#F2C94C]">1M+</div>
              <div className="text-sm text-gray-500">Cards Studied</div>
            </div>
            <div className="bg-[#1C1E2B] rounded-2xl p-6 border border-white/5">
              <div className="text-3xl mb-2 text-[#56CCF2]">95%</div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
            <div className="bg-[#1C1E2B] rounded-2xl p-6 border border-white/5">
              <div className="text-3xl mb-2 text-[#FF9F9F]">4.9★</div>
              <div className="text-sm text-gray-500">User Rating</div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#6FCF97]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#56CCF2]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="px-12 py-24 bg-[#1C1E2B]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#6FCF97]/10 border border-[#6FCF97]/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#6FCF97]" />
              <span className="text-sm text-[#6FCF97]">Features</span>
            </div>
            <h2 className="mb-4">Everything You Need to Excel</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven learning methodologies
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="bg-[#1C1E2B] rounded-2xl p-8 border border-white/5 hover:border-[#6FCF97]/30 transition-all group">
              <div className="w-14 h-14 bg-[#6FCF97]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#6FCF97]/20 transition-all">
                <Brain className="w-7 h-7 text-[#6FCF97]" />
              </div>
              <h3 className="mb-3">Smart Spaced Repetition</h3>
              <p className="text-gray-400 leading-relaxed">
                Our powered algorithm optimizes review timing based on your performance,
                ensuring maximum retention with minimal effort.
              </p>
            </div>

            <div className="bg-[#1C1E2B] rounded-2xl p-8 border border-white/5 hover:border-[#F2C94C]/30 transition-all group">
              <div className="w-14 h-14 bg-[#F2C94C]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#F2C94C]/20 transition-all">
                <Target className="w-7 h-7 text-[#F2C94C]" />
              </div>
              <h3 className="mb-3">Personalized Learning Paths</h3>
              <p className="text-gray-400 leading-relaxed">
                Adaptive study plans tailored to your goals, whether you're preparing for IELTS,
                TOEFL, or business English.
              </p>
            </div>

            <div className="bg-[#1C1E2B] rounded-2xl p-8 border border-white/5 hover:border-[#56CCF2]/30 transition-all group">
              <div className="w-14 h-14 bg-[#56CCF2]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#56CCF2]/20 transition-all">
                <BarChart className="w-7 h-7 text-[#56CCF2]" />
              </div>
              <h3 className="mb-3">Advanced Analytics</h3>
              <p className="text-gray-400 leading-relaxed">
                Track your progress with detailed statistics, visualize your learning curve, and
                celebrate milestones along the way.
              </p>
            </div>

            <div className="bg-[#1C1E2B] rounded-2xl p-8 border border-white/5 hover:border-[#FF9F9F]/30 transition-all group">
              <div className="w-14 h-14 bg-[#FF9F9F]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF9F9F]/20 transition-all">
                <Globe className="w-7 h-7 text-[#FF9F9F]" />
              </div>
              <h3 className="mb-3">Comprehensive Content</h3>
              <p className="text-gray-400 leading-relaxed">
                Access thousands of curated flashcards covering vocabulary, idioms, phrasal verbs,
                and specialized English topics.
              </p>
            </div>

            <div className="bg-[#1C1E2B] rounded-2xl p-8 border border-white/5 hover:border-[#BB6BD9]/30 transition-all group">
              <div className="w-14 h-14 bg-[#BB6BD9]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#BB6BD9]/20 transition-all">
                <Zap className="w-7 h-7 text-[#BB6BD9]" />
              </div>
              <h3 className="mb-3">Audio Pronunciation</h3>
              <p className="text-gray-400 leading-relaxed">
                Perfect your accent with native speaker audio, phonetic transcriptions, and
                real-world usage examples for every word.
              </p>
            </div>

            <div className="bg-[#1C1E2B] rounded-2xl p-8 border border-white/5 hover:border-[#F2994A]/30 transition-all group">
              <div className="w-14 h-14 bg-[#F2994A]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#F2994A]/20 transition-all">
                <Award className="w-7 h-7 text-[#F2994A]" />
              </div>
              <h3 className="mb-3">Gamified Experience</h3>
              <p className="text-gray-400 leading-relaxed">
                Stay motivated with streak tracking, achievement badges, and daily challenges that
                make learning addictive and fun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Three simple steps to English mastery</p>
          </div>

          <div className="grid grid-cols-3 gap-12">
            <div className="relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#6FCF97] to-[#56CCF2] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl text-[#12131C]">
                  1
                </div>
                <h3 className="mb-4">Choose Your Deck</h3>
                <p className="text-gray-400">
                  Select from our curated library of flashcard decks, organized by topic and
                  difficulty level.
                </p>
              </div>
              <div className="absolute top-10 -right-6 hidden lg:block">
                <ArrowRight className="w-12 h-12 text-gray-700" />
              </div>
            </div>

            <div className="relative">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#F2C94C] to-[#F2994A] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl text-[#12131C]">
                  2
                </div>
                <h3 className="mb-4">Study & Review</h3>
                <p className="text-gray-400">
                  Practice with interactive flashcards, rate your confidence, and let our algorithm
                  schedule optimal review times.
                </p>
              </div>
              <div className="absolute top-10 -right-6 hidden lg:block">
                <ArrowRight className="w-12 h-12 text-gray-700" />
              </div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#BB6BD9] to-[#FF9F9F] rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl text-[#12131C]">
                3
              </div>
              <h3 className="mb-4">Track Progress</h3>
              <p className="text-gray-400">
                Monitor your learning journey with detailed analytics, celebrate achievements, and
                watch your vocabulary grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-12 py-24 bg-[#1C1E2B]/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mb-6">Why Choose Our Platform?</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We've helped thousands of learners achieve their English language goals. Here's why
                they choose us over traditional methods.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#6FCF97] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-2">Science-Backed Methodology</h4>
                    <p className="text-gray-400 text-sm">
                      Based on cognitive science research to maximize retention and minimize study
                      time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#6FCF97] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-2">Learn Anywhere, Anytime</h4>
                    <p className="text-gray-400 text-sm">
                      Desktop and mobile apps ensure your learning never stops, whether you're at
                      home or on the go.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#6FCF97] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-2">Expert-Curated Content</h4>
                    <p className="text-gray-400 text-sm">
                      Every flashcard is created by language experts and reviewed for accuracy and
                      relevance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-[#6FCF97] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="mb-2">No Ads, No Distractions</h4>
                    <p className="text-gray-400 text-sm">
                      Focus on what matters—your learning—with our clean, ad-free interface
                      designed for maximum productivity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1C1E2B] rounded-3xl p-12 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#6FCF97]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#56CCF2]/5 rounded-full blur-3xl"></div>

              <div className="relative space-y-6">
                <div className="flex items-center gap-6 bg-[#12131C] rounded-2xl p-6">
                  <TrendingUp className="w-12 h-12 text-[#6FCF97]" />
                  <div>
                    <div className="text-2xl mb-1">+247%</div>
                    <div className="text-sm text-gray-500">Avg. Vocabulary Growth</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-[#12131C] rounded-2xl p-6">
                  <Users className="w-12 h-12 text-[#F2C94C]" />
                  <div>
                    <div className="text-2xl mb-1">50K+</div>
                    <div className="text-sm text-gray-500">Active Community</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 bg-[#12131C] rounded-2xl p-6">
                  <Award className="w-12 h-12 text-[#FF9F9F]" />
                  <div>
                    <div className="text-2xl mb-1">12 Min/Day</div>
                    <div className="text-sm text-gray-500">Average Study Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-12 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">Ready to Transform Your English?</h2>
          <p className="text-xl text-gray-400 mb-12">
            Join thousands of learners who are already mastering English with our proven system.
            Start your free trial today—no credit card required.
          </p>

          <div className="flex gap-6 justify-center">
            <button
              onClick={handleRegister}
              className="px-12 py-6 bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] rounded-xl transition-all flex items-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 transform text-lg"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Free forever. No credit card required. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-12 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6FCF97] to-[#56CCF2] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#12131C]" />
            </div>
            <span className="text-gray-400">English Flashcards</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 English Flashcards. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
