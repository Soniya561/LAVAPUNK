import { TrendingUp, Briefcase, Award, Trophy, Sparkles, Code } from 'lucide-react';
import { mockOpportunities } from '../data/mockOpportunities';

interface DashboardPageProps {
  onOpportunityView?: (id: string) => void;
  onOpportunityApply?: (id: string) => void;
}

export function DashboardPage({ onOpportunityView, onOpportunityApply }: DashboardPageProps) {
  const TRUSTED_SOURCES = ["Internshala", "Devpost", "Scholarships.com", "Govt Portal"];

  // Filter available opportunities
  const availableOpportunities = mockOpportunities.filter(opp => {
    // Trusted Source Check
    if (!TRUSTED_SOURCES.includes(opp.source)) return false;

    // Remove expired
    const now = new Date();
    const deadline = new Date(opp.deadline);
    if (deadline < now) return false;

    return true;
  });

  const totalOpportunities = availableOpportunities.length;
  const internships = availableOpportunities.filter(o => o.type === 'Internship').length;
  const scholarships = availableOpportunities.filter(o => o.type === 'Scholarship').length;
  const grants = availableOpportunities.filter(o => o.type === 'Grant').length;
  const hackathons = availableOpportunities.filter(o => o.type === 'Hackathon').length;

  // Get recently added opportunities (last 5)
  const recentlyAdded = availableOpportunities.slice(0, 5);

  return (
    <div className="min-h-screen bg-black pt-20 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-white text-4xl mb-2">Opportunity Intelligence</h1>
          <p className="text-gray-400">Real-time insights into available opportunities</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {/* Total Opportunities */}
          <div className="bg-black border-2 border-[#FFD700] rounded-lg p-6 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#FFD700] bg-opacity-10 p-3 rounded-full border-2 border-[#FFD700]">
                <TrendingUp className="w-6 h-6 text-[#FFD700]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Total Opportunities</p>
            <p className="text-white text-3xl">{totalOpportunities}</p>
          </div>

          {/* Internships */}
          <div className="bg-black border-2 border-[#FFD700] rounded-lg p-6 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#FFD700] bg-opacity-10 p-3 rounded-full border-2 border-[#FFD700]">
                <Briefcase className="w-6 h-6 text-[#FFD700]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Internships</p>
            <p className="text-white text-3xl">{internships}</p>
          </div>

          {/* Scholarships */}
          <div className="bg-black border-2 border-[#FFD700] rounded-lg p-6 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#FFD700] bg-opacity-10 p-3 rounded-full border-2 border-[#FFD700]">
                <Award className="w-6 h-6 text-[#FFD700]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Scholarships</p>
            <p className="text-white text-3xl">{scholarships}</p>
          </div>

          {/* Grants */}
          <div className="bg-black border-2 border-[#FFD700] rounded-lg p-6 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#FFD700] bg-opacity-10 p-3 rounded-full border-2 border-[#FFD700]">
                <Trophy className="w-6 h-6 text-[#FFD700]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Grants</p>
            <p className="text-white text-3xl">{grants}</p>
          </div>

          {/* Hackathons */}
          <div className="bg-black border-2 border-[#FFD700] rounded-lg p-6 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#FFD700] bg-opacity-10 p-3 rounded-full border-2 border-[#FFD700]">
                <Code className="w-6 h-6 text-[#FFD700]" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">Hackathons</p>
            <p className="text-white text-3xl">{hackathons}</p>
          </div>
        </div>

        {/* Recently Added Opportunities */}
        <div className="bg-black border-2 border-[#FFD700] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-[#FFD700] text-2xl">Recently Added Opportunities</h2>
          </div>

          <div className="space-y-4">
            {recentlyAdded.map((opportunity) => {
              const deadline = new Date(opportunity.deadline);
              const formattedDeadline = deadline.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              });

              return (
                <div 
                  key={opportunity.id}
                  onClick={() => onOpportunityView?.(opportunity.id)}
                  className="border-l-4 border-[#FFD700] pl-4 py-2 hover:bg-[#FFD700] hover:bg-opacity-5 transition-colors flex justify-between items-center cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2 mr-4">
                      <h3 className="text-white text-lg">{opportunity.title}</h3>
                      <span className="bg-[#FFD700] text-black px-3 py-1 rounded-full text-xs whitespace-nowrap ml-4">
                        {opportunity.type}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{opportunity.eligibility}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">Deadline: <span className="text-white">{formattedDeadline}</span></span>
                      {opportunity.fieldOfInterest && (
                        <span className="text-gray-500">Field: <span className="text-[#FFD700]">{opportunity.fieldOfInterest}</span></span>
                      )}
                      <span className="text-gray-500">Source: <span className="text-[#FFD700]">{opportunity.source}</span></span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpportunityApply?.(opportunity.id);
                      const SOURCE_URLS: Record<string, string> = {
                        "Internshala": "https://internshala.com/student/dashboard",
                        "Devpost": "https://devpost.com/",
                        "Scholarships.com": "https://www.scholarships.com/",
                        "Govt Portal": "https://www.india.gov.in/my-government/schemes"
                      };
                      const targetUrl = SOURCE_URLS[opportunity.source] || opportunity.link;
                      window.open(targetUrl, '_blank', 'noopener,noreferrer');
                    }}
                    className="bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-[#FFC700] transition-colors text-sm font-medium"
                  >
                    Apply Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}