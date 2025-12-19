import { motion } from 'motion/react';
import { ChevronLeft, BookOpen, Clock, Target, Play } from 'lucide-react';

interface LessonScreenProps {
  navigateTo: (screen: string) => void;
}

export default function LessonScreen({ navigateTo }: LessonScreenProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Parallax Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative h-48 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 overflow-hidden"
      >
        {/* Floating Shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-4 left-4 w-40 h-40 bg-white/10 rounded-full blur-2xl"
        />

        <div className="relative z-10 px-6 py-6">
          <button onClick={() => navigateTo('learning-path')} className="mb-4">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-sm" style={{ fontWeight: 600 }}>Adaptive</span>
              </div>
              <div className="bg-green-500/30 backdrop-blur-sm px-3 py-1 rounded-full border border-green-400/50">
                <span className="text-green-300 text-sm" style={{ fontWeight: 600 }}>Medium</span>
              </div>
            </div>
            <h1 className="text-3xl text-white mb-2" style={{ fontWeight: 700 }}>
              Quadratic Equations
            </h1>
            <p className="text-white/80">Chapter 4 - Algebra</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Lesson Info Cards */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800 rounded-2xl p-4 text-center"
          >
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-white" style={{ fontWeight: 600 }}>25 min</p>
            <p className="text-xs text-slate-400">Duration</p>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800 rounded-2xl p-4 text-center"
          >
            <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-white" style={{ fontWeight: 600 }}>350 XP</p>
            <p className="text-xs text-slate-400">Reward</p>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800 rounded-2xl p-4 text-center"
          >
            <BookOpen className="w-6 h-6 text-teal-400 mx-auto mb-2" />
            <p className="text-white" style={{ fontWeight: 600 }}>8 Topics</p>
            <p className="text-xs text-slate-400">Sections</p>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Your Progress</span>
          <span className="text-purple-400 text-sm" style={{ fontWeight: 600 }}>67%</span>
        </div>
        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"
            initial={{ width: 0 }}
            animate={{ width: '67%' }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-6 space-y-4">
        <h2 className="text-xl text-white mb-4" style={{ fontWeight: 700 }}>Topics</h2>

        {[
          { id: 1, title: 'Introduction to Quadratics', duration: '3 min', completed: true },
          { id: 2, title: 'Standard Form', duration: '5 min', completed: true },
          { id: 3, title: 'Solving by Factoring', duration: '8 min', completed: true },
          { id: 4, title: 'Quadratic Formula', duration: '6 min', completed: true },
          { id: 5, title: 'Completing the Square', duration: '7 min', current: true },
          { id: 6, title: 'Graphing Parabolas', duration: '10 min', locked: true },
          { id: 7, title: 'Word Problems', duration: '8 min', locked: true },
          { id: 8, title: 'Practice Quiz', duration: '12 min', locked: true },
        ].map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            className={`bg-slate-800 rounded-2xl p-4 flex items-center gap-4 ${
              topic.locked ? 'opacity-50' : 'hover:bg-slate-700 cursor-pointer'
            } transition-all`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                topic.completed
                  ? 'bg-green-500'
                  : topic.current
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                  : 'bg-slate-700'
              }`}
            >
              {topic.completed ? (
                <span className="text-white text-lg">✓</span>
              ) : topic.current ? (
                <Play className="w-5 h-5 text-white fill-white" />
              ) : (
                <span className="text-slate-500">{topic.id}</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-1" style={{ fontWeight: 600 }}>
                {topic.title}
              </h3>
              <p className="text-slate-400 text-sm">{topic.duration}</p>
            </div>
            {topic.current && (
              <div className="bg-purple-500/20 px-3 py-1 rounded-full">
                <span className="text-purple-400 text-sm" style={{ fontWeight: 600 }}>Continue</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="px-6 py-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigateTo('quiz')}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" />
          <span className="text-lg" style={{ fontWeight: 600 }}>Start Quiz</span>
        </motion.button>
      </div>
    </div>
  );
}
