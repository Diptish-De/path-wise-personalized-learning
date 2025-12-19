import { motion } from 'motion/react';
import { ChevronLeft, TrendingUp, Clock, Target, BookOpen, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface ParentDashboardProps {
  navigateTo: (screen: string) => void;
}

const weeklyProgress = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 3 },
  { day: 'Wed', hours: 1.5 },
  { day: 'Thu', hours: 4 },
  { day: 'Fri', hours: 2 },
  { day: 'Sat', hours: 3.5 },
  { day: 'Sun', hours: 2 },
];

const performanceTrend = [
  { month: 'Jul', score: 75 },
  { month: 'Aug', score: 78 },
  { month: 'Sep', score: 82 },
  { month: 'Oct', score: 85 },
  { month: 'Nov', score: 90 },
];

export default function ParentDashboard({ navigateTo }: ParentDashboardProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo('profile')}>
            <ChevronLeft className="w-6 h-6 text-slate-400" />
          </button>
          <div>
            <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>Parent Dashboard</h1>
            <p className="text-slate-400 text-sm">Alex's Learning Progress</p>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="p-6">
        <h2 className="text-xl text-white mb-4" style={{ fontWeight: 700 }}>This Week Overview</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-2xl p-4 border border-purple-500/20"
          >
            <Clock className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>18.5h</p>
            <p className="text-sm text-slate-300">Study Time</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-2xl p-4 border border-blue-500/20"
          >
            <BookOpen className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>12</p>
            <p className="text-sm text-slate-300">Lessons Done</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-teal-900/50 to-teal-800/50 rounded-2xl p-4 border border-teal-500/20"
          >
            <Target className="w-6 h-6 text-teal-400 mb-2" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>88%</p>
            <p className="text-sm text-slate-300">Avg. Score</p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-2xl p-4 border border-green-500/20"
          >
            <Award className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>7</p>
            <p className="text-sm text-slate-300">Day Streak</p>
          </motion.div>
        </div>

        {/* Daily Study Hours */}
        <div className="bg-slate-800 rounded-3xl p-6 mb-6">
          <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Daily Study Hours</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyProgress}>
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Bar dataKey="hours" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Trend */}
        <div className="bg-slate-800 rounded-3xl p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-white" style={{ fontWeight: 700 }}>Performance Trend</h3>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={performanceTrend}>
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" domain={[0, 100]} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#14B8A6"
                strokeWidth={3}
                dot={{ fill: '#14B8A6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 bg-green-500/20 border border-green-500/30 rounded-xl p-3">
            <p className="text-green-400 text-sm">
              <span style={{ fontWeight: 700 }}>+15% improvement</span> from last month
            </p>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-slate-800 rounded-3xl p-6 mb-6">
          <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Attendance & Consistency</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Days Active This Month</span>
              <span className="text-white" style={{ fontWeight: 700 }}>23/29</span>
            </div>
            <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                initial={{ width: 0 }}
                animate={{ width: '79%' }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-3xl p-6 border border-blue-500/20">
          <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Teacher Recommendations</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-slate-300 text-sm">
                Alex shows excellent progress in Algebra. Consider advanced problem sets.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-slate-300 text-sm">
                Consistent study pattern observed. Great job maintaining the streak!
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
              <p className="text-slate-300 text-sm">
                Recommend focusing more on Geometry concepts this week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
