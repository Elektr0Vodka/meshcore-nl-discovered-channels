#!/usr/bin/env node
/**
 * MeshCore NL — Local editor server
 *
 * Usage:
 *   node server.js          → http://localhost:8080
 *   node server.js 3000     → http://localhost:3000
 *
 * Serves docs/ as static files and exposes:
 *   GET  /api/status       → health check
 *   GET  /api/channels     → current channels.json
 *   POST /api/channels     → overwrite channels.json (body = JSON array)
 *                            also syncs docs/data/channels.json
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT      = parseInt(process.argv[2]) || 8080;
const ROOT      = __dirname;
const DOCS_DIR  = path.join(ROOT, 'docs');
const META_FILE = path.join(ROOT, 'metadata', 'channels.json');
const DATA_FILE = path.join(ROOT, 'docs', 'data', 'channels.json');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt':  'text/plain; charset=utf-8',
  '.ico':  'image/x-icon',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function json(res, status, obj) {
  const body = JSON.stringify(obj, null, 2);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end',  () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${path.basename(filePath)}`);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime, 'Content-Length': data.length });
    res.end(data);
  });
}

function log(msg) {
  process.stdout.write(`[${new Date().toISOString().slice(11,19)}] ${msg}\n`);
}

// ── Request handler ───────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  // Allow local browser access
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  log(`${req.method} ${pathname}`);

  // ── API ───────────────────────────────────────────────────────────────────
  if (pathname === '/api/status') {
    json(res, 200, { ok: true, mode: 'local', server: 'meshcore-nl' });
    return;
  }

  if (pathname === '/api/channels') {
    if (req.method === 'GET') {
      serveFile(res, META_FILE);
      return;
    }

    if (req.method === 'POST') {
      let body;
      try {
        body = await readBody(req);
        const parsed = JSON.parse(body);                   // validate JSON
        if (!Array.isArray(parsed)) throw new Error('Expected a JSON array');

        const pretty = JSON.stringify(parsed, null, 2);
        fs.writeFileSync(META_FILE, pretty, 'utf8');       // metadata/channels.json
        fs.writeFileSync(DATA_FILE, pretty, 'utf8');       // docs/data/channels.json (sync)
        log(`Saved channels.json — ${parsed.length} entries, ${pretty.length} bytes`);
        json(res, 200, { ok: true, entries: parsed.length, saved: new Date().toISOString() });
      } catch (e) {
        log(`ERROR saving channels.json: ${e.message}`);
        json(res, 400, { ok: false, error: e.message });
      }
      return;
    }

    res.writeHead(405); res.end('Method Not Allowed');
    return;
  }

  // ── Static files ──────────────────────────────────────────────────────────
  // Resolve path inside docs/ only (no directory traversal)
  const rel      = pathname === '/' ? '/index.html' : pathname;
  const filePath = path.resolve(DOCS_DIR, '.' + rel);

  if (!filePath.startsWith(DOCS_DIR + path.sep) && filePath !== DOCS_DIR) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Auto-redirect / to editor.html when accessed via browser
  if (pathname === '/') {
    res.writeHead(302, { Location: '/editor.html' });
    res.end();
    return;
  }

  serveFile(res, filePath);
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n✗ Port ${PORT} is already in use. Try: node server.js ${PORT + 1}\n`);
  } else {
    console.error('Server error:', err);
  }
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n  📡 MeshCore NL — Local Editor\n');
  console.log(`  Editor  →  http://localhost:${PORT}/editor.html`);
  console.log(`  Viewer  →  http://localhost:${PORT}/index.html`);
  console.log(`  API     →  http://localhost:${PORT}/api/channels\n`);
  console.log('  Writes save to:');
  console.log(`    metadata/channels.json`);
  console.log(`    docs/data/channels.json`);
  console.log('\n  Press Ctrl+C to stop.\n');
});
