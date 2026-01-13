import { ExternalLink, Bookmark, BookmarkCheck, Globe } from 'lucide-react';
import { Opportunity } from '../data/mockOpportunities';
import { useState } from 'react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  isViewed?: boolean;
  isSaved?: boolean;
  onView?: (id: string) => void;
  onApply?: (id: string) => void;
  onSave?: (id: string) => void;
}

export function OpportunityCard({ 
  opportunity, 
  isViewed, 
  isSaved, 
  onView, 
  onApply, 
  onSave 
}: OpportunityCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  // Calculate if deadline is urgent (less than 3 days)
  const isUrgent = () => {
    const deadline = new Date(opportunity.deadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 3 && daysUntilDeadline >= 0;
  };

  // Format deadline
  const formatDeadline = () => {
    const deadline = new Date(opportunity.deadline);
    return deadline.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const urgent = isUrgent();

  const handleCardClick = () => {
    if (onView) {
      onView(opportunity.id);
    }
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onApply) {
      onApply(opportunity.id);
    }
    
    const SOURCE_URLS: Record<string, string> = {
      "Internshala": "https://internshala.com/student/dashboard",
      "Devpost": "https://devpost.com/",
      "Scholarships.com": "https://www.scholarships.com/",
      "Govt Portal": "https://www.india.gov.in/my-government/schemes"
    };

    const targetUrl = SOURCE_URLS[opportunity.source] || opportunity.link;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSave) {
      onSave(opportunity.id);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`bg-black border-2 border-[#FFD700] rounded-lg p-6 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300 group cursor-pointer relative ${
        isViewed ? 'opacity-90' : ''
      }`}
    >
      {/* Source Label - Top Right */}
      <div 
        className="absolute top-3 right-3 flex items-center gap-1 bg-black border border-[#FFD700] px-2 py-1 rounded text-xs"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Globe className="w-3 h-3 text-[#FFD700]" />
        <span className="text-[#FFD700]">Source: {opportunity.source}</span>
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-[#FFD700] text-black text-xs px-3 py-2 rounded shadow-lg z-10">
            Click Apply Now to visit the official website
            <div className="absolute -top-1 right-4 w-2 h-2 bg-[#FFD700] transform rotate-45"></div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mb-3 pr-32">
        <h3 className="text-white text-xl">{opportunity.title}</h3>
        <div className="flex items-center gap-2">
          <span className="bg-[#FFD700] text-black px-3 py-1 rounded-full text-sm whitespace-nowrap">
            {opportunity.type}
          </span>
          {onSave && (
            <button
              onClick={handleSaveClick}
              className="text-[#FFD700] hover:text-[#FFC700] transition-colors p-1"
              title={isSaved ? "Remove from saved" : "Save for later"}
            >
              {isSaved ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
      
      <p className="text-gray-300 mb-4 text-sm">{opportunity.eligibility}</p>
      
      <div className="flex justify-between items-center">
        <div>
          <span className="text-gray-400 text-sm">Deadline: </span>
          <span className={urgent ? "text-red-500" : "text-white"}>
            {formatDeadline()}
          </span>
          {urgent && <span className="text-red-500 text-xs ml-2">(URGENT)</span>}
        </div>
        
        <button
          onClick={handleApplyClick}
          className="bg-[#FFD700] text-black px-5 py-2 rounded-md hover:bg-[#FFC700] transition-colors duration-200 flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]"
        >
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}