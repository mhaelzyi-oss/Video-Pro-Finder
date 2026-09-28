# Video Pro Finder

Video Pro Finder is a Manifest V3 Chrome and Microsoft Edge extension for lawfully discovering browser-exposed media, analyzing accessible stream metadata, safeguarding protected media, and supporting direct downloads only for eligible non-protected sources.

## Overview

The extension inspects page-visible media resources, normalizes source metadata, identifies HLS and DASH manifests, evaluates quality options, and enforces lawful user declarations before direct downloads begin. It never bypasses DRM, requests licenses, or decrypts protected media.

## Supported sources

- Direct video and audio files
- HLS master/media playlists
- DASH manifests
- Subtitle sidecars and captions
- Browser-exposed direct media URLs

## Unsupported sources

- DRM-protected media
- Torrent files and magnet links
- Access-controlled streams behind authentication or signed URLs
- Protected live streams and encrypted manifests

## Legal and ethics

Users remain responsible for verifying they have authority to save media. Detection does not establish ownership or permission. Non-DRM media is not automatically free to redistribute. Video Pro Finder does not bypass DRM, encryption, authentication, CORS, signed URLs, paywalls, or other access controls.

## Architecture

- `background.js`: service worker startup, persistence, queue reconciliation, and download tracking.
- `content.js`: page scanning and media discovery.
- `utils/*.js`: storage, parsing, quality logic, protection checks, retry, and diagnostics.
- `popup.html` and `popup.js`: current-tab summary and source cards.
- `options.html` and `options.js`: settings, permissions, and local privacy controls.
- `library.html` and `library.js`: local library and watch-later UI.
- `resources.html` and `resources.js`: compliance and support info.

## Running locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Testing

```bash
npm run test
npm run test:e2e
```

## Packaging

```bash
npm run package
```

## CI

The GitHub Actions workflow runs format check, lint, unit tests, build, Playwright demo tests, and ZIP packaging.
