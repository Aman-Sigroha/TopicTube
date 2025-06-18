import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { register as apiRegister, login as apiLogin } from '../api';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let data;
      if (isLogin) {
        data = await apiLogin(email, password);
      } else {
        data = await apiRegister(email, password);
      }
      login({ email: data.user.email, id: data.user.id, token: data.token, method: 'email' });
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          setError(err.response.data.errors.map(e => e.msg).join(' '));
        } else if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('Authentication failed.');
        }
      } else {
        setError('Network error.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black overflow-hidden">
      {/* Neon glass card */}
      <div className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl p-8 flex flex-col justify-center border border-purple-700/60 bg-black bg-opacity-80 backdrop-blur-md" style={{ boxShadow: '0 0 18px 0 #a21caf88, 0 0 32px 0 #2563eb55' }}>
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-2">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 shadow-lg" style={{ boxShadow: '0 0 8px 2px #a21caf88, 0 0 16px 4px #2563eb55' }}>
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a78bfa"/><path d="M8 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
          <h2 className="text-2xl font-extrabold mb-2 leading-tight" style={{ color: '#a78bfa', textShadow: '0 0 4px #a21caf88, 0 0 8px #2563eb55' }}>
            Detoxify your YouTube.<br />
            <span className="text-base font-normal" style={{ color: '#c4b5fd', textShadow: '0 0 3px #a21caf55' }}>
              Select topics, retrain your recommendations,<br />and take control of your feed.
            </span>
          </h2>
        </div>
        <div className="flex mb-6 rounded-lg overflow-hidden border border-purple-700/60">
          <button
            className={`flex-1 py-2 font-semibold transition ${isLogin ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg' : 'bg-black text-purple-300'}`}
            style={isLogin ? { boxShadow: '0 0 6px 1px #a21caf88, 0 0 12px 2px #2563eb55' } : {}}
            onClick={() => setIsLogin(true)}
            type="button"
            disabled={loading}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 font-semibold transition ${!isLogin ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg' : 'bg-black text-purple-300'}`}
            style={!isLogin ? { boxShadow: '0 0 6px 1px #a21caf88, 0 0 12px 2px #2563eb55' } : {}}
            onClick={() => setIsLogin(false)}
            type="button"
            disabled={loading}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block mb-1 text-left" style={{ color: '#c4b5fd' }}>Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-purple-700/60 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ boxShadow: '0 0 3px #a21caf55' }}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block mb-1 text-left" style={{ color: '#c4b5fd' }}>Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-purple-700/60 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={{ boxShadow: '0 0 3px #a21caf55' }}
              disabled={loading}
            />
          </div>
          {error && <div className="text-pink-400 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 mt-2 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-blue-600 transition"
            style={{ boxShadow: '0 0 8px 1px #a21caf88, 0 0 16px 4px #2563eb55' }}
            disabled={loading}
          >
            {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
          </button>
          {isLogin && <div className="text-right mt-2 text-purple-300 text-sm cursor-pointer hover:underline">Forgot password?</div>}
        </form>
        <div className="my-6 flex items-center justify-center">
          <span className="text-purple-400 text-xs">or</span>
        </div>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={() => window.location.reload()}
            onError={() => {}}
            useOneTap
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default Auth; 