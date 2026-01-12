import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { OpportunitiesPage } from './components/OpportunitiesPage';
import { DashboardPage } from './components/DashboardPage';
import { MyActivityPage } from './components/MyActivityPage';
import { SmartRecommendationsPage } from './components/SmartRecommendationsPage';
import { LoginModal } from './components/LoginModal';
import { LogoutModal } from './components/LogoutModal';
import { ProfileSetupModal } from './components/ProfileSetupModal';
import { User, UserActivity, UserProfile } from './types/auth';

/**
 * Oppify - Real-Time Student Opportunity Intelligence Platform
 * 
 * Main App Structure:
 * - Landing Page: Public hero section with CTA
 * - Opportunities Page: Browse and filter all opportunities (public or authenticated)
 * - Smart Recommendations: AI-powered personalized opportunity matching (authenticated only)
 * - Dashboard: Stats and recently added opportunities (authenticated only)
 * - My Activity: Track viewed, applied, and saved opportunities (authenticated only)
 * 
 * Features:
 * - Black (#000000) + Yellow (#FFD700) theme
 * - Login/Signup with modals
 * - Profile-based smart recommendations with reasoning tags
 * - Academic percentage and skill-based matching
 * - Save/bookmark opportunities
 * - Track views and applications
 * - Filter by degree, year, field, and type
 * - Urgent deadline highlighting (< 3 days)
 * 
 * Backend Integration:
 * Replace mockOpportunities in /src/app/data/mockOpportunities.ts with API calls to your FastAPI backend
 */

type Page = 'landing' | 'opportunities' | 'recommendations' | 'dashboard' | 'activity';
type LoginMode = 'login' | 'signup';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [userActivity, setUserActivity] = useState<UserActivity>({
    viewed: [],
    applied: [],
    saved: []
  });
  
  // Modal states
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [loginMode, setLoginMode] = useState<LoginMode>('login');

  // Navigation handler
  const handleNavigate = (page: Page) => {
    setCurrentPage(page as Page);
  };

  // Login handlers
  const handleLoginClick = () => {
    setLoginMode('login');
    setIsLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setLoginMode('signup');
    setIsLoginModalOpen(true);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setCurrentPage('opportunities');
    
    // If user doesn't have a profile, prompt them to create one
    if (!newUser.profile) {
      setTimeout(() => {
        setIsProfileSetupOpen(true);
      }, 500);
    }
  };

  const handleSwitchMode = () => {
    setLoginMode(prev => prev === 'login' ? 'signup' : 'login');
  };

  // Profile handlers
  const handleProfileComplete = (profile: UserProfile) => {
    if (user) {
      setUser({
        ...user,
        profile
      });
      // Navigate to recommendations page after profile setup
      setCurrentPage('recommendations');
    }
  };

  const handleEditProfile = () => {
    setIsProfileSetupOpen(true);
  };

  // Logout handlers
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutConfirm = () => {
    setUser(null);
    setUserActivity({
      viewed: [],
      applied: [],
      saved: []
    });
    setCurrentPage('landing');
    setIsLogoutModalOpen(false);
  };

  // Opportunity interaction handlers
  const handleOpportunityView = (id: string) => {
    if (!user) return;
    
    setUserActivity(prev => ({
      ...prev,
      viewed: prev.viewed.includes(id) ? prev.viewed : [...prev.viewed, id]
    }));
  };

  const handleOpportunityApply = (id: string) => {
    if (!user) return;
    
    setUserActivity(prev => ({
      ...prev,
      applied: prev.applied.includes(id) ? prev.applied : [...prev.applied, id]
    }));
  };

  const handleOpportunitySave = (id: string) => {
    if (!user) return;
    
    setUserActivity(prev => ({
      ...prev,
      saved: prev.saved.includes(id) 
        ? prev.saved.filter(savedId => savedId !== id)
        : [...prev.saved, id]
    }));
  };

  return (
    <div className="size-full bg-black">
      {/* Navbar - shown on all pages except landing when not logged in */}
      {(currentPage !== 'landing' || user) && (
        <Navbar
          user={user}
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
          onLogoutClick={handleLogoutClick}
        />
      )}

      {/* Page Rendering */}
      {currentPage === 'landing' && (
        <LandingPage onExplore={() => handleNavigate('opportunities')} />
      )}

      {currentPage === 'opportunities' && (
        <OpportunitiesPage
          userActivity={user ? userActivity : undefined}
          onOpportunityView={user ? handleOpportunityView : undefined}
          onOpportunityApply={user ? handleOpportunityApply : undefined}
          onOpportunitySave={user ? handleOpportunitySave : undefined}
        />
      )}

      {currentPage === 'recommendations' && user && (
        <SmartRecommendationsPage
          user={user}
          onEditProfile={handleEditProfile}
          onOpportunityView={handleOpportunityView}
          onOpportunityApply={handleOpportunityApply}
          onOpportunitySave={handleOpportunitySave}
        />
      )}

      {currentPage === 'dashboard' && user && (
        <DashboardPage />
      )}

      {currentPage === 'activity' && user && (
        <MyActivityPage userActivity={userActivity} />
      )}

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
        mode={loginMode}
        onSwitchMode={handleSwitchMode}
      />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />

      <ProfileSetupModal
        isOpen={isProfileSetupOpen}
        onClose={() => setIsProfileSetupOpen(false)}
        onComplete={handleProfileComplete}
        existingProfile={user?.profile}
      />
    </div>
  );
}