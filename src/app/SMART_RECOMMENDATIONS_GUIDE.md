# Smart Recommendations Feature Guide

## Overview
The Smart Recommendations dashboard analyzes user profiles to provide personalized opportunity recommendations with transparent reasoning tags.

## How It Works

### 1. Profile Setup (3-Step Process)
When a user logs in for the first time, they are prompted to complete their profile:

**Step 1: Academic Information**
- Enter 12th grade percentage (0-100)
- Used for scholarship and internship eligibility matching

**Step 2: Interests**
- Select fields of interest (Tech, Finance, Research, Design, etc.)
- Matches opportunities by field relevance

**Step 3: Skills & Resume**
- Paste resume text
- Auto-extract or manually select skills
- Skills used to match hackathons and grants

### 2. Smart Matching Algorithm

The recommendation engine scores opportunities based on:

#### For Scholarships & Internships:
- **Academic Percentage Match**: Minimum thresholds (60% for scholarships, 70% for internships)
- **High Performance Bonus**: Extra points for 85%+ academic performance
- **Interest Alignment**: Matches field of interest

#### For Hackathons & Grants:
- **Skill Matching**: Analyzes user skills against opportunity requirements
- **Interest Relevance**: Checks title and eligibility for interest keywords
- **Tech Skills Bonus**: Special matching for tech-related opportunities

### 3. Reasoning Tags

Each recommendation includes transparent reasoning tags:
- ✓ **Eligible by Percentage**: Meets academic criteria
- ✓ **High Academic Performance**: 85%+ percentage
- ✓ **Matched by Interest**: Field matches user interests
- ✓ **Matched by Skills**: Skills align with opportunity needs
- ✓ **Relevant to Your Interests**: General interest alignment
- ✓ **Tech Skills Match**: Tech-specific skill matching

### 4. Scoring System
- Percentage eligibility: +30 points
- High performance: +10 points
- Interest match: +25 points
- Skills match: +30 points
- General relevance: +15 points
- Tech skills: +20 points

Recommendations are sorted by total score (highest first).

## User Experience Flow

1. **New User**:
   - Sign up/Login → Profile Setup Modal → Complete 3 steps → Auto-navigate to Recommendations

2. **Returning User with Profile**:
   - Login → Navigate to Smart Recommendations → See personalized matches

3. **User without Profile**:
   - Login → Click Smart Recommendations → Prompted to complete profile

4. **Editing Profile**:
   - Click "Edit Profile" button → Modify any step → Updated recommendations instantly

## Key Features

### Profile Summary Card
Shows current profile data:
- Academic percentage
- Selected interests
- Skills (top 5 shown, with "+X more" indicator)

### Recommendation Stats
Quick overview of matches by type:
- Total Scholarships recommended
- Total Internships recommended
- Total Hackathons recommended
- Total Grants recommended

### Categorized Recommendations
Opportunities grouped by type with reasoning tags:
- 🔥 Top Matches (Top 6 highest-scoring)
- 💰 Recommended Scholarships
- 💼 Recommended Internships
- 💻 Recommended Hackathons
- 🎓 Recommended Grants

### Visual Indicators
- Pulsing yellow dot on navbar if profile incomplete
- Reasoning tags with yellow accent
- Hover effects on cards

## Backend Integration

To connect with your FastAPI backend:

```typescript
// Replace the mock matching in SmartRecommendationsPage.tsx
const getRecommendations = async () => {
  const response = await fetch('https://your-backend.com/api/recommendations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      percentage: profile.percentage,
      interests: profile.interests,
      skills: profile.skills
    })
  });
  return await response.json();
};
```

## Example Profile for Testing

Try this profile to see diverse recommendations:
- **Percentage**: 87.5
- **Interests**: Tech, Research, AI/ML
- **Skills**: Python, JavaScript, React, Machine Learning, Data Analysis

This will match:
- Scholarships (high academic performance)
- Tech internships (skills + interests)
- ML/AI hackathons (skills match)
- Data science grants (skills + interests)

## Future Enhancements

Potential improvements for production:
- Machine learning-based matching
- Deadline urgency weighting
- Past application success rates
- Collaborative filtering (users like you also applied to...)
- Email notifications for new matching opportunities
- Save search preferences
