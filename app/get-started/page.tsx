'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Trophy, TrendingUp, ChevronRight } from 'lucide-react'

// Import screens from copied pathwise-screens
import HomeDashboard from '@/components/pathwise-screens/HomeDashboard'
import LearningPathScreen from '@/components/pathwise-screens/LearningPathScreen'
import LessonScreen from '@/components/pathwise-screens/LessonScreen'
import QuizQuestion from '@/components/pathwise-screens/QuizQuestion'
import QuizSummary from '@/components/pathwise-screens/QuizSummary'
import AchievementsScreen from '@/components/pathwise-screens/AchievementsScreen'
import StreakCalendar from '@/components/pathwise-screens/StreakCalendar'
import TokenWallet from '@/components/pathwise-screens/TokenWallet'
import StoreHome from '@/components/pathwise-screens/StoreHome'
import ProductDetail from '@/components/pathwise-screens/ProductDetail'
import ProfilePage from '@/components/pathwise-screens/ProfilePage'
import ParentDashboard from '@/components/pathwise-screens/ParentDashboard'
import NotificationsScreen from '@/components/pathwise-screens/NotificationsScreen'
import SearchScreen from '@/components/pathwise-screens/SearchScreen'
import SettingsScreen from '@/components/pathwise-screens/SettingsScreen'
import Sidebar from '@/components/pathwise-sidebar'
import TopNav from '@/components/pathwise-topnav'

export type Screen = 
  | 'onboarding'
  | 'home'
  | 'learning-path'
  | 'lesson'
  | 'quiz'
  | 'quiz-summary'
  | 'achievements'
  | 'streak'
  | 'wallet'
  | 'store'
  | 'product-detail'
  | 'profile'
  | 'parent-dashboard'
  | 'notifications'
  | 'search'
  | 'settings'

const onboardingSlides = [
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
]

function OnboardingCarousel({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const slide = onboardingSlides[currentSlide]
  const Icon = slide.icon

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Skip Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={onComplete}
          className="text-slate-400 hover:text-white transition-colors font-medium"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
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
          className="text-4xl font-bold text-white text-center mb-4"
        >
          {slide.title}
        </motion.h2>

        <motion.p
          key={`desc-${currentSlide}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-300 text-center max-w-sm text-lg"
        >
          {slide.description}
        </motion.p>
      </div>

      {/* Dots Indicator */}
      <div className="flex gap-2 justify-center mb-8 relative z-10">
        {onboardingSlides.map((_, index) => (
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
      <div className="px-6 pb-8 relative z-10">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
        >
          <span className="text-lg font-semibold">
            {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
          </span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  )
}

export default function GetStartedPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding')
  const [userTokens, setUserTokens] = useState(1250)
  const [userStreak, setUserStreak] = useState(7)
  const [userXP, setUserXP] = useState(3450)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showOnboarding, setShowOnboarding] = useState(true)

  const screenProps = {
    navigateTo: (screen: string) => setCurrentScreen(screen as Screen),
    userTokens,
    setUserTokens,
    userStreak,
    setUserStreak,
    userXP,
    setUserXP,
    selectedProduct,
    setSelectedProduct,
  }

  if (showOnboarding) {
    return (
      <OnboardingCarousel 
        onComplete={() => {
          setShowOnboarding(false)
          setCurrentScreen('home')
        }} 
      />
    )
  }

  return (
    <div className="relative w-full min-h-screen bg-slate-950 overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Sidebar */}
      <Sidebar 
        currentScreen={currentScreen as any} 
        navigateTo={setCurrentScreen}
        userTokens={userTokens}
        userStreak={userStreak}
      />

      {/* Top Navigation */}
      <TopNav 
        currentScreen={currentScreen as any}
        navigateTo={setCurrentScreen}
        userXP={userXP}
      />

      {/* Main Content Area */}
      <main className="ml-72 mt-20 min-h-[calc(100vh-5rem)] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-[calc(100vh-5rem)]"
          >
            {currentScreen === 'home' && <HomeDashboard {...screenProps} />}
            {currentScreen === 'learning-path' && <LearningPathScreen {...screenProps} />}
            {currentScreen === 'lesson' && <LessonScreen {...screenProps} />}
            {currentScreen === 'quiz' && <QuizQuestion {...screenProps} />}
            {currentScreen === 'quiz-summary' && <QuizSummary {...screenProps} />}
            {currentScreen === 'achievements' && <AchievementsScreen {...screenProps} />}
            {currentScreen === 'streak' && <StreakCalendar {...screenProps} />}
            {currentScreen === 'wallet' && <TokenWallet {...screenProps} />}
            {currentScreen === 'store' && <StoreHome {...screenProps} />}
            {currentScreen === 'product-detail' && <ProductDetail {...screenProps} />}
            {currentScreen === 'profile' && <ProfilePage {...screenProps} />}
            {currentScreen === 'parent-dashboard' && <ParentDashboard {...screenProps} />}
            {currentScreen === 'notifications' && <NotificationsScreen {...screenProps} />}
            {currentScreen === 'search' && <SearchScreen {...screenProps} />}
            {currentScreen === 'settings' && <SettingsScreen {...screenProps} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
