import { NextResponse } from 'next/server';
import { getTrends } from '../../../lib/trends';

export async function GET(req, { params }) {
    const { woeid } = params;
    
    const data = await getTrends(woeid);
    return NextResponse.json({ data });
}
