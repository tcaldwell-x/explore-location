import { NextResponse } from 'next/server';
import { getSpaces } from '../../lib/spaces';

export async function GET(req) {
  const queryParams = req.nextUrl.searchParams;

  if (queryParams.get('queries')) {
    const queries = queryParams.get('queries').split(',');
    const data = await getSpaces(queries);
    return NextResponse.json({ data });
  }
  return NextResponse.json({ error: 'Missing query parameters', success: false });
}
