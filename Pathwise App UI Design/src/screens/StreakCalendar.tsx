import { motion } from 'motion/react';
import { ChevronLeft, Flame, Trophy, Calendar } from 'lucide-react';

interface StreakCalendarProps {
  navigateTo: (screen: string) => void;
  userStreak: number;
}

const daysInMonth = 30;
const currentDay = 29;
const activeDays = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 27, 28, 29];

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function StreakCalendar({ navigateTo, userStreak }: StreakCalendarProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-orange-600 via-red-600 to-orange-600 px-6 py-6">
        <button onClick={() => navigateTo('home')} className="mb-4">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-white mb-2" style={{ fontWeight: 700 }}>
              Streak Calendar
            </h1>
            <p className="text-white/80">November 2025</p>
          </div>

          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, -10, 10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
          >
            <Flame className="w-10 h-10 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Current Streak Card */}
      <div className="px-6 -mt-6 mb-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-800 rounded-3xl p-6 shadow-xl"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-2"
              style={{ fontWeight: 900 }}
            >
              {userStreak}
            </motion.div>
            <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>Day Streak</p>
            <p className="text-slate-400">Keep it up! You're on fire! 🔥</p>
          </div>
        </motion.div>
      </div>

      {/* Calendar */}
      <div className="px-6 mb-6">
        <div className="bg-slate-800 rounded-3xl p-6">
          {/* Week Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {weekDays.map((day) => (
              <div key={day} className="text-center">
                <span className="text-slate-500 text-xs" style={{ fontWeight: 600 }}>{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for alignment (assuming month starts on Wednesday) */}
            {[...Array(3)].map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Days */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isActive = activeDays.includes(day);
              const isCurrent = day === currentDay;

              return (
                <motion.div
                  key={day}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                  className="relative aspect-square"
                >
                  <div
                    className={`w-full h-full rounded-xl flex items-center justify-center relative ${
                      isActive
                        ? 'bg-gradient-to-br from-orange-500 to-red-600'
                        : 'bg-slate-700'
                    }`}
                  >
                    {isCurrent && isActive && (
                      <motion.div
                        animate={{
                          boxShadow: [
                            '0 0 0 0 rgba(249, 115, 22, 0.7)',
                            '0 0 0 8px rgba(249, 115, 22, 0)',
                          ],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-xl"
                      />
                    )}
                    <span
                      className={`text-sm ${
                        isActive ? 'text-white' : 'text-slate-500'
                      }`}
                      style={{ fontWeight: isActive ? 700 : 400 }}
                    >
                      {day}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.01 + 0.2 }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Streak Milestones */}
      <div className="px-6 mb-6">
        <h2 className="text-xl text-white mb-4" style={{ fontWeight: 700 }}>Streak Milestones</h2>
        <div className="space-y-3">
          {[
            { days: 7, reward: '100 Tokens', unlocked: true },
            { days: 14, reward: '250 Tokens', unlocked: false, progress: 50 },
            { days: 30, reward: '500 Tokens + Badge', unlocked: false, progress: 23 },
            { days: 100, reward: '2000 Tokens + Crown', unlocked: false, progress: 7 },
          ].map((milestone, index) => (
            <motion.div
              key={milestone.days}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-4 ${
                milestone.unlocked
                  ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30'
                  : 'bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    milestone.unlocked
                      ? 'bg-gradient-to-br from-orange-500 to-red-600'
                      : 'bg-slate-700'
                  }`}
                >
                  {milestone.unlocked ? (
                    <Trophy className="w-6 h-6 text-white" />
                  ) : (
                    <Flame className="w-6 h-6 text-slate-500" />
                  )}
                </div>

                <div className="flex-1">
                  <h3
                    className={`mb-1 ${milestone.unlocked ? 'text-white' : 'text-slate-300'}`}
                    style={{ fontWeight: 600 }}
                  >
                    {milestone.days} Day Streak
                  </h3>
                  <p className="text-sm text-slate-400">{milestone.reward}</p>

                  {!milestone.unlocked && milestone.progress && (
                    <div className="mt-2">
                      <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${milestone.progress}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {milestone.unlocked && (
                  <div className="bg-green-500/20 px-3 py-1 rounded-full">
                    <span className="text-green-400 text-sm" style={{ fontWeight: 600 }}>Done</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 pb-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-400" />
            <h3 className="text-white" style={{ fontWeight: 700 }}>This Month</h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl text-white mb-1" style={{ fontWeight: 700 }}>{activeDays.length}</p>
              <p className="text-xs text-slate-400">Active Days</p>
            </div>
            <div>
              <p className="text-2xl text-orange-400 mb-1" style={{ fontWeight: 700 }}>{userStreak}</p>
              <p className="text-xs text-slate-400">Current Streak</p>
            </div>
            <div>
              <p className="text-2xl text-green-400 mb-1" style={{ fontWeight: 700 }}>12</p>
              <p className="text-xs text-slate-400">Best Streak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
