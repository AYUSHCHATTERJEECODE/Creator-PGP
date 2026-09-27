import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Projects endpoint operational' });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({ success: true, project: body });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to process project' }, { status: 500 });
  }
}
