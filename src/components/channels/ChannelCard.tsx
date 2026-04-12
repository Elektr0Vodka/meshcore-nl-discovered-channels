import { useState } from 'react'
import type { Channel } from '../../types'
import Badge from '../ui/Badge'
import { copyText } from '../../utils/clipboard'
import { fmtDate, fmtDateOnly } from '../../utils/formatDate'

interface Props {
  channel: Channel
  selected: boolean
  onToggleSelect: (name: string) => void
  onCopy: (msg: string) => void
  onEdit: (ch: Channel) => void
  onInfo: (ch: Channel) => void
}

export default function ChannelCard({ channel: c, selected, onToggleSelect, onCopy, onEdit, onInfo }: Props) {
  const [copiedName, setCopiedName] = useState(false)
  const [copiedKey,  setCopiedKey]  = useState(false)

  async function handleCopyName() {
    const name = c.channel.replace(/^#/, '')
    const ok = await copyText(name)
    if (ok) { onCopy(`Copied ${name}`); setCopiedName(true); setTimeout(() => setCopiedName(false), 1500) }
  }

  async function handleCopyKey() {
    const ok = await copyText(c._key)
    if (ok) { onCopy(`Copied key`); setCopiedKey(true); setTimeout(() => setCopiedKey(false), 1500) }
  }

  const cardClass = [
    'card',
    !c._hasMeta ? 'bare' : '',
    selected ? 'selected' : '',
    c._localEdit ? 'local-edited' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={cardClass}>
      <div className="card-head">
        <div className="card-head-left">
          <input
            type="checkbox"
            className="card-cb"
            checked={selected}
            onChange={() => onToggleSelect(c.channel)}
          />
          <span
            className="channel-name"
            title="Click to copy channel name"
            onClick={handleCopyName}
          >
            {c.channel}
          </span>
        </div>
        <div className="badges">
          {c.verified    && <Badge variant="verified" />}
          {c.recommended && <Badge variant="recommended" />}
          {!c._hasMeta   && <Badge variant="no-meta" />}
        </div>
      </div>

      <div
        className="hex-key"
        title="Click to copy hex key"
        onClick={handleCopyKey}
      >
        {c._key}
      </div>

      {c._hasMeta && (
        <div className="card-meta">
          {c.category    && <><span className="mk">Category</span><span className="mv">{c.category}{c.subcategory ? ` › ${c.subcategory}` : ''}</span></>}
          {c.country     && <><span className="mk">Country</span><span className="mv">{c.country}</span></>}
          {c.region      && <><span className="mk">Region</span><span className="mv">{c.region}</span></>}
          {c.language?.length ? <><span className="mk">Language</span><span className="mv">{c.language.join(', ')}</span></> : null}
        </div>
      )}

      {c.scopes?.length ? (
        <div className="scopes-row">
          {c.scopes.map(s => <span key={s} className="scope-tag">{s}</span>)}
        </div>
      ) : null}

      {c.tags?.length ? (
        <div className="tags-row">
          {c.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      ) : null}

      {(c.last_seen || c.added || c.message_amount != null) && (
        <div className="card-dates">
          {c.last_seen         && <span className="cd-item"><span className="cd-label">Last seen</span>{fmtDate(c.last_seen)}</span>}
          {c.added             && <span className="cd-item"><span className="cd-label">Added</span>{fmtDateOnly(c.added)}</span>}
          {c.message_amount != null && <span className="cd-item"><span className="cd-label">Messages</span>{c.message_amount.toLocaleString()}</span>}
        </div>
      )}

      {c.notes && <div className="notes-text">{c.notes}</div>}

      <div className="card-actions">
        <button
          className={`act${copiedName ? ' copied' : ''}`}
          onClick={handleCopyName}
        >
          {copiedName ? '✓ Copied' : '⎘ Copy name'}
        </button>
        <button
          className={`act${copiedKey ? ' copied' : ''}`}
          onClick={handleCopyKey}
        >
          {copiedKey ? '✓ Copied' : '⎘ Copy key'}
        </button>
        <button className="act" onClick={() => onInfo(c)}>
          ℹ Details
        </button>
      </div>
    </div>
  )
}
