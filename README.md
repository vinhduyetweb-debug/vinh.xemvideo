# Offline Cinema

Offline Cinema by VinhVideo is a static, local-first PWA for watching personal videos offline in a vertical feed. It uses IndexedDB for browser storage, keeps the app shell available offline, and stays deployable as plain HTML/CSS/JavaScript on Vercel.

## What It Does
- Saves personal videos offline in the browser with IndexedDB.
- Plays videos in a vertical cinema/feed interface.
- Keeps low-end phones usable with Low-End Mode and lazy video loading.
- Provides search, filters, sorting, playlists, notes, tags, favorites, watch status, resume playback, seek, and +/-10 second controls.
- Exports and imports metadata backup JSON without exporting real video files.

## Portfolio Copy
Offline Cinema là mini app PWA xem video cá nhân offline theo dạng feed dọc. App lưu video trong trình duyệt bằng IndexedDB, tối ưu cho điện thoại cấu hình thấp với Low-End Mode, lazy loading và quản lý bộ nhớ. Phù hợp để xem nhanh video cá nhân khi không có mạng, nhưng không thay thế backup gốc trên máy/ổ cứng/cloud.

## Key Strengths
- Static PWA: no backend, no account, no framework, no build step.
- Local-first privacy: video stays in the user's browser storage.
- Data-safe IndexedDB v2 layout: metadata and video blobs are separated.
- Mobile-first performance: only current +/-1 videos keep active object URLs.
- Storage transparency: quota, usage, persistent storage status, and warnings are visible in-app.

## Important Limits
- IndexedDB is not permanent backup storage.
- Browser or OS cleanup can remove site/PWA data when storage is low or site data is cleared.
- iPhone/iPad storage limits are stricter than desktop browsers.
- Export metadata does not include video blobs.
- The app does not transcode/compress videos and does not export ZIP video archives.

## Low-End Mode
Low-End Mode auto-enables on mobile/tablet, low device memory, or low CPU devices. It can be toggled in the drawer and is stored in `localStorage` as `vinhvideo.lowEndMode`.

When enabled:
- Video preload is minimized.
- Only current, previous, and next videos keep attached sources.
- Far videos are paused, detached, unloaded, and their object URLs are revoked.
- Heavy blur/shadow/smooth-scroll effects are reduced.

## IndexedDB Storage
Database name stays:

```text
vinhvideo_offline_db_v1
```

Current schema:
- `videos`: metadata only.
- `videoBlobs`: `{ id, blob }`.

The v1 to v2 migration uses a cursor over `videos`, moves legacy `blob` fields into `videoBlobs`, removes `blob` from metadata, and keeps existing metadata such as favorite, tags, note, and play position.

## Metadata Backup
Export creates:

```text
vinhvideo-metadata-backup-YYYYMMDD-HHmm.json
```

The backup includes app/version/export time, warning text, video metadata, and playlists. It does not include real video files. Import safely merges metadata only when the video blob still exists in IndexedDB.

## Run Local
Any static server works. Example:

```bash
python -m http.server 3000
```

Open:

```text
http://localhost:3000/
```

## Deploy Vercel
Deploy the folder as a static site:

```bash
vercel --prod
```

`vercel.json` keeps the output directory as the project root.

## Test Checklist
- Open app with no videos.
- Open app with existing videos.
- Import one small video.
- Import multiple videos.
- Import duplicate video.
- Cancel import midway.
- Play, pause, mute/unmute, swipe, seek, and use +/-10 seconds.
- Favorite, search, filter, sort.
- Edit title, note, and tags.
- Create, rename, delete, and filter playlists.
- Export metadata and import metadata.
- Reload app and confirm video metadata/blob still exist.
- Toggle Low-End Mode on/off.
- Check Storage Health and persistent storage warning.
- Turn network off and confirm the PWA shell still opens.

## Screenshots
- Home
- Player
- Library
- Storage Health

## Roadmap After V1.6
- Optional manual cover image per video without auto thumbnail generation.
- Optional grouped collections beyond simple playlists.
- More robust manual QA scripts for IndexedDB migration.
- Better accessibility labels and keyboard controls.
