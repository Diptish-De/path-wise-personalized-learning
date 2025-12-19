import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import TopNav from './components/TopNav';
import LoginScreen from './screens/LoginScreen';
import HomeDashboard from './screens/HomeDashboard';
import LearningPathScreen from './screens/LearningPathScreen';
import LessonScreen from './screens/LessonScreen';
import QuizQuestion from './screens/QuizQuestion';
import QuizSummary from './screens/QuizSummary';
import AchievementsScreen from './screens/AchievementsScreen';
import StreakCalendar from './screens/StreakCalendar';
import TokenWallet from './screens/TokenWallet';
import StoreHome from './screens/StoreHome';
import ProductDetail from './screens/ProductDetail';
import ProfilePage from './screens/ProfilePage';
import ParentDashboard from './screens/ParentDashboard';
import NotificationsScreen from './screens/NotificationsScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';

export type Screen = 
  | 'login'
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
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userTokens, setUserTokens] = useState(1250);
  const [userStreak, setUserStreak] = useState(7);
  const [userXP, setUserXP] = useState(3450);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
  };

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  // If not logged in, show login screen
  if (!isLoggedIn) {
    return <LoginScreen {...screenProps} navigateTo={(screen) => {
      if (screen === 'home') {
        handleLogin();
      }
    }} />;
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
        currentScreen={currentScreen} 
        navigateTo={setCurrentScreen}
        userTokens={userTokens}
        userStreak={userStreak}
      />

      {/* Top Navigation */}
      <TopNav 
        currentScreen={currentScreen}
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
  );
}
