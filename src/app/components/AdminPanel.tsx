import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Edit, Plus, LogOut, User, TrendingUp, BookOpen, Search } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import { verbs } from '../data/verbsData';

export default function AdminPanel() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');

  if (!user || user.role !== 'admin') {
    navigate('/dashboard');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const filteredVerbs = verbs.filter(
    (verb) =>
      verb.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verb.spanish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-white text-3xl font-black">Admin Panel</h1>
              <p className="text-gray-400">Manage application content</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all"
            >
              <User className="w-5 h-5 text-white" />
              <span className="text-white font-bold">{user.name}</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-6 py-3 bg-red-500/80 hover:bg-red-600 rounded-xl border border-white/20 transition-all"
            >
              <LogOut className="w-5 h-5 text-white" />
              <span className="text-white font-bold">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <BookOpen className="w-12 h-12 text-blue-400" />
              <div>
                <div className="text-white text-3xl font-black">{verbs.length}</div>
                <div className="text-gray-400 font-bold">Total Verbs</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-12 h-12 text-green-400" />
              <div>
                <div className="text-white text-3xl font-black">100%</div>
                <div className="text-gray-400 font-bold">System Active</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4">
              <User className="w-12 h-12 text-purple-400" />
              <div>
                <div className="text-white text-3xl font-black">Admin</div>
                <div className="text-gray-400 font-bold">Full Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          {/* Header with Search and Add */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white">Flash Cards Management</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search verb..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all w-80"
                />
              </div>
              <button
                onClick={() => navigate('/admin/verb/new')}
                className="flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl border border-white/20 transition-all"
              >
                <Plus className="w-5 h-5 text-white" />
                <span className="text-white font-bold">Add New</span>
              </button>
            </div>
          </div>

          {/* Verbs List */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
            {filteredVerbs.map((verb) => (
              <div
                key={verb.id}
                className="bg-white/5 hover:bg-white/10 rounded-xl p-6 border border-white/10 hover:border-white/30 transition-all group"
              >
                <div className="flex items-center gap-6">
                  {/* Image */}
                  <div className="w-32 h-32 rounded-xl overflow-hidden border-2 border-white/20 flex-shrink-0">
                    <img
                      src={verb.imageUrl}
                      alt={verb.infinitive}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-2xl font-black text-white">{verb.infinitive}</h3>
                      <span className="px-4 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-bold border border-blue-400/30">
                        ID: {verb.id}
                      </span>
                    </div>
                    <p className="text-gray-400 text-lg mb-3">
                      Spanish: <span className="text-white font-bold">{verb.spanish}</span>
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-gray-400">
                        Present: <span className="text-green-400 font-bold">{verb.present}</span>
                      </span>
                      <span className="text-gray-400">
                        Past: <span className="text-yellow-400 font-bold">{verb.past}</span>
                      </span>
                      <span className="text-gray-400">
                        Future: <span className="text-purple-400 font-bold">{verb.future}</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => navigate(`/admin/verb/${verb.id}`)}
                    className="flex items-center gap-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Edit className="w-5 h-5 text-white" />
                    <span className="text-white font-bold">Edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredVerbs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No verbs found for "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-400/30">
          <h3 className="text-blue-300 font-black text-lg mb-3">💡 Instructions</h3>
          <ul className="text-gray-300 space-y-2">
            <li>• Click "Edit" to modify an existing verb</li>
            <li>• Use "Add New" to create a new flash card</li>
            <li>• Search works in English and Spanish</li>
            <li>• Changes are automatically saved in the browser</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
