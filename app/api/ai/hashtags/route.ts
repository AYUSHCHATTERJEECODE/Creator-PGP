import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/services/ai/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, topic, niche, targetAudience, platform, isX2 } = body;

    if (!title && !topic) {
      return NextResponse.json(
        { error: 'Title or topic is required to generate hashtags.' },
        { status: 400 }
      );
    }

    const result = await AIService.generateHashtags({
      title,
      topic,
      niche,
      targetAudience,
      platform,
      isX2: Boolean(isX2),
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /api/ai/hashtags error:', err);
    return NextResponse.json(
      { error: 'Failed to generate hashtags. Please try again.' },
      { status: 500 }
    );
  }
}
