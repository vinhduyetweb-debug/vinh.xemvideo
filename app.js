const APP_VERSION = "1.3.0";
const DB_NAME = "vinhvideo_offline_db_v1";
const DB_VERSION = 2;
const STORE = "videos";
const BLOB_STORE = "videoBlobs";
const PLAYLIST_KEY = "vinhvideo.playlists.v1";
const LOW_END_KEY = "vinhvideo.lowEndMode";
const LARGE_FILE_BYTES = 200 * 1024 * 1024;
const LOW_END_FILE_BYTES = 150 * 1024 * 1024;
const LARGE_IMPORT_BYTES = 1024 * 1024 * 1024;

const $ = id => document.getElementById(id);
const appRoot = $("appRoot");
const feed = $("feed");
const empty = $("empty");
const drawer = $("drawer");
const fileInput = $("fileInput");
const folderInput = $("folderInput");
const metadataInput = $("metadataInput");
const libraryList = $("libraryList");
const storageInfo = $("storageInfo");
const healthVideoCount = $("healthVideoCount");
const healthOfflineSize = $("healthOfflineSize");
const healthUsage = $("healthUsage");
const healthQuota = $("healthQuota");
const healthPercent = $("healthPercent");
const healthLevel = $("healthLevel");
const healthPersist = $("healthPersist");
const healthWarning = $("healthWarning");
const persistBtn = $("persistBtn");
const lowEndToggle = $("lowEndToggle");
const searchInput = $("searchInput");
const sortSelect = $("sortSelect");
const statusFilter = $("statusFilter");
const playlistFilter = $("playlistFilter");
const importModal = $("importModal");
const importStatus = $("importStatus");
const importBar = $("importBar");
const importErrors = $("importErrors");
const cancelImportBtn = $("cancelImportBtn");

let db = null;
let videos = [];
let visibleVideos = [];
let playlists = loadPlaylists();
let muted = true;
let observer = null;
let currentIndex = 0;
let lowEndMode = getInitialLowEndMode();
let cancelImport = false;
let skipAllDuplicates = false;
const objectUrls = new Map();
const videoElements = new Map();
const positionTimers = new Map();

function getInitialLowEndMode() {
  const saved = localStorage.getItem(LOW_END_KEY);
  if (saved === "1") return true;
  if (saved === "0") return false;
  const ua = navigator.userAgent || "";
  const mobile = /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(ua);
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  const lowCpu = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  return Boolean(mobile || lowMemory || lowCpu);
}

