'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { league, rules } from '@/config/league';
import Glyph, { Check, InfoMark } from '@/components/Glyph';

const short = name => name.replace(/^VWC\s*/i, '') || name;

function Swatches({ colors = [] }) {
  if (!colors.length) return null;
  return (
    <span className="swatches">
      {colors.map((c, i) => <i key={i} style={{ '--c': c }} />)}
    </span>
  );
}

function ItemTile({ item, size }) {
  if (item.image) {
    return (
      <div className="tile-img">
        <img src={item.image} alt="" />
      </div>
    );
  }
  return (
    <div className="tile-img">
      <Swatches colors={item.colors} />
      <Glyph name={item.glyph} size={size} />
    </div>
  );
}

export default function ClaimBoard({ items, claimed }) {
  const router = useRouter();
  const [open, setOpen] = useState(null);
  const [proof, setProof] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  // Groups, in the order config/items.js lists them.
  const groups = [];
  items.forEach(item => {
    const key = item.group || '';
    let g = groups.find(x => x.key === key);
    if (!g) groups.push((g = { key, items: [] }));
    g.items.push(item);
  });

  function start(item) {
    setOpen(item);
    setProof('');
    setNote('');
    setError('');
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: open.id, proofLink: proof, note }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return; }
      setOpen(null);
      setDone(true);
      router.refresh();
    } catch {
      setError('Could not reach the server. Try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {done && (
        <div className="banner">
          <Check size={20} />
          <div>
            <b>Claim received</b>
            <p>{league.thanks}</p>
          </div>
        </div>
      )}

      {groups.map(g => (
        <section className="section" key={g.key || 'all'}>
          {g.key && <h2 className="section-title">{g.key}</h2>}
          <div className="grid">
            {g.items.map(item => {
              const mine = claimed[item.id];
              return (
                <article
                  key={item.id}
                  className={`card${mine ? ' is-claimed' : ''}${item.closed ? ' is-closed' : ''}`}
                >
                  <ItemTile item={item} size={42} />
                  <h3>{item.name}</h3>

                  {mine ? (
                    <div className="status">
                      <Check />
                      {mine.status === 'pending' ? 'Claim submitted' : mine.status}
                    </div>
                  ) : (
                    <button
                      className="btn btn-primary btn-block"
                      disabled={!!item.closed}
                      onClick={() => start(item)}
                    >
                      {item.closed ? 'Closed' : 'Claim'}
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}

      {open && (
        <div
          className="overlay"
          onMouseDown={e => e.target === e.currentTarget && setOpen(null)}
        >
          <form className="modal" onSubmit={submit}>
            <div className="modal-head">
              <ItemTile item={open} size={36} />
              <div>
                <div className="eyebrow">Claiming</div>
                <h2>{open.name}</h2>
              </div>
            </div>

            <p className="hint">{league.proofHint}</p>

            {error && <div className="error">{error}</div>}

            <label htmlFor="proof">Proof link</label>
            <input
              id="proof"
              type="url"
              value={proof}
              onChange={e => setProof(e.target.value)}
              placeholder="https://discord.com/channels/…"
              required={rules.requireProof}
              autoFocus
            />

            {rules.allowNote && (
              <>
                <label htmlFor="note">Note <span className="opt">(optional)</span></label>
                <textarea
                  id="note"
                  value={note}
                  maxLength={rules.noteMaxLength}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Anything staff should know"
                />
              </>
            )}

            {rules.onePerItem && (
              <div className="once">
                <InfoMark />
                You can only claim {short(open.name)} once.
              </div>
            )}

            <div className="modal-actions">
              <button type="button" className="btn" onClick={() => setOpen(null)} disabled={busy}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={busy}>
                {busy ? 'Sending…' : 'Submit claim'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
