import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    {
      // Serve docs/data/ at /data/ during dev
      name: 'serve-docs-data',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/data/')) {
            const filePath = path.join(process.cwd(), 'docs', req.url)
            if (fs.existsSync(filePath)) {
              const ext = path.extname(filePath)
              const mime = ext === '.json' ? 'application/json' : 'text/plain'
              res.setHeader('Content-Type', mime)
              res.end(fs.readFileSync(filePath))
              return
            }
          }
          next()
        })
      },
    },
  ],
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: false,  // preserve docs/data/
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // Silence "ECONNREFUSED" noise when the local server isn't running.
        // The client already handles the failure gracefully via the AbortSignal timeout.
        configure(proxy) {
          proxy.on('error', () => { /* server not running — expected */ })
        },
      },
    },
  },
})
