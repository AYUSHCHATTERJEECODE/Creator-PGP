import { NextRequest, NextResponse } from 'next/server';
import { AIService } from '@/services/ai/aiService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL or data is required' }, { status: 400 });
    }

    const result = await AIService.analyzeThumbnail(imageUrl);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('API /api/ai/thumbnail-analysis error:', err);
    return NextResponse.json(
      { error: 'Failed to analyze thumbnail. Please try again.' },
      { status: 500 }
    );
  }
}
