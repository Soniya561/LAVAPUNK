import { useState } from 'react';
import { X } from 'lucide-react';
import { User } from '../types/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
  mode: 'login' | 'signup';
  onSwitchMode: () => void;
}

export function LoginModal({ isOpen, onClose, onLogin, mode, onSwitchMode }: LoginModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login/signup - in production this would call your backend API
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: mode === 'signup' ? name : email.split('@')[0],
      email: email
    };

    onLogin(user);
    onClose();
    
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-black border-2 border-[#FFD700] rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-[#FFD700] text-3xl mb-2">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-400 mb-6">
          {mode === 'login' 
            ? 'Login to access your personalized dashboard' 
            : 'Join Oppify to never miss an opportunity'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="text-white text-sm mb-2 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                placeholder="John Doe"
              />
            </div>
          )}

          <div>
            <label className="text-white text-sm mb-2 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-white text-sm mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFD700] text-black py-3 rounded-md hover:bg-[#FFC700] transition-colors text-lg"
          >
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchMode}
            className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm"
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
