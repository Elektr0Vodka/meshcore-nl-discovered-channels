import type { Channel } from '../../types'
import StatsBar from '../../components/layout/StatsBar'

interface Props {
  channels: Channel[]
}

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('nl-NL', { day: '2-digit', month: 'short', year: 'numeric' })
}

/**
 * Returns a relative time string (e.g. "3h ago", "5d ago") for an ISO date/datetime.
 * Falls back to the formatted date when more than 30 days ago.
 */
function relativeTime(iso: string | null | undefined): string {
  if (!iso) return '—'
  const d = new Date(iso)
  if (isNaN(d.getTime())) return '—'
  const diffMs = Date.now() - d.getTime()
  if (diffMs < 0) return fmtDate(iso)
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return fmtDate(iso)
}

export default function StatsInsights({ channels }: Props) {
  const top5 = [...channels]
    .filter(c => (c.message_amount ?? 0) > 0)
    .sort((a, b) => (b.message_amount ?? 0) - (a.message_amount ?? 0))
    .slice(0, 10)

  const recentlyAdded = [...channels]
    .filter(c => c.added)
    .sort((a, b) => (b.added! > a.added! ? 1 : -1))
    .slice(0, 10)

  const lastUpdated = [...channels]
    .filter(c => c.last_seen)
    .sort((a, b) => (b.last_seen! > a.last_seen! ? 1 : -1))
    .slice(0, 10)

  return (

    <details className="info-panel insights-panel">
      <summary>
        <span>📊 Channel Stats &amp; Highlights</span>
        <span className="arrow">▼</span>
      </summary>

	  {/* Stats overview */}

		<div className="stats-bar-wrap">
		  <StatsBar channels={channels} />
		</div>

      <div className="info-panel-body insights-body">
        {/* Top 10 by messages */}
        <div className="info-box insights-box">
          <h4>🏆 Top 10 Messages</h4>
          {top5.length === 0
            ? <p className="insights-empty">No message data yet.</p>
            : <ol className="insights-list">
                {top5.map((c, i) => (
                  <li key={c.channel} className="insights-row">
                    <span className="insights-rank">{i + 1}</span>
                    <span className="insights-name" title={c.channel}>{c.channel}</span>
                    <span className="insights-value">{(c.message_amount ?? 0).toLocaleString()}</span>
                  </li>
                ))}
              </ol>
          }
        </div>

        {/* Recently added */}
        <div className="info-box insights-box">
          <h4>🆕 10 Most Recently Added </h4>
          {recentlyAdded.length === 0
            ? <p className="insights-empty">No added-date data yet.</p>
            : <ul className="insights-list">
                {recentlyAdded.map(c => (
                  <li key={c.channel} className="insights-row">
                    <span className="insights-name" title={c.channel}>{c.channel}</span>
                    <span
                      className="insights-value"
                      title={fmtDate(c.added)}
                    >
                      {relativeTime(c.added)}
                    </span>
                  </li>
                ))}
              </ul>
          }
        </div>

        {/* Last updated */}
        <div className="info-box insights-box">
          <h4>🔄 10 Last Updated</h4>
          {lastUpdated.length === 0
            ? <p className="insights-empty">No last-seen data yet.</p>
            : <ul className="insights-list">
                {lastUpdated.map(c => (
                  <li key={c.channel} className="insights-row">
                    <span className="insights-name" title={c.channel}>{c.channel}</span>
                    <span
                      className="insights-value"
                      title={fmtDate(c.last_seen)}
                    >
                      {relativeTime(c.last_seen)}
                    </span>
                  </li>
                ))}
              </ul>
          }
        </div>

      </div>

    </details>

  )
}
