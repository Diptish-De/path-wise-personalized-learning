import { motion } from 'motion/react';
import { CheckCircle2, Lock, Circle, Trophy, Star, BookOpen, Clock, Award } from 'lucide-react';

interface LearningPathScreenProps {
  navigateTo: (screen: string) => void;
}

const pathNodes = [
  { id: 1, title: 'Getting Started', status: 'completed', lessons: 5, xp: 250, duration: '2h 30m' },
  { id: 2, title: 'Fundamentals', status: 'completed', lessons: 8, xp: 400, duration: '4h 15m' },
  { id: 3, title: 'Intermediate Topics', status: 'current', lessons: 6, xp: 350, progress: 67, duration: '3h 20m' },
  { id: 4, title: 'Advanced Concepts', status: 'locked', lessons: 10, xp: 600, duration: '5h 45m' },
  { id: 5, title: 'Expert Mastery', status: 'locked', lessons: 12, xp: 800, duration: '6h 30m' },
  { id: 6, title: 'Final Challenge', status: 'locked', lessons: 3, xp: 1000, isBoss: true, duration: '2h' },
];

export default function LearningPathScreen({ navigateTo }: LearningPathScreenProps) {
  return (
    <div className="w-full min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl text-white mb-2" style={{ fontWeight: 700 }}>Learning Path</h1>
            <p className="text-xl text-slate-400">Mathematics - Class 10</p>
          </div>
          <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-6 border border-purple-500/20">
            <p className="text-sm text-slate-400 mb-2">Overall Progress</p>
            <p className="text-4xl text-purple-400 mb-2" style={{ fontWeight: 700 }}>45%</p>
            <p className="text-sm text-slate-400">13 of 29 lessons</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700"
          >
            <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>13</p>
            <p className="text-sm text-slate-400">Completed</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700"
          >
            <Circle className="w-8 h-8 text-purple-400 mb-3" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>4</p>
            <p className="text-sm text-slate-400">In Progress</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700"
          >
            <Lock className="w-8 h-8 text-slate-500 mb-3" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>27</p>
            <p className="text-sm text-slate-400">Locked</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700"
          >
            <Award className="w-8 h-8 text-yellow-400 mb-3" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>1650</p>
            <p className="text-sm text-slate-400">Total XP</p>
          </motion.div>
        </div>
      </div>

      {/* Path Journey - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Path Nodes */}
        <div className="relative">
          {/* Animated Path Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-800">
            <motion.div
              className="w-full bg-gradient-to-b from-purple-500 via-blue-500 to-teal-500"
              initial={{ height: 0 }}
              animate={{ height: '45%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          {/* Path Nodes */}
          <div className="space-y-6 relative">
            {pathNodes.slice(0, 3).map((node, index) => {
              const isCompleted = node.status === 'completed';
              const isCurrent = node.status === 'current';
              const isLocked = node.status === 'locked';

              return (
                <motion.div
                  key={node.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Node Icon */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      {node.isBoss ? (
                        <motion.div
                          animate={{
                            boxShadow: isLocked
                              ? 'none'
                              : [
                                  '0 0 0 0 rgba(234, 179, 8, 0.7)',
                                  '0 0 0 20px rgba(234, 179, 8, 0)',
                                ],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                            isLocked
                              ? 'bg-slate-800'
                              : 'bg-gradient-to-br from-yellow-500 to-orange-600'
                          }`}
                        >
                          <Trophy className="w-8 h-8 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={!isLocked ? { scale: 1.1 } : {}}
                          className={`w-14 h-14 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? 'bg-gradient-to-br from-green-500 to-teal-600'
                              : isCurrent
                              ? 'bg-gradient-to-br from-purple-500 to-blue-600'
                              : 'bg-slate-800'
                          }`}
                        >
                          {isCompleted && <CheckCircle2 className="w-7 h-7 text-white" />}
                          {isCurrent && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Circle className="w-7 h-7 text-white fill-white" />
                            </motion.div>
                          )}
                          {isLocked && <Lock className="w-7 h-7 text-slate-600" />}
                        </motion.div>
                      )}
                      {!isLocked && !node.isBoss && (
                        <motion.div
                          animate={{
                            boxShadow: [
                              '0 0 0 0 rgba(139, 92, 246, 0.7)',
                              '0 0 0 15px rgba(139, 92, 246, 0)',
                            ],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute inset-0 rounded-full"
                        />
                      )}
                    </div>

                    {/* Node Content */}
                    <motion.button
                      whileHover={!isLocked ? { scale: 1.02, x: 4 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                      onClick={() => !isLocked && navigateTo('lesson')}
                      disabled={isLocked}
                      className={`flex-1 rounded-2xl p-6 text-left transition-all ${
                        isLocked
                          ? 'bg-slate-800/50 cursor-not-allowed border border-slate-700'
                          : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3
                            className={`text-xl mb-2 ${
                              isLocked ? 'text-slate-500' : 'text-white'
                            }`}
                            style={{ fontWeight: 700 }}
                          >
                            {node.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm">
                            <div className={`flex items-center gap-1 ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                              <BookOpen className="w-4 h-4" />
                              <span>{node.lessons} Lessons</span>
                            </div>
                            <div className={`flex items-center gap-1 ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                              <Clock className="w-4 h-4" />
                              <span>{node.duration}</span>
                            </div>
                            <div className={`flex items-center gap-1 ${isLocked ? 'text-slate-600' : 'text-purple-400'}`}>
                              <Star className="w-4 h-4" />
                              <span>{node.xp} XP</span>
                            </div>
                          </div>
                        </div>
                        {isCompleted && (
                          <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full">
                            <Star className="w-4 h-4 text-green-400 fill-green-400" />
                            <span className="text-green-400 text-sm" style={{ fontWeight: 600 }}>
                              Done
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar for Current */}
                      {isCurrent && node.progress && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-400">Progress</span>
                            <span className="text-sm text-purple-400" style={{ fontWeight: 600 }}>
                              {node.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${node.progress}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Remaining Path Nodes */}
        <div className="relative">
          {/* Animated Path Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-slate-800" />

          {/* Path Nodes */}
          <div className="space-y-6 relative">
            {pathNodes.slice(3).map((node, index) => {
              const isCompleted = node.status === 'completed';
              const isCurrent = node.status === 'current';
              const isLocked = node.status === 'locked';

              return (
                <motion.div
                  key={node.id}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: (index + 3) * 0.1 }}
                  className="relative"
                >
                  {/* Node Icon */}
                  <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                      {node.isBoss ? (
                        <motion.div
                          animate={{
                            boxShadow: isLocked
                              ? 'none'
                              : [
                                  '0 0 0 0 rgba(234, 179, 8, 0.7)',
                                  '0 0 0 20px rgba(234, 179, 8, 0)',
                                ],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                            isLocked
                              ? 'bg-slate-800'
                              : 'bg-gradient-to-br from-yellow-500 to-orange-600 shadow-2xl shadow-yellow-500/50'
                          }`}
                        >
                          <Trophy className="w-8 h-8 text-white" />
                        </motion.div>
                      ) : (
                        <motion.div
                          whileHover={!isLocked ? { scale: 1.1 } : {}}
                          className={`w-14 h-14 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? 'bg-gradient-to-br from-green-500 to-teal-600'
                              : isCurrent
                              ? 'bg-gradient-to-br from-purple-500 to-blue-600'
                              : 'bg-slate-800'
                          }`}
                        >
                          {isCompleted && <CheckCircle2 className="w-7 h-7 text-white" />}
                          {isCurrent && (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Circle className="w-7 h-7 text-white fill-white" />
                            </motion.div>
                          )}
                          {isLocked && <Lock className="w-7 h-7 text-slate-600" />}
                        </motion.div>
                      )}
                    </div>

                    {/* Node Content */}
                    <motion.button
                      whileHover={!isLocked ? { scale: 1.02, x: 4 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                      onClick={() => !isLocked && navigateTo('lesson')}
                      disabled={isLocked}
                      className={`flex-1 rounded-2xl p-6 text-left transition-all ${
                        isLocked
                          ? 'bg-slate-800/50 cursor-not-allowed border border-slate-700'
                          : 'bg-slate-800 hover:bg-slate-700 border border-purple-500/20'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3
                            className={`text-xl mb-2 ${
                              isLocked ? 'text-slate-500' : 'text-white'
                            }`}
                            style={{ fontWeight: 700 }}
                          >
                            {node.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm">
                            <div className={`flex items-center gap-1 ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                              <BookOpen className="w-4 h-4" />
                              <span>{node.lessons} Lessons</span>
                            </div>
                            <div className={`flex items-center gap-1 ${isLocked ? 'text-slate-600' : 'text-slate-400'}`}>
                              <Clock className="w-4 h-4" />
                              <span>{node.duration}</span>
                            </div>
                            <div className={`flex items-center gap-1 ${isLocked ? 'text-slate-600' : 'text-purple-400'}`}>
                              <Star className="w-4 h-4" />
                              <span>{node.xp} XP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
