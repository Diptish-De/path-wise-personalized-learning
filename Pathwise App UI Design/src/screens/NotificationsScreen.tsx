import { motion } from 'motion/react';
import { Bell, Trophy, Flame, Gift, BookOpen, X } from 'lucide-react';
import { useState } from 'react';

interface NotificationsScreenProps {
  navigateTo: (screen: string) => void;
}

const initialNotifications = [
  {
    id: 1,
    type: 'achievement',
    icon: Trophy,
    title: 'New Achievement Unlocked!',
    message: 'You earned "Quiz Master" badge',
    time: '5 min ago',
    unread: true,
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 2,
    type: 'streak',
    icon: Flame,
    title: 'Streak Alert!',
    message: 'Keep your 7-day streak going!',
    time: '1 hour ago',
    unread: true,
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 3,
    type: 'reward',
    icon: Gift,
    title: 'Token Bonus',
    message: 'You received 100 bonus tokens',
    time: '3 hours ago',
    unread: false,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    type: 'lesson',
    icon: BookOpen,
    title: 'New Lesson Available',
    message: 'Quadratic Equations - Part 2',
    time: 'Yesterday',
    unread: false,
    color: 'from-blue-500 to-teal-500',
  },
  {
    id: 5,
    type: 'achievement',
    icon: Trophy,
    title: 'Milestone Reached',
    message: 'Completed 100 lessons!',
    time: '2 days ago',
    unread: false,
    color: 'from-yellow-500 to-orange-500',
  },
];

export default function NotificationsScreen({ navigateTo }: NotificationsScreenProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.unread);

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>Notifications</h1>
          <Bell className="w-6 h-6 text-purple-400" />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}
            style={{ fontWeight: 600 }}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-xl transition-all ${
              filter === 'unread'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400'
            }`}
            style={{ fontWeight: 600 }}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-6 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500">No notifications</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => {
            const Icon = notification.icon;

            return (
              <motion.div
                key={notification.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative bg-slate-800 rounded-2xl p-4 ${
                  notification.unread ? 'border-l-4 border-purple-500' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${notification.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-white" style={{ fontWeight: 600 }}>
                        {notification.title}
                      </h3>
                      <button
                        onClick={() => handleDismiss(notification.id)}
                        className="text-slate-500 hover:text-slate-300 transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs">
                        {notification.time}
                      </span>
                      {notification.unread && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
