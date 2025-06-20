import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import TopicSelection from './pages/TopicSelection';
import YouTubeCallback from './pages/YouTubeCallback';
import { UserProvider } from './context/UserContext';

const GOOGLE_CLIENT_ID = '750933445565-igjq4ee5d88bb39c88o5f9cen8e9kedo.apps.googleusercontent.com';

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <UserProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/home" element={<Home />} />
              <Route path="/topics" element={<TopicSelection />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/youtube-callback" element={<YouTubeCallback />} />
            </Routes>
      </div>
        </Router>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
