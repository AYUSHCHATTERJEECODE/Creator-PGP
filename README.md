# Creator PGP — AI Creator Studio & YouTube Growth Platform

> **Official Brand Name:** Creator PGP  
> **Tagline:** AI Creator Studio + YouTube Growth Dashboard + Content Generation Suite + Thumbnail Intelligence Tool

---

## 🚀 Overview

**Creator PGP** is a complete production-ready full-stack AI creator platform engineered specifically for YouTube and Instagram creators. It replaces fragmented creator tools by uniting high-CTR content ideation, automated description formatting, viral hashtag grouping, 11-factor thumbnail vision analysis, background removal, multi-channel YouTube analytics, and persistent project workspaces in a unified, mobile-first experience.

---

## 🎨 Official Brand Identity & Reference Logo

- **Exact Brand Spelling:** `Creator PGP`
- **Official Brand Logo:** Located at `public/logo.png` (and `public/logo.jpg`, `app/icon.png`) using the official glowing neon creator icon reference with play button and surrounding creator tools.
- Preserved brand proportions, neon accents (cyan `#06b6d4`, electric blue `#3b82f6`, radiant purple `#8b5cf6`, and amber `#f59e0b`), and dark glassmorphic studio interface.
- Deployed across the header, desktop sidebar, mobile top bar, login modal, onboarding flow, and browser favicon/app icons.

---

## 📱 Mobile-First Architecture & Android/iOS App Readiness

The platform is designed from the foundation for mobile devices and future native Android/iOS packaging:
1. **Responsive Viewports:** Tested for 375px–430px iPhone/Android screens up to 4K ultra-wide monitors.
2. **Thumb-Friendly Bottom Navigation:** Instant one-handed access to Dashboard, AI Content, Thumbnails, YouTube, and More.
3. **Slide-Over Drawer:** Quick drawer access to Saved Projects, Content History, and Settings.
4. **Touch Target Dimensions:** All buttons and interactive touch targets strictly meet or exceed 44×44px.
5. **Zero Horizontal Overflow:** Strict containment with scrollable code blocks, responsive data tables, and card transformations.
6. **PWA Standalone Support:** Includes web app manifest properties, theme colors, and home-screen install instructions.

---

## 🏗️ Architecture & Project Structure

```
creator-pgp/
├── app/
│   ├── api/
│   │   ├── ai/
│   │   │   ├── title/route.ts                # High-CTR Title Generation
│   │   │   ├── description/route.ts          # SEO Descriptions + Chapters + CTA
│   │   │   ├── hashtags/route.ts             # YouTube & Instagram Hashtags
│   │   │   ├── video-ideas/route.ts          # Daily Video Generator
│   │   │   ├── similar-content/route.ts      # Two-angle Similar Content Engine
│   │   │   └── thumbnail-analysis/route.ts   # 11-Factor Vision AI Analysis
│   │   ├── image/
│   │   │   └── background-remove/route.ts    # AI Background Remover (Transparent PNG)
│   │   ├── youtube/
│   │   │   ├── channels/route.ts             # Channel management & OAuth dispatch
│   │   │   └── analytics/route.ts            # Growth metrics & Planning data
│   │   ├── projects/route.ts                 # Project CRUD
│   │   └── history/route.ts                  # Persistent Content History
│   ├── globals.css                           # Glassmorphism, Neon glow tokens & mobile CSS
│   ├── layout.tsx                            # SEO Meta tags, Favicons, PWA Viewport
│   └── page.tsx                              # Master Application Hub & State Orchestrator
├── components/
│   ├── BrandIcons.tsx                        # Official YouTube & Instagram SVGs
│   ├── ChannelSwitcher.tsx                   # Multi-channel dropdown + Planning Mode switch
│   ├── LoadingSkeleton.tsx                   # Shimmer cards & AI processing state
│   ├── MobileNav.tsx                         # Fixed mobile bottom bar & slide drawer
│   ├── Navbar.tsx                            # Desktop header with search & channel switcher
│   ├── Sidebar.tsx                           # Desktop/tablet collapsible navigation
│   └── Toast.tsx                             # Notification toast alert system
├── features/
│   ├── ai-content/
│   │   └── AIContentStudioView.tsx           # Title, Desc, Hashtags, Daily Video, Similar x2
│   ├── auth/
│   │   ├── AuthModal.tsx                     # Google Sign-in & Email authentication
│   │   └── OnboardingModal.tsx               # Creator personalization questionnaire
│   ├── dashboard/
│   │   └── DashboardView.tsx                 # Overview metrics, quick actions, recent history
│   ├── history/
│   │   └── ContentHistoryView.tsx            # Persistent searchable generation history
│   ├── instagram/
│   │   └── InstagramToolsView.tsx            # Reel hooks, captions, audio pairings
│   ├── landing/
│   │   └── LandingPage.tsx                   # Public showcase, features, pricing, FAQ
│   ├── projects/
│   │   └── SavedProjectsView.tsx             # Multi-asset folder organization
│   ├── settings/
│   │   └── SettingsView.tsx                  # Profile, quotas, API keys, mobile guide
│   └── thumbnail-ai/
│       ├── BackgroundRemoverView.tsx         # Edge-aware transparent PNG extraction
│       └── ThumbnailAnalyzerView.tsx         # 11-factor vision score & improvement steps
├── services/
│   ├── ai/
│   │   ├── aiService.ts                      # Centralized AI prompt execution layer
│   │   ├── geminiClient.ts                   # Google Gemini API client & fallback parser
│   │   └── promptTemplates.ts                # Structured prompt engineering templates
│   ├── database/
│   │   └── dbService.ts                      # Persistence layer for user, history, projects
│   ├── image/
│   │   └── imageProcessingService.ts         # Client canvas matting & PNG downloader
│   └── youtube/
│       └── youtubeService.ts                 # Channel profile, OAuth URL & analytics model
├── types/
│   └── index.ts                              # Core TypeScript interfaces & entities
├── config/
│   └── constants.ts                          # Brand definitions, tiers, niches & tones
└── public/
    ├── logo.png                              # Official Creator PGP brand logo
    └── logo.jpg                              # Official Creator PGP brand logo
```

