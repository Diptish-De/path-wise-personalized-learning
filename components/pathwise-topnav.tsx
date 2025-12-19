import { motion } from 'motion/react';
import { Search, Bell, User, Sparkles, Star } from 'lucide-react';
import type { Screen } from '../App';

interface TopNavProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
  userXP: number;
}

export default function TopNav({ currentScreen, navigateTo, userXP }: TopNavProps) {
  const getPageTitle = () => {
    const titles: Record<Screen, string> = {
      'splash': 'Welcome',
      'onboarding': 'Get Started',
      'login': 'Sign In',
      'home': 'Dashboard',
      'learning-path': 'Learning Paths',
      'lesson': 'Lesson',
      'quiz': 'Quiz',
      'quiz-summary': 'Quiz Results',
      'achievements': 'Achievements',
      'streak': 'Streak Calendar',
      'wallet': 'Token Wallet',
      'store': 'Store',
      'product-detail': 'Product Details',
      'profile': 'Profile',
      'parent-dashboard': 'Parent Dashboard',
      'notifications': 'Notifications',
      'search': 'Search',
      'settings': 'Settings',
    };
    return titles[currentScreen] || 'Pathwise';
  };

  const level = Math.floor(userXP / 1000) + 1;
  const xpInLevel = userXP % 1000;
  const xpToNextLevel = 1000;
  const levelProgress = (xpInLevel / xpToNextLevel) * 100;

  return (
    <motion.div 
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-72 right-0 h-20 bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20 z-40"
    >
      <div className="h-full px-8 flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl text-white">{getPageTitle()}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <p className="text-sm text-slate-400">Level {level}</p>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden ml-2">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-teal-400"
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-slate-500">{xpInLevel}/{xpToNextLevel} XP</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <motion.button
            onClick={() => navigateTo('search')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-400">Search courses...</span>
          </motion.button>

          {/* Notifications */}
          <motion.button
            onClick={() => navigateTo('notifications')}
            className="relative w-11 h-11 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell className="w-5 h-5 text-slate-400" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xs text-white">
              3
            </span>
          </motion.button>

          {/* Profile */}
          <motion.button
            onClick={() => navigateTo('profile')}
            className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/30 hover:to-blue-600/30 rounded-xl border border-purple-500/30 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-sm text-white">Aarav Kumar</p>
              <p className="text-xs text-slate-400">Student</p>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
