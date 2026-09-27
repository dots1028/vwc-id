import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { readUser } from '@/lib/session';
import { createClaim } from '@/lib/db';
import { items } from '@/config/items';
import { rules } from '@/config/league';

export const runtime = 'nodejs';

const DISCORD_LINK = /^https:\/\/(?:ptb\.|canary\.)?discord(?:app)?\.com\/channels\/\d+\/\d+\/\d+/i;

export async function POST(request) {
  const user = readUser(await cookies());
  if (!user) {
    return NextResponse.json({ error: 'Sign in with Discord first.' }, { status: 401 });
  }

  let body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: 'Bad request.' }, { status: 400 }); }

  const item = items.find(i => i.id === body.itemId);
  if (!item)        return NextResponse.json({ error: 'That item does not exist.' }, { status: 400 });
  if (item.closed)  return NextResponse.json({ error: 'Claims for that item are closed.' }, { status: 400 });

  const proofLink = (body.proofLink || '').trim();
  const note      = (body.note || '').trim().slice(0, rules.noteMaxLength);

  if (rules.requireProof && !proofLink) {
    return NextResponse.json({ error: 'A proof link is required.' }, { status: 400 });
  }
  if (proofLink && rules.discordLinksOnly && !DISCORD_LINK.test(proofLink)) {
    return NextResponse.json(
      { error: 'That does not look like a Discord message link. Right-click the message → Copy Message Link.' },
      { status: 400 }
    );
  }

  const result = await createClaim({
    discordId: user.id,
    username:  user.username,
    handle:    user.handle || null,
    avatar:    user.avatar || null,
    itemId:    item.id,
    itemName:  item.name,
    proofLink: proofLink || null,
    note:      note || null,
  });

  if (!result.ok && result.reason === 'duplicate') {
    return NextResponse.json({ error: `You have already claimed ${item.name}.` }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
