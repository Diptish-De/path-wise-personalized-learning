import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  navigateTo: (screen: string) => void;
}

export default function SplashScreen({ navigateTo }: SplashScreenProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900">
      {/* Animated Background Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          initial={{ 
            x: Math.random() * 400, 
            y: Math.random() * 800,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            y: [null, Math.random() * 800],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Logo Container */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Glowing Logo Background */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 20px rgba(139, 92, 246, 0.5)',
              '0 0 60px rgba(59, 130, 246, 0.8)',
              '0 0 20px rgba(139, 92, 246, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-2xl"
        />

        {/* Logo */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="relative w-24 h-24 bg-gradient-to-br from-purple-400 via-blue-400 to-teal-400 rounded-2xl flex items-center justify-center mb-6"
        >
          <Sparkles className="w-12 h-12 text-white" />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl text-white mb-3 tracking-tight"
          style={{ fontWeight: 700 }}
        >
          Pathwise
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-purple-200 text-center px-8"
        >
          Shape Your Learning Path
        </motion.p>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