function applyLowEndMode() {
  appRoot.classList.toggle("lowEnd", lowEndMode);
  lowEndToggle.checked = lowEndMode;
  localStorage.setItem(LOW_END_KEY, lowEndMode ? "1" : "0");
  maintainMountedVideos();
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = event => {
      const database = request.result;
      let videoStore;
      if (!database.objectStoreNames.contains(STORE)) {
        videoStore = database.createObjectStore(STORE, { keyPath: "id" });
      } else {
        videoStore = event.target.transaction.objectStore(STORE);
      }

      if (!database.objectStoreNames.contains(BLOB_STORE)) {
        database.createObjectStore(BLOB_STORE, { keyPath: "id" });
      }

      if (event.oldVersion < 2) {
        migrateVideosToV2(event.target.transaction, videoStore);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function migrateVideosToV2(transaction, videoStore) {
  const blobStore = transaction.objectStore(BLOB_STORE);
  const cursorRequest = videoStore.openCursor();
  cursorRequest.onsuccess = event => {
    const cursor = event.target.result;
    if (!cursor) return;
    const record = cursor.value || {};
    if (record.blob) {
      const metadata = normalizeMetadata(record);
      delete metadata.blob;
      blobStore.put({ id: metadata.id, blob: record.blob });
      cursor.update(metadata);
    } else {
      cursor.update(normalizeMetadata(record));
    }
    cursor.continue();
  };
};

function store(name, mode = "readonly") {
  return db.transaction(name, mode).objectStore(name);
}

function getAllMetadata() {
  return new Promise((resolve, reject) => {
    const rows = [];
    const request = store(STORE).openCursor();
    request.onsuccess = event => {
      const cursor = event.target.result;
      if (!cursor) {
        resolve(rows);
        return;
      }
      rows.push(normalizeMetadata(cursor.value));
      cursor.continue();
    };
    request.onerror = () => reject(request.error);
  });
}

function getBlob(id) {
  return new Promise((resolve, reject) => {
    const request = store(BLOB_STORE).get(id);
    request.onsuccess = () => resolve(request.result?.blob || null);
    request.onerror = () => reject(request.error);
  });
}

function hasBlob(id) {
  return new Promise((resolve, reject) => {
    const request = store(BLOB_STORE).getKey(id);
    request.onsuccess = () => resolve(Boolean(request.result));
    request.onerror = () => reject(request.error);
  });
}

function saveVideo(metadata, blob) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE, BLOB_STORE], "readwrite");
    transaction.objectStore(STORE).put(normalizeMetadata(metadata));
    if (blob) transaction.objectStore(BLOB_STORE).put({ id: metadata.id, blob });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function updateVideo(metadata) {
  return new Promise((resolve, reject) => {
    const request = store(STORE, "readwrite").put(normalizeMetadata({ ...metadata, updatedAt: Date.now() }));
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function deleteVideo(id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE, BLOB_STORE], "readwrite");
    transaction.objectStore(STORE).delete(id);
    transaction.objectStore(BLOB_STORE).delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function clearLibrary() {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE, BLOB_STORE], "readwrite");
    transaction.objectStore(STORE).clear();
    transaction.objectStore(BLOB_STORE).clear();
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function normalizeMetadata(record) {
  const now = Date.now();
  const fileName = record.fileName || record.name || record.title || "video";
  const title = record.title || fileName;
  return {
    id: record.id || crypto.randomUUID(),
    title,
    fileName,
    source: record.source || "Điện thoại",
    type: record.type || "video/*",
    size: Number(record.size || 0),
    favorite: Boolean(record.favorite),
    tags: Array.isArray(record.tags) ? record.tags : parseTags(record.tags || ""),
    note: record.note || "",
    duration: Number.isFinite(record.duration) ? record.duration : null,
    playPosition: Number(record.playPosition || 0),
    seen: Boolean(record.seen),
    lastPlayedAt: record.lastPlayedAt || null,
    createdAt: record.createdAt || now,
    updatedAt: record.updatedAt || record.createdAt || now,
    order: record.order || record.createdAt || now,
    fingerprint: record.fingerprint || [fileName, record.size || 0, record.lastModified || ""].join("|")
  };
}

function metadataFromFile(file) {
  const now = Date.now();
  const fileName = file.name;
  return normalizeMetadata({
    id: crypto.randomUUID(),
    title: file.webkitRelativePath || fileName,
    fileName,
    source: "Điện thoại",
    type: file.type,
    size: file.size,
    favorite: false,
    tags: [],
    note: "",
    duration: null,
    playPosition: 0,
    seen: false,
    lastPlayedAt: null,
    createdAt: now,
    updatedAt: now,
    order: now + Math.random(),
    fingerprint: fingerprint(file)
  });
}

function fingerprint(file) {
  return [file.name, file.size, file.lastModified].join("|");
}

function fmt(bytes) {
  if (!bytes) return "0 MB";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return value.toFixed(i ? 1 : 0) + " " + units[i];
}

function fmtTime(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "--:--";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = String(total % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function toast(message, duration = 2600) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), duration);
}

function esc(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseTags(value) {
  return String(value || "")
    .split(",")
    .map(x => x.trim())
    .filter(Boolean);
}

function yieldUI() {
  return new Promise(resolve => {
    if ("requestAnimationFrame" in window) requestAnimationFrame(() => resolve());
    else setTimeout(resolve, 0);
  });
}

function isQuotaExceeded(error) {
  return error?.name === "QuotaExceededError" || error?.name === "NS_ERROR_DOM_QUOTA_REACHED" || error?.code === 22 || error?.code === 1014;
}

async function refresh({ keepIndex = false } = {}) {
  const oldId = visibleVideos[currentIndex]?.id;
  videos = (await getAllMetadata()).sort((a, b) => a.order - b.order || a.createdAt - b.createdAt);
  applyFilters();
  if (keepIndex && oldId) currentIndex = Math.max(0, visibleVideos.findIndex(v => v.id === oldId));
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= visibleVideos.length) currentIndex = Math.max(0, visibleVideos.length - 1);
  renderFeed();
  renderLibrary();
  updatePlaylistFilter();
  updateStorage();
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const selectedPlaylist = playlistFilter.value;
  let rows = [...videos];

  if (query) {
    rows = rows.filter(video => {
      const haystack = [video.title, video.fileName, video.note, video.tags.join(",")].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }
  if (status === "fav") rows = rows.filter(video => video.favorite);
  if (status === "seen") rows = rows.filter(video => video.seen);
  if (status === "unseen") rows = rows.filter(video => !video.seen);
  if (status === "large") rows = rows.filter(video => video.size >= LARGE_FILE_BYTES);
  if (selectedPlaylist !== "all") {
    const playlist = playlists.find(item => item.id === selectedPlaylist);
    rows = rows.filter(video => playlist?.videoIds.includes(video.id));
  }

  rows.sort((a, b) => {
    if (sortSelect.value === "oldest") return a.createdAt - b.createdAt;
    if (sortSelect.value === "largest") return b.size - a.size;
    if (sortSelect.value === "az") return a.title.localeCompare(b.title, "vi");
    if (sortSelect.value === "recent") return (b.lastPlayedAt || 0) - (a.lastPlayedAt || 0);
    return b.createdAt - a.createdAt;
  });

  visibleVideos = rows;
}

function renderFeed() {
  empty.style.display = visibleVideos.length ? "none" : "grid";
  feed.innerHTML = "";
  videoElements.clear();
  if (observer) observer.disconnect();

  visibleVideos.forEach((video, index) => {
    const page = document.createElement("section");
    page.className = "videoPage";
    page.dataset.id = video.id;
    page.dataset.index = String(index);
    page.innerHTML = `
      <video playsinline loop preload="none"></video>
      <div class="overlay">
        <h2>${esc(video.title)}</h2>
        <p>${esc(video.source)} • ${fmt(video.size)} • <span class="statusText">${watchStatus(video)}</span></p>
        <p class="timeText"><span class="currentTime">${fmtTime(video.playPosition)}</span> / <span class="durationText">${fmtTime(video.duration)}</span></p>
      </div>
      <div class="playerTools">
        <button class="toolBtn back10" type="button">↺ 10</button>
        <button class="toolBtn forward10" type="button">10 ↻</button>
      </div>
      <div class="actions">
        <button class="actionBtn fav ${video.favorite ? "active" : ""}" type="button" aria-label="Yêu thích">♥</button>
        <button class="actionBtn edit" type="button" aria-label="Sửa">✎</button>
        <button class="actionBtn del" type="button" aria-label="Xóa">🗑</button>
      </div>
      <button class="progress" type="button" aria-label="Seek video"><span></span></button>`;

    const videoEl = page.querySelector("video");
    videoElements.set(video.id, videoEl);
    bindVideoEvents(page, video, videoEl);
    feed.appendChild(page);
  });

  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting && entry.intersectionRatio > 0.72) {
        setCurrentIndex(Number(entry.target.dataset.index));
      }
    }
  }, { threshold: [0, 0.72, 1] });

  for (const page of feed.children) observer.observe(page);
  maintainMountedVideos();
}

