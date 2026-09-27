export const SYSTEM_CREATOR_PROMPT = `
You are the elite AI Content Strategist and Growth Director for "Creator PGP", a top-tier creator intelligence platform.
Your objective is to provide high-converting, viral-ready, audience-retention optimized assets for YouTube creators and Instagram Reels creators.
Never provide generic, robotic, or spammy outputs. Focus on strong curiosity gaps, high CTR phrasing, retention hooks, search visibility (SEO), and authentic community engagement.
Always reply with valid JSON format matching the requested schema.
`;

export function getTitlePrompt(topic: string, niche: string, tone: string, platform: string, count: number = 5): string {
  return `
Create ${count} high-CTR, high-retention video titles for:
Topic: "${topic}"
Niche: "${niche}"
Tone: "${tone}"
Platform: "${platform}"

Requirements:
- Balance curiosity gap, emotional hook, and clear value proposition.
- Avoid extreme misleading clickbait, but maximize click-through rate.
- Include 1-2 title variations using numbers, psychological framing, or contrarian angles.
- If Generate ×2 is requested, provide 2 distinct thematic angles (Angle A: Curiosity/Story, Angle B: Direct Value/Action).

Return pure JSON:
{
  "titles": [
    {
      "title": "string",
      "angle": "string (e.g. High Curiosity, Direct Solution, Story)",
      "estimatedCtrScore": 88
    }
  ]
}
`;
}

export function getDescriptionPrompt(params: {
  topic?: string;
  script?: string;
  existingTitle?: string;
  niche?: string;
  tone?: string;
}): string {
  return `
Generate a comprehensive, SEO-optimized, human-readable YouTube description based on:
Title: "${params.existingTitle || ''}"
Topic: "${params.topic || ''}"
Script/Notes: "${params.script || ''}"
Niche: "${params.niche || 'General'}"
Tone: "${params.tone || 'Engaging'}"

Required Output Structure:
1. TITLE: Catchy, optimized title.
2. DESCRIPTION: High-ranking first 3 lines (critical for search snippets), followed by value summary, relevant details, and natural conversational flow.
3. CTA: Clear, non-intrusive Call To Action for subscriptions, comments, and links.
4. KEYWORDS: 12-18 highly targeted semantic SEO keywords.
5. CHAPTERS: Realistic, structured video timestamps (00:00 Intro, 01:15 Key Insight, etc.) if context allows.

Return pure JSON:
{
  "title": "string",
  "description": "string",
  "cta": "string",
  "keywords": ["string", "string"],
  "chapters": [
    { "timestamp": "00:00", "title": "Introduction" },
    { "timestamp": "01:24", "title": "The Big Shift" },
    { "timestamp": "03:45", "title": "Step-by-Step Breakdown" },
    { "timestamp": "07:10", "title": "Common Pitfalls to Avoid" },
    { "timestamp": "09:30", "title": "Summary & Next Action" }
  ]
}
`;
}

export function getHashtagsPrompt(params: {
  title?: string;
  topic?: string;
  niche?: string;
  targetAudience?: string;
  platform?: string;
}): string {
  return `
Generate targeted, high-reach, non-spam hashtags based on:
Input Title/Topic: "${params.title || params.topic || ''}"
Niche: "${params.niche || 'Creator'}"
Audience: "${params.targetAudience || 'Broad'}"

Provide separated groups:
1. YouTube Hashtags (3-8 core tags focusing on search intent)
2. Instagram Hashtags (15-25 curated tags categorized into broad, niche, and community)
3. Shorts Hashtags (focused on high-velocity recommendation feed)
4. Reels Hashtags (focused on Instagram explore & audio algorithm)

Return pure JSON:
{
  "youtubeHashtags": ["#Tag1", "#Tag2", "#Tag3"],
  "instagramHashtags": ["#Tag1", "#Tag2"],
  "shortsHashtags": ["#Shorts", "#Tag1"],
  "reelsHashtags": ["#Reels", "#Tag1"]
}
`;
}

