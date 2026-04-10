import { useState } from 'react'
import type { Channel } from '../../types'
import Badge from '../ui/Badge'
import { copyText } from '../../utils/clipboard'

interface Props {
  channel: Channel
  selected: boolean
  onToggleSelect: (name: string) => void
  onCopy: (msg: string) => void
  onEdit: (ch: Channel) => void
}

export default function ChannelRow({ channel: c, selected, onToggleSelect, onCopy, onEdit }: Props) {
  const [copiedName, setCopiedName] = useState(false)
  const [copiedKey,  setCopiedKey]  = useState(false)

  async function handleCopyName() {
    const name = c.channel.replace(/^#/, '')
    const ok = await copyText(name)
    if (ok) { onCopy(`Copied ${name}`); setCopiedName(true); setTimeout(() => setCopiedName(false), 1500) }
  }

  async function handleCopyKey() {
    const ok = await copyText(c._key)
    if (ok) { onCopy('Copied key'); setCopiedKey(true); setTimeout(() => setCopiedKey(false), 1500) }
  }

  const rowClass = [
    !c._hasMeta ? 'bare-row' : '',
    c._localEdit ? 'local-row' : '',
  ].filter(Boolean).join(' ')

  return (
    <tr className={rowClass}>
      <td>
        <input
          type="checkbox"
          className="card-cb"
          checked={selected}
          onChange={() => onToggleSelect(c.channel)}
        />
      </td>
      <td>
        <span
          className="lt-name"
          title="Click to copy channel name"
          onClick={handleCopyName}
          style={selected ? { color: 'var(--accent)' } : undefined}
        >
          {c.channel}
        </span>
      </td>
      <td>
        <span
          className="lt-key"
          title="Click to copy hex key"
          onClick={handleCopyKey}
        >
          {copiedKey ? '✓' : c._key.slice(0, 8) + '…'}
        </span>
      </td>
      <td><span className="lt-cat">{c.category || ''}</span></td>
      <td><span className="lt-region">{c.region || ''}{c.country ? ` (${c.country})` : ''}</span></td>
      <td>
        <span className="lt-scope">
          {c.scopes?.join(', ') || ''}
        </span>
      </td>
      <td><span className="lt-date">{c.last_seen || '—'}</span></td>
      <td><span className="lt-date">{c.added     || '—'}</span></td>
      <td>
        <div className="lt-flags">
          {c.verified    && <Badge variant="verified" />}
          {c.recommended && <Badge variant="recommended" />}
          {!c._hasMeta   && <Badge variant="no-meta" />}
        </div>
      </td>
      <td>
        <div className="lt-acts">
          <button
            className={`act${copiedName ? ' copied' : ''}`}
            onClick={handleCopyName}
            title="Copy name"
          >
            {copiedName ? '✓' : '⎘'}
          </button>
          <button
            className={`act${copiedKey ? ' copied' : ''}`}
            onClick={handleCopyKey}
            title="Copy key"
          >
            {copiedKey ? '✓' : '🔑'}
          </button>
          <button className="act edit-btn" onClick={() => onEdit(c)} title="Edit">✎</button>
        </div>
      </td>
    </tr>
  )
}
