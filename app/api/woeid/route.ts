import { NextRequest, NextResponse } from 'next/server';
import { getWoeid } from '../../lib/woeid'

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;

  if (queryParams.get('lat') && queryParams.get('long')) {
    const data = await getWoeid(queryParams.get('lat'), queryParams.get('long'));
    return NextResponse.json({ data });
  }
  return NextResponse.json({ error: 'Missing query parameters', success: false });
}
