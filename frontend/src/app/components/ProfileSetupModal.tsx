import { useState } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { UserProfile } from '../types/auth';

interface ProfileSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: UserProfile) => void;
  existingProfile?: UserProfile;
}

const AVAILABLE_INTERESTS = [
  'Tech', 'Finance', 'Research', 'Design', 'General',
  'AI/ML', 'Web Development', 'Data Science', 'Blockchain',
  'Healthcare', 'Education', 'Marketing', 'Entrepreneurship'
];

const COMMON_SKILLS = [
  'Python', 'JavaScript', 'React', 'Node.js', 'Java', 'C++',
  'Machine Learning', 'Data Analysis', 'UI/UX Design', 'SQL',
  'AWS', 'Docker', 'Git', 'Figma', 'Excel', 'Leadership',
  'Communication', 'Project Management', 'Research', 'Writing'
];

export function ProfileSetupModal({ isOpen, onClose, onComplete, existingProfile }: ProfileSetupModalProps) {
  const [percentage, setPercentage] = useState(existingProfile?.percentage.toString() || '');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(existingProfile?.interests || []);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(existingProfile?.skills || []);
  const [resumeText, setResumeText] = useState(existingProfile?.resumeText || '');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAutoExtractSkills = () => {
    // Simple skill extraction by checking if skill keywords appear in resume text
    const extractedSkills = COMMON_SKILLS.filter(skill =>
      resumeText.toLowerCase().includes(skill.toLowerCase())
    );
    setSelectedSkills(extractedSkills);
  };

  const handleSubmit = () => {
    const profile: UserProfile = {
      percentage: parseFloat(percentage),
      interests: selectedInterests,
      skills: selectedSkills,
      resumeText
    };
    onComplete(profile);
    onClose();
  };

  const isStep1Valid = percentage && parseFloat(percentage) >= 0 && parseFloat(percentage) <= 100;
  const isStep2Valid = selectedInterests.length > 0;
  const isStep3Valid = selectedSkills.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-black border-2 border-[#FFD700] rounded-lg p-8 max-w-3xl w-full relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-[#FFD700] text-3xl mb-2">
          {existingProfile ? 'Update Your Profile' : 'Complete Your Profile'}
        </h2>
        <p className="text-gray-400 mb-6">
          Help us personalize opportunity recommendations for you
        </p>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 gap-4">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#FFD700]' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 1 ? 'border-[#FFD700] bg-[#FFD700] bg-opacity-10' : 'border-gray-500'
            }`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <span className="text-sm hidden sm:inline">Academic</span>
          </div>
          <div className="w-8 h-px bg-gray-600"></div>
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#FFD700]' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 2 ? 'border-[#FFD700] bg-[#FFD700] bg-opacity-10' : 'border-gray-500'
            }`}>
              {step > 2 ? <Check className="w-5 h-5" /> : '2'}
            </div>
            <span className="text-sm hidden sm:inline">Interests</span>
          </div>
          <div className="w-8 h-px bg-gray-600"></div>
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#FFD700]' : 'text-gray-500'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
              step >= 3 ? 'border-[#FFD700] bg-[#FFD700] bg-opacity-10' : 'border-gray-500'
            }`}>
              3
            </div>
            <span className="text-sm hidden sm:inline">Skills</span>
          </div>
        </div>

        {/* Step 1: Academic Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="text-white text-lg mb-3 block">
                What's your 12th grade percentage?
              </label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                min="0"
                max="100"
                step="0.01"
                className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-lg"
                placeholder="e.g., 85.5"
              />
              <p className="text-gray-400 text-sm mt-2">
                This helps us recommend scholarships and internships based on eligibility criteria
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className="flex-1 bg-[#FFD700] text-black py-3 rounded-md hover:bg-[#FFC700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-white text-lg mb-3 block">
                What are your fields of interest?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AVAILABLE_INTERESTS.map(interest => (
                  <button
                    key={interest}
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-4 py-3 rounded-md border-2 transition-all ${
                      selectedInterests.includes(interest)
                        ? 'bg-[#FFD700] bg-opacity-20 border-[#FFD700] text-[#FFD700]'
                        : 'bg-black border-gray-600 text-gray-300 hover:border-[#FFD700]'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">
                Select at least one field to help us match relevant opportunities
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!isStep2Valid}
                className="flex-1 bg-[#FFD700] text-black py-3 rounded-md hover:bg-[#FFC700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Skills & Resume */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="text-white text-lg mb-3 block">
                Upload or paste your resume
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full bg-black text-white border-2 border-[#FFD700] rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FFD700] min-h-[150px]"
                placeholder="Paste your resume text here or summarize your skills and experience..."
              />
              <button
                onClick={handleAutoExtractSkills}
                className="mt-2 text-[#FFD700] hover:text-[#FFC700] text-sm flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Auto-extract skills from resume
              </button>
            </div>

            <div>
              <label className="text-white text-lg mb-3 block">
                Select your skills ({selectedSkills.length} selected)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto p-2 border-2 border-gray-700 rounded-md">
                {COMMON_SKILLS.map(skill => (
                  <button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-3 py-2 rounded-md border text-sm transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-[#FFD700] bg-opacity-20 border-[#FFD700] text-[#FFD700]'
                        : 'bg-black border-gray-600 text-gray-300 hover:border-[#FFD700]'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm mt-3">
                These skills will help us recommend hackathons and grants that match your expertise
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isStep3Valid}
                className="flex-1 bg-[#FFD700] text-black py-3 rounded-md hover:bg-[#FFC700] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {existingProfile ? 'Update Profile' : 'Complete Setup'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
