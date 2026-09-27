import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/services/ai/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, niche, tone, platform, isX2 } = body;

    if (!topic || typeof topic !== 'string' || topic.trim() === '') {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const result = await AIService.generateTitles({
      topic: topic.trim(),
      niche,
      tone,
      platform,
      isX2: Boolean(isX2),
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /api/ai/title error:', err);
    return NextResponse.json(
      { error: 'Failed to generate titles. Please check inputs and try again.' },
      { status: 500 }
    );
  }
}
