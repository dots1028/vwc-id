import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { cookieName } from '@/lib/session';

export const runtime = 'nodejs';

export async function POST(request) {
  const jar = await cookies();
  jar.delete(cookieName);
  return NextResponse.redirect(new URL('/', process.env.SITE_URL || request.url), 303);
}
