# VinhVideo Offline TikTok PWA

## Tính năng
- HTML tĩnh, deploy Vercel không cần build.
- Chọn nhiều video từ điện thoại/iPad/máy tính.
- Lưu video offline bằng IndexedDB.
- Lần sau mở lại vẫn xem được, kể cả không có internet.
- Giao diện xem video kiểu TikTok: vuốt lên/xuống, autoplay, pause video cũ.
- Thư viện video cá nhân.
- Yêu thích, lọc yêu thích, xóa video.
- Export metadata playlist.
- PWA cache app shell để mở app khi offline.

## Lưu ý
- iPhone/iPad có giới hạn dung lượng lưu trong trình duyệt.
- Video quá nặng có thể làm đầy bộ nhớ.
- Export JSON chỉ export metadata, không export file video.

## Deploy Vercel
Kéo thả thư mục lên Vercel hoặc chạy `vercel --prod`.
