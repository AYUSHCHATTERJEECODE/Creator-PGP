import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'History endpoint operational' });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json({ success: true, item: body });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to record history' }, { status: 500 });
  }
}
