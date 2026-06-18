import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Mail, Calendar, Award, Edit2, Save, ArrowLeft, Shield } from 'lucide-react';
import { getCurrentUser, setCurrentUser, logout } from '../utils/auth';
import { loadProgress, verbs } from '../data/verbsData';

export default function UserProfile() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const progress = loadProgress();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  if (!user) {
    navigate('/auth');
    return null;
  }

  const masteredCount = progress.filter((p) => p.mastered).length;
  const totalAttempts = progress.reduce((sum, p) => sum + p.attempts, 0);
  const totalCorrect = progress.reduce((sum, p) => sum + p.correctAttempts, 0);
  const successRate = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  const handleSave = () => {
    if (user) {
      const updatedUser = { ...user, name, email };
      setCurrentUser(updatedUser);
      localStorage.setItem('userName', name);
      setIsEditing(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#12131C] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-3 px-6 py-3 bg-[#1C1E2B] hover:bg-[#2A2D3E] rounded-xl border-2 border-white/10 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
            <span className="text-white font-bold">Back to Dashboard</span>
          </button>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-3 px-6 py-3 bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] rounded-xl border-2 border-white/10 transition-all"
            >
              <Edit2 className="w-6 h-6 text-[#12131C]" />
              <span className="font-bold">Edit Profile</span>
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-3 px-6 py-3 bg-[#6FCF97] hover:bg-[#5EBF87] text-[#12131C] rounded-xl border-2 border-white/10 transition-all"
            >
              <Save className="w-6 h-6 text-[#12131C]" />
              <span className="font-bold">Save Changes</span>
            </button>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-white/50">
          {/* Header Section */}
          <div className="bg-[#1C1E2B] p-12 text-center border-b-4 border-white/10">
            <div className="w-32 h-32 bg-[#6FCF97] rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-xl">
              <User className="w-16 h-16 text-[#12131C]" />
            </div>
            {!isEditing ? (
              <>
                <h1 className="text-4xl font-black text-white mb-2">{user.name}</h1>
                <p className="text-xl text-white/90">{user.email}</p>
              </>
            ) : (
              <div className="space-y-4 max-w-md mx-auto">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-2xl font-bold px-6 py-3 border-4 border-white rounded-xl focus:outline-none focus:border-yellow-300 text-center"
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xl px-6 py-3 border-4 border-white rounded-xl focus:outline-none focus:border-yellow-300 text-center"
                  placeholder="Email"
                />
              </div>
            )}
            <div className="flex items-center justify-center gap-2 mt-4">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-white font-bold">
                {user.role === 'admin' ? 'Administrator' : 'Student'}
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="p-12">
            <h2 className="text-3xl font-black text-purple-900 mb-8">Account Information</h2>

            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-purple-50 rounded-2xl p-6 border-4 border-purple-200">
                <div className="flex items-center gap-4 mb-2">
                  <Mail className="w-6 h-6 text-purple-600" />
                  <span className="text-sm font-bold text-purple-700">EMAIL</span>
                </div>
                <p className="text-xl font-bold text-purple-900">{user.email}</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border-4 border-blue-200">
                <div className="flex items-center gap-4 mb-2">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-bold text-blue-700">MEMBER SINCE</span>
                </div>
                <p className="text-xl font-bold text-blue-900">
                  {new Date(user.createdAt).toLocaleDateString('en-US')}
                </p>
              </div>
            </div>

            {/* Statistics */}
            <h2 className="text-3xl font-black text-purple-900 mb-8">My Statistics</h2>

            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-green-50 rounded-2xl p-6 border-4 border-green-200 text-center">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-black text-green-700 mb-2">{masteredCount}</div>
                <div className="text-sm font-bold text-green-600">Mastered Verbs</div>
              </div>

              <div className="bg-yellow-50 rounded-2xl p-6 border-4 border-yellow-200 text-center">
                <User className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <div className="text-3xl font-black text-yellow-700 mb-2">{totalAttempts}</div>
                <div className="text-sm font-bold text-yellow-600">Total Attempts</div>
              </div>

              <div className="bg-blue-50 rounded-2xl p-6 border-4 border-blue-200 text-center">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-black text-blue-700 mb-2">{totalCorrect}</div>
                <div className="text-sm font-bold text-blue-600">Correct Answers</div>
              </div>

              <div className="bg-pink-50 rounded-2xl p-6 border-4 border-pink-200 text-center">
                <Award className="w-12 h-12 text-pink-600 mx-auto mb-3" />
                <div className="text-3xl font-black text-pink-700 mb-2">{successRate}%</div>
                <div className="text-sm font-bold text-pink-600">Success Rate</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-50 rounded-2xl p-8 border-4 border-gray-200">
              <h3 className="text-2xl font-black text-purple-900 mb-4">Overall Progress</h3>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-700">Verb Mastery</span>
                <span className="text-2xl font-black text-purple-600">
                  {Math.round((masteredCount / verbs.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-8 bg-[#12131C] rounded-full overflow-hidden border-2 border-white/10">
                <div
                  className="h-full bg-[#6FCF97] transition-all duration-1000"
                  style={{ width: `${(masteredCount / verbs.length) * 100}%` }}
                />
              </div>
              <p className="text-center mt-4 text-gray-600 font-semibold">
                {masteredCount} of {verbs.length} verbs mastered
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="px-12 py-4 bg-red-500 hover:bg-red-600 text-white font-black text-xl rounded-2xl border-4 border-red-300 shadow-xl hover:shadow-2xl transition-all"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
