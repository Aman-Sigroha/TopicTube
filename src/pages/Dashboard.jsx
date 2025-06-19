import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { logout as apiLogout } from '../api';

function Dashboard() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Placeholder data
  const topics = ['Technology', 'Music', 'Science'];
  const languages = ['English', 'Spanish'];
  const progress = [
    { topic: 'Technology', watched: 12, liked: 5 },
    { topic: 'Music', watched: 8, liked: 3 },
    { topic: 'Science', watched: 5, liked: 2 },
  ];

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Add animated neon/cyber background here if desired */}
      </div>
      <div className="relative z-10 w-full max-w-3xl mx-auto p-8 rounded-2xl bg-black bg-opacity-80 border border-purple-700/60 shadow-2xl flex flex-col items-center" style={{ boxShadow: '0 0 24px 0 #a21caf88, 0 0 48px 0 #2563eb55' }}>
        <h2 className="text-3xl font-extrabold text-center mb-6" style={{ color: '#a78bfa', textShadow: '0 0 8px #a21caf88, 0 0 16px #2563eb55' }}>
          Welcome{user?.email ? `, ${user.email}` : ''}!
        </h2>
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <div className="bg-black bg-opacity-70 rounded-xl p-6 border border-purple-900 shadow-lg min-w-[200px]">
            <h3 className="text-lg font-bold text-purple-100 mb-2">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {topics.map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white text-sm font-semibold shadow animate-pulse" style={{ boxShadow: '0 0 4px 1px #a21caf88' }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="bg-black bg-opacity-70 rounded-xl p-6 border border-purple-900 shadow-lg min-w-[200px]">
            <h3 className="text-lg font-bold text-purple-100 mb-2">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map(l => (
                <span key={l} className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-semibold shadow animate-pulse" style={{ boxShadow: '0 0 4px 1px #2563eb88' }}>{l}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full mb-8">
          <h3 className="text-lg font-bold text-purple-100 mb-4 text-center">Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {progress.map(p => (
              <div key={p.topic} className="bg-black bg-opacity-70 rounded-xl p-4 border border-pink-700/60 shadow-md flex flex-col items-center">
                <span className="text-xl font-bold text-pink-400 mb-2">{p.topic}</span>
                <span className="text-purple-200">Watched: <b>{p.watched}</b></span>
                <span className="text-purple-200">Liked: <b>{p.liked}</b></span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-blue-600 transition"
            onClick={() => navigate('/topics')}
          >
            Edit Preferences
          </button>
          <button
            className="px-6 py-2 rounded-lg bg-black border border-pink-700/60 text-pink-300 font-semibold shadow hover:bg-pink-900/20 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 