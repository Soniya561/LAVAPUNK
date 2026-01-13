import { useState } from 'react';
import { Filter } from 'lucide-react';
import { OpportunityCard } from './OpportunityCard';
import { mockOpportunities, Opportunity } from '../data/mockOpportunities';
import { UserActivity } from '../types/auth';

interface OpportunitiesPageProps {
  userActivity?: UserActivity;
  onOpportunityView?: (id: string) => void;
  onOpportunityApply?: (id: string) => void;
  onOpportunitySave?: (id: string) => void;
}

export function OpportunitiesPage({ 
  userActivity, 
  onOpportunityView, 
  onOpportunityApply,
  onOpportunitySave 
}: OpportunitiesPageProps) {
  const [degree, setDegree] = useState<string>('all');
  const [year, setYear] = useState<string>('all');
  const [fieldOfInterest, setFieldOfInterest] = useState<string>('all');
  const [opportunityType, setOpportunityType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const TRUSTED_SOURCES = ["Internshala", "Devpost", "Scholarships.com", "Govt Portal"];

  // Filter opportunities based on selected filters
  const filteredOpportunities = mockOpportunities.filter((opp: Opportunity) => {
    // Basic Trusted Source Check
    if (!TRUSTED_SOURCES.includes(opp.source)) return false;

    // Remove expired opportunities (past deadline)
    const now = new Date();
    const deadline = new Date(opp.deadline);
    if (deadline < now) return false;

    if (degree !== 'all' && opp.degree !== degree) return false;
    if (fieldOfInterest !== 'all' && opp.fieldOfInterest !== fieldOfInterest) return false;
    if (opportunityType !== 'all' && opp.type !== opportunityType) return false;

    // Search Query Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return opp.title.toLowerCase().includes(query) || 
             opp.eligibility.toLowerCase().includes(query);
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-black border-b-2 border-[#FFD700] py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-[#FFD700] text-xl">Filter Opportunities</h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title or eligibility (e.g., 'Google', 'Python')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] placeholder-gray-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Degree Filter */}
            <div>
              <label className="text-white text-sm mb-2 block">Degree</label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              >
                <option value="all">All Degrees</option>
                <option value="HS">High School</option>
                <option value="BS">Bachelor's</option>
                <option value="MS">Master's/PhD</option>
              </select>
            </div>

            {/* Field of Interest Filter */}
            <div>
              <label className="text-white text-sm mb-2 block">Field of Interest</label>
              <select
                value={fieldOfInterest}
                onChange={(e) => setFieldOfInterest(e.target.value)}
                className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              >
                <option value="all">All Fields</option>
                <option value="Tech">Tech</option>
                <option value="Finance">Finance</option>
                <option value="Research">Research</option>
                <option value="Design">Design</option>
                <option value="General">General</option>
              </select>
            </div>

            {/* Opportunity Type Filter */}
            <div>
              <label className="text-white text-sm mb-2 block">Opportunity Type</label>
              <select
                value={opportunityType}
                onChange={(e) => setOpportunityType(e.target.value)}
                className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              >
                <option value="all">All Types</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Internship">Internship</option>
                <option value="Grant">Grant</option>
                <option value="Hackathon">Hackathon</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="text-white text-sm mb-2 block">Year (Mock)</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              >
                <option value="all">All Years</option>
                <option value="freshman">Freshman</option>
                <option value="sophomore">Sophomore</option>
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <p className="text-gray-400">
            Showing <span className="text-[#FFD700]">{filteredOpportunities.length}</span> opportunities
          </p>
        </div>

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity) => (
            <OpportunityCard 
              key={opportunity.id} 
              opportunity={opportunity}
              isViewed={userActivity?.viewed.includes(opportunity.id)}
              isSaved={userActivity?.saved.includes(opportunity.id)}
              onView={onOpportunityView}
              onApply={onOpportunityApply}
              onSave={onOpportunitySave}
            />
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No opportunities found matching your filters.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
