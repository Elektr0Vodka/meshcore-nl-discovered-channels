import type { Channel } from '../../types'

export default function StatsBar({ channels }: { channels: Channel[] }) {
  const total     = channels.length
  const withMeta  = channels.filter(c => c._hasMeta).length
  const scoped    = channels.filter(c => c.scopes?.length).length
  const cities    = channels.filter(c => c.subcategory === 'city').length
  const provinces = channels.filter(c => c.subcategory === 'province').length

  return (
    <div className="stats">
      {([
        [total,     'Total Channels'],
        [withMeta,  'With Metadata'],
        [scoped,    'Scoped'],
        [cities,    'Cities'],
        [provinces, 'Provinces'],
      ] as [number, string][]).map(([v, l]) => (
        <div className="stat" key={l}>
          <span className="stat-value">{v}</span>
          <span className="stat-label">{l}</span>
        </div>
      ))}
    </div>
  )
}
