import { cookies } from 'next/headers';
import { readUser } from '@/lib/session';
import { myClaims } from '@/lib/db';
import { items } from '@/config/items';
import { league } from '@/config/league';
import ClaimBoard from '@/components/ClaimBoard';
import Glyph, { Check, DiscordMark } from '@/components/Glyph';

export const dynamic = 'force-dynamic';

function Swatches({ colors = [] }) {
  if (!colors.length) return null;
  return (
    <span className="swatches">
      {colors.map((c, i) => <i key={i} style={{ '--c': c }} />)}
    </span>
  );
}

function Brand() {
  return (
    <div className="brand">
      {league.logoUrl
        ? <img src={league.logoUrl} alt="" />
        : <div className="monogram">{league.monogram}</div>}
      <div>
        <div className="name">{league.name}</div>
        <div className="sub">{league.tagline}</div>
      </div>
    </div>
  );
}

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const user = readUser(await cookies());

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <Brand />
          <div className="spacer" />
          {user ? (
            <div className="me">
              {user.avatar
                ? <img className="avatar" src={user.avatar} alt="" />
                : <div className="avatar">{(user.username || '?')[0].toUpperCase()}</div>}
              <div className="who">
                <b>{user.username}</b>
                {user.handle && <span>@{user.handle}</span>}
              </div>
              <form action="/api/auth/logout" method="POST">
                <button className="btn" type="submit">Sign out</button>
              </form>
            </div>
          ) : (
            <div className="season-pill">{items.length} items this season</div>
          )}
        </div>
      </header>

      <main>
        {user ? <SignedIn user={user} /> : <Landing failed={params?.error === 'login'} />}
      </main>

      <footer className="site-footer">
        <div className="wrap">{league.name}</div>
      </footer>
    </>
  );
}

function Landing({ failed }) {
  // Three real items to show in the hero, picked from the top of your list.
  const shown = [items[5] || items[0], items[1] || items[0], items[10] || items[0]].filter(Boolean);

  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <div className="eyebrow">{league.eyebrow}</div>
          <h1>{league.headline}</h1>
          <p className="lede">{league.welcome}</p>

          {failed && <div className="error" style={{ marginTop: 24, maxWidth: 420 }}>That didn’t work. Please try again.</div>}

          <div className="cta">
            <a className="btn btn-primary btn-lg" href="/api/auth/login">
              <DiscordMark size={21} />
              Connect with Discord
            </a>
            <div className="reassure">{league.reassure}</div>
          </div>
        </div>

        <div className="showcase" aria-hidden="true">
          {shown.map((item, i) => (
            <div className="tile" key={`${item.id}-${i}`}>
              <Swatches colors={item.colors} />
              <Glyph name={item.glyph} size={62} />
              <div className="cap">{item.name.replace(/^VWC\s*/i, '')}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="steps">
        {league.steps.map((s, i) => (
          <div className="step" key={s.title}>
            <div className="n">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <b>{s.title}</b>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

async function SignedIn({ user }) {
  const rows = await myClaims(user.id);
  const claimed = {};
  rows.forEach(r => { claimed[r.item_id] = { status: r.status }; });

  const done = items.filter(i => claimed[i.id]).length;

  return (
    <div className="wrap">
      <div className="page-head">
        <div>
          <h1>Your claims</h1>
          <div className="count">{done} of {items.length} items claimed this season</div>
        </div>
        <div className="meter">
          <div className="track">
            <div className="fill" style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }} />
          </div>
        </div>
      </div>

      <ClaimBoard items={items} claimed={claimed} />
    </div>
  );
}