function bindVideoEvents(page, video, videoEl) {
  const progress = page.querySelector(".progress");
  const bar = page.querySelector(".progress span");
  const currentTime = page.querySelector(".currentTime");
  const durationText = page.querySelector(".durationText");
  const statusText = page.querySelector(".statusText");

  videoEl.addEventListener("loadedmetadata", async () => {
    if (Number.isFinite(videoEl.duration) && videoEl.duration > 0 && video.duration !== videoEl.duration) {
      video.duration = videoEl.duration;
      durationText.textContent = fmtTime(video.duration);
      await updateVideo(video);
    }
    if (video.playPosition > 2 && video.duration && video.playPosition < video.duration - 3) {
      videoEl.currentTime = video.playPosition;
    }
  });

  videoEl.addEventListener("timeupdate", () => {
    const duration = videoEl.duration || video.duration || 0;
    if (duration) bar.style.width = Math.min(100, videoEl.currentTime / duration * 100) + "%";
    currentTime.textContent = fmtTime(videoEl.currentTime);
    schedulePositionSave(video, videoEl, statusText);
  });

  videoEl.addEventListener("pause", () => savePlayback(video, videoEl, statusText));
  page.addEventListener("dblclick", event => {
    if (event.target.closest("button")) return;
    togglePlay(videoEl);
  });
  page.addEventListener("click", event => {
    if (event.target.closest("button")) return;
    togglePlay(videoEl);
  });

  progress.addEventListener("click", event => {
    const duration = videoEl.duration || video.duration;
    if (!duration) return;
    const rect = progress.getBoundingClientRect();
    videoEl.currentTime = Math.max(0, Math.min(duration, (event.clientX - rect.left) / rect.width * duration));
    savePlayback(video, videoEl, statusText);
  });

  page.querySelector(".back10").onclick = () => {
    videoEl.currentTime = Math.max(0, videoEl.currentTime - 10);
    savePlayback(video, videoEl, statusText);
  };
  page.querySelector(".forward10").onclick = () => {
    const duration = videoEl.duration || video.duration || videoEl.currentTime + 10;
    videoEl.currentTime = Math.min(duration, videoEl.currentTime + 10);
    savePlayback(video, videoEl, statusText);
  };
  page.querySelector(".fav").onclick = () => toggleFavorite(video.id);
  page.querySelector(".edit").onclick = () => editVideo(video.id);
  page.querySelector(".del").onclick = () => removeVideo(video.id);
}

