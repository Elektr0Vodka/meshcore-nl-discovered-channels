import { PAGE_SIZE_OPTIONS } from '../../hooks/usePagination'

interface Props {
  count: number
  total: number
  isFiltered: boolean
  onClearFilters: () => void
  pageSize: number
  onPageSizeChange: (n: number) => void
  localEditsCount?: number
  serverMode?: boolean
  onExportLocalEdits?: () => void
}

export default function ResultsBar({
  count,
  total,
  isFiltered,
  onClearFilters,
  pageSize,
  onPageSizeChange,
  localEditsCount = 0,
  serverMode = false,
  onExportLocalEdits,
}: Props) {
  return (
    <div className="results-bar">
      <span>
        Showing <strong>{count}</strong>{isFiltered ? ` of ${total}` : ''} channels
        {isFiltered && (
          <> &nbsp;·&nbsp; <button className="btn-link" onClick={onClearFilters}>Clear filters</button></>
        )}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {!serverMode && localEditsCount > 0 && (
          <span className="local-edits-note">
            ✏ {localEditsCount} local edit{localEditsCount !== 1 ? 's' : ''}
            {onExportLocalEdits && (
              <> · <button className="btn-link" onClick={onExportLocalEdits}>export</button></>
            )}
          </span>
        )}
        <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--muted)' }}>
          Per page
          <select
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
            style={{ minWidth: 0, padding: '3px 6px', fontSize: 12 }}
          >
            {PAGE_SIZE_OPTIONS.map(n => (
              <option key={n} value={n}>{n === 0 ? 'All' : n}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
