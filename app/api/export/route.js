// Pull every claim out as a CSV.
//   https://your-site/api/export?token=YOUR_ADMIN_TOKEN
// The token is ADMIN_TOKEN in your environment variables. Keep it private —
// anyone with it can read every claim.

import { NextResponse } from 'next/server';
import { allClaims } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const cell = v => {
  const s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export async function GET(request) {
  const token = new URL(request.url).searchParams.get('token');
  const expected = process.env.ADMIN_TOKEN;

  if (!expected || token !== expected) {
    return NextResponse.json({ error: 'Not allowed.' }, { status: 401 });
  }

  const rows = await allClaims();
  const head = ['id', 'discord_id', 'discord_username', 'discord_handle',
                'item_id', 'item_name', 'proof_link', 'note', 'status', 'created_at'];

  const csv = [head.join(',')]
    .concat(rows.map(r => head.map(h => cell(r[h])).join(',')))
    .join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="claims-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
