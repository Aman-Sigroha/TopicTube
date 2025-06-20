import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useUser } from '../context/UserContext';

function YouTubeCallback() {
  const [status, setStatus] = useState('Connecting to YouTube...');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (!user || !user.token) {
      setStatus('You must be logged in to connect YouTube. Redirecting to login...');
      setTimeout(() => navigate('/auth'), 2000);
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (!code) {
      setStatus('No code found in URL.');
      setError('Missing authorization code.');
      return;
    }
    async function connectYouTube() {
      try {
        setStatus('Finalizing connection...');
        await api.post('/youtube/oauth/callback', { code }, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setStatus('YouTube connected! Redirecting...');
        setTimeout(() => navigate('/dashboard'), 2000);
      } catch (err) {
        setError('Failed to connect YouTube.');
        setStatus('Error connecting to YouTube.');
      }
    }
    connectYouTube();
  }, [navigate, user]);

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black">
      <div className="bg-black bg-opacity-80 p-8 rounded-2xl shadow-2xl border border-purple-700/60 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-purple-200">YouTube Connection</h2>
        <div className="text-purple-300 mb-2">{status}</div>
        {error && <div className="text-pink-400">{error}</div>}
      </div>
    </div>
  );
}

export default YouTubeCallback; 