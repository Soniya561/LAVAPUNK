# Source Labels Feature Documentation

## Overview
Every opportunity card now displays its trusted source website, enhancing transparency and user confidence.

## Visual Implementation

### Location
- **Top-right corner** of each opportunity card
- Positioned as an absolute overlay to not interfere with card content

### Design
- **Icon**: Globe icon (lucide-react)
- **Label**: "Source: [Website Name]"
- **Colors**: Yellow (#FFD700) text on black background
- **Border**: Yellow border to match Oppify's theme
- **Style**: Subtle yet clearly visible

### Interactive Tooltip
On hover, users see a helpful tooltip:
- **Message**: "Click Apply Now to visit the official website"
- **Style**: Yellow background with black text
- **Position**: Below the source label with a small arrow indicator

## Source Websites Included

### Internships
- **Internshala** - Popular internship platform
- **Google Careers** - Direct company careers page
- **LinkedIn** - Professional networking and job platform
- **WayUp** - Student-focused internship platform
- **USAJobs** - Government jobs portal

### Scholarships
- **Scholarships.com** - Leading scholarship search platform
- **Scholarships360** - Comprehensive scholarship database
- **Fastweb** - Well-known scholarship matching service

### Hackathons
- **Devpost** - Premier hackathon hosting platform
- **HackerEarth** - Coding challenges and hackathons

### Grants
- **Grants.gov** - Official US government grants portal

## Technical Implementation

```typescript
// Opportunity interface includes source field
interface Opportunity {
  id: string;
  title: string;
  type: 'Scholarship' | 'Internship' | 'Grant' | 'Hackathon';
  deadline: string;
  eligibility: string;
  link: string;
  source: string; // ← Source website name
  degree?: string;
  fieldOfInterest?: string;
}
```

## User Benefits

1. **Trust & Credibility**
   - Users can see exactly where opportunities are sourced from
   - Recognized platforms increase confidence in applying

2. **Transparency**
   - No hidden sources or unclear origins
   - Clear attribution for every opportunity

3. **Quick Recognition**
   - Users familiar with certain platforms (e.g., Devpost for hackathons) can quickly identify opportunities
   - Helps users prioritize based on trusted sources

4. **Educational**
   - New users learn about different opportunity platforms
   - Tooltip guides users on how to apply

## Card Layout

```
┌─────────────────────────────────────────────────┐
│                    [Source: Internshala] ← 🌐   │
│  Google Summer of Code 2026        [Internship] │
│                                                  │
│  Open to all students, 18+ years old            │
│                                                  │
│  Deadline: Jan 13, 2026    [Apply Now →]        │
└─────────────────────────────────────────────────┘
```

## Backend Integration

When integrating with your FastAPI backend, ensure the scraper includes source information:

```python
# Example FastAPI response structure
{
  "id": "123",
  "title": "Google Summer of Code 2026",
  "type": "Internship",
  "deadline": "2026-01-13T23:59:59Z",
  "eligibility": "Open to all students, 18+ years old",
  "link": "https://summerofcode.withgoogle.com",
  "source": "Google Careers",  # ← Add this field in scraper
  "degree": "BS",
  "fieldOfInterest": "Tech"
}
```

## Scraping Best Practices

When implementing your web scraper:

1. **Consistent Naming**: Use recognizable source names
   - ✅ "Internshala", "Devpost", "Scholarships.com"
   - ❌ "intern_site_1", "unknown_source"

2. **Track Original URL**: Store both the source name and original URL
   - Helps with debugging and verification
   - Useful for source reliability metrics

3. **Source Verification**: Add source credibility checking
   - Maintain a whitelist of trusted sources
   - Flag new/unverified sources for review

4. **Update Frequency**: Track when each source was last scraped
   - Helps identify stale or broken sources
   - Useful for maintaining data freshness

## Analytics Opportunities

Track user interactions with sources:
- Which sources get the most clicks?
- Do certain sources have higher application rates?
- User preferences by source type
- Source reliability scoring based on user feedback

## Future Enhancements

Potential improvements:
- **Source Logo**: Display actual logos instead of globe icon
- **Source Rating**: Show user ratings for each source platform
- **Source Filter**: Allow filtering opportunities by source
- **Source Stats**: Show how many opportunities come from each source
- **Verified Badge**: Special badge for official company career pages
