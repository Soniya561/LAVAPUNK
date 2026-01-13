// Mock data structure matching the expected FastAPI backend response
export interface Opportunity {
  id: string;
  title: string;
  type: 'Scholarship' | 'Internship' | 'Grant' | 'Hackathon';
  deadline: string; // ISO date string
  eligibility: string;
  link: string;
  source: string; // Source website name
  degree?: string;
  fieldOfInterest?: string;
}

export const mockOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Google Summer of Code 2026',
    type: 'Internship',
    deadline: '2026-01-13T23:59:59Z',
    eligibility: 'Open to all students, 18+ years old',
    link: 'https://internshala.com/internship/details/google-summer-of-code',
    source: 'Internshala',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '2',
    title: 'National Merit Scholarship',
    type: 'Scholarship',
    deadline: '2026-01-15T23:59:59Z',
    eligibility: 'High school seniors with PSAT scores',
    link: 'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-type/academic-scholarships/national-merit-scholarship/',
    source: 'Scholarships.com',
    degree: 'HS',
    fieldOfInterest: 'General'
  },
  {
    id: '3',
    title: 'Microsoft Research Internship',
    type: 'Internship',
    deadline: '2026-02-01T23:59:59Z',
    eligibility: 'CS/EE students, PhD preferred',
    link: 'https://internshala.com/internships/microsoft-internship',
    source: 'Internshala',
    degree: 'MS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '10',
    title: 'Rhodes Scholarship',
    type: 'Scholarship',
    deadline: '2026-03-01T23:59:59Z',
    eligibility: 'Outstanding academic achievement, leadership',
    link: 'https://www.scholarships.com/financial-aid/college-scholarships/scholarships-by-type/academic-scholarships/rhodes-scholarship/',
    source: 'Scholarships.com',
    degree: 'MS',
    fieldOfInterest: 'Research'
  },
  {
    id: '13',
    title: 'MLH Hackathon Season 2026',
    type: 'Hackathon',
    deadline: '2026-01-16T23:59:59Z',
    eligibility: 'Students worldwide, all skill levels',
    link: 'https://devpost.com/hackathons',
    source: 'Devpost',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '14',
    title: 'ETHGlobal Virtual Hackathon',
    type: 'Hackathon',
    deadline: '2026-01-22T23:59:59Z',
    eligibility: 'Blockchain enthusiasts, all backgrounds',
    link: 'https://devpost.com/hackathons/ethglobal',
    source: 'Devpost',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '17',
    title: 'Adobe Creative Challenge',
    type: 'Hackathon',
    deadline: '2026-01-28T23:59:59Z',
    eligibility: 'Students with design and creative skills, Figma or Adobe experience',
    link: 'https://devpost.com/hackathons/adobe-creative-challenge',
    source: 'Devpost',
    degree: 'BS',
    fieldOfInterest: 'Design'
  },
  {
    id: '20',
    title: 'JP Morgan Tech Internship',
    type: 'Internship',
    deadline: '2026-01-19T23:59:59Z',
    eligibility: 'Computer Science students with Java, Python or C++ skills',
    link: 'https://internshala.com/internship/details/jp-morgan-tech-internship',
    source: 'Internshala',
    degree: 'BS',
    fieldOfInterest: 'Finance'
  },
  {
    id: '21',
    title: 'Government STEM Research Grant',
    type: 'Grant',
    deadline: '2026-03-15T23:59:59Z',
    eligibility: 'Research scholars in STEM fields',
    link: 'https://www.india.gov.in/my-government/schemes',
    source: 'Govt Portal',
    degree: 'MS',
    fieldOfInterest: 'Research'
  },
  {
    id: '22',
    title: 'Summer Tech Internship 2026',
    type: 'Internship',
    deadline: '2026-05-20T23:59:59Z',
    eligibility: 'CS/IT Students',
    link: 'https://internshala.com/internships/tech-internship',
    source: 'Internshala',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '23',
    title: 'Global Hackathon Series',
    type: 'Hackathon',
    deadline: '2026-06-15T23:59:59Z',
    eligibility: 'All Developers',
    link: 'https://devpost.com/hackathons/global',
    source: 'Devpost',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '24',
    title: 'Annual Merit Scholarship',
    type: 'Scholarship',
    deadline: '2026-08-30T23:59:59Z',
    eligibility: 'Academic Excellence',
    link: 'https://www.scholarships.com/scholarships',
    source: 'Scholarships.com',
    degree: 'BS',
    fieldOfInterest: 'General'
  },
  {
    id: '25',
    title: 'Fall Internship Program',
    type: 'Internship',
    deadline: '2026-09-15T23:59:59Z',
    eligibility: 'Final Year Students',
    link: 'https://internshala.com/internships',
    source: 'Internshala',
    degree: 'BS',
    fieldOfInterest: 'Finance'
  },
  {
    id: '26',
    title: 'Winter Innovation Grant',
    type: 'Grant',
    deadline: '2026-12-01T23:59:59Z',
    eligibility: 'Innovative Projects',
    link: 'https://www.india.gov.in/my-government/schemes',
    source: 'Govt Portal',
    degree: 'MS',
    fieldOfInterest: 'Design'
  },
  {
    id: '27',
    title: 'Spring Tech Symposium',
    type: 'Hackathon',
    deadline: '2026-04-15T23:59:59Z',
    eligibility: 'All students interested in AI',
    link: 'https://devpost.com/hackathons',
    source: 'Devpost',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '28',
    title: 'Global Leaders Internship',
    type: 'Internship',
    deadline: '2026-07-10T23:59:59Z',
    eligibility: 'Undergraduates with leadership potential',
    link: 'https://internshala.com/internships',
    source: 'Internshala',
    degree: 'BS',
    fieldOfInterest: 'Management'
  },
  {
    id: '29',
    title: 'Future Innovators Scholarship',
    type: 'Scholarship',
    deadline: '2026-10-25T23:59:59Z',
    eligibility: 'High performing students in STEM',
    link: 'https://www.scholarships.com/scholarships',
    source: 'Scholarships.com',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '30',
    title: 'Autumn Research Fellowship',
    type: 'Grant',
    deadline: '2026-11-15T23:59:59Z',
    eligibility: 'Post-graduate researchers',
    link: 'https://www.india.gov.in/my-government/schemes',
    source: 'Govt Portal',
    degree: 'MS',
    fieldOfInterest: 'Research'
  }
];;