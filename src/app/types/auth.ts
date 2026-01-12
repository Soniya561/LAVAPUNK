export interface User {
  id: string;
  name: string;
  email: string;
  profile?: UserProfile;
}

export interface UserProfile {
  percentage: number; // 12th grade percentage
  interests: string[]; // Selected interests
  skills: string[]; // Skills extracted from resume
  resumeText?: string; // Resume content for skill extraction
}

export interface UserActivity {
  viewed: string[]; // opportunity IDs
  applied: string[]; // opportunity IDs
  saved: string[]; // opportunity IDs
}