import { motion } from 'motion/react';
import { ChevronLeft, Trophy, Star, Flame, Target, Zap, Award, Crown } from 'lucide-react';

interface AchievementsScreenProps {
  navigateTo: (screen: string) => void;
}

const achievements = [
  { 
    id: 1, 
    title: 'First Steps', 
    description: 'Complete your first lesson', 
    icon: Star, 
    unlocked: true, 
    color: 'from-yellow-500 to-orange-500',
    progress: 100 
  },
  { 
    id: 2, 
    title: 'Week Warrior', 
    description: 'Maintain a 7-day streak', 
    icon: Flame, 
    unlocked: true, 
    color: 'from-red-500 to-orange-600',
    progress: 100 
  },
  { 
    id: 3, 
    title: 'Quiz Master', 
    description: 'Score 100% on any quiz', 
    icon: Trophy, 
    unlocked: true, 
    color: 'from-purple-500 to-pink-500',
    progress: 100 
  },
  { 
    id: 4, 
    title: 'Token Collector', 
    description: 'Earn 1000 tokens', 
    icon: Award, 
    unlocked: true, 
    color: 'from-teal-500 to-blue-500',
    progress: 100 
  },
  { 
    id: 5, 
    title: 'Speed Learner', 
    description: 'Complete 5 lessons in one day', 
    icon: Zap, 
    unlocked: false, 
    color: 'from-blue-500 to-purple-600',
    progress: 60 
  },
  { 
    id: 6, 
    title: 'Perfect Month', 
    description: 'Maintain a 30-day streak', 
    icon: Flame, 
    unlocked: false, 
    color: 'from-orange-500 to-red-600',
    progress: 23 
  },
  { 
    id: 7, 
    title: 'XP Champion', 
    description: 'Reach 10,000 XP', 
    icon: Target, 
    unlocked: false, 
    color: 'from-green-500 to-teal-600',
    progress: 34 
  },
  { 
    id: 8, 
    title: 'Ultimate Master', 
    description: 'Complete all courses', 
    icon: Crown, 
    unlocked: false, 
    color: 'from-yellow-400 to-yellow-600',
    progress: 12 
  },
];

export default function AchievementsScreen({ navigateTo }: AchievementsScreenProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigateTo('home')}>
            <ChevronLeft className="w-6 h-6 text-slate-400" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>Achievements</h1>
            <p className="text-slate-400 text-sm">{unlockedCount} of {totalCount} unlocked</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(unlockedCount / totalCount) * 100}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="p-6 space-y-4">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;

          return (
            <motion.div
              key={achievement.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-6 overflow-hidden ${
                achievement.unlocked
                  ? 'bg-slate-800'
                  : 'bg-slate-800/50'
              }`}
            >
              {/* Glowing Background for Unlocked */}
              {achievement.unlocked && (
                <motion.div
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-20`}
                />
              )}

              <div className="relative z-10 flex items-start gap-4">
                {/* Icon */}
                <motion.div
                  animate={achievement.unlocked ? {
                    rotate: [0, 10, -10, 0],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    achievement.unlocked
                      ? `bg-gradient-to-br ${achievement.color}`
                      : 'bg-slate-700'
                  }`}
                >
                  <Icon className={`w-8 h-8 ${achievement.unlocked ? 'text-white' : 'text-slate-500'}`} />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className={`text-lg mb-1 ${achievement.unlocked ? 'text-white' : 'text-slate-400'}`}
                    style={{ fontWeight: 700 }}
                  >
                    {achievement.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">
                    {achievement.description}
                  </p>

                  {/* Progress Bar for Locked */}
                  {!achievement.unlocked && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-500">Progress</span>
                        <span className="text-xs text-purple-400" style={{ fontWeight: 600 }}>
                          {achievement.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${achievement.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${achievement.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Unlocked Badge */}
                  {achievement.unlocked && (
                    <div className="inline-flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-green-400 fill-green-400" />
                      <span className="text-green-400 text-sm" style={{ fontWeight: 600 }}>
                        Unlocked
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Card */}
      <div className="px-6 pb-8">
        <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-3xl p-6 border border-purple-500/20">
          <h3 className="text-white mb-4" style={{ fontWeight: 700 }}>Your Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>{unlockedCount}</p>
              <p className="text-xs text-slate-400">Unlocked</p>
            </div>
            <div>
              <p className="text-2xl text-purple-400 mb-1" style={{ fontWeight: 700 }}>{totalCount - unlockedCount}</p>
              <p className="text-xs text-slate-400">In Progress</p>
            </div>
            <div>
              <p className="text-2xl text-yellow-400 mb-1" style={{ fontWeight: 700 }}>2</p>
              <p className="text-xs text-slate-400">This Week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
