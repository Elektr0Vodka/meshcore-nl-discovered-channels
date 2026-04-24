import Navbar from '../components/layout/Navbar'

export default function HowToPage() {
  return (
    <>
      <Navbar />
      <div className="page">
        <div className="header">
          <h1>📘 How to use this site</h1>
          <p>Guide for browsing, filtering, and exporting discovered MeshCore channels.</p>
        </div>

        <div className="how-to-intro">
          <p>
            This site lists <strong>discovered MeshCore channels</strong> with metadata such as
            category, region, language, and activity. Channels are sourced from the{' '}
            <strong>Remote Terminal for MeshCore (RTfM)</strong> channel finder and community
            additions.
          </p>
          <p style={{ marginTop: 6 }}>
            The <strong>Channel Browser</strong> is read-only. The{' '}
            <strong>Local Editor</strong> lets you enrich channels with metadata locally.
          </p>
        </div>

        {/* ── Channel Browser ──────────────────────────────────────────────── */}
        <details className="info-panel" open>
          <summary>
            <span>🔍 Browsing channels</span>
            <span className="arrow">▼</span>
          </summary>
          <div className="info-panel-body">
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Search &amp; filter</h4>
              <ul style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
                <li>Use the <strong>search bar</strong> to match channel name, tags, region, country, or notes</li>
                <li>Use the <strong>category / subcategory / region / scope / country</strong> dropdowns to narrow results</li>
                <li>Toggle <strong>Scoped only</strong> to show channels with an assigned geographic scope</li>
                <li>Toggle <strong>No meta only</strong> to show channels that have no metadata yet</li>
              </ul>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Sorting</h4>
              <p>
                Click any column header in list view to sort by that field.
                Click again to reverse the order.
                Sortable columns: <strong>Channel, Category, Country, Region, Scopes, First seen, Last seen, Messages</strong>.
              </p>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Channel details</h4>
              <p>
                Click the <strong>ℹ</strong> button on any channel (card or row) to open a detail
                panel showing all available metadata: flags, status, source, location, language,
                scopes, tags, activity dates, and message count.
              </p>
            </div>
          </div>
        </details>

        {/* ── Exporting ────────────────────────────────────────────────────── */}
        <details className="info-panel">
          <summary>
            <span>📤 Exporting channels</span>
            <span className="arrow">▼</span>
          </summary>
          <div className="info-panel-body">
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Export formats (Editor page)</h4>
              <ul style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
                <li><strong>⬇ JSON</strong> — full metadata export, compatible with the channels.json schema</li>
                <li><strong>⬇ TXT</strong> — channel names only, one per line</li>
                <li><strong>⬇ RTfM</strong> — <code>#channel-name - hexkey</code> format, ready to import into RTfM</li>
              </ul>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Selection export</h4>
              <p>
                Check the boxes next to channels you want, then use the export buttons — they will
                automatically export only the selected channels. The count shown on the button
                confirms how many will be included.
              </p>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Importing into RTfM</h4>
              <ol style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
                <li>Export as <strong>RTfM</strong> format from the editor page</li>
                <li>Open RTfM</li>
                <li>Go to <strong>Channels → Import</strong></li>
                <li>Paste or load the exported file and apply</li>
              </ol>
            </div>
          </div>
        </details>

        {/* ── Local Editor ─────────────────────────────────────────────────── */}
        <details className="info-panel">
          <summary>
            <span>✏️ Local Editor</span>
            <span className="arrow">▼</span>
          </summary>
          <div className="info-panel-body">
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>What the editor does</h4>
              <p>
                The <strong>Local Editor</strong> page lets you add or correct metadata for any
                channel — category, region, country, language, scopes, tags, notes, and more.
                Edits are saved in your browser and overlaid on top of the published data.
              </p>
            </div>
            <div className="info-box warn">
              <h4>Local storage only</h4>
              <p>
                Edits are stored in <strong>your browser's localStorage</strong>. They are not
                uploaded anywhere. Clearing browser data or switching devices will lose them.
                Use <strong>Export metadata</strong> regularly to back up your changes.
              </p>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Server mode</h4>
              <p>
                If you run the project locally with <code>npm run server</code>, the editor
                can write changes directly to <code>docs/data/channels.json</code> instead of
                localStorage. See the <strong>Running locally</strong> section below.
              </p>
            </div>
          </div>
        </details>

        {/* ── Running locally ──────────────────────────────────────────────── */}
        <details className="info-panel">
          <summary>
            <span>💻 Running locally</span>
            <span className="arrow">▼</span>
          </summary>
          <div className="info-panel-body">
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Requirements</h4>
              <ul style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
                <li><strong>Node.js</strong> 18 or newer</li>
                <li><strong>npm</strong> 9 or newer</li>
                <li>Git</li>
              </ul>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Clone &amp; install</h4>
              <pre>{`git clone https://github.com/Elektr0Vodka/meshcore-nl-discovered-channels.git
cd meshcore-nl-discovered-channels
npm install`}</pre>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Development server</h4>
              <pre>{`npm run dev`}</pre>
              <p style={{ marginTop: 6 }}>
                Opens the site at <strong>http://localhost:5173</strong> with hot reload.
                The editor page saves to localStorage in this mode.
              </p>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>API server (editor write-back)</h4>
              <pre>{`npm run server`}</pre>
              <p style={{ marginTop: 6 }}>
                Starts a local API server on <strong>port 8080</strong>. When running alongside{' '}
                <code>npm run dev</code>, the editor detects the server and writes changes
                directly to <code>docs/data/channels.json</code> instead of localStorage.
              </p>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>Production build</h4>
              <pre>{`npm run build`}</pre>
              <p style={{ marginTop: 6 }}>
                Outputs the static site to <code>docs/</code>, ready to be served from
                GitHub Pages or any static host.
              </p>
            </div>
          </div>
        </details>

        {/* ── Contributing ─────────────────────────────────────────────────── */}
        <details className="info-panel">
          <summary>
            <span>🤝 Contributing</span>
            <span className="arrow">▼</span>
          </summary>
          <div className="info-panel-body">
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>How to contribute</h4>
              <p>
                Contributions are welcome via{' '}
                <a
                  href="https://github.com/Elektr0Vodka/meshcore-nl-discovered-channels/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Issues
                </a>{' '}
                or pull requests. You can help by:
              </p>
              <ul style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
                <li>Adding newly discovered channels to <code>docs/data/channels.json</code></li>
                <li>Correcting or enriching metadata (category, region, scopes, etc.)</li>
                <li>Reporting duplicate, renamed, or inactive channels</li>
                <li>Improving site features or fixing bugs</li>
              </ul>
            </div>
            <div className="info-box">
              <h4 style={{ color: '#93c5fd' }}>channels.json schema</h4>
              <p>
                The data file is an array of channel objects. Each entry uses the following
                key fields:
              </p>
              <pre>{`{
  "channel": "#channel-name",
  "channel_hash": "32charhexkey",
  "category": "Regional",
  "subcategory": "City",
  "country": "Netherlands",
  "region": "Noord-Holland",
  "language": ["NL"],
  "scopes": ["nl", "nl-nh"],
  "status": "active",
  "source": "radio",
  "verified": false,
  "recommended": false,
  "tags": [],
  "notes": ""
}`}</pre>
            </div>
          </div>
        </details>

        {/* ── Notes ────────────────────────────────────────────────────────── */}
        <details className="info-panel">
          <summary>
            <span>⚠ Important notes</span>
            <span className="arrow">▼</span>
          </summary>
          <div className="info-panel-body">
            <div className="info-box">
              <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
                <li>This is <strong>not a live scanner</strong> — data is updated manually</li>
                <li>Channels may be outdated, inactive, or renamed</li>
                <li>Some channels require matching radio settings to join</li>
                <li>Only publicly discoverable channels are listed</li>
              </ul>
            </div>
          </div>
        </details>

        <footer className="site-footer">
          <a
            href="https://github.com/Elektr0Vodka/meshcore-nl-discovered-channels"
            target="_blank"
            rel="noopener noreferrer"
          >
            ElektroVodka
          </a>
          {' '}&mdash; Community channel list for MeshCore NL - 2026
        </footer>
      </div>
    </>
  )
}
