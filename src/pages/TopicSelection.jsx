import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
  'Technology', 'Music', 'Science', 'Fitness', 'Gaming', 'Education',
  'Art', 'Travel', 'Food', 'Finance', 'History', 'Comedy',
  'Podcasts', 'News', 'Movies', 'DIY', 'Fashion', 'Sports',
];

const LANGUAGES = [
  'English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic', 'Portuguese', 'Other',
];

function TopicSelection() {
  const [selected, setSelected] = useState([]);
  const [customTopic, setCustomTopic] = useState('');
  const [languages, setLanguages] = useState(['English']);
  const [customLanguage, setCustomLanguage] = useState('');
  const navigate = useNavigate();

  const toggleTopic = (topic) => {
    setSelected(sel =>
      sel.includes(topic) ? sel.filter(t => t !== topic) : [...sel, topic]
    );
  };

  const handleAddCustom = () => {
    const trimmed = customTopic.trim();
    if (trimmed && !selected.includes(trimmed)) {
      setSelected(sel => [...sel, trimmed]);
      setCustomTopic('');
    }
  };

  const handleRemove = (topic) => {
    setSelected(sel => sel.filter(t => t !== topic));
  };

  const toggleLanguage = (lang) => {
    setLanguages(langs =>
      langs.includes(lang) ? langs.filter(l => l !== lang) : [...langs, lang]
    );
  };

  const handleAddCustomLanguage = () => {
    const trimmed = customLanguage.trim();
    if (
      trimmed &&
      !languages.includes(trimmed) &&
      !LANGUAGES.includes(trimmed)
    ) {
      setLanguages(langs => [...langs, trimmed]);
      setCustomLanguage('');
    }
  };

  const handleContinue = () => {
    // TODO: Save to context/backend if needed
    // Example: { topics: selected, languages }
    navigate('/dashboard');
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black z-0">
      <div className="absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10 w-full max-w-2xl mx-auto p-4 rounded-2xl bg-black bg-opacity-80 border border-purple-700/60 shadow-2xl" style={{ boxShadow: '0 0 18px 0 #a21caf88, 0 0 32px 0 #2563eb55' }}>
        <h2 className="text-2xl font-extrabold text-center mb-4" style={{ color: '#a78bfa', textShadow: '0 0 4px #a21caf88, 0 0 8px #2563eb55' }}>
          Select Your Topics
        </h2>
        {/* Multi-language selection */}
        <div className="mb-4 flex flex-wrap gap-2 justify-center items-center">
          <span className="text-purple-200 font-medium mr-2">Languages:</span>
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => toggleLanguage(lang)}
              className={`px-3 py-1 rounded-full text-sm font-semibold border border-purple-700/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500
                ${languages.includes(lang)
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-md scale-105'
                  : 'bg-black text-purple-200 hover:bg-purple-900/30'}
              `}
              style={languages.includes(lang)
                ? { boxShadow: '0 0 4px 1px #a21caf88, 0 0 8px 2px #2563eb55' }
                : { boxShadow: '0 0 2px #a21caf44' }}
            >
              {lang}
              {languages.includes(lang) && (
                <span className="ml-1">×</span>
              )}
            </button>
          ))}
          {/* Custom language chips */}
          {languages.filter(l => !LANGUAGES.includes(l)).map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => toggleLanguage(lang)}
              className={`px-3 py-1 rounded-full text-sm font-semibold border border-pink-700/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500
                bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-md scale-105 animate-pulse`}
              style={{ boxShadow: '0 0 4px 1px #a21caf88, 0 0 8px 2px #2563eb55' }}
            >
              {lang}
              <span className="ml-1">×</span>
            </button>
          ))}
          {/* Custom language input */}
        </div>
        <div className="mb-4 flex gap-2 justify-center">
          <input
            type="text"
            className="rounded-lg px-3 py-1 bg-black border border-purple-700/60 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 w-36"
            placeholder="Add language"
            value={customLanguage}
            onChange={e => setCustomLanguage(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustomLanguage(); } }}
          />
          <button
            type="button"
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-md transition disabled:opacity-40"
            style={{ boxShadow: '0 0 4px 1px #a21caf88, 0 0 8px 2px #2563eb55' }}
            onClick={handleAddCustomLanguage}
            disabled={!customLanguage.trim() || languages.includes(customLanguage.trim()) || LANGUAGES.includes(customLanguage.trim())}
          >
            Add
          </button>
        </div>
        {/* Custom topic input */}
        <div className="mb-4 flex gap-2 justify-center">
          <input
            type="text"
            className="rounded-lg px-3 py-2 bg-black border border-purple-700/60 text-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 w-48"
            placeholder="Add a custom topic"
            value={customTopic}
            onChange={e => setCustomTopic(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddCustom(); } }}
          />
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-md transition disabled:opacity-40"
            style={{ boxShadow: '0 0 4px 1px #a21caf88, 0 0 8px 2px #2563eb55' }}
            onClick={handleAddCustom}
            disabled={!customTopic.trim() || selected.includes(customTopic.trim())}
          >
            Add
          </button>
        </div>
        {/* Selected topics as removable chips */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {selected.map(topic => (
              <span
                key={topic}
                className="flex items-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md animate-pulse"
                style={{ boxShadow: '0 0 4px 1px #a21caf88, 0 0 8px 2px #2563eb55' }}
              >
                {topic}
                <button
                  type="button"
                  className="ml-2 text-white hover:text-pink-300 focus:outline-none"
                  onClick={() => handleRemove(topic)}
                  aria-label={`Remove ${topic}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        {/* Topic grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {TOPICS.map(topic => (
            <button
              key={topic}
              type="button"
              onClick={() => toggleTopic(topic)}
              className={`py-2 px-3 rounded-xl font-semibold text-base transition-all duration-200 border border-purple-700/60 focus:outline-none focus:ring-2 focus:ring-purple-500
                ${selected.includes(topic)
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg scale-105'
                  : 'bg-black text-purple-200 hover:bg-purple-900/30'}
              `}
              style={selected.includes(topic)
                ? { boxShadow: '0 0 8px 2px #a21cafcc, 0 0 16px 4px #2563eb99' }
                : { boxShadow: '0 0 2px #a21caf44' }}
            >
              {topic}
            </button>
          ))}
        </div>
        <button
          className="w-full py-2 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold text-base shadow-lg transition disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ boxShadow: '0 0 8px 1px #a21caf88, 0 0 16px 4px #2563eb55' }}
          disabled={selected.length === 0}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default TopicSelection; 