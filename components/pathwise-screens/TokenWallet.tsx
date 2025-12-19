import { motion } from 'motion/react';
import { ChevronLeft, Coins, TrendingUp, Gift, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TokenWalletProps {
  navigateTo: (screen: string) => void;
  userTokens: number;
}

const transactions = [
  { id: 1, type: 'earn', title: 'Quiz Completed', amount: 450, date: 'Today, 2:30 PM' },
  { id: 2, type: 'earn', title: 'Lesson Finished', amount: 200, date: 'Today, 10:15 AM' },
  { id: 3, type: 'spend', title: 'Notebook Purchase', amount: -300, date: 'Yesterday, 4:20 PM' },
  { id: 4, type: 'earn', title: 'Streak Bonus', amount: 100, date: 'Yesterday, 9:00 AM' },
  { id: 5, type: 'earn', title: 'Achievement Unlocked', amount: 500, date: '2 days ago' },
  { id: 6, type: 'spend', title: 'Premium Pen Set', amount: -500, date: '3 days ago' },
];

export default function TokenWallet({ navigateTo, userTokens }: TokenWalletProps) {
  const totalEarned = 5250;
  const totalSpent = 800;

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-yellow-600 via-orange-600 to-yellow-600 px-6 py-6">
        <button onClick={() => navigateTo('home')} className="mb-4">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="text-center">
          <p className="text-white/80 mb-2">Token Balance</p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Coins className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-6xl text-white" style={{ fontWeight: 900 }}>
              {userTokens}
            </h1>
          </motion.div>
          <p className="text-white/70">Pathwise Tokens</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-6 mb-6">
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-slate-800 rounded-2xl p-4"
          >
            <TrendingUp className="w-6 h-6 text-green-400 mb-2" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>{totalEarned}</p>
            <p className="text-sm text-slate-400">Total Earned</p>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800 rounded-2xl p-4"
          >
            <Gift className="w-6 h-6 text-purple-400 mb-2" />
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>{totalSpent}</p>
            <p className="text-sm text-slate-400">Total Spent</p>
          </motion.div>
        </div>
      </div>

      {/* Earning Tips */}
      <div className="px-6 mb-6">
        <h2 className="text-xl text-white mb-4" style={{ fontWeight: 700 }}>Earn More Tokens</h2>
        <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-6 border border-purple-500/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Complete daily lessons</span>
              <span className="text-yellow-400" style={{ fontWeight: 600 }}>+200</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Ace a quiz (90%+)</span>
              <span className="text-yellow-400" style={{ fontWeight: 600 }}>+450</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">7-day streak bonus</span>
              <span className="text-yellow-400" style={{ fontWeight: 600 }}>+500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress to Next Reward */}
      <div className="px-6 mb-6">
        <div className="bg-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white" style={{ fontWeight: 700 }}>Next Reward</h3>
            <span className="text-purple-400" style={{ fontWeight: 600 }}>250 more tokens</span>
          </div>
          <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: '83%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
          <p className="text-slate-400 text-sm mt-2">Premium Stationery Set at 1500 tokens</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-6 pb-8">
        <h2 className="text-xl text-white mb-4" style={{ fontWeight: 700 }}>Recent Activity</h2>
        <div className="space-y-3">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800 rounded-2xl p-4 flex items-center gap-4"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  transaction.type === 'earn'
                    ? 'bg-green-500/20'
                    : 'bg-red-500/20'
                }`}
              >
                {transaction.type === 'earn' ? (
                  <ArrowDownRight className="w-5 h-5 text-green-400" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 text-red-400" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-white mb-1" style={{ fontWeight: 600 }}>
                  {transaction.title}
                </h3>
                <p className="text-slate-400 text-sm">{transaction.date}</p>
              </div>

              <div
                className={`text-lg ${
                  transaction.type === 'earn' ? 'text-green-400' : 'text-red-400'
                }`}
                style={{ fontWeight: 700 }}
              >
                {transaction.amount > 0 ? '+' : ''}{transaction.amount}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
