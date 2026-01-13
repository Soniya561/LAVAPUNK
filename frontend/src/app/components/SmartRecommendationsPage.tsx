import { Sparkles, TrendingUp, AlertCircle, Edit } from 'lucide-react';
import { User } from '../types/auth';
import { mockOpportunities, Opportunity } from '../data/mockOpportunities';
import { OpportunityCard } from './OpportunityCard';

interface RecommendedOpportunity {
  opportunity: Opportunity;
  reasons: string[];
  score: number;
}

interface SmartRecommendationsPageProps {
  user: User;
  onEditProfile: () => void;
  onOpportunityView?: (id: string) => void;
  onOpportunityApply?: (id: string) => void;
  onOpportunitySave?: (id: string) => void;
}

export function SmartRecommendationsPage({ 
  user, 
  onEditProfile,
  onOpportunityView,
  onOpportunityApply,
  onOpportunitySave
}: SmartRecommendationsPageProps) {
  
  // If no profile, show setup message
  if (!user.profile) {
    return (
      <div className="min-h-screen bg-black pt-20 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black border-2 border-[#FFD700] rounded-lg p-12 text-center">
            <div className="bg-[#FFD700] bg-opacity-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#FFD700]">
              <AlertCircle className="w-10 h-10 text-[#FFD700]" />
            </div>
            <h2 className="text-white text-3xl mb-4">Complete Your Profile</h2>
            <p className="text-gray-400 text-lg mb-8">
              To get personalized opportunity recommendations, please complete your profile with your academic details, interests, and skills.
            </p>
            <button
              onClick={onEditProfile}
              className="bg-[#FFD700] text-black px-8 py-3 rounded-md hover:bg-[#FFC700] transition-colors text-lg"
            >
              Complete Profile Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  const profile = user.profile;

  // Smart matching algorithm
  const getRecommendations = (): RecommendedOpportunity[] => {
    const recommendations: RecommendedOpportunity[] = [];

    mockOpportunities.forEach(opp => {
      const reasons: string[] = [];
      let score = 0;

      // Match by percentage for scholarships and internships
      if (opp.type === 'Scholarship' || opp.type === 'Internship') {
        // Assume minimum 60% for scholarships, 70% for competitive internships
        const minPercentage = opp.type === 'Scholarship' ? 60 : 70;
        if (profile.percentage >= minPercentage) {
          reasons.push('Eligible by Percentage');
          score += 30;
        }
        
        // Bonus for high performers
        if (profile.percentage >= 85) {
          reasons.push('High Academic Performance');
          score += 10;
        }
      }

      // Match by interests
      if (opp.fieldOfInterest && profile.interests.includes(opp.fieldOfInterest)) {
        reasons.push('Matched by Interest');
        score += 25;
      }

      // Match by skills for hackathons and grants
      if (opp.type === 'Hackathon' || opp.type === 'Grant') {
        // Check if any user skills match opportunity requirements
        const relevantSkills = profile.skills.filter(skill => {
          const skillLower = skill.toLowerCase();
          const titleLower = opp.title.toLowerCase();
          const eligibilityLower = opp.eligibility.toLowerCase();
          
          return titleLower.includes(skillLower) || 
                 eligibilityLower.includes(skillLower) ||
                 (opp.fieldOfInterest === 'Tech' && 
                  ['python', 'javascript', 'react', 'java', 'c++', 'machine learning'].some(tech => 
                    skillLower.includes(tech)
                  ));
        });

        if (relevantSkills.length > 0) {
          reasons.push('Matched by Skills');
          score += 30;
        }
      }

      // General interest match for all types
      const generalInterestMatch = profile.interests.some(interest => 
        opp.title.toLowerCase().includes(interest.toLowerCase()) ||
        opp.eligibility.toLowerCase().includes(interest.toLowerCase())
      );

      if (generalInterestMatch && !reasons.includes('Matched by Interest')) {
        reasons.push('Relevant to Your Interests');
        score += 15;
      }

      // Tech field bonus for tech-related skills
      if (opp.fieldOfInterest === 'Tech') {
        const hasTechSkills = profile.skills.some(skill => 
          ['Python', 'JavaScript', 'React', 'Java', 'Machine Learning', 'Data Analysis'].includes(skill)
        );
        if (hasTechSkills && !reasons.includes('Matched by Skills')) {
          reasons.push('Tech Skills Match');
          score += 20;
        }
      }

      // Only recommend if there's at least one matching reason
      if (reasons.length > 0) {
        recommendations.push({ opportunity: opp, reasons, score });
      }
    });

    // Sort by score (highest first)
    return recommendations.sort((a, b) => b.score - a.score);
  };

  const recommendations = getRecommendations();

  // Group recommendations by type
  const scholarshipRecs = recommendations.filter(r => r.opportunity.type === 'Scholarship');
  const internshipRecs = recommendations.filter(r => r.opportunity.type === 'Internship');
  const hackathonRecs = recommendations.filter(r => r.opportunity.type === 'Hackathon');
  const grantRecs = recommendations.filter(r => r.opportunity.type === 'Grant');

  const RecommendationCard = ({ rec }: { rec: RecommendedOpportunity }) => (
    <div className="relative">
      <OpportunityCard
        opportunity={rec.opportunity}
        onView={onOpportunityView}
        onApply={onOpportunityApply}
        onSave={onOpportunitySave}
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {rec.reasons.map((reason, idx) => (
          <span
            key={idx}
            className="bg-[#FFD700] bg-opacity-20 text-[#FFD700] px-3 py-1 rounded-full text-xs border border-[#FFD700]"
          >
            ✓ {reason}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-20 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-[#FFD700]" />
              <h1 className="text-white text-4xl">Smart Recommendations</h1>
            </div>
            <p className="text-gray-400">
              Personalized opportunities based on your profile
            </p>
          </div>
          <button
            onClick={onEditProfile}
            className="flex items-center gap-2 bg-[#FFD700] text-black px-4 py-2 rounded-md hover:bg-[#FFC700] transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Profile Summary */}
        <div className="bg-black border-2 border-[#FFD700] rounded-lg p-6 mb-8">
          <h2 className="text-[#FFD700] text-xl mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Academic Performance</p>
              <p className="text-white text-2xl">{profile.percentage}%</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Interests</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.interests.map((interest, idx) => (
                  <span key={idx} className="bg-[#FFD700] text-black px-2 py-1 rounded text-xs">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Skills</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.skills.slice(0, 5).map((skill, idx) => (
                  <span key={idx} className="bg-[#FFD700] text-black px-2 py-1 rounded text-xs">
                    {skill}
                  </span>
                ))}
                {profile.skills.length > 5 && (
                  <span className="text-gray-400 text-xs px-2 py-1">
                    +{profile.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Stats */}
        <div className="bg-black border-2 border-[#FFD700] rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-[#FFD700] text-xl">Recommendation Summary</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-white text-3xl mb-1">{scholarshipRecs.length}</p>
              <p className="text-gray-400 text-sm">Scholarships</p>
            </div>
            <div className="text-center">
              <p className="text-white text-3xl mb-1">{internshipRecs.length}</p>
              <p className="text-gray-400 text-sm">Internships</p>
            </div>
            <div className="text-center">
              <p className="text-white text-3xl mb-1">{hackathonRecs.length}</p>
              <p className="text-gray-400 text-sm">Hackathons</p>
            </div>
            <div className="text-center">
              <p className="text-white text-3xl mb-1">{grantRecs.length}</p>
              <p className="text-gray-400 text-sm">Grants</p>
            </div>
          </div>
        </div>

        {/* Top Recommendations */}
        {recommendations.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-[#FFD700] text-2xl mb-4">🔥 Top Matches for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.slice(0, 6).map((rec, idx) => (
                  <RecommendationCard key={idx} rec={rec} />
                ))}
              </div>
            </div>

            {/* Scholarships */}
            {scholarshipRecs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-white text-2xl mb-4">💰 Recommended Scholarships</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scholarshipRecs.map((rec, idx) => (
                    <RecommendationCard key={idx} rec={rec} />
                  ))}
                </div>
              </div>
            )}

            {/* Internships */}
            {internshipRecs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-white text-2xl mb-4">💼 Recommended Internships</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {internshipRecs.map((rec, idx) => (
                    <RecommendationCard key={idx} rec={rec} />
                  ))}
                </div>
              </div>
            )}

            {/* Hackathons */}
            {hackathonRecs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-white text-2xl mb-4">💻 Recommended Hackathons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hackathonRecs.map((rec, idx) => (
                    <RecommendationCard key={idx} rec={rec} />
                  ))}
                </div>
              </div>
            )}

            {/* Grants */}
            {grantRecs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-white text-2xl mb-4">🎓 Recommended Grants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {grantRecs.map((rec, idx) => (
                    <RecommendationCard key={idx} rec={rec} />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              No recommendations found based on your current profile.
            </p>
            <button
              onClick={onEditProfile}
              className="text-[#FFD700] hover:text-[#FFC700] transition-colors"
            >
              Try updating your profile to get better matches
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
