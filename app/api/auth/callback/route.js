import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { fetchUser } from '@/lib/discord';
import { sign, cookieName, cookieOptions } from '@/lib/session';

export const runtime = 'nodejs';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const jar = await cookies();
  const expected = jar.get('vwc_state')?.value;
  jar.delete('vwc_state');

  const home = new URL('/', process.env.SITE_URL || url.origin);

  if (!code || !state || state !== expected) {
    home.searchParams.set('error', 'login');
    return NextResponse.redirect(home);
  }

  try {
    const user = await fetchUser(code);
    jar.set(cookieName, sign(user), cookieOptions);
  } catch {
    home.searchParams.set('error', 'login');
  }

  return NextResponse.redirect(home);
}
