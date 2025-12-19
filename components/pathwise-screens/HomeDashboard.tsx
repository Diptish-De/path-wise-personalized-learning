import { motion } from 'motion/react';
import { Flame, Coins, BookOpen, Trophy, Store, FileText, ChevronRight, Zap, Target, TrendingUp, Award, Clock } from 'lucide-react';

interface HomeDashboardProps {
  navigateTo: (screen: string) => void;
  userTokens: number;
  userStreak: number;
  userXP: number;
}

const recommendedLessons = [
  { id: 1, title: 'Quadratic Equations', subject: 'Mathematics', progress: 65, color: 'from-purple-500 to-purple-700', duration: '45 min' },
  { id: 2, title: 'Photosynthesis', subject: 'Biology', progress: 40, color: 'from-green-500 to-green-700', duration: '30 min' },
  { id: 3, title: 'Newton\'s Laws', subject: 'Physics', progress: 80, color: 'from-blue-500 to-blue-700', duration: '40 min' },
  { id: 4, title: 'Chemical Bonding', subject: 'Chemistry', progress: 25, color: 'from-orange-500 to-orange-700', duration: '35 min' },
];

const recentActivity = [
  { id: 1, action: 'Completed Quiz', subject: 'Mathematics', score: 95, time: '2 hours ago' },
  { id: 2, action: 'Earned Achievement', subject: 'Week Warrior', badge: '🏆', time: '5 hours ago' },
  { id: 3, action: 'Lesson Completed', subject: 'Physics', progress: 100, time: 'Yesterday' },
];

export default function HomeDashboard({ navigateTo, userTokens, userStreak, userXP }: HomeDashboardProps) {
  return (
    <div className="w-full min-h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto p-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-4xl text-white mb-2" style={{ fontWeight: 700 }}>
          Welcome back, Aarav! 👋
        </h1>
        <p className="text-xl text-slate-400">Ready to continue your learning journey?</p>
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Column - Stats & Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards Row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Tokens */}
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('wallet')}
              className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl p-6 shadow-lg relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full"
              />
              <Coins className="w-8 h-8 text-white mb-3" />
              <p className="text-3xl text-white mb-1" style={{ fontWeight: 700 }}>{userTokens}</p>
              <p className="text-sm text-white/80">Tokens</p>
            </motion.button>

            {/* Streak */}
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('streak')}
              className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 shadow-lg relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Flame className="w-8 h-8 text-white mb-3" />
              </motion.div>
              <p className="text-3xl text-white mb-1" style={{ fontWeight: 700 }}>{userStreak}</p>
              <p className="text-sm text-white/80">Day Streak</p>
            </motion.button>

            {/* XP */}
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('profile')}
              className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-6 shadow-lg"
            >
              <Zap className="w-8 h-8 text-white mb-3" />
              <p className="text-3xl text-white mb-1" style={{ fontWeight: 700 }}>{userXP}</p>
              <p className="text-sm text-white/80">Total XP</p>
            </motion.button>
          </div>

          {/* Today's Progress Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-3xl p-8 relative overflow-hidden border border-purple-500/20"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="relative flex items-center justify-between">
              <div className="flex-1">
                <p className="text-slate-400 mb-2">Today's Progress</p>
                <h3 className="text-4xl text-white mb-6" style={{ fontWeight: 700 }}>75% Complete</h3>
                <div className="flex gap-3 mb-6">
                  <Target className="w-6 h-6 text-teal-400" />
                  <span className="text-lg text-slate-300">3 of 4 goals achieved</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateTo('learning-path')}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl shadow-lg shadow-purple-500/30 flex items-center gap-2"
                >
                  Continue Learning
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="52" stroke="currentColor" strokeWidth="10" fill="none" className="text-slate-700" />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="52"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="none"
                    className="text-teal-400"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 326.7', strokeDashoffset: 0 }}
                    animate={{ strokeDasharray: '245 326.7', strokeDashoffset: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-3xl text-white" style={{ fontWeight: 700 }}>
                  75%
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recommended Lessons */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl text-white" style={{ fontWeight: 700 }}>Recommended for You</h2>
              <button className="text-purple-400 hover:text-purple-300 transition-colors">View All →</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {recommendedLessons.map((lesson, index) => (
                <motion.button
                  key={lesson.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigateTo('lesson')}
                  className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 text-left group border border-slate-700 hover:border-purple-500/50 transition-all"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${lesson.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <BookOpen className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg text-white mb-2" style={{ fontWeight: 600 }}>{lesson.title}</h3>
                  <p className="text-slate-400 mb-1">{lesson.subject}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Clock className="w-4 h-4" />
                    {lesson.duration}
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${lesson.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${lesson.progress}%` }}
                      transition={{ duration: 1, delay: 0.7 + index * 0.1 }}
                    />
                  </div>
                  <p className="text-sm text-slate-400 mt-2">{lesson.progress}% complete</p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions & Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div>
            <h2 className="text-2xl text-white mb-4" style={{ fontWeight: 700 }}>Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('quiz')}
                className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-5 text-left shadow-lg"
              >
                <Trophy className="w-7 h-7 text-white mb-2" />
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>Practice Quiz</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('store')}
                className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl p-5 text-left shadow-lg"
              >
                <Store className="w-7 h-7 text-white mb-2" />
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>Store</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigateTo('achievements')}
                className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-5 text-left shadow-lg"
              >
                <Award className="w-7 h-7 text-white mb-2" />
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>Achievements</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 text-left shadow-lg"
              >
                <FileText className="w-7 h-7 text-white mb-2" />
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>Notes</p>
              </motion.button>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl text-white mb-4" style={{ fontWeight: 700 }}>Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-slate-800/70 backdrop-blur-sm rounded-xl p-4 border border-slate-700"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-white" style={{ fontWeight: 600 }}>{activity.action}</p>
                      <p className="text-slate-400 text-sm">{activity.subject}</p>
                    </div>
                    {activity.badge && <span className="text-2xl">{activity.badge}</span>}
                    {activity.score && (
                      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm">
                        {activity.score}%
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Performance Chart */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-2xl p-6 border border-purple-500/20"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <h3 className="text-lg text-white" style={{ fontWeight: 600 }}>This Week</h3>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Lessons Completed</span>
                  <span className="text-white">12</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Quizzes Passed</span>
                  <span className="text-white">8</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Study Hours</span>
                  <span className="text-white">15h</span>
                </div>
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                    initial={{ width: 0 }}
                    animate={{ width: '90%' }}
                    transition={{ duration: 1, delay: 1.1 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
