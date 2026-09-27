// Postgres (Neon). The table is created automatically the first time the site
// runs, so there is no migration step for you to remember.

import { neon } from '@neondatabase/serverless';

let _sql = null;
function db() {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set. See .env.example.');
    _sql = neon(url);
  }
  return _sql;
}

let ready = null;
function ensureSchema() {
  if (!ready) {
    const sql = db();
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS claims (
          id               BIGSERIAL PRIMARY KEY,
          discord_id       TEXT        NOT NULL,
          discord_username TEXT        NOT NULL,
          discord_handle   TEXT,
          discord_avatar   TEXT,
          item_id          TEXT        NOT NULL,
          item_name        TEXT        NOT NULL,
          proof_link       TEXT,
          note             TEXT,
          status           TEXT        NOT NULL DEFAULT 'pending',
          created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
        )`;
      // This is what actually enforces one claim per person per item.
      await sql`
        CREATE UNIQUE INDEX IF NOT EXISTS claims_one_per_item
        ON claims (discord_id, item_id)`;
    })().catch(e => { ready = null; throw e; });
  }
  return ready;
}

export async function myClaims(discordId) {
  await ensureSchema();
  return db()`
    SELECT item_id, item_name, proof_link, note, status, created_at
    FROM claims WHERE discord_id = ${discordId}
    ORDER BY created_at DESC`;
}

export async function allClaims() {
  await ensureSchema();
  return db()`
    SELECT id, discord_id, discord_username, discord_handle, item_id, item_name,
           proof_link, note, status, created_at
    FROM claims ORDER BY created_at DESC`;
}

/** Returns { ok: true } or { ok: false, reason: 'duplicate' | ... }. */
export async function createClaim(c) {
  await ensureSchema();
  try {
    await db()`
      INSERT INTO claims
        (discord_id, discord_username, discord_handle, discord_avatar,
         item_id, item_name, proof_link, note)
      VALUES
        (${c.discordId}, ${c.username}, ${c.handle}, ${c.avatar},
         ${c.itemId}, ${c.itemName}, ${c.proofLink}, ${c.note})`;
    return { ok: true };
  } catch (e) {
    // 23505 = unique violation = they already claimed this item.
    if (e?.code === '23505' || /duplicate key/i.test(e?.message || '')) {
      return { ok: false, reason: 'duplicate' };
    }
    throw e;
  }
}
