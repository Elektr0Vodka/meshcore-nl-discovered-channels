# MeshCore NL – Discovered Channels

![Status](https://img.shields.io/badge/status-community--maintained-brightgreen)
![Source](https://img.shields.io/badge/source-Remote--Terminal--for--MeshCore-orange)
![Coverage](https://img.shields.io/badge/region-Netherlands%20%2B%20surrounding-lightgrey)

A community-maintained directory of **MeshCore channels** discovered via the channel finder in [Remote Terminal for MeshCore (RTfM)](https://github.com/Elektr0Vodka/Remote-Terminal-for-MeshCore), with a focus on **The Netherlands and surrounding regions**.

**Live site:** https://elektr0vodka.github.io/meshcore-nl-discovered-channels/

---

## Overview

The site provides a searchable, filterable browser for MeshCore channels with rich metadata — categories, regions, scopes, languages, activity dates, and message counts. Channel data is stored in [`docs/data/channels.json`](docs/data/channels.json) and served as a static React app.

- **Channel Browser** — read-only, search/filter/sort, export to RTfM/JSON/TXT
- **Local Editor** — enrich channels with metadata; saves locally or to disk via API server
- **Dark / light theme** — persisted in localStorage

---

## Running locally

### Requirements

- Node.js 18+
- npm 9+

### Install

```bash
git clone https://github.com/Elektr0Vodka/meshcore-nl-discovered-channels.git
cd meshcore-nl-discovered-channels
npm install
```

### Development server

```bash
npm run dev
```

Opens the site at **http://localhost:5173** with hot reload.  
In this mode the Local Editor saves metadata changes to browser localStorage.

### API server (editor write-back)

```bash
npm run server
```

Starts a lightweight API server on **port 8080**. When running alongside `npm run dev`, the editor detects it and writes changes directly to `docs/data/channels.json` on disk instead of localStorage.

### Production build

```bash
npm run build
```

Outputs the static site to `docs/`, ready for GitHub Pages or any static host.

---

## Data format

Channels are stored in `docs/data/channels.json` as an array of objects:

```json
{
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
  "notes": "",
  "first_seen": null,
  "last_seen": null,
  "added": null,
  "message_amount": null
}
```

`channel_hash` is the 32-character hex key used to identify and join the channel in MeshCore.

---

## Contributing

Contributions are welcome via [issues](https://github.com/Elektr0Vodka/meshcore-nl-discovered-channels/issues) or pull requests.

Ways to help:
- Add newly discovered channels to `docs/data/channels.json`
- Correct or enrich existing metadata (category, region, scopes, etc.)
- Report duplicate, renamed, or inactive channels
- Improve site features or fix bugs

Only **publicly discoverable** channels are accepted. Private, encrypted, or access-restricted channels should not be added.

---

## Notes

<details>
<summary><strong>Known duplicates / overlaps</strong></summary>

These entries are kept intentionally because they were discovered as separate channels:

- `#londen` / `#london`
- `#wardrive` / `#wardriving`
- `#weather` / `#weer` / `#wetter`
- `#zuid-holland` / `#zuidholland`

</details>

---

## Disclaimer

This repository is for **reference and community use only**.  
No guarantee is made that any listed channel is active, official, moderated, or continuously available.  
Channel data may be outdated. Always verify independently before use.
