import { useState, useEffect, useCallback, useMemo } from 'react'
import type { Channel, ChannelMeta } from '../types'

type LocalEdits = Record<string, Partial<ChannelMeta> | null>

export function buildChannels(
  rtfmMap: Record<string, string>,
  metaMap: Record<string, ChannelMeta>,
  localEdits: LocalEdits,
  serverMode: boolean
): Channel[] {
  // Union of all known channel names: from rtfm file + from JSON entries that have channel_hash
  const allNames = new Set([
    ...Object.keys(rtfmMap),
    ...Object.keys(metaMap).filter(name => !!metaMap[name]?.channel_hash),
  ])
  return Array.from(allNames).sort().map(name => {
    // Prefer rtfm key; fall back to channel_hash embedded in the JSON
    const hexKey = rtfmMap[name] ?? metaMap[name]?.channel_hash ?? ''
    const base = metaMap[name] ?? { channel: name }
    const local = serverMode ? undefined : localEdits[name]
    if (local === null) {
      return { channel: name, _key: hexKey, _hasMeta: false, _localEdit: true }
    }
    const merged: Channel = { ...base, channel: name, _key: hexKey, _hasMeta: false, _localEdit: false }
    merged._hasMeta = !!(metaMap[name] || (local && Object.keys(local).length > 0))
    merged._localEdit = !serverMode && !!local
    if (local) Object.assign(merged, local)
    return merged
  })
}

export function useChannelData(serverMode: boolean, localEdits: LocalEdits) {
  const [rtfmMap, setRtfmMap] = useState<Record<string, string>>({})
  const [metaMap, setMetaMap] = useState<Record<string, ChannelMeta>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        // channels.json is required; remote-terminal-export.txt is optional (legacy hex key source)
        const jsonRes = await fetch('./data/channels.json')
        if (!jsonRes.ok) throw new Error(`channels.json: ${jsonRes.status}`)
        const arr: ChannelMeta[] = await jsonRes.json()
        const newMeta: Record<string, ChannelMeta> = {}
        for (const c of arr) newMeta[c.channel] = c

        // Try to load the legacy rtfm file; silently skip if absent
        const newRtfm: Record<string, string> = {}
        try {
          const rtfmRes = await fetch('./data/remote-terminal-export.txt')
          if (rtfmRes.ok) {
            const rtfmText = await rtfmRes.text()
            for (const line of rtfmText.split('\n')) {
              const m = line.match(/^(#\S+)\s+-\s+([0-9a-f]{32})/i)
              if (m) newRtfm[m[1]] = m[2]
            }
          }
        } catch {
          // rtfm file is optional — channel_hash in channels.json takes over
        }

        if (!cancelled) { setRtfmMap(newRtfm); setMetaMap(newMeta); setLoading(false) }
      } catch (e) {
        if (!cancelled) { setError((e as Error).message); setLoading(false) }
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const allChannels = useMemo(
    () => buildChannels(rtfmMap, metaMap, localEdits, serverMode),
    [rtfmMap, metaMap, localEdits, serverMode]
  )

  const rebuildMeta = useCallback((updatedMeta: Record<string, ChannelMeta>) => {
    setMetaMap(updatedMeta)
  }, [])

  return { allChannels, rtfmMap, metaMap, loading, error, rebuildMeta }
}
