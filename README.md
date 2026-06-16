# Offline Cinema

Offline Cinema by VinhVideo is a static, local-first PWA for watching personal videos offline in a vertical feed. V1.7 adds Kids Safe Mode: a soft in-app guardrail so a parent can approve offline videos before a child watches them.

## What It Does
- Saves personal videos offline in the browser with IndexedDB.
- Plays videos in a vertical cinema/feed interface.
- Keeps low-end phones usable with Low-End Mode and lazy video loading.
- Provides search, filters, sorting, playlists, notes, tags, favorites, watch status, resume playback, seek, and +/-10 second controls.
- Adds Parent Mode and Kids Mode.
- Exports and imports metadata backup JSON without exporting real video files.

## Kids Safe Mode
Kids Safe Mode turns Offline Cinema into a parent-curated offline cinema for children:
- Parent Mode manages import/export, delete actions, playlists, metadata, storage, and Kids Safe settings.
- Kids Mode only shows videos marked `approvedForKids`.
- Kids Mode hides import, delete, export/import metadata, storage technical actions, and edit controls.
- Kids Home shows friendly shelves such as today's show, family videos, music, learning, favorites, and calm videos.
- After a video ends, Kids Mode stops instead of autoplaying forever and asks whether to continue.

Kids Safe Mode is a soft guardrail inside the app. It is not a replacement for OS/browser parental controls, device supervision, or adult supervision.

## Parent PIN
Parent PIN is optional and stored locally.
- It can be enabled, changed, or removed in Parent Mode.
- If enabled, leaving Kids Mode requires the 4-digit PIN.
- If disabled, leaving Kids Mode uses a normal confirmation.
- The PIN is only a light in-app barrier to reduce accidental taps. It is not strong security.

## Daily Show Limit
Parent Mode can set:
- Maximum videos per day.
- Maximum minutes per day.
- Reset today's local stats.
- Enable or disable limits.

The counter is local-device only and resets on a new local day.

## Break Reminder
Parent Mode can enable a break reminder after every N completed videos. Kids Mode shows a 30-second rest screen with friendly text before the "Xem tiếp" button returns.

## Watch Log
Kids watch history is stored locally in `localStorage` under `offlineCinema.kidsWatchLog`. Parent Mode shows today's watch time, video count, recent watched videos, and can clear the local log.

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
- Kids Safe Mode does not block a child from leaving the browser/app at the OS level.

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

V1.7 does not bump `DB_VERSION`; it adds optional kids metadata fields through normalization and safe metadata updates.

## Metadata Backup
Export creates:

```text
vinhvideo-metadata-backup-YYYYMMDD-HHmm.json
```

The backup includes app/version/export time, warning text, video metadata, playlists, kids visibility fields, and kids settings. It does not include real video files. Import safely merges metadata only when the video blob still exists in IndexedDB.

Kids metadata fields include:
- `approvedForKids`
- `kidsCategory`
- `kidsEnergy`
- `kidsAllowedTime`
- `kidsQuestion`
- `kidsNote`

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

## Test Checklist
- Open app in Parent Mode.
- Enter Kids Mode.
- Exit Kids Mode without PIN.
- Enable PIN, enter Kids Mode, exit with correct PIN, reject wrong PIN.
- Import a small video in Parent Mode.
- Mark video approved for kids.
- Confirm Kids Mode only shows approved videos.
- Confirm Kids Mode hides import/delete/export/edit controls.
- Play a video in Kids Mode and confirm it does not autoplay forever after ending.
- Confirm daily limit and break reminder.
- Confirm watch log appears in Parent Mode.
- Export metadata and confirm kids fields are present.
- Reload app and confirm mode/settings persist.
- Toggle Low-End Mode.
- Confirm old videos still play.

## Screenshots
- Parent Mode
- Kids Home
- Player
- Library
- Storage Health

## Roadmap After V1.7
- Better touch-friendly Kids category editing.
- Optional manual cover image per video without auto thumbnail generation.
- More robust manual QA scripts for IndexedDB migration and kids settings.
- Better accessibility labels and keyboard controls.


## V1.9.5 Stability Hotfix
- Repairs Vietnamese encoding in static UI and runtime strings.
- Repairs old IndexedDB metadata text without touching valid video blobs.
- Keeps orphan video repair helpers for metadata records that lost their blob.


## V1.9.5 Dialog Text Sweep
- Fixes Vietnamese text in native browser dialogs, prompts, confirmations, import preflight warnings, and toast messages.
- Keeps the app static and does not change IndexedDB names, version, or valid video blobs.
