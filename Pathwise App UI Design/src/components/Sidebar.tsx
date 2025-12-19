import { motion } from 'motion/react';
import { 
  Home, 
  BookOpen, 
  Trophy, 
  Flame, 
  Coins, 
  Store, 
  User, 
  Bell, 
  Search,
  Settings,
  LayoutDashboard,
  GraduationCap
} from 'lucide-react';
import type { Screen } from '../App';

interface SidebarProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
  userTokens: number;
  userStreak: number;
}

export default function Sidebar({ currentScreen, navigateTo, userTokens, userStreak }: SidebarProps) {
  const menuItems = [
    { id: 'home' as Screen, icon: Home, label: 'Home' },
    { id: 'learning-path' as Screen, icon: BookOpen, label: 'Learning Paths' },
    { id: 'achievements' as Screen, icon: Trophy, label: 'Achievements' },
    { id: 'streak' as Screen, icon: Flame, label: 'Streak' },
    { id: 'wallet' as Screen, icon: Coins, label: 'Tokens' },
    { id: 'store' as Screen, icon: Store, label: 'Store' },
    { id: 'profile' as Screen, icon: User, label: 'Profile' },
    { id: 'parent-dashboard' as Screen, icon: LayoutDashboard, label: 'Parent Dashboard' },
  ];

  const bottomItems = [
    { id: 'notifications' as Screen, icon: Bell, label: 'Notifications' },
    { id: 'settings' as Screen, icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.div 
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-72 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-r border-purple-500/20 flex flex-col overflow-hidden"
    >
      {/* Logo */}
      <div className="p-6 border-b border-purple-500/20">
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigateTo('home')}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-teal-400 flex items-center justify-center shadow-lg shadow-purple-500/50">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400">
              Pathwise
            </h1>
            <p className="text-xs text-slate-400">Learn Smarter</p>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4 border-b border-purple-500/20">
        <div className="grid grid-cols-2 gap-3">
          <motion.div 
            className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-lg p-3 border border-orange-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <div>
                <p className="text-xs text-slate-400">Streak</p>
                <p className="text-orange-400">{userStreak} days</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-lg p-3 border border-yellow-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-xs text-slate-400">Tokens</p>
                <p className="text-yellow-400">{userTokens}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-2 h-2 rounded-full bg-teal-400"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-purple-500/20 p-3">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