---

## ⚡ Core Features & Capabilities

### 1. High-CTR Title Engine & Generate ×2 System
- Generates retention-tested titles categorized by psychological curiosity gap, direct value, or contrarian angles.
- Wherever **Generate ×2** is selected, the platform produces **two completely independent variations** with distinct hooks and wording.

### 2. Text → Description Generator
- Generates YouTube descriptions with search snippet optimization, natural readable copy, psychological CTAs, target keyword lists, and automatic chapter timestamps (`00:00 Intro`, `01:30 The Shift`, etc.).

### 3. Title → Hashtag & Viral Hashtags Generator
- Curates separated hashtag groups for **YouTube**, **Instagram**, **YouTube Shorts**, and **Instagram Reels**.
- Features single-tag copy, group copy, and full bundle copy.

### 4. Daily Video Generator
- Generates complete content blueprints with video premise, working title, 3-second opening hook, content angle, tags, hashtags, and retention CTA.

### 5. Similar Content Generator
- Ingests existing topics and creates **Variation 1** (analytical/contrarian) and **Variation 2** (first-person case study/experiment) without synonym-swapping.

### 6. Thumbnail Intelligence AI & Click Potential Dashboard
- Analyzes uploaded JPG, PNG, and WebP thumbnails across **11 visual factors**:
  1. Visual attention
  2. Subject focus
  3. Text readability
  4. Mobile readability
  5. Contrast
  6. Composition
  7. Curiosity
  8. Emotional impact
  9. Clarity
  10. Topic relevance
  11. Visual hierarchy
- Generates a **Click Potential Score (/100)** with realistic analytical disclaimer ("AI-based analytical estimate, NOT a guaranteed CTR prediction").
- Delivers itemized *"Why this score?"* observations and actionable *"How to improve this thumbnail"* guidelines with live revision re-testing.

### 7. AI Background Remover
- Interactive image upload with edge sensitivity threshold controls.
- Isolates subjects into transparent PNGs with live checkerboard/dark preview.
- Direct transparent PNG file downloads.

### 8. Multi-Channel YouTube Integration & Unified Creator Dashboard
- Channel Switcher to manage multiple authorized YouTube channels (Channel A, Channel B, etc.).
- Displays verified Channel Name, `@handle`, clickable official YouTube URLs, subscriber count, total views, watch time, and top video performance.
- **Strict Separation of Data Modes:** Includes an explicit toggle for **"Manual / Planning Data"** vs **"Live YouTube API"** to guarantee reporting integrity.

### 9. Persistent Content History & Saved Projects
- All generated titles, descriptions, hashtags, video ideas, and thumbnail analyses are automatically indexed and searchable.
- Allows creators to create project folders (e.g. *"Q4 AI Tech Series"*) and organize assets by episode.

### 10. Quota Management & Future Subscription Architecture
- Prepared for **Free Creator** (100 credits/mo), **Pro Creator** (1,000 credits/mo), and **Studio Agency** (5,000 credits/mo).

---

## 🛠️ Environment Variables Configuration

Create a `.env.local` file in the root directory:

```bash
# Google Gemini AI Integration (Required for cloud model inference)
GEMINI_API_KEY=your_google_gemini_api_key_here

# Google OAuth 2.0 Credentials (for YouTube Data API v3 integration)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Background Removal (Optional cloud neural fallback)
REMOVE_BG_API_KEY=your_remove_bg_key_here

# Development & Testing Mode Flag
DEMO_MODE=true
```

> **Note:** If `GEMINI_API_KEY` is not provided or in development mode, the built-in intelligent engine automatically generates rich, dynamic, context-aware creator assets without throwing uncaught errors.

---

## 💻 Local Development & Production Run

### Prerequisites
- Node.js 18+ (tested with Node.js v20.18.0)
- npm 9+

### Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```

The application will be running at `http://localhost:3000`.

---

## 🔒 Security & Best Practices

- **Zero Client-Side Secret Leakage:** All API keys (`GEMINI_API_KEY`, OAuth secrets) are kept server-side inside secure Next.js App Router route handlers.
- **Input Validation:** Strict payload validation and sanitization on all `/api/ai/*` endpoints.
- **Data Isolation:** User state and project isolation per creator account.
- **Transparent PNG Handling:** Safe canvas processing with file size limits up to 8MB.
