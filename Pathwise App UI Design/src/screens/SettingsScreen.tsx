import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Moon, Sun, Volume2, Bell, Lock, User, HelpCircle, LogOut, Type, MessageSquare } from 'lucide-react';

interface SettingsScreenProps {
  navigateTo: (screen: string) => void;
}

export default function SettingsScreen({ navigateTo }: SettingsScreenProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const settingsGroups = [
    {
      title: 'Appearance',
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: 'Dark Mode',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          icon: Type,
          label: 'Font Size',
          type: 'slider',
          value: fontSize,
          onChange: setFontSize,
          min: 12,
          max: 20,
        },
      ],
    },
    {
      title: 'Notifications & Sound',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Volume2,
          label: 'Sound Effects',
          type: 'toggle',
          value: sound,
          onChange: setSound,
        },
      ],
    },
    {
      title: 'Accessibility',
      items: [
        {
          icon: MessageSquare,
          label: 'Text-to-Speech',
          type: 'toggle',
          value: textToSpeech,
          onChange: setTextToSpeech,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Edit Profile',
          type: 'link',
          onClick: () => {},
        },
        {
          icon: Lock,
          label: 'Privacy & Security',
          type: 'link',
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          type: 'link',
          onClick: () => {},
        },
      ],
    },
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo('profile')}>
            <ChevronLeft className="w-6 h-6 text-slate-400" />
          </button>
          <h1 className="text-2xl text-white" style={{ fontWeight: 700 }}>Settings</h1>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="p-6 space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h2 className="text-white mb-3 px-2" style={{ fontWeight: 700 }}>{group.title}</h2>
            <div className="bg-slate-800 rounded-2xl overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className={`p-4 ${
                      itemIndex !== group.items.length - 1 ? 'border-b border-slate-700' : ''
                    }`}
                  >
                    {item.type === 'toggle' && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-purple-400" />
                          <span className="text-white" style={{ fontWeight: 500 }}>{item.label}</span>
                        </div>
                        <button
                          onClick={() => item.onChange(!item.value)}
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            item.value ? 'bg-purple-600' : 'bg-slate-600'
                          }`}
                        >
                          <motion.div
                            className="absolute top-1 w-4 h-4 bg-white rounded-full"
                            animate={{ left: item.value ? '28px' : '4px' }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </button>
                      </div>
                    )}

                    {item.type === 'slider' && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-purple-400" />
                            <span className="text-white" style={{ fontWeight: 500 }}>{item.label}</span>
                          </div>
                          <span className="text-purple-400" style={{ fontWeight: 600 }}>{item.value}px</span>
                        </div>
                        <input
                          type="range"
                          min={item.min}
                          max={item.max}
                          value={item.value}
                          onChange={(e) => item.onChange(Number(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-full outline-none appearance-none slider"
                          style={{
                            background: `linear-gradient(to right, #8B5CF6 0%, #8B5CF6 ${((item.value - item.min!) / (item.max! - item.min!)) * 100}%, #334155 ${((item.value - item.min!) / (item.max! - item.min!)) * 100}%, #334155 100%)`
                          }}
                        />
                      </div>
                    )}

                    {item.type === 'link' && (
                      <button
                        onClick={item.onClick}
                        className="w-full flex items-center justify-between hover:opacity-80 transition-opacity"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-purple-400" />
                          <span className="text-white" style={{ fontWeight: 500 }}>{item.label}</span>
                        </div>
                        <span className="text-slate-500">→</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigateTo('login')}
          className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 py-4 rounded-2xl flex items-center justify-center gap-2 border border-red-600/30 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span style={{ fontWeight: 600 }}>Log Out</span>
        </motion.button>

        {/* App Version */}
        <div className="text-center text-slate-500 text-sm pt-4">
          Pathwise v1.0.0
        </div>
      </div>
    </div>
  );
}
