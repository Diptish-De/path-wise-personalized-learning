import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Chrome, Check } from 'lucide-react';

interface LoginScreenProps {
  navigateTo: (screen: string) => void;
}

export default function LoginScreen({ navigateTo }: LoginScreenProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [inputValue, setInputValue] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (loginMethod === 'email') {
      setIsValid(value.includes('@') && value.includes('.'));
    } else {
      setIsValid(value.length === 10);
    }
  };

  const handleLogin = () => {
    if (isValid) {
      navigateTo('home');
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="pt-16 px-6 pb-8">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl text-white mb-2"
          style={{ fontWeight: 700 }}
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-400"
        >
          Continue your learning journey
        </motion.p>
      </div>

      {/* Login Methods Toggle */}
      <div className="px-6 mb-8">
        <div className="bg-slate-800 rounded-2xl p-1 flex gap-1">
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              loginMethod === 'email'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>
          <button
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              loginMethod === 'phone'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Phone</span>
          </button>
        </div>
      </div>

      {/* Input Field */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <input
            type={loginMethod === 'email' ? 'email' : 'tel'}
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={loginMethod === 'email' ? 'Enter your email' : 'Enter phone number'}
            className="w-full bg-slate-800 text-white px-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          {isValid && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Continue Button */}
      <div className="px-6 mb-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogin}
          disabled={!isValid}
          className={`w-full py-4 rounded-2xl transition-all ${
            isValid
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span className="text-lg" style={{ fontWeight: 600 }}>Continue</span>
        </motion.button>
      </div>

      {/* Divider */}
      <div className="px-6 mb-8 flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-700" />
        <span className="text-slate-500">or</span>
        <div className="flex-1 h-px bg-slate-700" />
      </div>

      {/* Google Login */}
      <div className="px-6">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigateTo('home')}
          className="w-full bg-white text-slate-900 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg"
        >
          <Chrome className="w-5 h-5" />
          <span style={{ fontWeight: 600 }}>Continue with Google</span>
        </motion.button>
      </div>

      {/* Footer */}
      <div className="flex-1 flex items-end justify-center pb-8">
        <p className="text-slate-500 text-sm">
          By continuing, you agree to our{' '}
          <span className="text-purple-400">Terms & Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
