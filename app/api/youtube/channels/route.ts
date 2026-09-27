import { NextRequest, NextResponse } from 'next/server';
import { YouTubeService } from '@/services/youtube/youtubeService';

export async function GET(req: NextRequest) {
  try {
    const channels = YouTubeService.getInitialChannels();
    return NextResponse.json({ channels });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch channels' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === 'get_oauth_url') {
      const url = YouTubeService.getOAuthUrl();
      return NextResponse.json({ oauthUrl: url });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Channel operation failed' }, { status: 500 });
  }
}
