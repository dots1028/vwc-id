// Discord OAuth — just the two calls we need.

const API = 'https://discord.com/api/v10';

export function redirectUri() {
  const base = (process.env.SITE_URL || '').replace(/\/$/, '');
  if (!base) throw new Error('SITE_URL is not set. See .env.example.');
  return `${base}/api/auth/callback`;
}

/** Where we send someone when they press "Connect Discord". */
export function authorizeUrl(state) {
  const p = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    redirect_uri: redirectUri(),
    response_type: 'code',
    scope: 'identify',
    state,
    prompt: 'none',
  });
  return `https://discord.com/oauth2/authorize?${p}`;
}

/** Swap the ?code= Discord sent back for the person's profile. */
export async function fetchUser(code) {
  const tokenRes = await fetch(`${API}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri(),
    }),
  });
  if (!tokenRes.ok) throw new Error('Discord rejected the login code.');
  const { access_token } = await tokenRes.json();

  const meRes = await fetch(`${API}/users/@me`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  if (!meRes.ok) throw new Error('Could not read your Discord profile.');
  const me = await meRes.json();

  return {
    id: me.id,
    // global_name is the new display name; username is the @handle.
    username: me.global_name || me.username,
    handle: me.username,
    avatar: me.avatar
      ? `https://cdn.discordapp.com/avatars/${me.id}/${me.avatar}.png?size=128`
      : null,
  };
}
