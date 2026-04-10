interface Props {
  count: number
  total: number
  isFiltered: boolean
  onClearFilters: () => void
  localEditsCount?: number
  serverMode?: boolean
  onExportLocalEdits?: () => void
}

export default function ResultsBar({
  count,
  total,
  isFiltered,
  onClearFilters,
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
      {!serverMode && localEditsCount > 0 && (
        <span className="local-edits-note">
          ✏ {localEditsCount} local edit{localEditsCount !== 1 ? 's' : ''}
          {onExportLocalEdits && (
            <> · <button className="btn-link" onClick={onExportLocalEdits}>export</button></>
          )}
        </span>
      )}
    </div>
  )
}
