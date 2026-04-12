import { useState, useEffect } from 'react'
import type { Channel, ViewMode } from '../types'
import { useLocalEdits } from '../hooks/useLocalEdits'
import { useChannelData } from '../hooks/useChannelData'
import { useChannelView } from '../hooks/useChannelView'
import { useSelection } from '../hooks/useSelection'
import { useToast } from '../hooks/useToast'
import { useCategoryMap } from '../hooks/useCategoryMap'
import { usePagination } from '../hooks/usePagination'
import Navbar from '../components/layout/Navbar'
import StatsBar from '../components/layout/StatsBar'
import FilterControls from '../components/layout/FilterControls'
import ResultsBar from '../components/layout/ResultsBar'
import Pagination from '../components/layout/Pagination'
import SelectionBar from '../components/layout/SelectionBar'
import ChannelCard from '../components/channels/ChannelCard'
import ChannelRow from '../components/channels/ChannelRow'
import ChannelInfoModal from '../components/channels/ChannelInfoModal'
import Toast from '../components/ui/Toast'
import { exportJson, exportTxt, exportRtfm } from '../utils/export'

const LS_VIEW = 'meshcore-view'

export default function IndexPage() {
  const { localEdits } = useLocalEdits()
  const { allChannels, loading, error } = useChannelData(false, localEdits)
  const { filtered, filters, setFilter, clearFilters, isFiltered, sortBy, sortDir, setSort } = useChannelView(allChannels)
  const { page, setPage, pageSize, setPageSize, totalPages, paged } = usePagination(filtered)
  const { selection, toggle, selectAllFiltered, clear: clearSelection } = useSelection(filtered)
  const { toasts, toast } = useToast()
  const categoryMap = useCategoryMap(allChannels)

  const [viewMode, setViewModeRaw] = useState<ViewMode>(
    () => (localStorage.getItem(LS_VIEW) as ViewMode) || 'grid'
  )
  const [infoChannel, setInfoChannel] = useState<Channel | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  function setViewMode(m: ViewMode) {
    setViewModeRaw(m)
    localStorage.setItem(LS_VIEW, m)
  }

  useEffect(() => {
    function onScroll() { setShowScrollTop(window.scrollY > 300) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function selectedChannels() {
    return filtered.filter(c => selection.has(c.channel))
  }

  if (loading) return <div className="loading">Loading channels…</div>
  if (error)   return <div className="loading">Error: {error}</div>

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="header">
          <h1>📡 MeshCore NL Channels</h1>
          <p>All channels from the Remote Terminal export, enriched with community metadata.</p>
        </div>

        <div className="rtfm-warning">
          <h3>Remote Terminal for MeshCore — (RTfM)</h3>
          <p>
            This channel list was generated using our fork of{' '}
            <a href="https://github.com/Elektr0Vodka/Remote-Terminal-for-MeshCore" target="_blank" rel="noopener noreferrer">
              Remote Terminal for MeshCore
            </a>
            , currently the only fork supporting <strong>channel/contact list importing and exporting</strong>.
          </p>
          <div className="danger-notice">
            <p>⚠ Important warning about RTfM</p>
            <p>
              Use this tool only with a <strong>dedicated companion</strong> for the machine it runs on.
              To work around MeshCore channel/contact limits, it may <strong>pull, overwrite, and delete contacts/channels</strong> during import/export and sync operations.
              <strong> Do not use it on your main everyday companion unless you fully understand the risks.</strong>
            </p>
          </div>
        </div>

        <details className="info-panel" open>
          <summary>
            <span>Handy links, project info &amp; scope guidelines</span>
            <span className="arrow">▼</span>
          </summary>
          <div className="info-panel-body">
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Useful links</h4>
              <p>Quick references for MeshCore NL, region naming, importing/exporting channel lists, and communities</p>
              <div className="quick-links">
                <a className="quick-link" href="https://meshwiki.nl/wiki/The_switch/draft" target="_blank" rel="noopener noreferrer">SF8 → SF7 Switch E.T.A. 9th of May</a>
                <a className="quick-link" href="https://meshwiki.nl/wiki/Lijst_van_regio%27s" target="_blank" rel="noopener noreferrer">Scope / Region Guide</a>
                <a className="quick-link" href="https://github.com/Elektr0Vodka/Remote-Terminal-for-MeshCore" target="_blank" rel="noopener noreferrer">RTfM Fork</a>
                <a className="quick-link" href="https://github.com/Elektr0Vodka/meshcore-nl-discovered-channels" target="_blank" rel="noopener noreferrer">Channel Repo</a>
                <a className="quick-link" href="https://meshwiki.nl" target="_blank" rel="noopener noreferrer">MeshWiki</a>
                <a className="quick-link" href="https://www.localmesh.nl" target="_blank" rel="noopener noreferrer">LocalMesh</a>
                <a className="quick-link" href="https://www.mesh-up.nl/" target="_blank" rel="noopener noreferrer">Mesh-Up</a>
              </div>
            </div>
            <div className="info-box warn">
              <h4 style={{ color: '#facc15' }}>Scope / region guideline</h4>
              <p>When adding or editing <strong>scopes</strong>, please follow the official MeshWiki region guideline. This keeps naming clear and prevents duplicate, random or incompatible scope structures.</p>
            </div>
            <div className="info-box danger">
              <h4 style={{ color: '#fbbf24' }}>⚠ Github pages warning</h4>
              <p>Changes made on this GitHub Pages version are stored <strong>only in your browser</strong>. If you edit metadata here, export it before leaving or refreshing if you want to keep your work safely backed up.</p>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Project / data source</h4>
              <p>This page combines a <strong>Remote Terminal for MeshCore export</strong> with manually curated community metadata. If you want to improve channels, scopes or notes, update the repo or submit a pull request.</p>
            </div>
          </div>
        </details>

        <StatsBar channels={allChannels} />

        <FilterControls
          allChannels={allChannels}
          filters={filters}
          setFilter={setFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onExportJson={() => exportJson(filtered)}
          onExportTxt={() => exportTxt(filtered)}
          onExportRtfm={() => exportRtfm(filtered)}
          categoryMap={categoryMap}
        />

        <ResultsBar
          count={filtered.length}
          total={allChannels.length}
          isFiltered={isFiltered}
          onClearFilters={clearFilters}
          pageSize={pageSize}
          onPageSizeChange={setPageSize}
          serverMode={false}
        />

        {filtered.length === 0 ? (
          <div className="empty">
            <h3>No channels found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <>
            <div className="grid">
              {paged.map(c => (
                <ChannelCard
                  key={c.channel}
                  channel={c}
                  selected={selection.has(c.channel)}
                  onToggleSelect={toggle}
                  onCopy={msg => toast(msg, 'ok')}
                  onEdit={setInfoChannel}
                  onInfo={setInfoChannel}
                  readOnlyActions
                />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          </>
        ) : (
          <>
            <div className="list-wrap">
              <table className="list-table">
                <thead>
                  <tr>
                    <th style={{ width: 24 }} />
                    <th className={`sortable${sortBy === 'alpha' ? ` sort-${sortDir}` : ''}`} onClick={() => setSort('alpha')}>Channel</th>
                    <th>Key</th>
                    <th className={`sortable${sortBy === 'category' ? ` sort-${sortDir}` : ''}`} onClick={() => setSort('category')}>Category</th>
                    <th className={`sortable${sortBy === 'region' ? ` sort-${sortDir}` : ''}`} onClick={() => setSort('region')}>Region</th>
                    <th className={`sortable${sortBy === 'scope' ? ` sort-${sortDir}` : ''}`} onClick={() => setSort('scope')}>Scopes</th>
                    <th className={`sortable${sortBy === 'first_seen' ? ` sort-${sortDir}` : ''}`} onClick={() => setSort('first_seen')}>First seen</th>
                    <th className={`sortable${sortBy === 'last_seen'     ? ` sort-${sortDir}` : ''}`} onClick={() => setSort('last_seen')}>Last Seen</th>
                    <th className={`sortable${sortBy === 'message_amount' ? ` sort-${sortDir}` : ''}`} onClick={() => setSort('message_amount')}>Messages</th>
                    <th>Flags</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map(c => (
                    <ChannelRow
                      key={c.channel}
                      channel={c}
                      selected={selection.has(c.channel)}
                      onToggleSelect={toggle}
                      onCopy={msg => toast(msg, 'ok')}
                      onEdit={setInfoChannel}
                      onInfo={setInfoChannel}
                      readOnlyActions
                    />
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          </>
        )}

        <footer className="site-footer">
          <a href="https://github.com/Elektr0Vodka/meshcore-nl-discovered-channels" target="_blank" rel="noopener noreferrer">
            ElektroVodka
          </a>
          {' '}&mdash; Community channel list for MeshCore NL - 2026
        </footer>
      </div>

      <SelectionBar
        selectionSize={selection.size}
        onSelectAll={selectAllFiltered}
        onClear={clearSelection}
        onExportTxt={() => exportTxt(selectedChannels())}
        onExportRtfm={() => exportRtfm(selectedChannels())}
        onExportJson={() => exportJson(selectedChannels())}
      />

      {infoChannel && (
        <ChannelInfoModal
          channel={infoChannel}
          onClose={() => setInfoChannel(null)}
        />
      )}

      <Toast toasts={toasts} />

      <button
        id="scrollTopBtn"
        className={showScrollTop ? 'show' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Back to top"
      >
        ↑
      </button>
    </>
  )
}
