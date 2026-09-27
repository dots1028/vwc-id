// Tiny signed-cookie session. No library, no database table.
// The cookie holds the Discord id, username and avatar, signed so it can't be
// edited by the person holding it.

import crypto from 'crypto';

const COOKIE = 'vwc_session';
const DAYS = 30;

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET is not set. See .env.example.');
  return s;
}

const b64 = buf => Buffer.from(buf).toString('base64url');

export function sign(payload) {
  const body = b64(JSON.stringify({ ...payload, exp: Date.now() + DAYS * 864e5 }));
  const mac = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  return `${body}.${mac}`;
}

export function verify(token) {
  if (!token || typeof token !== 'string') return null;
  const [body, mac] = token.split('.');
  if (!body || !mac) return null;

  const expected = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  const a = Buffer.from(mac), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString());
    if (!data.exp || Date.now() > data.exp) return null;
    return data;
  } catch {
    return null;
  }
}

export const cookieName = COOKIE;

export const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: DAYS * 24 * 60 * 60,
};

/** Read the signed-in user from a cookies() store, or null. */
export function readUser(cookieStore) {
  return verify(cookieStore.get(COOKIE)?.value);
}