function watchStatus(video) {
  if (video.seen) return "Đã xem";
  if (video.playPosition > 3) return "Đang xem dở";
  return "Chưa xem";
}

async function setCurrentIndex(index) {
  if (!Number.isFinite(index) || index < 0 || index >= visibleVideos.length || index === currentIndex) return;
  const previous = visibleVideos[currentIndex];
  if (previous) {
    const previousEl = videoElements.get(previous.id);
    if (previousEl) {
      previousEl.pause();
      await savePlayback(previous, previousEl);
    }
  }
  currentIndex = index;
  maintainMountedVideos();
  const current = visibleVideos[currentIndex];
  const currentEl = current ? videoElements.get(current.id) : null;
  if (currentEl) {
    currentEl.muted = muted;
    currentEl.play().catch(() => {});
  }
}

async function maintainMountedVideos() {
  const keepDistance = lowEndMode ? 1 : 1;
  const keepIds = new Set();
  for (let i = currentIndex - keepDistance; i <= currentIndex + keepDistance; i++) {
    if (visibleVideos[i]) keepIds.add(visibleVideos[i].id);
  }

  for (const [id, videoEl] of videoElements) {
    if (keepIds.has(id)) {
      if (!videoEl.src) await attachVideoSource(id, videoEl);
      videoEl.preload = lowEndMode ? "none" : id === visibleVideos[currentIndex]?.id ? "metadata" : "none";
    } else {
      detachVideoSource(id, videoEl);
    }
  }

  for (const [id, objectUrl] of objectUrls) {
    if (!keepIds.has(id)) {
      URL.revokeObjectURL(objectUrl);
      objectUrls.delete(id);
    }
  }
}

async function attachVideoSource(id, videoEl) {
  let objectUrl = objectUrls.get(id);
  if (!objectUrl) {
    const blob = await getBlob(id);
    if (!blob) {
      toast("Video blob không còn trong IndexedDB. Metadata vẫn còn nhưng file video đã mất.", 4200);
      return;
    }
    objectUrl = URL.createObjectURL(blob);
    objectUrls.set(id, objectUrl);
  }
  videoEl.src = objectUrl;
  videoEl.muted = muted;
}

function detachVideoSource(id, videoEl) {
  if (!videoEl.src) return;
  videoEl.pause();
  videoEl.removeAttribute("src");
  videoEl.load();
  const objectUrl = objectUrls.get(id);
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl);
    objectUrls.delete(id);
  }
}

