import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/services/ai/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, existingTitle, script, niche, tone, isX2 } = body;

    if (!topic && !existingTitle && !script) {
      return NextResponse.json(
        { error: 'At least one of topic, title, or script is required.' },
        { status: 400 }
      );
    }

    const result = await AIService.generateDescription({
      topic,
      existingTitle,
      script,
      niche,
      tone,
      isX2: Boolean(isX2),
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /api/ai/description error:', err);
    return NextResponse.json(
      { error: 'Failed to generate description. Please try again.' },
      { status: 500 }
    );
  }
}
