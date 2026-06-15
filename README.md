# VinhVideo Offline TikTok PWA

VinhVideo Offline v1.3.0 là mini app static PWA để lưu và xem video offline trong trình duyệt bằng IndexedDB. App không có backend, không dùng framework, không cần build step và vẫn deploy trực tiếp lên Vercel static.

## Tính năng chính
- Chọn nhiều video hoặc chọn thư mục video.
- Lưu video offline bằng IndexedDB.
- Feed dọc kiểu TikTok với scroll-snap, autoplay video đang xem, mute/unmute.
- Favorite, filter favorite, search, sort, trạng thái đã xem/chưa xem.
- Đổi title trong app, thêm note và tags.
- Playlist đơn giản lưu trong localStorage.
- Resume playback, seek progress, tua lùi/tới 10 giây.
- Export/import metadata JSON, không export file video thật.
- PWA cache app shell để mở lại khi offline.

## IndexedDB V1.3
Database vẫn là `vinhvideo_offline_db_v1`.

Schema v2:
- Store `videos`: chỉ chứa metadata video.
- Store `videoBlobs`: chứa `{ id, blob }`.

Khi mở app, migration v1 -> v2 dùng cursor để duyệt từng record cũ trong `videos`. Nếu record cũ có field `blob`, app chuyển blob sang `videoBlobs`, xóa blob khỏi metadata và update lại record metadata. Cách này tránh `getAll()` kéo toàn bộ Blob lớn vào RAM.

## Low-End Mode
App tự bật "Chế độ máy yếu" nếu phát hiện mobile/tablet, `navigator.deviceMemory <= 4`, hoặc `navigator.hardwareConcurrency <= 4`. Người dùng có thể bật/tắt trong drawer, lưu tại `localStorage` key `vinhvideo.lowEndMode`.

Khi bật:
- Video dùng `preload="none"`.
- Chỉ attach src/objectURL cho video hiện tại và video liền kề.
- Video xa màn hình bị pause, remove src, `load()` và revoke objectURL.
- Giảm blur/backdrop-filter và tắt smooth scroll để đỡ giật.

## Giới hạn IndexedDB và video lớn
- IndexedDB không phải backup vĩnh viễn.
- Trình duyệt/hệ điều hành có thể dọn dữ liệu khi thiếu bộ nhớ, xóa site data, đổi trình duyệt hoặc gỡ PWA.
- Luôn giữ video gốc ở ổ cứng, Google Drive, iCloud, NAS hoặc nơi backup riêng.
- Video trên 200MB sẽ được cảnh báo mạnh; Low-End Mode khuyến nghị mỗi video không quá 150MB.
- Tổng import trên 1GB có thể chạm quota trình duyệt.
- iPhone/iPad thường giới hạn storage chặt hơn desktop và có thể dọn dữ liệu PWA khi thiết bị thiếu dung lượng.

## Metadata backup/import
Export metadata tạo file:

```text
vinhvideo-metadata-backup-YYYYMMDD-HHmm.json
```

File JSON có `app`, `version`, `exportedAt`, `warning`, `videos`, `playlists`. File này không chứa video blob thật. Import metadata chỉ merge metadata an toàn với video đang còn blob trong IndexedDB; nếu blob đã mất, import không khôi phục được file video.

## Test mobile khuyến nghị
- Import 1 video nhỏ.
- Import nhiều video.
- Import file trùng.
- Hủy import giữa chừng.
- Bật/tắt Low-End Mode.
- Vuốt feed nhiều video, pause/play, mute/unmute.
- Seek progress và tua 10 giây.
- Favorite, filter, search, sort.
- Đổi title, thêm note/tag, thêm playlist.
- Export metadata, reload app, import metadata.
- Tắt mạng rồi mở lại app shell.
- Kiểm tra Storage Health và cảnh báo quota.

## Deploy Vercel
Kéo thả thư mục lên Vercel hoặc chạy:

```bash
vercel --prod
```

App vẫn là static PWA, không cần build step.