export function getDailyVideoIdeasPrompt(params: {
  niche: string;
  audience: string;
  platform: string;
  count: number;
  contentStyle: string;
}): string {
  return `
Act as a viral creator mastermind for Creator PGP.
Generate ${params.count || 3} completely original, high-performing content ideas for:
Niche: "${params.niche}"
Target Audience: "${params.audience}"
Platform: "${params.platform}"
Style: "${params.contentStyle}"

Each idea must be fully fleshed out with:
- VIDEO IDEA: Clear executive summary of the video premise.
- TITLE: High-CTR working title.
- HOOK: First 3-5 seconds verbal hook + visual action that prevents scrolling away.
- DESCRIPTION: 2-sentence synopsis.
- CONTENT ANGLE: Unique twist or perspective (why this stands out from standard videos).
- TAGS: 5 search tags.
- HASHTAGS: 4-6 platform hashtags.
- CTA: Psychological retention CTA.

Return pure JSON:
{
  "ideas": [
    {
      "id": "idea-1",
      "videoIdea": "string",
      "title": "string",
      "hook": "string",
      "description": "string",
      "contentAngle": "string",
      "tags": ["tag1", "tag2"],
      "hashtags": ["#tag1", "#tag2"],
      "cta": "string"
    }
  ]
}
`;
}

export function getSimilarContentPrompt(params: {
  existingTitle: string;
  topic?: string;
  existingIdea?: string;
  description?: string;
}): string {
  return `
Take this content concept and create TWO (2) completely original, distinct variations:
Existing Title: "${params.existingTitle}"
Topic: "${params.topic || ''}"
Idea Context: "${params.existingIdea || ''}"

CRITICAL RULE:
Do NOT simply rephrase or synonym-swap the original title!
- Variation 1 must approach the subject from an analytical, contrarian, or curiosity-driven angle.
- Variation 2 must approach the subject from a fast-paced case study, beginner breakdown, or transformative challenge angle.

Each variation must include:
- New Title
- New 3-second Hook
- New Content Angle
- Description summary
- Hashtags
- CTA

Return pure JSON:
{
  "variation1": {
    "title": "string",
    "hook": "string",
    "angle": "string",
    "description": "string",
    "hashtags": ["#tag1", "#tag2"],
    "cta": "string"
  },
  "variation2": {
    "title": "string",
    "hook": "string",
    "angle": "string",
    "description": "string",
    "hashtags": ["#tag1", "#tag2"],
    "cta": "string"
  }
}
`;
}

export function getThumbnailAnalysisPrompt(): string {
  return `
Analyze this YouTube thumbnail image for visual CTR potential and viewer psychology.
Evaluate these 11 factors strictly on a 0-100 scale:
1. visualAttention (eye-tracking pull)
2. subjectFocus (prominence of primary face/object)
3. textReadability (font weight, contrast, word count under 4 words)
4. mobileReadability (visibility at small 320px/mobile feed size)
5. contrast (color separation between background and foreground)
6. composition (rule of thirds, clean negative space, avoid YouTube timestamp bottom-right obstruction)
7. curiosity (does it create an open loop or question)
8. emotionalImpact (facial expression, tension, excitement)
9. clarity (can a viewer understand the topic in 0.5 seconds)
10. topicRelevance (aligns with creator niche expectations)
11. visualHierarchy (clear 1st, 2nd, and 3rd focal points)

Calculate an overall Click Potential score (0-100) based on weighted average.
Provide 3-4 specific "Why this score" analytical observations.
Provide 3-5 concrete, actionable "How to improve this thumbnail" steps.

Return pure JSON:
{
  "overallScore": 84,
  "categories": {
    "visualAttention": 86,
    "subjectFocus": 88,
    "textReadability": 78,
    "mobileReadability": 74,
    "contrast": 85,
    "composition": 82,
    "curiosity": 90,
    "emotionalImpact": 83,
    "clarity": 89,
    "topicRelevance": 92,
    "visualHierarchy": 81
  },
  "whyThisScore": [
    "High emotional resonance on the primary subject expression creates immediate intrigue.",
    "Strong subject separation from background provides clean visual depth.",
    "Text size may slightly blend into background highlights on low-brightness mobile screens."
  ],
  "improvementSuggestions": [
    "Add a subtle dark drop shadow or stroke behind key text to maximize mobile legibility.",
    "Keep the bottom right corner empty so the YouTube duration timestamp doesn't obscure any important detail.",
    "Increase saturation of the primary focal element by 8-12% to jump out on YouTube dark mode feeds."
  ]
}
`;
}
