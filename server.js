#!/usr/bin/env node
/**
 * MeshCore NL — Local editor server
 *
 * Usage:
 *   node server.js          → http://localhost:8080
 *   node server.js 3000     → http://localhost:3000
 *
 * Exposes:
 *   GET  /api/status    → health check
 *   GET  /api/channels  → current channels.json
 *   POST /api/channels  → overwrite docs/data/channels.json (body = JSON array)
 *
 * Run this server, then in a second terminal: npm run dev
 * Vite proxies /api → this server.
 */

import http from 'node:http'
import fs   from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT      = parseInt(process.argv[2]) || 8080
const DATA_FILE = path.join(__dirname, 'docs', 'data', 'channels.json')

// ── Helpers ───────────────────────────────────────────────────────────────────
function jsonResponse(res, status, obj) {
  const body = JSON.stringify(obj, null, 2)
  res.writeHead(status, {
    'Content-Type':  'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  res.end(body)
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', c => chunks.push(c))
    req.on('end',  () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function log(msg) {
  process.stdout.write(`[${new Date().toISOString().slice(11, 19)}] ${msg}\n`)
}

// ── Request handler ───────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin',  '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  const pathname = new URL(req.url, `http://localhost:${PORT}`).pathname
  log(`${req.method} ${pathname}`)

  // GET /api/status
  if (pathname === '/api/status') {
    jsonResponse(res, 200, { ok: true, mode: 'local', server: 'meshcore-nl' })
    return
  }

  // GET /api/channels — serve current channels.json
  if (pathname === '/api/channels' && req.method === 'GET') {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8')
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(data)
    } catch {
      jsonResponse(res, 404, { ok: false, error: 'channels.json not found' })
    }
    return
  }

  // POST /api/channels — persist updated channels.json to disk
  if (pathname === '/api/channels' && req.method === 'POST') {
    try {
      const body   = await readBody(req)
      const parsed = JSON.parse(body)
      if (!Array.isArray(parsed)) throw new Error('Expected a JSON array')

      const pretty = JSON.stringify(parsed, null, 2)
      fs.writeFileSync(DATA_FILE, pretty + '\n', 'utf8')
      log(`Saved channels.json — ${parsed.length} entries`)
      jsonResponse(res, 200, { ok: true, entries: parsed.length })
    } catch (e) {
      log(`ERROR: ${e.message}`)
      jsonResponse(res, 400, { ok: false, error: e.message })
    }
    return
  }

  jsonResponse(res, 404, { ok: false, error: 'Not found' })
})

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n✗ Port ${PORT} already in use. Try: node server.js ${PORT + 1}\n`)
  } else {
    console.error('Server error:', err)
  }
  process.exit(1)
})

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n  📡 MeshCore NL — Local Editor Server\n')
  console.log(`  API  →  http://localhost:${PORT}/api/channels`)
  console.log(`  Data →  ${DATA_FILE}\n`)
  console.log('  Now open a second terminal and run: npm run dev')
  console.log('  The editor page will show "Server connected".\n')
  console.log('  Press Ctrl+C to stop.\n')
})
