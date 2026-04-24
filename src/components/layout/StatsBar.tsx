import type { Channel } from '../../types'

export default function StatsBar({ channels }: { channels: Channel[] }) {
  const total    = channels.length
  const messages = channels.reduce((s, c) => s + (c.message_amount ?? 0), 0)
  const scoped   = channels.filter(c => c.scopes?.length).length
  const sub       = (c: Channel) => (c.subcategory ?? '').toLowerCase()
  const cities    = channels.filter(c => sub(c) === 'city').length
  const provinces = channels.filter(c => sub(c) === 'province').length
  const countries = new Set(channels.map(c => c.country).filter(Boolean)).size

  return (
    <div className="stats">
      {([
        [total,    'Total Channels'],
        [messages, 'Total Messages'],
        [scoped,    'Scoped'],
        [cities,    'Cities'],
        [provinces, 'Provinces'],
        [countries, 'Countries'],
      ] as [number, string][]).map(([v, l]) => (
        <div className="stat" key={l}>
          <span className="stat-value">{v.toLocaleString()}</span>
          <span className="stat-label">{l}</span>
        </div>
      ))}
    </div>
  )
}
