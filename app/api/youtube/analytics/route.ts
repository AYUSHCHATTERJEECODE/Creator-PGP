import { NextRequest, NextResponse } from 'next/server';
import { YouTubeService } from '@/services/youtube/youtubeService';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const channelId = searchParams.get('channelId') || 'chan-1';
    const timeframe = (searchParams.get('timeframe') as any) || '28d';
    const isManual = searchParams.get('isManual') === 'true';

    const analytics = YouTubeService.getAnalytics(channelId, timeframe, isManual);
    return NextResponse.json(analytics);
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 });
  }
}
