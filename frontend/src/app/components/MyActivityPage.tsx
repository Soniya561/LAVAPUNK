import { Eye, ExternalLink, Bookmark } from 'lucide-react';
import { UserActivity } from '../types/auth';
import { mockOpportunities } from '../data/mockOpportunities';

interface MyActivityPageProps {
  userActivity: UserActivity;
}

export function MyActivityPage({ userActivity }: MyActivityPageProps) {
  // Get opportunities by IDs
  const viewedOpportunities = mockOpportunities.filter(o => userActivity.viewed.includes(o.id));
  const appliedOpportunities = mockOpportunities.filter(o => userActivity.applied.includes(o.id));
  const savedOpportunities = mockOpportunities.filter(o => userActivity.saved.includes(o.id));

  const ActivityList = ({ opportunities, icon: Icon, title, emptyMessage }: any) => (
    <div className="bg-black border-2 border-[#FFD700] rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-5 h-5 text-[#FFD700]" />
        <h2 className="text-[#FFD700] text-xl">{title}</h2>
        <span className="text-gray-400 text-sm ml-2">({opportunities.length})</span>
      </div>

      {opportunities.length === 0 ? (
        <p className="text-gray-400 text-center py-8">{emptyMessage}</p>
      ) : (
        <div className="space-y-3">
          {opportunities.map((opp: any) => {
            const deadline = new Date(opp.deadline);
            const formattedDeadline = deadline.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            });

            return (
              <div 
                key={opp.id}
                className="border-l-4 border-[#FFD700] pl-4 py-3 hover:bg-[#FFD700] hover:bg-opacity-5 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white text-lg">{opp.title}</h3>
                  <span className="bg-[#FFD700] text-black px-3 py-1 rounded-full text-xs whitespace-nowrap ml-4">
                    {opp.type}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{opp.eligibility}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">
                    Deadline: <span className="text-white">{formattedDeadline}</span>
                  </span>
                  <a
                    href={opp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] hover:text-[#FFC700] text-sm flex items-center gap-1"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black pt-20 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-white text-4xl mb-2">My Activity</h1>
          <p className="text-gray-400">Track your engagement with opportunities</p>
        </div>

        {/* Saved Opportunities */}
        <ActivityList
          opportunities={savedOpportunities}
          icon={Bookmark}
          title="Saved Opportunities"
          emptyMessage="You haven't saved any opportunities yet. Click the bookmark icon on any opportunity to save it for later."
        />

        {/* Recently Applied */}
        <ActivityList
          opportunities={appliedOpportunities}
          icon={ExternalLink}
          title="Recently Applied"
          emptyMessage="You haven't applied to any opportunities yet. Click 'Apply Now' on opportunities you're interested in."
        />

        {/* Recently Viewed */}
        <ActivityList
          opportunities={viewedOpportunities}
          icon={Eye}
          title="Recently Viewed"
          emptyMessage="You haven't viewed any opportunities yet. Browse the opportunities page to get started."
        />
      </div>
    </div>
  );
}
