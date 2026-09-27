import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/services/ai/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { existingTitle, topic, existingIdea, description } = body;

    if (!existingTitle && !topic) {
      return NextResponse.json(
        { error: 'Existing title or topic is required to generate similar content.' },
        { status: 400 }
      );
    }

    const result = await AIService.generateSimilarContent({
      existingTitle: existingTitle || topic,
      topic,
      existingIdea,
      description,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /api/ai/similar-content error:', err);
    return NextResponse.json(
      { error: 'Failed to generate similar content variations.' },
      { status: 500 }
    );
  }
}
