import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/services/ai/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { niche, audience, platform, count, contentStyle, isX2 } = body;

    const result = await AIService.generateDailyVideoIdeas({
      niche: niche || 'Tech & AI',
      audience: audience || 'Creators & Enthusiasts',
      platform: platform || 'YouTube',
      count: Number(count) || 3,
      contentStyle: contentStyle || 'High Energy & Actionable',
      isX2: Boolean(isX2),
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /api/ai/video-ideas error:', err);
    return NextResponse.json(
      { error: 'Failed to generate video ideas.' },
      { status: 500 }
    );
  }
}
