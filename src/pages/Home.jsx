import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';

const infoCards = [
  {
    title: 'Select Topics',
    desc: 'Choose what you want to see more of on YouTube.',
    icon: '🎯',
  },
  {
    title: 'Grant Permissions',
    desc: 'Allow us to help retrain your recommendations.',
    icon: '🔑',
  },
  {
    title: 'Retrain Your Feed',
    desc: 'We interact with videos to teach YouTube your new interests.',
    icon: '🤖',
  },
  {
    title: 'Track Progress',
    desc: 'See how your feed improves over time.',
    icon: '📈',
  },
];

function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSignIn = () => navigate('/auth');
  const handleGetStarted = () => {
    if (user) navigate('/topics');
    else navigate('/auth');
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Detoxify Your YouTube
        </motion.h1>
        <motion.p
          className="text-purple-200 text-lg md:text-2xl text-center mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Take control of your recommendations. Select topics, retrain your feed, and enjoy a healthier YouTube experience.
        </motion.p>
        <div className="flex flex-col md:flex-row gap-4 mb-10 w-full justify-center">
          <motion.button
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-lg shadow-lg hover:from-purple-600 hover:to-indigo-600 transition mb-2 md:mb-0 md:mr-4 animate-pulse"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSignIn}
          >
            Sign In
          </motion.button>
          <motion.button
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg shadow-lg hover:from-pink-600 hover:to-purple-600 transition animate-pulse"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGetStarted}
          >
            Get Started
          </motion.button>
        </div>
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6">
          {infoCards.map((card, idx) => (
            <motion.div
              key={card.title}
              className="bg-black bg-opacity-70 rounded-xl p-6 flex flex-col items-center text-center shadow-lg border border-purple-900"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + idx * 0.15 }}
            >
              <span className="text-3xl mb-2 animate-bounce">{card.icon}</span>
              <h3 className="text-xl font-bold text-purple-100 mb-1">{card.title}</h3>
              <p className="text-purple-300 text-base">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home; 