import { Sparkles, LogOut, LayoutDashboard, Briefcase, Activity, Lightbulb } from 'lucide-react';
import { User } from '../types/auth';

interface NavbarProps {
  user: User | null;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
}

export function Navbar({ user, currentPage, onNavigate, onLoginClick, onSignupClick, onLogoutClick }: NavbarProps) {
  return (
    <nav className="bg-black border-b-2 border-[#FFD700] px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <Sparkles className="w-6 h-6 text-[#FFD700]" />
          <span className="text-[#FFD700] text-2xl">Oppify</span>
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {/* Authenticated Navigation */}
              <button
                onClick={() => onNavigate('opportunities')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'opportunities'
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white hover:text-[#FFD700]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Opportunities
              </button>

              <button
                onClick={() => onNavigate('recommendations')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors relative ${
                  currentPage === 'recommendations'
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white hover:text-[#FFD700]'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
                <span className="hidden md:inline">Smart Recommendations</span>
                <span className="md:hidden">Recommendations</span>
                {!user.profile && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FFD700] rounded-full animate-pulse"></span>
                )}
              </button>
              
              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white hover:text-[#FFD700]'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>

              <button
                onClick={() => onNavigate('activity')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  currentPage === 'activity'
                    ? 'bg-[#FFD700] text-black'
                    : 'text-white hover:text-[#FFD700]'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span className="hidden lg:inline">My Activity</span>
                <span className="lg:hidden">Activity</span>
              </button>

              <div className="h-6 w-px bg-[#FFD700] hidden sm:block"></div>

              <div className="text-white text-sm hidden sm:block">
                Welcome, <span className="text-[#FFD700]">{user.name}</span>
              </div>

              <button
                onClick={onLogoutClick}
                className="flex items-center gap-2 bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-[#FFC700] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              {/* Public Navigation */}
              <button
                onClick={() => onNavigate('opportunities')}
                className="text-white hover:text-[#FFD700] transition-colors px-4 py-2"
              >
                Opportunities
              </button>
              
              <button
                onClick={onLoginClick}
                className="text-white hover:text-[#FFD700] transition-colors px-4 py-2"
              >
                Login
              </button>

              <button
                onClick={onSignupClick}
                className="bg-[#FFD700] text-black px-6 py-2 rounded-md hover:bg-[#FFC700] transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}