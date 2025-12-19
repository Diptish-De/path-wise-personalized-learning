import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, BookOpen, Video, FileText, TrendingUp, Clock } from 'lucide-react';

interface SearchScreenProps {
  navigateTo: (screen: string) => void;
}

const recentSearches = ['Quadratic Equations', 'Newton\'s Laws', 'Photosynthesis'];

const popularTopics = [
  { id: 1, title: 'Algebra Basics', icon: BookOpen, category: 'Mathematics' },
  { id: 2, title: 'Chemical Reactions', icon: FileText, category: 'Chemistry' },
  { id: 3, title: 'World History', icon: Video, category: 'History' },
  { id: 4, title: 'Grammar Rules', icon: FileText, category: 'English' },
];

const searchResults = [
  { id: 1, title: 'Introduction to Quadratic Equations', type: 'Lesson', duration: '15 min' },
  { id: 2, title: 'Solving Quadratic Equations', type: 'Video', duration: '20 min' },
  { id: 3, title: 'Quadratic Formula Practice', type: 'Quiz', questions: 10 },
  { id: 4, title: 'Advanced Quadratics', type: 'Lesson', duration: '25 min' },
];

export default function SearchScreen({ navigateTo }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-6 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search lessons, topics, videos..."
            className="w-full bg-slate-800 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500"
            autoFocus
          />
        </div>
      </div>

      <div className="p-6">
        {!isSearching ? (
          <>
            {/* Recent Searches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-slate-400" />
                <h2 className="text-xl text-white" style={{ fontWeight: 700 }}>Recent Searches</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <motion.button
                    key={index}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSearch(search)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl transition-all"
                  >
                    {search}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Popular Topics */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl text-white" style={{ fontWeight: 700 }}>Popular Topics</h2>
              </div>
              <div className="space-y-3">
                {popularTopics.map((topic, index) => {
                  const Icon = topic.icon;
                  return (
                    <motion.button
                      key={topic.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => navigateTo('lesson')}
                      className="w-full bg-slate-800 hover:bg-slate-700 rounded-2xl p-4 flex items-center gap-4 transition-all"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-white mb-1" style={{ fontWeight: 600 }}>{topic.title}</h3>
                        <p className="text-slate-400 text-sm">{topic.category}</p>
                      </div>
                      <span className="text-slate-500">→</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Loading Skeletons */}
            {searchQuery.length > 0 && searchQuery.length < 3 ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    className="bg-slate-800 rounded-2xl p-4 h-20"
                  />
                ))}
              </div>
            ) : (
              <>
                {/* Search Results */}
                <h2 className="text-xl text-white mb-4" style={{ fontWeight: 700 }}>
                  Results for "{searchQuery}"
                </h2>
                <div className="space-y-3">
                  {searchResults.map((result, index) => (
                    <motion.button
                      key={result.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => navigateTo('lesson')}
                      className="w-full bg-slate-800 hover:bg-slate-700 rounded-2xl p-4 flex items-center gap-4 transition-all"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-xl flex items-center justify-center">
                        {result.type === 'Lesson' && <BookOpen className="w-6 h-6 text-white" />}
                        {result.type === 'Video' && <Video className="w-6 h-6 text-white" />}
                        {result.type === 'Quiz' && <FileText className="w-6 h-6 text-white" />}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-white mb-1" style={{ fontWeight: 600 }}>{result.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 text-sm">{result.type}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-400 text-sm">
                            {result.duration || `${result.questions} questions`}
                          </span>
                        </div>
                      </div>
                      <span className="text-slate-500">→</span>
                    </motion.button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
