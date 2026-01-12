import { Sparkles, Award, Briefcase, Trophy, Code } from 'lucide-react';

interface LandingPageProps {
  onExplore: () => void;
}

export function LandingPage({ onExplore }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background accent elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFD700] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#FFD700] opacity-10 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Logo/Brand */}
          <div className="mb-8 flex items-center justify-center gap-3">
            <Sparkles className="w-12 h-12 text-[#FFD700]" />
            <h1 className="text-[#FFD700] text-5xl md:text-6xl tracking-tight">Oppify</h1>
          </div>

          {/* Hero Title */}
          <h2 className="text-white text-4xl md:text-6xl mb-6 leading-tight">
            Never Miss an Opportunity Again
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-lg md:text-2xl mb-12 max-w-3xl mx-auto">
            Scholarships, internships, grants, and hackathons – all in one place
          </p>

          {/* CTA Button */}
          <button
            onClick={onExplore}
            className="bg-[#FFD700] text-black px-12 py-4 rounded-lg text-xl hover:bg-[#FFC700] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105"
          >
            Explore Opportunities
          </button>

          {/* Feature Icons */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-[#FFD700] bg-opacity-10 p-5 rounded-full mb-4 border-2 border-[#FFD700]">
                <Award className="w-10 h-10 text-[#FFD700]" />
              </div>
              <h3 className="text-white text-lg mb-2">Scholarships</h3>
              <p className="text-gray-400 text-sm">Fund your education</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-[#FFD700] bg-opacity-10 p-5 rounded-full mb-4 border-2 border-[#FFD700]">
                <Briefcase className="w-10 h-10 text-[#FFD700]" />
              </div>
              <h3 className="text-white text-lg mb-2">Internships</h3>
              <p className="text-gray-400 text-sm">Build your career</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-[#FFD700] bg-opacity-10 p-5 rounded-full mb-4 border-2 border-[#FFD700]">
                <Trophy className="w-10 h-10 text-[#FFD700]" />
              </div>
              <h3 className="text-white text-lg mb-2">Grants</h3>
              <p className="text-gray-400 text-sm">Research funding</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-[#FFD700] bg-opacity-10 p-5 rounded-full mb-4 border-2 border-[#FFD700]">
                <Code className="w-10 h-10 text-[#FFD700]" />
              </div>
              <h3 className="text-white text-lg mb-2">Hackathons</h3>
              <p className="text-gray-400 text-sm">Build & compete</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Oppify Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-[#FFD700] text-3xl md:text-4xl mb-4">
            Why Oppify?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stop wasting time searching multiple platforms. Get everything in one intelligent dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-black border-2 border-[#FFD700] rounded-lg p-8 text-center hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all">
            <div className="bg-[#FFD700] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#FFD700]">
              <Sparkles className="w-8 h-8 text-[#FFD700]" />
            </div>
            <h3 className="text-white text-xl mb-3">Real-Time Updates</h3>
            <p className="text-gray-400">
              Get the latest opportunities as soon as they're posted. Never miss a deadline.
            </p>
          </div>

          <div className="bg-black border-2 border-[#FFD700] rounded-lg p-8 text-center hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all">
            <div className="bg-[#FFD700] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#FFD700]">
              <Award className="w-8 h-8 text-[#FFD700]" />
            </div>
            <h3 className="text-white text-xl mb-3">Personalized Filters</h3>
            <p className="text-gray-400">
              Filter by degree, field, and type to find opportunities that match your profile.
            </p>
          </div>

          <div className="bg-black border-2 border-[#FFD700] rounded-lg p-8 text-center hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all">
            <div className="bg-[#FFD700] bg-opacity-10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#FFD700]">
              <Briefcase className="w-8 h-8 text-[#FFD700]" />
            </div>
            <h3 className="text-white text-xl mb-3">Track Your Progress</h3>
            <p className="text-gray-400">
              Save opportunities, track applications, and monitor your activity all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-white text-3xl md:text-5xl mb-6">
          Ready to discover your next opportunity?
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Join students worldwide who are staying ahead with Oppify
        </p>
        <button
          onClick={onExplore}
          className="bg-[#FFD700] text-black px-10 py-4 rounded-lg text-xl hover:bg-[#FFC700] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:scale-105"
        >
          Get Started Now
        </button>
      </div>
    </div>
  );
}
