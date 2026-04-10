import { Link } from 'react-router-dom'

export default function HowToPage() {
  return (
    <div className="page">
      <div className="header">
        <h1>📘 How to use this site</h1>
        <p>Guide for using the discovered channel list together with RTfM.</p>
        <div style={{ marginTop: 10 }}>
          <Link to="/" className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            ← Back to channels
          </Link>
        </div>
      </div>

      <div className="how-to-intro">
        <p>
          This site provides <strong>discovered MeshCore channels</strong> in a format that can be
          directly used with <strong>Remote Terminal for MeshCore (RTfM)</strong>.
        </p>
        <p style={{ marginTop: 6 }}>
          It is designed for <strong>quick copy → import → use</strong> workflows.
        </p>
      </div>

      <details className="info-panel" open>
        <summary>
          <span>📥 Importing a channel into RTfM</span>
          <span className="arrow">▼</span>
        </summary>
        <div className="info-panel-body">
          <div className="info-box">
            <h4 style={{ color: '#93c5fd' }}>Step-by-step</h4>
            <ol style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
              <li>Go to the <strong>homepage</strong></li>
              <li>Find a channel</li>
              <li>Click <strong>Copy import line</strong></li>
              <li>Open RTfM</li>
              <li>Go to <strong>Channels → Import</strong></li>
              <li>Paste and apply</li>
            </ol>
          </div>
          <div className="info-box">
            <h4 style={{ color: '#93c5fd' }}>What gets copied?</h4>
            <p>The import format looks like:</p>
            <pre>#channel-name - 32charhexkey</pre>
          </div>
        </div>
      </details>

      <details className="info-panel">
        <summary>
          <span>📤 Exporting channels (RTfM)</span>
          <span className="arrow">▼</span>
        </summary>
        <div className="info-panel-body">
          <div className="info-box">
            <h4 style={{ color: '#93c5fd' }}>Export from RTfM</h4>
            <ol style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
              <li>Select your channels</li>
              <li>Click <strong>Export</strong></li>
              <li>Save or copy the output</li>
            </ol>
          </div>
          <div className="info-box warn">
            <p>Exported data can be re-imported here or shared with others.</p>
          </div>
        </div>
      </details>

      <details className="info-panel">
        <summary>
          <span>🧭 Site features explained</span>
          <span className="arrow">▼</span>
        </summary>
        <div className="info-panel-body">
          <div className="info-box">
            <h4 style={{ color: '#93c5fd' }}>Channel actions</h4>
            <ul style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
              <li><strong>Copy name</strong> → copies channel name only</li>
              <li><strong>Copy import line</strong> → ready for RTfM</li>
              <li><strong>Edit / Add info</strong> → add metadata locally</li>
            </ul>
          </div>
          <div className="info-box">
            <h4 style={{ color: '#93c5fd' }}>Filters &amp; search</h4>
            <ul style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
              <li>Search by name, tags, region or notes</li>
              <li>Filter by category, region, country</li>
              <li>Toggle scoped / no metadata</li>
            </ul>
          </div>
          <div className="info-box">
            <h4 style={{ color: '#93c5fd' }}>Export options</h4>
            <ul style={{ marginTop: 6, paddingLeft: 18, lineHeight: 1.7 }}>
              <li><strong>Download JSON</strong> → filtered dataset</li>
              <li><strong>Export RTfM</strong> → ready import file</li>
              <li><strong>Export TXT</strong> → names only</li>
              <li><strong>Selection export</strong> → export only selected channels</li>
            </ul>
          </div>
        </div>
      </details>

      <details className="info-panel">
        <summary>
          <span>💾 Local edits (important)</span>
          <span className="arrow">▼</span>
        </summary>
        <div className="info-panel-body">
          <div className="info-box warn">
            <p>
              Edits made on this site are stored <strong>only in your browser (localStorage)</strong>.
            </p>
          </div>
          <div className="info-box danger">
            <p>⚠ If you refresh or switch devices, your edits may be lost.</p>
            <p style={{ marginTop: 6 }}>
              Always use <strong>Export metadata</strong> to back up your changes.
            </p>
          </div>
        </div>
      </details>

      <details className="info-panel">
        <summary>
          <span>⚠ Important notes</span>
          <span className="arrow">▼</span>
        </summary>
        <div className="info-panel-body">
          <div className="info-box">
            <ul style={{ paddingLeft: 18, lineHeight: 1.7 }}>
              <li>This is not a live scanner</li>
              <li>Channels may be outdated or inactive</li>
              <li>Some channels require matching settings</li>
            </ul>
          </div>
        </div>
      </details>
<footer className="site-footer">
          <a href="https://github.com/Elektr0Vodka/meshcore-nl-discovered-channels" target="_blank" rel="noopener noreferrer">
            ElektroVodka
          </a>
          {' '}&mdash; Community channel list for MeshCore NL - 2026
        </footer>
    </div>

  )
}
