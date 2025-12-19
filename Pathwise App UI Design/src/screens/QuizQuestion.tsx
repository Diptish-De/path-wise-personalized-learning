import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Flame, Coins, Zap, Lightbulb } from 'lucide-react';
import Confetti from '../components/Confetti';

interface QuizQuestionProps {
  navigateTo: (screen: string) => void;
  userTokens: number;
  setUserTokens: (tokens: number) => void;
  userStreak: number;
  userXP: number;
  setUserXP: (xp: number) => void;
}

const question = {
  question: 'What is the solution to the equation x² - 5x + 6 = 0?',
  options: [
    { id: 'A', text: 'x = 1, 6', correct: false },
    { id: 'B', text: 'x = 2, 3', correct: true },
    { id: 'C', text: 'x = -2, -3', correct: false },
    { id: 'D', text: 'x = 5, 1', correct: false },
  ],
};

export default function QuizQuestion({
  navigateTo,
  userTokens,
  setUserTokens,
  userStreak,
  userXP,
  setUserXP,
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSelectOption = (optionId: string, correct: boolean) => {
    setSelectedOption(optionId);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setShowConfetti(true);
      setTimeout(() => {
        setUserTokens(userTokens + 50);
        setUserXP(userXP + 100);
      }, 500);
    }
  };

  const handleNext = () => {
    navigateTo('quiz-summary');
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {showConfetti && <Confetti />}

      {/* Header */}
      <div className="bg-slate-900/95 backdrop-blur-lg px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigateTo('lesson')}>
          <X className="w-6 h-6 text-slate-400" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full">
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="text-white text-sm" style={{ fontWeight: 600 }}>{userStreak}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full">
            <Coins className="w-4 h-4 text-yellow-500" />
            <span className="text-white text-sm" style={{ fontWeight: 600 }}>{userTokens}</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-purple-500" />
            <span className="text-white text-sm" style={{ fontWeight: 600 }}>{userXP}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-400 text-sm">Question 5 of 10</span>
          <span className="text-purple-400 text-sm" style={{ fontWeight: 600 }}>50%</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: '50%' }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-6 border border-purple-500/20">
            <h2 className="text-xl text-white" style={{ fontWeight: 600 }}>
              {question.question}
            </h2>
          </div>
        </motion.div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === option.id;
            const showCorrect = showResult && option.correct;
            const showWrong = showResult && isSelected && !option.correct;

            return (
              <motion.button
                key={option.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileTap={!showResult ? { scale: 0.98 } : {}}
                onClick={() => !showResult && handleSelectOption(option.id, option.correct)}
                disabled={showResult}
                className={`w-full p-4 rounded-2xl text-left transition-all relative overflow-hidden ${
                  showCorrect
                    ? 'bg-green-500 border-2 border-green-400'
                    : showWrong
                    ? 'bg-red-500 border-2 border-red-400'
                    : isSelected
                    ? 'bg-purple-600 border-2 border-purple-400'
                    : 'bg-slate-800 hover:bg-slate-700 border-2 border-transparent'
                }`}
              >
                {/* Ripple Effect */}
                {isSelected && !showResult && (
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}

                <div className="flex items-center gap-4 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      showCorrect
                        ? 'bg-white text-green-500'
                        : showWrong
                        ? 'bg-white text-red-500'
                        : isSelected
                        ? 'bg-white text-purple-600'
                        : 'bg-slate-700 text-white'
                    }`}
                    style={{ fontWeight: 700 }}
                  >
                    {showCorrect ? '✓' : showWrong ? '✗' : option.id}
                  </div>
                  <span
                    className={`flex-1 ${
                      showCorrect || showWrong || isSelected ? 'text-white' : 'text-slate-300'
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {option.text}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Result Popup */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t-2 border-purple-500 px-6 py-6"
          >
            {isCorrect ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-white" style={{ fontWeight: 700 }}>Correct!</h3>
                    <p className="text-green-400">Amazing work! Keep it up!</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="flex items-center gap-1 bg-yellow-500/20 px-3 py-2 rounded-xl"
                  >
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="text-yellow-500" style={{ fontWeight: 600 }}>+50</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring' }}
                    className="flex items-center gap-1 bg-purple-500/20 px-3 py-2 rounded-xl"
                  >
                    <Zap className="w-5 h-5 text-purple-500" />
                    <span className="text-purple-500" style={{ fontWeight: 600 }}>+100 XP</span>
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="flex items-center gap-1"
                  >
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className="text-orange-500" style={{ fontWeight: 600 }}>Streak +1</span>
                  </motion.div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💪</span>
                  </div>
                  <div>
                    <h3 className="text-xl text-white" style={{ fontWeight: 700 }}>Not Quite</h3>
                    <p className="text-red-400">Don't worry, let's try again!</p>
                  </div>
                </div>

                <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-blue-400 mb-1" style={{ fontWeight: 600 }}>Hint:</p>
                      <p className="text-slate-300 text-sm">
                        Try factoring the equation into (x - a)(x - b) = 0
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl shadow-lg"
            >
              <span className="text-lg" style={{ fontWeight: 600 }}>Continue</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
