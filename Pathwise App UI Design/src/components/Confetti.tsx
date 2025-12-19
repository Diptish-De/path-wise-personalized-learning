import { motion } from 'motion/react';

export default function Confetti() {
  const colors = ['#8B5CF6', '#3B82F6', '#14B8A6', '#F59E0B', '#EF4444', '#EC4899'];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {[...Array(50)].map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const startX = Math.random() * 100;
        const rotation = Math.random() * 720 - 360;
        
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              left: `${startX}%`,
              top: '-10%',
            }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: window.innerHeight * 1.2,
              x: (Math.random() - 0.5) * 200,
              opacity: [1, 1, 0],
              rotate: rotation,
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
}
