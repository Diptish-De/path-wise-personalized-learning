import { motion } from 'motion/react';
import { Settings, Trophy, Flame, Zap, BookOpen, Target, Calendar, Edit2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ProfilePageProps {
  navigateTo: (screen: string) => void;
  userTokens: number;
  userStreak: number;
  userXP: number;
}

const progressData = [
  { name: 'Completed', value: 45, color: '#8B5CF6' },
  { name: 'Remaining', value: 55, color: '#334155' },
];

const stats = [
  { label: 'Lessons Done', value: 127, icon: BookOpen, color: 'text-purple-400' },
  { label: 'Quizzes Passed', value: 45, icon: Target, color: 'text-blue-400' },
  { label: 'Study Hours', value: 89, icon: Calendar, color: 'text-teal-400' },
  { label: 'Achievements', value: 12, icon: Trophy, color: 'text-yellow-400' },
];

export default function ProfilePage({ navigateTo, userTokens, userStreak, userXP }: ProfilePageProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 px-6 py-4 flex justify-between items-start">
          <button onClick={() => navigateTo('settings')} className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
            <Settings className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
            <Edit2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-20 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-800 rounded-3xl p-6 shadow-xl"
        >
          {/* Avatar & Name */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative z-20 w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-4xl">👨‍🎓</span>
            </div>
            <h2 className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>Alex Johnson</h2>
            <p className="text-slate-400">Class 10 - Mathematics Stream</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-slate-700/50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Zap className="w-4 h-4 text-purple-400" />
                <p className="text-lg text-white" style={{ fontWeight: 700 }}>{userXP}</p>
              </div>
              <p className="text-xs text-slate-400">XP</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <p className="text-lg text-white" style={{ fontWeight: 700 }}>{userStreak}</p>
              </div>
              <p className="text-xs text-slate-400">Streak</p>
            </div>
            <div className="bg-slate-700/50 rounded-xl p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <p className="text-lg text-white" style={{ fontWeight: 700 }}>12</p>
              </div>
              <p className="text-xs text-slate-400">Badges</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Course Progress */}
      <div className="px-6 mb-6">
        <h2 className="text-xl text-white mb-4" style={{ fontWeight: 700 }}>Course Progress</h2>
        <div className="bg-slate-800 rounded-3xl p-6">
          <div className="flex items-center gap-6">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl text-white" style={{ fontWeight: 700 }}>45%</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-white mb-2" style={{ fontWeight: 600 }}>Mathematics Stream</h3>
              <p className="text-slate-400 text-sm mb-3">127 of 280 lessons completed</p>
              <button
                onClick={() => navigateTo('learning-path')}
                className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm"
                style={{ fontWeight: 600 }}
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Stats */}
      <div className="px-6 mb-6">
        <h2 className="text-xl text-white mb-4" style={{ fontWeight: 700 }}>Learning Stats</h2>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-800 rounded-2xl p-4"
              >
                <Icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-8">
        <h2 className="text-xl text-white mb-4" style={{ fontWeight: 700 }}>Quick Actions</h2>
        <div className="space-y-3">
          <button
            onClick={() => navigateTo('achievements')}
            className="w-full bg-slate-800 hover:bg-slate-700 rounded-2xl p-4 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white" style={{ fontWeight: 600 }}>View Achievements</span>
            </div>
            <span className="text-slate-500">→</span>
          </button>

          <button
            onClick={() => navigateTo('parent-dashboard')}
            className="w-full bg-slate-800 hover:bg-slate-700 rounded-2xl p-4 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-white" style={{ fontWeight: 600 }}>Parent Dashboard</span>
            </div>
            <span className="text-slate-500">→</span>
          </button>

          <button
            onClick={() => navigateTo('settings')}
            className="w-full bg-slate-800 hover:bg-slate-700 rounded-2xl p-4 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-purple-400" />
              <span className="text-white" style={{ fontWeight: 600 }}>Settings & Privacy</span>
            </div>
            <span className="text-slate-500">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
