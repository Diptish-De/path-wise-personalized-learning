import { motion } from 'motion/react';
import { Trophy, Zap, Coins, Target, TrendingUp, Home } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';

interface QuizSummaryProps {
  navigateTo: (screen: string) => void;
  userTokens: number;
  userXP: number;
}

const performanceData = [
  { question: 'Q1', score: 100 },
  { question: 'Q2', score: 100 },
  { question: 'Q3', score: 75 },
  { question: 'Q4', score: 100 },
  { question: 'Q5', score: 50 },
  { question: 'Q6', score: 100 },
  { question: 'Q7', score: 100 },
  { question: 'Q8', score: 75 },
  { question: 'Q9', score: 100 },
  { question: 'Q10', score: 100 },
];

export default function QuizSummary({ navigateTo, userTokens, userXP }: QuizSummaryProps) {
  const score = 90;
  const correctAnswers = 9;
  const totalQuestions = 10;
  const tokensEarned = 450;
  const xpEarned = 900;

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="relative h-64 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 overflow-hidden">
        {/* Animated Celebration Background */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-white/30 rounded-full"
            initial={{ 
              x: Math.random() * 400,
              y: Math.random() * 200,
              scale: Math.random() + 0.5
            }}
            animate={{
              y: [null, Math.random() * 200 + 200],
              opacity: [1, 0],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4"
          >
            <Trophy className="w-12 h-12 text-yellow-500" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl text-white mb-2"
            style={{ fontWeight: 700 }}
          >
            {score}%
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-lg"
          >
            Excellent Work!
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/70"
          >
            {correctAnswers} out of {totalQuestions} correct
          </motion.p>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="px-6 -mt-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800 rounded-3xl p-6 shadow-xl"
        >
          <h2 className="text-white mb-4" style={{ fontWeight: 700 }}>Rewards Earned</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-500/30">
              <Coins className="w-8 h-8 text-yellow-500 mb-2" />
              <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>+{tokensEarned}</p>
              <p className="text-sm text-slate-400">Tokens</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-4 border border-purple-500/30">
              <Zap className="w-8 h-8 text-purple-500 mb-2" />
              <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>+{xpEarned}</p>
              <p className="text-sm text-slate-400">XP Points</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Chart */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800 rounded-3xl p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <h2 className="text-white" style={{ fontWeight: 700 }}>Performance Graph</h2>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={performanceData}>
              <XAxis dataKey="question" stroke="#64748b" />
              <Bar dataKey="score" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="bg-slate-800 rounded-2xl p-4">
            <Target className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>95%</p>
            <p className="text-sm text-slate-400">Accuracy</p>
          </div>
          <div className="bg-slate-800 rounded-2xl p-4">
            <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>+15%</p>
            <p className="text-sm text-slate-400">Improvement</p>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8 space-y-3">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigateTo('achievements')}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl shadow-lg shadow-purple-500/30"
        >
          <span className="text-lg" style={{ fontWeight: 600 }}>View Achievements</span>
        </motion.button>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigateTo('home')}
          className="w-full bg-slate-800 text-white py-4 rounded-2xl flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          <span className="text-lg" style={{ fontWeight: 600 }}>Back to Home</span>
        </motion.button>
      </div>
    </div>
  );
}
