# Video Pro Finder

Video Pro Finder is a Manifest V3 browser extension for Chrome and Microsoft Edge. It detects browser-exposed media URLs, analyzes accessible non-protected streams, previews eligible sources, and supports lawful direct downloading for content the user is authorized to save.

## Product overview

The extension is intentionally lawful and privacy-first. It detects direct media, HLS, DASH, captions, and accessible metadata while refusing to bypass protected media, decrypt content, or request DRM licences.

## Supported media

- Direct video/audio links
- HLS playlists
- DASH manifests
- Subtitle sidecars
- Browser-visible media metadata

## Unsupported sources

- DRM-protected media
- Torrent files and magnet links
- Access-controlled private streams
- CORS-blocked or paywalled sources

## Architecture

- `background.js`: service worker initialization, queue reconciliation, and persistence
- `content.js`: page scan and message bridge
- `utils/*.js`: normalization, protection detection, quality logic, parser helpers, download queue, diagnostics, and recovery
- `popup.html` / `popup.js`: summary and source cards
- `options.html` / `options.js`: settings and permissions
- `library.html` / `library.js`: saved source library and watch-later view
- `resources.html` / `resources.js`: policy, compliance, and diagnostics

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
npm run test:e2e
```

## Package

```bash
npm run package
```

## Ethics and legal notice

Users are responsible for verifying they have authority to save media. Detection does not establish ownership or permission. Video Pro Finder does not bypass DRM, decryption, authentication, CORS restrictions, signed URLs, paywalls, or access controls. It does not support torrent files or magnet links.
