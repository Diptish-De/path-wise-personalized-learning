import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Trophy, TrendingUp, ChevronRight } from 'lucide-react';

interface OnboardingCarouselProps {
  navigateTo: (screen: string) => void;
}

const slides = [
  {
    icon: BookOpen,
    title: 'Learn at Your Pace',
    description: 'Personalized learning paths adapted to your unique style and speed',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    icon: Trophy,
    title: 'Earn Tokens & Rewards',
    description: 'Get rewarded for every lesson completed, quiz aced, and milestone achieved',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: TrendingUp,
    title: 'Build Your Future Path',
    description: 'Track progress, build streaks, and unlock achievements on your learning journey',
    gradient: 'from-teal-500 to-teal-700',
  },
];

export default function OnboardingCarousel({ navigateTo }: OnboardingCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigateTo('login');
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => navigateTo('login')}
          className="text-slate-400 hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <motion.div
          key={currentSlide}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className={`w-32 h-32 bg-gradient-to-br ${slide.gradient} rounded-3xl flex items-center justify-center mb-8 shadow-2xl`}
        >
          <Icon className="w-16 h-16 text-white" />
        </motion.div>

        <motion.h2
          key={`title-${currentSlide}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl text-white text-center mb-4"
          style={{ fontWeight: 700 }}
        >
          {slide.title}
        </motion.h2>

        <motion.p
          key={`desc-${currentSlide}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-300 text-center max-w-sm"
        >
          {slide.description}
        </motion.p>
      </div>

      {/* Dots Indicator */}
      <div className="flex gap-2 justify-center mb-8">
        {slides.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-purple-500' : 'w-2 bg-slate-600'
            }`}
            animate={{
              scale: index === currentSlide ? 1.2 : 1,
            }}
          />
        ))}
      </div>

      {/* Next Button */}
      <div className="px-6 pb-8">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
        >
          <span className="text-lg" style={{ fontWeight: 600 }}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
