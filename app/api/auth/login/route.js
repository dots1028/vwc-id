import crypto from 'crypto';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { authorizeUrl } from '@/lib/discord';

export const runtime = 'nodejs';

export async function GET() {
  // A one-time value so a stranger can't forge the trip back from Discord.
  const state = crypto.randomBytes(16).toString('hex');

  const jar = await cookies();
  jar.set('vwc_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 600,
  });

  return NextResponse.redirect(authorizeUrl(state));
}
