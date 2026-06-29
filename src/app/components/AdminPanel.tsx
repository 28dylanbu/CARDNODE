import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Edit, Plus, LogOut, User, BookOpen, Search, Activity, Calendar } from 'lucide-react';
import { getCurrentUser, logout } from '../utils/auth';
import { verbs } from '../data/verbsData';

export default function AdminPanel() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'verbs' | 'users'>('verbs');
  const [usersList, setUsersList] = useState<any[]>([]);

  useEffect(() => {
    if (activeTab === 'users') {
      fetch('http://localhost:5000/usuarios')
          .then(res => res.json())
          .then(data => {
            const userArray = Array.isArray(data) ? data : (data.usuarios || []);
            setUsersList(userArray);
          })
          .catch(err => console.error("Error al obtener usuarios:", err));
    }
  }, [activeTab]);

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
          verb.infinitive.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          verb.spanish.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
  );

  return (
      <div className="min-h-screen bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-white text-3xl font-black">Admin Panel</h1>
                <p className="text-gray-400">Manage application content & users</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/profile')} className="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all">
                <User className="w-5 h-5 text-white" />
                <span className="text-white font-bold">{user.name}</span>
              </button>
              <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-3 bg-red-500/80 hover:bg-red-600 rounded-xl border border-white/20 transition-all shadow-lg shadow-red-500/20">
                <LogOut className="w-5 h-5 text-white" />
                <span className="text-white font-bold">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-white/10 pb-4 mt-8">
            <button
                onClick={() => setActiveTab('verbs')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    activeTab === 'verbs' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              <BookOpen className="w-5 h-5" /> Flash Cards Management
            </button>
            <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                    activeTab === 'users' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              <Activity className="w-5 h-5" /> User Statistics
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            {activeTab === 'verbs' && (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-white">Flash Cards Database</h2>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="Search verb..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 pr-4 py-3 bg-[#0f172a] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none w-80" />
                      </div>
                      <button onClick={() => navigate('/admin/verb/new')} className="flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all">
                        <Plus className="w-5 h-5" /> Add New
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                    {filteredVerbs.map((verb) => (
                        <div key={verb.id} className="bg-[#0f172a]/50 rounded-xl p-6 border border-white/5 transition-all group flex items-center gap-6">
                          <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white/10"><img src={verb.imageUrl} alt={verb.infinitive} className="w-full h-full object-cover" /></div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-black text-white">{verb.infinitive}</h3>
                            <p className="text-gray-400">Spanish: {verb.spanish}</p>
                          </div>
                          <button onClick={() => navigate(`/admin/verb/${verb.id}`)} className="bg-blue-500 text-white font-bold px-6 py-3 rounded-xl group-hover:scale-105 transition-all"><Edit className="w-4 h-4" /> Edit</button>
                        </div>
                    ))}
                  </div>
                </>
            )}

            {activeTab === 'users' && (
                <>
                  <div className="grid grid-cols-4 gap-4 px-6 py-3 text-gray-400 font-bold text-xs uppercase tracking-wider border-b border-white/10 mb-4">
                    <div>User details</div>
                    <div>Role</div>
                    <div>Flashcards (Success)</div>
                    <div>Sentences (Success)</div>
                  </div>

                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                    {usersList
                        .filter((u) => u.role !== 'admin') // Filtro para ocultar al admin
                        .map((u) => {
                          const stats = u.stats || { flashcardsAttempts: 0, flashcardsFailed: [], constructorAttempts: 0, constructorFailed: [] };
                          const fRate = stats.flashcardsAttempts > 0 ? Math.max(0, Math.round(((stats.flashcardsAttempts - stats.flashcardsFailed.length) / stats.flashcardsAttempts) * 100)) : 0;
                          const cRate = stats.constructorAttempts > 0 ? Math.max(0, Math.round(((stats.constructorAttempts - stats.constructorFailed.length) / stats.constructorAttempts) * 100)) : 0;

                          return (
                              <div key={u.id} className="grid grid-cols-4 gap-4 items-center bg-[#0f172a]/50 rounded-xl p-5 border border-white/5">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center"><User className="w-5 h-5 text-purple-300" /></div>
                                  <div><p className="text-white font-bold">{u.name}</p><p className="text-gray-500 text-xs">{u.email}</p></div>
                                </div>
                                <div><span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300">{u.role.toUpperCase()}</span></div>
                                <div><div className="text-2xl font-black text-white">{fRate}%</div><div className="text-gray-400 text-xs">{stats.flashcardsAttempts} total attempts</div></div>
                                <div><div className="text-2xl font-black text-white">{cRate}%</div><div className="text-gray-400 text-xs">{stats.constructorAttempts} total attempts</div></div>
                              </div>
                          );
                        })}
                  </div>
                </>
            )}
          </div>
        </div>
      </div>
  );
}