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
    link: 'https://summerofcode.withgoogle.com',
    source: 'Google Careers',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '2',
    title: 'National Merit Scholarship',
    type: 'Scholarship',
    deadline: '2026-01-15T23:59:59Z',
    eligibility: 'High school seniors with PSAT scores',
    link: 'https://www.nationalmerit.org',
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
    link: 'https://www.microsoft.com/research',
    source: 'Internshala',
    degree: 'MS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '4',
    title: 'Fulbright Scholarship Program',
    type: 'Scholarship',
    deadline: '2026-03-15T23:59:59Z',
    eligibility: 'Graduate students, US citizens',
    link: 'https://us.fulbrightonline.org',
    source: 'Scholarships360',
    degree: 'MS',
    fieldOfInterest: 'Research'
  },
  {
    id: '5',
    title: 'Goldman Sachs Summer Analyst',
    type: 'Internship',
    deadline: '2026-01-20T23:59:59Z',
    eligibility: 'Undergraduate juniors, Finance/Economics major',
    link: 'https://www.goldmansachs.com/careers',
    source: 'WayUp',
    degree: 'BS',
    fieldOfInterest: 'Finance'
  },
  {
    id: '6',
    title: 'NSF Graduate Research Fellowship',
    type: 'Grant',
    deadline: '2026-01-14T23:59:59Z',
    eligibility: 'Graduate students in STEM fields',
    link: 'https://www.nsfgrfp.org',
    source: 'Grants.gov',
    degree: 'MS',
    fieldOfInterest: 'Research'
  },
  {
    id: '7',
    title: 'Meta AI Research Residency',
    type: 'Internship',
    deadline: '2026-02-10T23:59:59Z',
    eligibility: 'Recent graduates with ML/AI experience',
    link: 'https://ai.facebook.com/research',
    source: 'Internshala',
    degree: 'MS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '8',
    title: 'Gates Millennium Scholarship',
    type: 'Scholarship',
    deadline: '2026-01-12T23:59:59Z',
    eligibility: 'Minority students, outstanding academic record',
    link: 'https://www.gmsp.org',
    source: 'Fastweb',
    degree: 'BS',
    fieldOfInterest: 'General'
  },
  {
    id: '9',
    title: 'McKinsey Business Analyst Internship',
    type: 'Internship',
    deadline: '2026-01-25T23:59:59Z',
    eligibility: 'Undergraduate students, all majors',
    link: 'https://www.mckinsey.com/careers',
    source: 'LinkedIn',
    degree: 'BS',
    fieldOfInterest: 'Finance'
  },
  {
    id: '10',
    title: 'Rhodes Scholarship',
    type: 'Scholarship',
    deadline: '2026-03-01T23:59:59Z',
    eligibility: 'Outstanding academic achievement, leadership',
    link: 'https://www.rhodeshouse.ox.ac.uk',
    source: 'Scholarships.com',
    degree: 'MS',
    fieldOfInterest: 'Research'
  },
  {
    id: '11',
    title: 'NASA Pathways Internship',
    type: 'Internship',
    deadline: '2026-02-15T23:59:59Z',
    eligibility: 'STEM students, US citizenship required',
    link: 'https://www.nasa.gov/careers',
    source: 'USAJobs',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '12',
    title: 'Coca-Cola Scholars Program',
    type: 'Scholarship',
    deadline: '2026-01-18T23:59:59Z',
    eligibility: 'High school seniors, community involvement',
    link: 'https://www.coca-colascholarsfoundation.org',
    source: 'Fastweb',
    degree: 'HS',
    fieldOfInterest: 'General'
  },
  {
    id: '13',
    title: 'MLH Hackathon Season 2026',
    type: 'Hackathon',
    deadline: '2026-01-16T23:59:59Z',
    eligibility: 'Students worldwide, all skill levels',
    link: 'https://mlh.io',
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
    link: 'https://ethglobal.com',
    source: 'Devpost',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '15',
    title: 'Harvard Innovation Challenge',
    type: 'Hackathon',
    deadline: '2026-02-05T23:59:59Z',
    eligibility: 'College students with entrepreneurial ideas',
    link: 'https://www.i-lab.harvard.edu',
    source: 'HackerEarth',
    degree: 'BS',
    fieldOfInterest: 'Design'
  },
  {
    id: '16',
    title: 'NIH Research Grant Program',
    type: 'Grant',
    deadline: '2026-03-20T23:59:59Z',
    eligibility: 'Graduate students in biomedical research',
    link: 'https://www.nih.gov',
    source: 'Grants.gov',
    degree: 'MS',
    fieldOfInterest: 'Research'
  },
  {
    id: '17',
    title: 'Adobe Creative Challenge',
    type: 'Hackathon',
    deadline: '2026-01-28T23:59:59Z',
    eligibility: 'Students with design and creative skills, Figma or Adobe experience',
    link: 'https://www.adobe.com/challenges',
    source: 'Devpost',
    degree: 'BS',
    fieldOfInterest: 'Design'
  },
  {
    id: '18',
    title: 'Merit-Based National Scholarship',
    type: 'Scholarship',
    deadline: '2026-02-20T23:59:59Z',
    eligibility: 'Students with 85%+ academic performance',
    link: 'https://www.nationalscholarship.org',
    source: 'Scholarships360',
    degree: 'BS',
    fieldOfInterest: 'General'
  },
  {
    id: '19',
    title: 'Python Data Science Bootcamp Grant',
    type: 'Grant',
    deadline: '2026-02-28T23:59:59Z',
    eligibility: 'Students interested in Python, Data Analysis, and Machine Learning',
    link: 'https://www.datasciencegrant.org',
    source: 'Grants.gov',
    degree: 'BS',
    fieldOfInterest: 'Tech'
  },
  {
    id: '20',
    title: 'JP Morgan Tech Internship',
    type: 'Internship',
    deadline: '2026-01-19T23:59:59Z',
    eligibility: 'Computer Science students with Java, Python or C++ skills',
    link: 'https://www.jpmorgan.com/careers',
    source: 'Internshala',
    degree: 'BS',
    fieldOfInterest: 'Finance'
  }
];