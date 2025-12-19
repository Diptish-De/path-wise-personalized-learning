import { motion } from 'motion/react';
import { Home, Map, ShoppingBag, Bell, User } from 'lucide-react';
import type { Screen } from '../App';

interface TabBarProps {
  currentScreen: Screen;
  navigateTo: (screen: Screen) => void;
}

const tabs = [
  { id: 'home' as Screen, icon: Home, label: 'Home' },
  { id: 'learning-path' as Screen, icon: Map, label: 'Path' },
  { id: 'store' as Screen, icon: ShoppingBag, label: 'Store' },
  { id: 'notifications' as Screen, icon: Bell, label: 'Alerts' },
  { id: 'profile' as Screen, icon: User, label: 'Profile' },
];

export default function TabBar({ currentScreen, navigateTo }: TabBarProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800">
      <div className="flex items-center justify-around px-2 py-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;

          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateTo(tab.id)}
              className="relative flex flex-col items-center gap-1 px-4 py-2"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-purple-600/20 rounded-xl"
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                />
              )}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0,
                }}
                transition={{ type: 'spring', damping: 15 }}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isActive ? 'text-purple-400' : 'text-slate-500'
                  }`}
                />
              </motion.div>
              <span
                className={`text-xs ${
                  isActive ? 'text-purple-400' : 'text-slate-500'
                }`}
                style={{ fontWeight: isActive ? 600 : 400 }}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