function togglePlay(videoEl) {
  if (!videoEl.src) return;
  if (videoEl.paused) videoEl.play().catch(() => {});
  else videoEl.pause();
}

function schedulePositionSave(video, videoEl, statusText) {
  if (positionTimers.has(video.id)) return;
  const timer = setTimeout(() => {
    positionTimers.delete(video.id);
    savePlayback(video, videoEl, statusText);
  }, 1200);
  positionTimers.set(video.id, timer);
}

async function savePlayback(video, videoEl, statusText) {
  if (!video || !videoEl) return;
  const duration = videoEl.duration || video.duration || 0;
  const position = videoEl.currentTime || 0;
  if (!Number.isFinite(position)) return;
  video.playPosition = position;
  video.lastPlayedAt = Date.now();
  if (Number.isFinite(duration) && duration > 0) {
    video.duration = duration;
    if (position / duration >= 0.8 || duration - position <= 8) video.seen = true;
  }
  if (statusText) statusText.textContent = watchStatus(video);
  await updateVideo(video).catch(() => {});
}

function renderLibrary() {
  libraryList.innerHTML = visibleVideos.length ? "" : "<div class='hint'>Không có video phù hợp bộ lọc.</div>";
  visibleVideos.forEach((video, index) => {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <div class="thumb">▶</div>
      <div class="itemMain">
        <h3>${esc(video.title)}</h3>
        <p>${fmt(video.size)} • ${watchStatus(video)} • ${new Date(video.createdAt).toLocaleDateString("vi-VN")}</p>
        <p>${esc(video.note || "")}${video.tags.length ? " • #" + esc(video.tags.join(" #")) : ""}</p>
      </div>
      <div class="itemActions">
        <button class="mini play" type="button">Xem</button>
        <button class="mini fav" type="button">${video.favorite ? "♥" : "♡"}</button>
        <button class="mini edit" type="button">Sửa</button>
        <button class="mini playlist" type="button">+PL</button>
        <button class="mini del" type="button">🗑</button>
      </div>`;
    item.querySelector(".play").onclick = () => {
      closeDrawer();
      scrollToIndex(index);
    };
    item.querySelector(".fav").onclick = () => toggleFavorite(video.id);
    item.querySelector(".edit").onclick = () => editVideo(video.id);
    item.querySelector(".playlist").onclick = () => addVideoToPlaylist(video.id);
    item.querySelector(".del").onclick = () => removeVideo(video.id);
    libraryList.appendChild(item);
  });
}

function scrollToIndex(index) {
  const page = feed.children[index];
  if (page) page.scrollIntoView({ behavior: lowEndMode ? "auto" : "smooth" });
  setCurrentIndex(index);
}

async function toggleFavorite(id) {
  const video = videos.find(item => item.id === id);
  if (!video) return;
  video.favorite = !video.favorite;
  await updateVideo(video);
  await refresh({ keepIndex: true });
}

async function editVideo(id) {
  const video = videos.find(item => item.id === id);
  if (!video) return;
  const title = prompt("Đổi tên title trong app:", video.title);
  if (title === null) return;
  const note = prompt("Note ngắn:", video.note || "");
  if (note === null) return;
  const tags = prompt("Tags, ngăn cách bằng dấu phẩy:", video.tags.join(", "));
  if (tags === null) return;
  video.title = title.trim() || video.title;
  video.note = note.trim();
  video.tags = parseTags(tags);
  await updateVideo(video);
  await refresh({ keepIndex: true });
}

async function removeVideo(id) {
  if (!confirm("Xóa video này khỏi bộ nhớ offline?")) return;
  const videoEl = videoElements.get(id);
  if (videoEl) detachVideoSource(id, videoEl);
  await deleteVideo(id);
  playlists = playlists.map(playlist => ({ ...playlist, videoIds: playlist.videoIds.filter(videoId => videoId !== id) }));
  savePlaylists();
  await refresh();
  toast("Đã xóa video.");
}

async function addFiles(files, inputEl) {
  const selected = Array.from(files || []).filter(file => file.type.startsWith("video/"));
  if (!selected.length) {
    toast("Không tìm thấy video.");
    if (inputEl) inputEl.value = "";
    return;
  }

  const totalBytes = selected.reduce((sum, file) => sum + file.size, 0);
  const largest = selected.reduce((max, file) => Math.max(max, file.size), 0);
  let warning = `Chuẩn bị lưu ${selected.length} video, tổng ${fmt(totalBytes)}, file lớn nhất ${fmt(largest)}.`;
  if (largest > LARGE_FILE_BYTES) warning += "\nCó video trên 200MB, lưu trên điện thoại yếu có thể rất chậm.";
  if (totalBytes > LARGE_IMPORT_BYTES) warning += "\nTổng import trên 1GB, quota trình duyệt có thể không đủ.";
  if (lowEndMode && largest > LOW_END_FILE_BYTES) warning += "\nChế độ máy yếu khuyến nghị mỗi video <= 150MB.";
  warning += "\nBạn muốn tiếp tục?";
  if (!confirm(warning)) {
    if (inputEl) inputEl.value = "";
    return;
  }

  cancelImport = false;
  skipAllDuplicates = false;
  showImportProgress(true);
  importErrors.innerHTML = "";
  let saved = 0;
  let skipped = 0;
  let failed = 0;
  let savedBytes = 0;

  try {
    for (let index = 0; index < selected.length; index++) {
      const file = selected[index];
      if (cancelImport) break;
      updateImportProgress(index, selected.length, file, savedBytes);
      await yieldUI();

      try {
        const meta = metadataFromFile(file);
        const duplicate = videos.find(video => video.fingerprint === meta.fingerprint);
        if (duplicate) {
          if (skipAllDuplicates) {
            skipped++;
            continue;
          }
          const choice = prompt(`Video "${file.name}" có vẻ đã tồn tại.\nNhập: skip, save, all`, "skip");
          const normalizedChoice = String(choice || "skip").trim().toLowerCase();
          if (normalizedChoice === "skip") {
            skipped++;
            continue;
          }
          if (normalizedChoice === "all") {
            skipAllDuplicates = true;
            skipped++;
            continue;
          }
        }
        await saveVideo(meta, file);
        videos.push(meta);
        saved++;
        savedBytes += file.size;
      } catch (error) {
        failed++;
        addImportError(file.name, friendlyImportError(error));
      }
    }
  } finally {
    if (inputEl) inputEl.value = "";
  }

  showImportProgress(false);
  await refresh();
  toast(`Import xong: lưu ${saved}, bỏ qua ${skipped}, lỗi ${failed}.`, failed ? 4200 : 3000);
}

function friendlyImportError(error) {
  if (isQuotaExceeded(error)) return "Bộ nhớ trình duyệt không đủ.";
  if (error?.name === "NotReadableError") return "Không đọc được file.";
  if (error?.name === "AbortError") return "Import bị hủy.";
  return "Lỗi IndexedDB hoặc trình duyệt.";
}

function showImportProgress(show) {
  importModal.hidden = !show;
  importBar.style.width = "0%";
}

function updateImportProgress(index, total, file, savedBytes) {
  const current = Math.min(total, index + 1);
  importStatus.textContent = `Đang lưu video ${current}/${total}: ${file.name} • ${fmt(file.size)} • đã lưu ${fmt(savedBytes)}`;
  importBar.style.width = total ? `${index / total * 100}%` : "0%";
}

function addImportError(fileName, message) {
  const li = document.createElement("li");
  li.textContent = `${fileName}: ${message}`;
  importErrors.appendChild(li);
}

async function updateStorage() {
  const total = videos.reduce((sum, video) => sum + video.size, 0);
  const estimate = await getStorageEstimate();
  const persisted = await isStoragePersisted();
  const percent = estimate?.quota ? estimate.usage / estimate.quota * 100 : null;
  const level = percent === null ? "Không rõ" : percent < 50 ? "An toàn" : percent <= 80 ? "Cần chú ý" : "Nguy hiểm";
  const warning = buildStorageWarning(estimate, persisted, percent);

  storageInfo.textContent = `${videos.length} video • offline ${fmt(total)}`;
  healthVideoCount.textContent = String(videos.length);
  healthOfflineSize.textContent = fmt(total);
  healthUsage.textContent = estimate ? fmt(estimate.usage) : "Không hỗ trợ";
  healthQuota.textContent = estimate ? fmt(estimate.quota) : "Không hỗ trợ";
  healthPercent.textContent = percent === null ? "Không rõ" : percent.toFixed(1) + "%";
  healthLevel.textContent = level;
  healthLevel.className = percent !== null && percent > 80 ? "dangerText" : percent !== null && percent >= 50 ? "warn" : "good";
  healthPersist.textContent = persisted === null ? "Trình duyệt không hỗ trợ" : persisted ? "Đã được bảo vệ" : "Chưa được bảo vệ";
  healthPersist.className = persisted ? "good" : "warn";
  healthWarning.textContent = warning;
  healthWarning.hidden = !warning;
  persistBtn.hidden = !navigator.storage?.persist || persisted === true;
}

async function getStorageEstimate() {
  if (!navigator.storage?.estimate) return null;
  try {
    return await navigator.storage.estimate();
  } catch {
    return null;
  }
}

async function isStoragePersisted() {
  if (!navigator.storage?.persisted) return null;
  try {
    return await navigator.storage.persisted();
  } catch {
    return null;
  }
}

function buildStorageWarning(estimate, persisted, percent) {
  const base = "IndexedDB không phải backup vĩnh viễn. Hãy giữ video gốc ở máy/ổ cứng/cloud.";
  if (!navigator.storage) return "Trình duyệt không hỗ trợ Storage API. " + base;
  if (!estimate) return "Không đọc được usage/quota. " + base;
  if (percent > 80) return "Dung lượng đang ở mức nguy hiểm trên 80% quota. " + base;
  if (percent >= 50) return "Dung lượng đã qua 50% quota, nên dọn bớt video lớn. " + base;
  if (persisted !== true) return "Persistent storage chưa được bảo vệ. " + base;
  return base;
}

async function requestPersistentStorage() {
  if (!navigator.storage?.persist) {
    toast("Trình duyệt không hỗ trợ persistent storage.");
    return;
  }
  const ok = await navigator.storage.persist().catch(() => false);
  toast(ok ? "Đã yêu cầu bảo vệ bộ nhớ." : "Trình duyệt chưa cấp bảo vệ bộ nhớ.", 3600);
  updateStorage();
}

function loadPlaylists() {
  try {
    const rows = JSON.parse(localStorage.getItem(PLAYLIST_KEY) || "[]");
    return Array.isArray(rows) ? rows.map(item => ({ id: item.id || crypto.randomUUID(), name: item.name || "Playlist", videoIds: Array.isArray(item.videoIds) ? item.videoIds : [] })) : [];
  } catch {
    return [];
  }
}

function savePlaylists() {
  localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlists));
  updatePlaylistFilter();
}

function updatePlaylistFilter() {
  const current = playlistFilter.value;
  playlistFilter.innerHTML = '<option value="all">Mọi playlist</option>';
  for (const playlist of playlists) {
    const option = document.createElement("option");
    option.value = playlist.id;
    option.textContent = playlist.name;
    playlistFilter.appendChild(option);
  }
  playlistFilter.value = playlists.some(item => item.id === current) ? current : "all";
}

function createPlaylist() {
  const name = prompt("Tên playlist mới:");
  if (!name?.trim()) return null;
  const playlist = { id: crypto.randomUUID(), name: name.trim(), videoIds: [] };
  playlists.push(playlist);
  savePlaylists();
  return playlist;
}

function addVideoToPlaylist(videoId) {
  let playlist = playlists[0];
  if (!playlist || !confirm(`Thêm vào playlist "${playlist.name}"? Bấm Cancel để tạo playlist mới.`)) {
    playlist = createPlaylist();
  }
  if (!playlist) return;
  if (!playlist.videoIds.includes(videoId)) playlist.videoIds.push(videoId);
  savePlaylists();
  toast("Đã thêm vào playlist.");
}

function exportMetadata() {
  const payload = {
    app: "VinhVideo Offline",
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    warning: "This file does not include video blobs.",
    videos: videos.map(video => normalizeMetadata(video)),
    playlists
  };
  const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `vinhvideo-metadata-backup-${timestampName()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Đã export metadata. File JSON không chứa video thật.");
}

function timestampName() {
  const d = new Date();
  const pad = value => String(value).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}

async function importMetadataFile(file) {
  if (!file) return;
  const text = await file.text();
  const payload = JSON.parse(text);
  const incoming = Array.isArray(payload.videos) ? payload.videos : [];
  let merged = 0;
  let skipped = 0;
  for (const row of incoming) {
    const meta = normalizeMetadata(row);
    const existing = videos.find(video => video.id === meta.id);
    const blobExists = await hasBlob(meta.id);
    if (!blobExists) {
      skipped++;
      continue;
    }
    await updateVideo({ ...(existing || meta), ...meta, id: meta.id });
    merged++;
  }
  if (Array.isArray(payload.playlists)) {
    const byId = new Map(playlists.map(item => [item.id, item]));
    for (const item of payload.playlists) {
      if (!item?.id) continue;
      byId.set(item.id, { id: item.id, name: item.name || "Playlist", videoIds: Array.isArray(item.videoIds) ? item.videoIds : [] });
    }
    playlists = [...byId.values()];
    savePlaylists();
  }
  metadataInput.value = "";
  await refresh();
  toast(`Import metadata: merge ${merged}, bỏ qua ${skipped} mục thiếu video blob.`, 4600);
}

function openDrawer() {
  drawer.classList.add("open");
  updateStorage();
}

function closeDrawer() {
  drawer.classList.remove("open");
}

$("menuBtn").onclick = openDrawer;
$("emptyAddBtn").onclick = openDrawer;
$("closeBtn").onclick = closeDrawer;
drawer.addEventListener("click", event => {
  if (event.target === drawer) closeDrawer();
});
fileInput.onchange = event => addFiles(event.target.files, event.target);
folderInput.onchange = event => addFiles(event.target.files, event.target);
metadataInput.onchange = event => importMetadataFile(event.target.files?.[0]).catch(() => toast("File metadata không hợp lệ.", 3600));
persistBtn.onclick = requestPersistentStorage;
cancelImportBtn.onclick = () => {
  cancelImport = true;
  toast("Sẽ hủy sau file hiện tại.");
};
lowEndToggle.onchange = () => {
  lowEndMode = lowEndToggle.checked;
  applyLowEndMode();
};
$("muteBtn").onclick = () => {
  muted = !muted;
  for (const videoEl of videoElements.values()) videoEl.muted = muted;
  $("muteBtn").textContent = muted ? "🔇" : "🔊";
};
$("allBtn").onclick = () => {
  statusFilter.value = "all";
  $("allBtn").classList.add("active");
  $("favBtn").classList.remove("active");
  refresh({ keepIndex: true });
};
$("favBtn").onclick = () => {
  statusFilter.value = "fav";
  $("favBtn").classList.add("active");
  $("allBtn").classList.remove("active");
  refresh({ keepIndex: true });
};
$("newPlaylistBtn").onclick = () => {
  createPlaylist();
  refresh({ keepIndex: true });
};
$("exportBtn").onclick = exportMetadata;
$("clearBtn").onclick = async () => {
  if (!confirm("Xóa toàn bộ video offline? Metadata và video blob sẽ bị xóa khỏi IndexedDB.")) return;
  for (const [id, videoEl] of videoElements) detachVideoSource(id, videoEl);
  await clearLibrary();
  playlists = [];
  savePlaylists();
  await refresh();
  toast("Đã xóa thư viện.");
};
searchInput.oninput = () => refresh({ keepIndex: true });
sortSelect.onchange = () => refresh({ keepIndex: true });
statusFilter.onchange = () => refresh({ keepIndex: true });
playlistFilter.onchange = () => refresh({ keepIndex: true });
window.addEventListener("online", () => toast("Đã có internet."));
window.addEventListener("offline", () => toast("Đang ở chế độ offline."));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js?v=1.3.0").catch(() => {}));
}

(async () => {
  try {
    applyLowEndMode();
    db = await openDB();
    updatePlaylistFilter();
    await refresh();
  } catch (error) {
    toast("Không mở được thư viện IndexedDB trên trình duyệt này.", 4200);
  }
})();
