const APP_VERSION = "1.9.4";
const DB_NAME = "vinhvideo_offline_db_v1";
const DB_VERSION = 2;
const STORE = "videos";
const BLOB_STORE = "videoBlobs";
const PLAYLIST_KEY = "vinhvideo.playlists.v1";
const LOW_END_KEY = "vinhvideo.lowEndMode";
const MODE_KEY = "offlineCinema.mode";
const PIN_ENABLED_KEY = "offlineCinema.parentPinEnabled";
const PIN_HASH_KEY = "offlineCinema.parentPinHash";
const DAILY_LIMIT_ENABLED_KEY = "offlineCinema.kidsDailyLimitEnabled";
const DAILY_LIMIT_COUNT_KEY = "offlineCinema.kidsDailyLimitCount";
const DAILY_LIMIT_MINUTES_KEY = "offlineCinema.kidsDailyLimitMinutes";
const KIDS_WATCHED_TODAY_KEY = "offlineCinema.kidsWatchedToday";
const KIDS_LAST_WATCH_DATE_KEY = "offlineCinema.kidsLastWatchDate";
const BREAK_ENABLED_KEY = "offlineCinema.kidsBreakEnabled";
const BREAK_EVERY_KEY = "offlineCinema.kidsBreakEvery";
const KIDS_WATCH_LOG_KEY = "offlineCinema.kidsWatchLog";
const ROUTINE_ENABLED_KEY = "offlineCinema.routine.enabled";
const ROUTINE_MORNING_KEY = "offlineCinema.routine.allowedMorning";
const ROUTINE_AFTERNOON_KEY = "offlineCinema.routine.allowedAfternoon";
const ROUTINE_EVENING_KEY = "offlineCinema.routine.allowedEvening";
const ROUTINE_NO_WATCH_AFTER_KEY = "offlineCinema.routine.noWatchAfter";
const ROUTINE_NO_BEFORE_SLEEP_KEY = "offlineCinema.routine.noBeforeSleepEnabled";
const ROUTINE_WEEKEND_EXTRA_KEY = "offlineCinema.routine.weekendExtraMinutes";
const CHILD_NAME_KEY = "offlineCinema.childName";
const CHILD_BIRTH_DATE_KEY = "offlineCinema.childBirthDate";
const LARGE_FILE_BYTES = 200 * 1024 * 1024;
const LOW_END_FILE_BYTES = 150 * 1024 * 1024;
const LARGE_IMPORT_BYTES = 1024 * 1024 * 1024;

const TEXT = {
  phoneSource: "Điện thoại",
  watched: "Đã xem",
  watching: "Đang xem dở",
  unseen: "Chưa xem",
  none: "Chưa có",
  noDate: "Chưa có ngày",
  noAge: "Chưa có mốc tuổi",
  personalVideoSubtitle: "Kho video cá nhân offline, tối ưu cho điện thoại yếu.",
  totalVideos: "Tổng video",
  storageSize: "Dung lượng",
  favorites: "Yêu thích",
  recent: "Xem gần đây",
  continueWatching: "Tiếp tục xem",
  addVideo: "Thêm video",
  openLibrary: "Mở thư viện",
  repairBrokenVideos: "Dọn video lỗi",
  details: "Chi tiết",
  edit: "Sửa",
  delete: "Xóa",
  allPlaylists: "Mọi playlist",
  all: "Tất cả",
  largeVideo: "Video lớn",
  familyMemory: "Ký ức gia đình",
  family: "Gia đình",
  childMemory: "Ký ức của con",
  cinema: "Rạp chiếu",
  cinemaClosed: "Rạp chiếu đang nghỉ.",
  childNameDefault: "Mỹ Anh",
  learning: "Học nhẹ",
  movement: "Vận động",
  bedtime: "Trước giờ ngủ",
  reward: "Video thưởng",
  bullet: " • ",
  storageBackupWarning: "IndexedDB không phải backup vĩnh viễn. Hãy giữ video gốc ở máy/ổ cứng/cloud.",
  browserNoStorageApi: "Trình duyệt không hỗ trợ Storage API.",
  unknown: "Không rõ",
  notSupported: "Không hỗ trợ",
  protectedStorage: "Đã được bảo vệ",
  unprotectedStorage: "Chưa được bảo vệ",
  safe: "An toàn",
  watch: "Cần chú ý",
  danger: "Nguy hiểm",
  parentDashboard: "Dashboard của Ba/Mẹ",
  minutesToday: "Phút hôm nay",
  videosWatched: "Video đã xem",
  videosCompleted: "Video hoàn thành",
  breakCount: "Lần nghỉ mắt",
  remaining: "Còn lại",
  allowed: "Được xem",
  blocked: "Đang chặn",
  lastSevenDays: "7 ngày gần đây",
  content: "Nội dung",
  topVideo: "Video xem nhiều nhất",
  topPlaylist: "Playlist xem nhiều nhất",
  recentItems: "Gần đây",
  routineStatus: "Trạng thái routine",
  contentBalance: "Cân bằng nội dung",
  noFamilyMetadata: "Chưa có metadata ký ức gia đình.",
  exportWarning: "Export metadata không chứa file video thật. Import metadata không khôi phục video nếu blob đã mất khỏi IndexedDB."
};
const TEXT_REPAIR_VERSION = "1.9.4";


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
const repairBtn = $("repairBtn");
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
const homeHero = $("homeHero");
const heroTotalVideos = $("heroTotalVideos");
const heroTotalSize = $("heroTotalSize");
const heroFavorites = $("heroFavorites");
const heroRecent = $("heroRecent");
const detailSheet = $("detailSheet");
const detailTitle = $("detailTitle");
const detailBody = $("detailBody");
const detailPlayBtn = $("detailPlayBtn");
const detailEditBtn = $("detailEditBtn");
const detailKidsBtn = $("detailKidsBtn");
const detailFamilyBtn = $("detailFamilyBtn");
const detailPlaylistBtn = $("detailPlaylistBtn");
const detailDeleteBtn = $("detailDeleteBtn");
const kidsParentBtn = $("kidsParentBtn");
const kidsHome = $("kidsHome");
const kidsQuota = $("kidsQuota");
const kidsShelves = $("kidsShelves");
const kidsStartBtn = $("kidsStartBtn");
const kidsContinueBtn = $("kidsContinueBtn");
const kidsRestBtn = $("kidsRestBtn");
const kidsGate = $("kidsGate");
const kidsGateTitle = $("kidsGateTitle");
const kidsGateQuestion = $("kidsGateQuestion");
const kidsGateNote = $("kidsGateNote");
const breakCountdown = $("breakCountdown");
const kidsNextBtn = $("kidsNextBtn");
const kidsStopBtn = $("kidsStopBtn");
const enterKidsBtn = $("enterKidsBtn");
const pinEnabledToggle = $("pinEnabledToggle");
const setPinBtn = $("setPinBtn");
const clearPinBtn = $("clearPinBtn");
const dailyCountInput = $("dailyCountInput");
const dailyMinutesInput = $("dailyMinutesInput");
const dailyLimitToggle = $("dailyLimitToggle");
const breakToggle = $("breakToggle");
const breakEveryInput = $("breakEveryInput");
const resetKidsStatsBtn = $("resetKidsStatsBtn");
const kidsLogSummary = $("kidsLogSummary");
const kidsLogList = $("kidsLogList");
const clearKidsLogBtn = $("clearKidsLogBtn");
const parentDashboard = $("parentDashboard");
const dailySummary = $("dailySummary");
const routineEnabledToggle = $("routineEnabledToggle");
const routineMorningToggle = $("routineMorningToggle");
const routineAfternoonToggle = $("routineAfternoonToggle");
const routineEveningToggle = $("routineEveningToggle");
const noWatchAfterInput = $("noWatchAfterInput");
const noBeforeSleepToggle = $("noBeforeSleepToggle");
const weekendExtraSelect = $("weekendExtraSelect");
const saveRoutineBtn = $("saveRoutineBtn");
const childNameInput = $("childNameInput");
const childBirthDateInput = $("childBirthDateInput");
const saveChildProfileBtn = $("saveChildProfileBtn");
const familyFilter = $("familyFilter");
const familySort = $("familySort");
const familyCinemaList = $("familyCinemaList");

let db = null;
let videos = [];
let visibleVideos = [];
let playlists = loadPlaylists();
let selectedDetailId = null;
let appMode = localStorage.getItem(MODE_KEY) === "kids" ? "kids" : "parent";
let muted = true;
let observer = null;
let currentIndex = 0;
let lowEndMode = getInitialLowEndMode();
let cancelImport = false;
let skipAllDuplicates = false;
let pendingKidsNextIndex = null;
let breakTimer = null;
const objectUrls = new Map();
const videoElements = new Map();
const positionTimers = new Map();


function repairSourceText(value) {
  if (typeof value !== "string") return value;
  const cleaned = value.replace(/\u0000/g, "").trim();
  const compact = cleaned.replace(/\s+/g, " ");
  const variants = new Set([
    TEXT.phoneSource,
    "Dien thoai",
    "i n tho i",
    "\u00c4\u0090i\u00e1\u00bb\u2021n tho\u00e1\u00ba\u00a1i",
    "\u00c4\u0090i\u00e1\u00bb\u0087n tho\u00e1\u00ba\u00a1i",
    "\u00c3\u201e\u00c2\u0090i\u00c3\u00a1\u00c2\u00bb\u00e2\u20ac\u00a1n tho\u00c3\u00a1\u00c2\u00ba\u00c2\u00a1i"
  ]);
  if (variants.has(compact)) return TEXT.phoneSource;
  return value;
}

function repairVietnameseText(value) {
  if (typeof value !== "string") return value;
  const sourceFixed = repairSourceText(value);
  if (sourceFixed === TEXT.phoneSource) return sourceFixed;
  const replacements = [
    ["\u00c3\u201e\u00c2\u0090i\u00c3\u00a1\u00c2\u00bb\u00e2\u20ac\u00a1n tho\u00c3\u00a1\u00c2\u00ba\u00c2\u00a1i", TEXT.phoneSource],
    ["\u00c3\u201e\u00c2\u0090\u00c3\u0192\u00c2\u00a3 xem", TEXT.watched],
    ["Ch\u00c3\u2020\u00c2\u00b0a xem", TEXT.unseen],
    ["\u00c3\u201e\u00c2\u0090ang xem d\u00c3\u00a1\u00c2\u00bb\u00c5\u00b8", TEXT.watching],
    ["K\u00c3\u0192\u00c2\u00bd \u00c3\u00a1\u00c2\u00bb\u00c2\u00a9c", "K\u00fd \u1ee9c"],
    ["Gia \u00c3\u201e\u00e2\u20ac\u02dc\u00c3\u0192\u00c2\u00acnh", TEXT.family],
    ["M\u00c3\u00a1\u00c2\u00bb\u00c2\u00b9 Anh", TEXT.childNameDefault],
    ["\u00c3\u00a2\u00e2\u201a\u00ac\u00c2\u00a2", TEXT.bullet.trim()],
    ["Dien thoai", TEXT.phoneSource], ["Da xem", TEXT.watched], ["Chua xem", TEXT.unseen],
    ["Dang xem do", TEXT.watching], ["Rap chieu", TEXT.cinema], ["Ky uc", "K\u00fd \u1ee9c"],
    ["Gia dinh", TEXT.family], ["My Anh", TEXT.childNameDefault], ["Hoc nhe", TEXT.learning],
    ["Van dong", TEXT.movement], ["Truoc gio ngu", TEXT.bedtime], ["Video thuong", TEXT.reward],
    ["Kho video c nh n offline, t i u cho i n tho i y u.", TEXT.personalVideoSubtitle],
    ["T ng video", TEXT.totalVideos], ["Dung l ng", TEXT.storageSize], ["Y u th ch", TEXT.favorites],
    ["Xem g n y", TEXT.recent], ["Ti p t c xem", TEXT.continueWatching], ["Th m video", TEXT.addVideo],
    ["M th vi n", TEXT.openLibrary], ["Don video loi", TEXT.repairBrokenVideos], ["Chi tiet", TEXT.details],
    ["chua co ngay", TEXT.noDate], ["chua co moc tuoi", TEXT.noAge], ["Chua co", TEXT.none], ["chua co", TEXT.none]
  ];
  return replacements.reduce((text, pair) => text.split(pair[0]).join(pair[1]), value);
}
function repairTextFields(record) {
  const next = { ...record };
  const fields = ["title","source","note","kidsCategory","kidsQuestion","kidsNote","familyType","familyLocation","memoryNote","memoryQuestion","childAgeLabel","khoBauKyUcRef"];
  for (const field of fields) next[field] = repairVietnameseText(next[field]);
  next.source = repairVietnameseText(next.source || TEXT.phoneSource) || TEXT.phoneSource;
  if (Array.isArray(next.tags)) next.tags = next.tags.map(repairVietnameseText);
  if (Array.isArray(next.familyPeople)) next.familyPeople = next.familyPeople.map(repairVietnameseText);
  return next;
}
function metadataTextFields(record) {
  return { title: record.title, source: record.source, note: record.note, tags: record.tags, kidsCategory: record.kidsCategory, kidsQuestion: record.kidsQuestion, kidsNote: record.kidsNote, familyType: record.familyType, familyPeople: record.familyPeople, familyLocation: record.familyLocation, memoryNote: record.memoryNote, memoryQuestion: record.memoryQuestion, childAgeLabel: record.childAgeLabel, khoBauKyUcRef: record.khoBauKyUcRef };
}
function textFieldsChanged(before, after) { return JSON.stringify(metadataTextFields(before)) !== JSON.stringify(metadataTextFields(after)); }
async function repairTextMetadata({ force = false } = {}) {
  const result = { scanned: 0, repaired: 0, changedFields: [] };
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, "readwrite");
    const videoStore = transaction.objectStore(STORE);
    const request = videoStore.openCursor();
    request.onsuccess = event => {
      const cursor = event.target.result;
      if (!cursor) return;
      const original = normalizeMetadata(cursor.value || {});
      const repaired = normalizeMetadata(repairTextFields({ ...original, source: repairVietnameseText(original.source || TEXT.phoneSource) || TEXT.phoneSource }));
      result.scanned += 1;
      if (force || textFieldsChanged(original, repaired)) {
        const changed = Object.keys(metadataTextFields(original)).filter(field => JSON.stringify(original[field]) !== JSON.stringify(repaired[field]));
        changed.forEach(field => { if (!result.changedFields.includes(field)) result.changedFields.push(field); });
        cursor.update({ ...cursor.value, ...repaired, id: original.id, fileName: original.fileName, fingerprint: original.fingerprint, type: original.type, size: original.size, createdAt: original.createdAt, updatedAt: original.updatedAt, order: original.order });
        result.repaired += 1;
      }
      cursor.continue();
    };
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  localStorage.setItem("offlineCinema.textRepairVersion", TEXT_REPAIR_VERSION);
  return result;
}
function scanBadTextInMetadata(rows = videos) {
  const badPatterns = ["\u00c3\u0192","\u00c3\u201a","\u00c3\u00a2\u00e2\u201a\u00ac\u00c2\u00a2","\u00c3\u201e","\u00c3\u00a1\u00c2\u00ba","\u00c3\u00a1\u00c2\u00bb"," c nh n "," t i u "," i n tho i ","i n tho i","\u00c4\u0090i\u00e1\u00bb\u2021n tho\u00e1\u00ba\u00a1i","\u00c4\u0090i\u00e1\u00bb\u0087n tho\u00e1\u00ba\u00a1i","T ng video","Dung l ng","Y u th ch"];
  const fields = ["title","source","note","kidsCategory","kidsQuestion","kidsNote","familyType","familyLocation","memoryNote","memoryQuestion","childAgeLabel","khoBauKyUcRef"];
  const issues = [];
  for (const video of rows) {
    for (const field of fields) {
      const value = video[field];
      if (typeof value === "string" && badPatterns.some(pattern => value.includes(pattern))) issues.push({ id: video.id, field, value, title: video.title });
    }
    for (const field of ["tags", "familyPeople"]) {
      const values = Array.isArray(video[field]) ? video[field] : [];
      values.forEach(value => { if (typeof value === "string" && badPatterns.some(pattern => value.includes(pattern))) issues.push({ id: video.id, field, value, title: video.title }); });
    }
  }
  return issues;
}

function getVisibleTextBadPatterns() {
  return [
    "\u00c3", "\u00c4", "\u00e2\u20ac\u00a2", "\u00e1\u00ba", "\u00e1\u00bb",
    "Chi ti t", "S a", "kh ng", "Chua co", "Phut hom nay", "Video da xem", "Lan nghi mat",
    "Ngay ky uc", "tr nh duy t", "v nh vi n", "T  m", "Dashboard cua", "Nep xem", "Ho so",
    "Tom tat", "Hom nay", "Gia dinh/ky uc", "M   i playlist"
  ];
}

function scanVisibleText() {
  const text = document.body?.innerText || "";
  return getVisibleTextBadPatterns().filter(pattern => text.includes(pattern));
}

function encodingHealthCheck() {
  const text = document.body?.innerText || "";
  const patterns = ["\u00c3\u0192","\u00c3\u201a","\u00c3\u00a2\u00e2\u201a\u00ac\u00c2\u00a2","\u00c3\u201e"," c nh n "," t i u "," i n tho i ","T ng video","Dung l ng","Y u th ch"];
  const found = patterns.filter(pattern => text.includes(pattern));
  const visible = scanVisibleText();
  if (found.length || visible.length) console.warn("Offline Cinema encoding health warning", { found, visible });
  return [...new Set([...found, ...visible])];
}

function scanBadText() { return { metadata: scanBadTextInMetadata(), document: encodingHealthCheck(), visible: scanVisibleText() }; }

async function countMetadata() { return (await getAllMetadata()).length; }
async function countBlobs() { return (await getBlobIds()).length; }

function applyStaticText() {
  const set = (id, value) => { const el = $(id); if (el) el.textContent = value; };
  const setHtml = (selector, value) => { const el = document.querySelector(selector); if (el) el.innerHTML = value; };
  const setPlaceholder = (id, value) => { const el = $(id); if (el) el.placeholder = value; };
  const heroEyebrow = document.querySelector(".homeHero .eyebrow");
  if (heroEyebrow) heroEyebrow.textContent = "VinhVideo Offline Cinema - v" + APP_VERSION;
  const heroCopy = document.querySelector(".homeHero p:not(.eyebrow)");
  if (heroCopy) heroCopy.textContent = TEXT.personalVideoSubtitle;
  const stats = document.querySelectorAll(".heroStats span");
  if (stats[0]) stats[0].textContent = TEXT.totalVideos;
  if (stats[1]) stats[1].textContent = TEXT.storageSize;
  if (stats[2]) stats[2].textContent = TEXT.favorites;
  if (stats[3]) stats[3].textContent = TEXT.recent;
  set("continueBtn", TEXT.continueWatching);
  set("heroAddBtn", TEXT.addVideo);
  set("heroLibraryBtn", TEXT.openLibrary);
  set("repairBtn", TEXT.repairBrokenVideos);
  set("emptyAddBtn", "Thêm video đầu tiên");
  set("kidsParentBtn", "Chế độ của Ba");
  set("kidsStartBtn", "Bắt đầu xem");
  set("kidsContinueBtn", "Xem tiếp");
  set("kidsRestBtn", "Nghỉ mắt chút");
  set("kidsGateTitle", "Con vừa xem xong rồi.");
  set("kidsNextBtn", "Xem tiếp");
  set("kidsStopBtn", "Nghỉ mắt chút");
  set("enterKidsBtn", "Chế độ của Con");
  set("setPinBtn", "Đặt/đổi PIN 4 số");
  set("clearPinBtn", "Xóa PIN");
  set("resetKidsStatsBtn", "Reset hôm nay");
  set("clearKidsLogBtn", "Xóa lịch sử local");
  set("saveRoutineBtn", "Lưu routine");
  set("saveChildProfileBtn", "Lưu hồ sơ");
  set("detailPlayBtn", "Phát video này");
  set("detailEditBtn", "Sửa metadata");
  set("detailFamilyBtn", "Ký ức gia đình");
  set("detailDeleteBtn", TEXT.delete);
  set("importStatus", "Chuẩn bị...");
  set("cancelImportBtn", "Hủy import");
  setPlaceholder("searchInput", "Tìm title, file, note, tag...");
  const emptyP = document.querySelector("#empty p:not(.eyebrow)");
  if (emptyP) emptyP.textContent = "Kho video cá nhân để xem khi không có mạng.";
  document.querySelectorAll("#filterChips .chip").forEach(button => {
    if (button.dataset.filter === "all") button.textContent = TEXT.all;
    if (button.dataset.filter === "fav") button.textContent = TEXT.favorites;
    if (button.dataset.filter === "seen") button.textContent = TEXT.watched;
    if (button.dataset.filter === "unseen") button.textContent = TEXT.unseen;
    if (button.dataset.filter === "large") button.textContent = TEXT.largeVideo;
  });
  setHtml(".aboutBox p:nth-of-type(1)", "<strong>Offline Cinema</strong> by VinhVideo - v" + APP_VERSION);
  const aboutCopy = document.querySelector(".aboutBox p:nth-of-type(3)");
  if (aboutCopy) aboutCopy.textContent = "Video nằm trong IndexedDB của trình duyệt và không phải backup vĩnh viễn.";
}

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

function applyAppMode() {
  appRoot.classList.toggle("kids-mode", appMode === "kids");
  document.body.classList.toggle("kids-mode", appMode === "kids");
  kidsParentBtn.hidden = appMode !== "kids";
  drawer.classList.remove("open");
  localStorage.setItem(MODE_KEY, appMode);
  syncKidsSettingsUI();
  syncRoutineUI();
  if (db) refresh({ keepIndex: true });
}

function isKidsMode() {
  return appMode === "kids";
}

function pinEnabled() {
  return localStorage.getItem(PIN_ENABLED_KEY) === "1" && Boolean(localStorage.getItem(PIN_HASH_KEY));
}

async function hashPin(pin) {
  const value = String(pin || "");
  if (crypto?.subtle) {
    const bytes = new TextEncoder().encode("offline-cinema-pin:" + value);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, "0")).join("");
  }
  return btoa("offline-cinema-pin:" + value);
}

function validPin(pin) {
  return /^\d{4}$/.test(String(pin || ""));
}

async function setParentPin() {
  const pin = prompt("     t PIN 4 s    cho Ch          c   a Ba:");
  if (!validPin(pin)) {
    toast("PIN c   n     ng 4 s   .");
    return;
  }
  const confirmPin = prompt("Nh   p l   i PIN:");
  if (pin !== confirmPin) {
    toast("PIN nh   p l   i kh  ng kh   p.");
    return;
  }
  localStorage.setItem(PIN_HASH_KEY, await hashPin(pin));
  localStorage.setItem(PIN_ENABLED_KEY, "1");
  syncKidsSettingsUI();
  toast("     b   t PIN ph    huynh.");
}

async function verifyParentPin() {
  if (!pinEnabled()) return confirm("Tho  t Ch          c   a Con       v    Ch          c   a Ba?");
  const pin = prompt("Nh   p PIN 4 s          v    Ch          c   a Ba:");
  if (!validPin(pin)) return false;
  const ok = await hashPin(pin) === localStorage.getItem(PIN_HASH_KEY);
  if (!ok) toast("PIN kh  ng     ng.");
  return ok;
}

function clearParentPin() {
  if (!confirm("X  a PIN ph    huynh?")) return;
  localStorage.removeItem(PIN_HASH_KEY);
  localStorage.setItem(PIN_ENABLED_KEY, "0");
  syncKidsSettingsUI();
  toast("     x  a PIN.");
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function defaultWatchedToday() {
  return { date: todayKey(), count: 0, seconds: 0, completedSinceBreak: 0 };
}

function getWatchedToday() {
  const today = todayKey();
  const lastDate = localStorage.getItem(KIDS_LAST_WATCH_DATE_KEY);
  if (lastDate !== today) {
    const fresh = defaultWatchedToday();
    saveWatchedToday(fresh);
    return fresh;
  }
  try {
    return { ...defaultWatchedToday(), ...JSON.parse(localStorage.getItem(KIDS_WATCHED_TODAY_KEY) || "{}"), date: today };
  } catch {
    return defaultWatchedToday();
  }
}

function saveWatchedToday(value) {
  localStorage.setItem(KIDS_LAST_WATCH_DATE_KEY, value.date || todayKey());
  localStorage.setItem(KIDS_WATCHED_TODAY_KEY, JSON.stringify(value));
}

function dailyLimitEnabled() {
  return localStorage.getItem(DAILY_LIMIT_ENABLED_KEY) !== "0";
}

function dailyLimitCount() {
  return Math.max(1, Number(localStorage.getItem(DAILY_LIMIT_COUNT_KEY) || 5));
}

function dailyLimitMinutes() {
  return Math.max(1, Number(localStorage.getItem(DAILY_LIMIT_MINUTES_KEY) || 20));
}

function breakReminderEnabled() {
  return localStorage.getItem(BREAK_ENABLED_KEY) !== "0";
}

function breakEveryCount() {
  return Math.max(1, Number(localStorage.getItem(BREAK_EVERY_KEY) || 2));
}

function remainingKidsQuota() {
  const watched = getWatchedToday();
  const minuteLimit = effectiveDailyMinutes();
  return {
    videos: Math.max(0, dailyLimitCount() - watched.count),
    minutes: Math.max(0, minuteLimit - Math.ceil(watched.seconds / 60)),
    exhausted: dailyLimitEnabled() && (watched.count >= dailyLimitCount() || watched.seconds >= minuteLimit * 60)
  };
}

function loadKidsLog() {
  try {
    const rows = JSON.parse(localStorage.getItem(KIDS_WATCH_LOG_KEY) || "[]");
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function saveKidsLog(rows) {
  localStorage.setItem(KIDS_WATCH_LOG_KEY, JSON.stringify(rows.slice(0, 100)));
}

function loadRoutineSettings() {
  return {
    enabled: localStorage.getItem(ROUTINE_ENABLED_KEY) === "1",
    morning: localStorage.getItem(ROUTINE_MORNING_KEY) !== "0",
    afternoon: localStorage.getItem(ROUTINE_AFTERNOON_KEY) !== "0",
    evening: localStorage.getItem(ROUTINE_EVENING_KEY) !== "0",
    noWatchAfter: localStorage.getItem(ROUTINE_NO_WATCH_AFTER_KEY) || "20:30",
    noBeforeSleepEnabled: localStorage.getItem(ROUTINE_NO_BEFORE_SLEEP_KEY) !== "0",
    weekendExtraMinutes: Number(localStorage.getItem(ROUTINE_WEEKEND_EXTRA_KEY) || 0)
  };
}

function saveRoutineSettingsFromUI() {
  localStorage.setItem(ROUTINE_ENABLED_KEY, routineEnabledToggle.checked ? "1" : "0");
  localStorage.setItem(ROUTINE_MORNING_KEY, routineMorningToggle.checked ? "1" : "0");
  localStorage.setItem(ROUTINE_AFTERNOON_KEY, routineAfternoonToggle.checked ? "1" : "0");
  localStorage.setItem(ROUTINE_EVENING_KEY, routineEveningToggle.checked ? "1" : "0");
  localStorage.setItem(ROUTINE_NO_WATCH_AFTER_KEY, noWatchAfterInput.value || "20:30");
  localStorage.setItem(ROUTINE_NO_BEFORE_SLEEP_KEY, noBeforeSleepToggle.checked ? "1" : "0");
  localStorage.setItem(ROUTINE_WEEKEND_EXTRA_KEY, weekendExtraSelect.value || "0");
  syncRoutineUI();
  renderParentDashboard();
  renderDailySummary();
  renderKidsHome();
  toast("Đã lưu routine.");
}

function syncRoutineUI() {
  if (!routineEnabledToggle) return;
  const settings = loadRoutineSettings();
  routineEnabledToggle.checked = settings.enabled;
  routineMorningToggle.checked = settings.morning;
  routineAfternoonToggle.checked = settings.afternoon;
  routineEveningToggle.checked = settings.evening;
  noWatchAfterInput.value = settings.noWatchAfter;
  noBeforeSleepToggle.checked = settings.noBeforeSleepEnabled;
  weekendExtraSelect.value = String(settings.weekendExtraMinutes);
  childNameInput.value = localStorage.getItem(CHILD_NAME_KEY) || TEXT.childNameDefault;
  childBirthDateInput.value = localStorage.getItem(CHILD_BIRTH_DATE_KEY) || "";
}

function saveChildProfile() {
  localStorage.setItem(CHILD_NAME_KEY, childNameInput.value.trim() || TEXT.childNameDefault);
  localStorage.setItem(CHILD_BIRTH_DATE_KEY, childBirthDateInput.value || "");
  toast("Đã lưu hồ sơ của con.");
}

function routineStatus(now = new Date()) {
  const settings = loadRoutineSettings();
  if (!settings.enabled) return { allowed: true, reason: "Routine đang tắt.", settings };
  const minutes = now.getHours() * 60 + now.getMinutes();
  const afterMinutes = timeToMinutes(settings.noWatchAfter);
  if (settings.noBeforeSleepEnabled && minutes >= afterMinutes) {
    return { allowed: false, reason: "Tối rồi, mình để mắt nghỉ nha con.", settings };
  }
  const inSlot = (settings.morning && minutes >= 6 * 60 && minutes < 11 * 60)
    || (settings.afternoon && minutes >= 13 * 60 && minutes < 17 * 60)
    || (settings.evening && minutes >= 18 * 60 && minutes < afterMinutes);
  return inSlot
    ? { allowed: true, reason: "Đang trong giờ được xem.", settings }
    : { allowed: false, reason: "Rạp chiếu đang nghỉ. Mình quay lại vào giờ xem nhé.", settings };
}

function timeToMinutes(value) {
  const match = String(value || "20:30").match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return 20 * 60 + 30;
  return Math.min(23 * 60 + 59, Math.max(0, Number(match[1]) * 60 + Number(match[2])));
}

function effectiveDailyMinutes() {
  const isWeekend = [0, 6].includes(new Date().getDay());
  return dailyLimitMinutes() + (isWeekend ? loadRoutineSettings().weekendExtraMinutes : 0);
}

function logRowsForDate(dateKey) {
  return loadKidsLog().filter(row => String(row.watchedAt || "").slice(0, 10) === dateKey);
}

function summarizeLog(rows) {
  const byVideo = new Map();
  const byPlaylist = new Map();
  let seconds = 0;
  let completed = 0;
  let breaks = 0;
  for (const row of rows) {
    seconds += Number(row.durationWatched || 0);
    if (row.completed) completed++;
    if (row.breakTaken) breaks++;
    const video = videos.find(item => item.id === row.videoId);
    const title = row.title || video?.title || "Video";
    byVideo.set(title, (byVideo.get(title) || 0) + 1);
    for (const playlist of playlists) {
      if (playlist.videoIds.includes(row.videoId)) byPlaylist.set(playlist.name, (byPlaylist.get(playlist.name) || 0) + 1);
    }
  }
  return {
    rows,
    seconds,
    minutes: Math.ceil(seconds / 60),
    count: rows.length,
    completed,
    breaks,
    topVideo: topMapKey(byVideo),
    topPlaylist: topMapKey(byPlaylist)
  };
}

function topMapKey(map) {
  let best = "";
  let bestValue = 0;
  for (const [key, value] of map) {
    if (value > bestValue) {
      best = key;
      bestValue = value;
    }
  }
  return best;
}

function familyTypeLabel(value) {
  const labels = { family: TEXT.family, "child-memory": TEXT.childMemory, learning: TEXT.learning, music: "Nh\u1ea1c", movement: TEXT.movement, bedtime: TEXT.bedtime, reward: TEXT.reward, other: "Kh\u00e1c" };
  return labels[value] || "Ch\u01b0a \u0111\u1eb7t";
}

function memoryQuestionFor(video) {
  if (video.memoryQuestion) return video.memoryQuestion;
  if (video.kidsQuestion) return video.kidsQuestion;
  if (video.familyType === "family" || video.familyType === "child-memory") return "Con có nhớ lúc này mình đang ở đâu không?";
  if (video.familyType === "learning") return "Con học được điều gì trong video này?";
  if (video.familyType === "music" || video.familyType === "movement") return "Con muốn làm lại động tác đó không?";
  if (video.familyType === "bedtime") return "Mình xem nhẹ thôi rồi nghỉ nhé con.";
  return "Con thích đoạn nào nhất?";
}

function ageLabelFromDates(memoryDate, birthDate) {
  if (!memoryDate || !birthDate) return "";
  const memory = new Date(memoryDate);
  const birth = new Date(birthDate);
  if (!Number.isFinite(memory.getTime()) || !Number.isFinite(birth.getTime()) || memory < birth) return "";
  let months = (memory.getFullYear() - birth.getFullYear()) * 12 + memory.getMonth() - birth.getMonth();
  if (memory.getDate() < birth.getDate()) months -= 1;
  const years = Math.floor(months / 12);
  const remain = months % 12;
  if (years <= 0) return `${Math.max(0, months)} tháng`;
  if (!remain) return `${years} tuổi`;
  return `${years} tuổi ${remain} tháng`;
}

function syncKidsSettingsUI() {
  if (!pinEnabledToggle) return;
  pinEnabledToggle.checked = pinEnabled();
  dailyLimitToggle.checked = dailyLimitEnabled();
  dailyCountInput.value = String(dailyLimitCount());
  dailyMinutesInput.value = String(dailyLimitMinutes());
  breakToggle.checked = breakReminderEnabled();
  breakEveryInput.value = String(breakEveryCount());
}

function saveKidsSettingsFromUI() {
  localStorage.setItem(DAILY_LIMIT_ENABLED_KEY, dailyLimitToggle.checked ? "1" : "0");
  localStorage.setItem(DAILY_LIMIT_COUNT_KEY, String(Math.max(1, Number(dailyCountInput.value || 5))));
  localStorage.setItem(DAILY_LIMIT_MINUTES_KEY, String(Math.max(1, Number(dailyMinutesInput.value || 20))));
  localStorage.setItem(BREAK_ENABLED_KEY, breakToggle.checked ? "1" : "0");
  localStorage.setItem(BREAK_EVERY_KEY, String(Math.max(1, Number(breakEveryInput.value || 2))));
  renderKidsHome();
}

function resetKidsStatsToday() {
  saveWatchedToday(defaultWatchedToday());
  renderKidsHome();
  renderKidsLog();
  toast("     reset th   ng k   h  m nay.");
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
      rows.push(normalizeMetadata(repairTextFields(cursor.value)));
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

function getBlobIds() {
  return new Promise((resolve, reject) => {
    const ids = [];
    const request = store(BLOB_STORE).openKeyCursor();
    request.onsuccess = event => {
      const cursor = event.target.result;
      if (!cursor) {
        resolve(ids);
        return;
      }
      ids.push(cursor.key);
      cursor.continue();
    };
    request.onerror = () => reject(request.error);
  });
}

async function findOrphanMetadata(rows = videos) {
  const blobIds = new Set(await getBlobIds());
  return rows.filter(video => !blobIds.has(video.id));
}

async function repairLibrary({ removeOrphans = false } = {}) {
  const orphans = await findOrphanMetadata(videos);
  if (!removeOrphans || !orphans.length) return { orphans, removed: 0 };
  const ids = new Set(orphans.map(video => video.id));
  for (const id of ids) {
    const videoEl = videoElements.get(id);
    if (videoEl) detachVideoSource(id, videoEl);
    const objectUrl = objectUrls.get(id);
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrls.delete(id);
  }
  await new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, "readwrite");
    const videoStore = transaction.objectStore(STORE);
    for (const id of ids) videoStore.delete(id);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
  playlists = playlists.map(playlist => ({ ...playlist, videoIds: playlist.videoIds.filter(id => !ids.has(id)) }));
  savePlaylists();
  await refresh();
  return { orphans, removed: ids.size };
}
function saveVideo(metadata, blob) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE, BLOB_STORE], "readwrite");
    transaction.objectStore(STORE).put(normalizeMetadata(repairTextFields(metadata)));
    if (blob) transaction.objectStore(BLOB_STORE).put({ id: metadata.id, blob });
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

function updateVideo(metadata) {
  return new Promise((resolve, reject) => {
    const request = store(STORE, "readwrite").put(normalizeMetadata(repairTextFields({ ...metadata, updatedAt: Date.now() })));
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function deleteVideo(id) {
  const videoEl = videoElements.get(id);
  if (videoEl) detachVideoSource(id, videoEl);
  const objectUrl = objectUrls.get(id);
  if (objectUrl) URL.revokeObjectURL(objectUrl);
  objectUrls.delete(id);
  videoElements.delete(id);
  positionTimers.delete(id);
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
  for (const [id, videoEl] of videoElements) detachVideoSource(id, videoEl);
  for (const objectUrl of objectUrls.values()) URL.revokeObjectURL(objectUrl);
  objectUrls.clear();
  videoElements.clear();
  positionTimers.clear();
  selectedDetailId = null;
  currentIndex = 0;
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
    source: repairVietnameseText(record.source || TEXT.phoneSource) || TEXT.phoneSource,
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
    fingerprint: record.fingerprint || [fileName, record.size || 0, record.lastModified || ""].join("|"),
    approvedForKids: Boolean(record.approvedForKids),
    kidsCategory: record.kidsCategory || "",
    kidsEnergy: ["calm", "normal", "active"].includes(record.kidsEnergy) ? record.kidsEnergy : "normal",
    kidsAllowedTime: ["anytime", "daytime", "notBeforeSleep"].includes(record.kidsAllowedTime) ? record.kidsAllowedTime : "anytime",
    kidsQuestion: record.kidsQuestion || "",
    kidsNote: record.kidsNote || "",
    familyType: ["family", "child-memory", "learning", "music", "movement", "bedtime", "reward", "other"].includes(record.familyType) ? record.familyType : "",
    memoryDate: record.memoryDate || "",
    memoryDateCode: record.memoryDateCode || "",
    childAgeLabel: record.childAgeLabel || "",
    familyPeople: Array.isArray(record.familyPeople) ? record.familyPeople : parseTags(record.familyPeople || ""),
    familyLocation: record.familyLocation || "",
    memoryNote: record.memoryNote || "",
    memoryQuestion: record.memoryQuestion || "",
    khoBauKyUcRef: record.khoBauKyUcRef || ""
  };
}

function metadataFromFile(file) {
  const now = Date.now();
  const fileName = file.name;
  return normalizeMetadata({
    id: crypto.randomUUID(),
    title: file.webkitRelativePath || fileName,
    fileName,
    source: TEXT.phoneSource,
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
  const orphanIds = new Set((await findOrphanMetadata(videos).catch(() => [])).map(video => video.id));
  videos = videos.filter(video => !orphanIds.has(video.id));
  applyFilters();
  if (keepIndex && oldId) currentIndex = Math.max(0, visibleVideos.findIndex(v => v.id === oldId));
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= visibleVideos.length) currentIndex = Math.max(0, visibleVideos.length - 1);
  renderHomeHero();
  renderKidsHome();
  renderKidsLog();
  renderParentDashboard();
  renderDailySummary();
  renderFamilyCinema();
  renderFeed();
  renderLibrary();
  updatePlaylistFilter();
  updateStorage();
  setTimeout(encodingHealthCheck, 0);
}

function renderHomeHero() {
  const hasVideos = videos.length > 0;
  homeHero.hidden = !hasVideos || isKidsMode();
  if (!hasVideos) return;
  const totalSize = videos.reduce((sum, video) => sum + video.size, 0);
  const favoriteCount = videos.filter(video => video.favorite).length;
  const recent = [...videos].sort((a, b) => (b.lastPlayedAt || 0) - (a.lastPlayedAt || 0))[0];
  heroTotalVideos.textContent = String(videos.length);
  heroTotalSize.textContent = fmt(totalSize);
  heroFavorites.textContent = String(favoriteCount);
  heroRecent.textContent = recent?.lastPlayedAt ? recent.title : TEXT.none;
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const selectedPlaylist = playlistFilter.value;
  let rows = [...videos];
  if (isKidsMode()) rows = rows.filter(video => video.approvedForKids && isAllowedNow(video));

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

function isAllowedNow(video) {
  const hour = new Date().getHours();
  if (video.kidsAllowedTime === "daytime") return hour >= 6 && hour < 19;
  if (video.kidsAllowedTime === "notBeforeSleep") return hour < 20;
  return true;
}

function renderFeed() {
  empty.style.display = videos.length ? "none" : "grid";
  feed.innerHTML = "";
  videoElements.clear();
  if (observer) observer.disconnect();

  visibleVideos.forEach((video, index) => {
    const page = document.createElement("section");
    page.className = "videoPage";
    page.dataset.id = video.id;
    page.dataset.index = String(index);
    page.innerHTML = `
      <video playsinline ${isKidsMode() ? "" : "loop"} preload="none"></video>
      <div class="overlay">
        <h2>${esc(video.title)}</h2>
        <p>${esc(video.source)}     ${fmt(video.size)}     <span class="statusText">${watchStatus(video)}</span></p>
        <p class="timeText"><span class="currentTime">${fmtTime(video.playPosition)}</span> / <span class="durationText">${fmtTime(video.duration)}</span></p>
      </div>
      <div class="playerTools">
        <button class="toolBtn back10" type="button">    10</button>
        <button class="toolBtn forward10" type="button">10    </button>
      </div>
      <div class="actions">
        <button class="actionBtn fav ${video.favorite ? "active" : ""}" type="button" aria-label="Y  u th  ch">   </button>
        <button class="actionBtn edit parentOnly" type="button" aria-label="S   a">   </button>
        <button class="actionBtn del parentOnly" type="button" aria-label="X  a">    </button>
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
  videoEl.addEventListener("ended", () => handleVideoEnded(video, videoEl));
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
  if (video.seen) return TEXT.watched;
  if (video.playPosition > 3) return TEXT.watching;
  return TEXT.unseen;
}

async function setCurrentIndex(index) {
  if (!Number.isFinite(index) || index < 0 || index >= visibleVideos.length) return;
  if (index === currentIndex) {
    maintainMountedVideos();
    const same = visibleVideos[currentIndex];
    const sameEl = same ? videoElements.get(same.id) : null;
    if (sameEl && (!isKidsMode() || !remainingKidsQuota().exhausted)) {
      sameEl.muted = muted;
      sameEl.play().catch(() => {});
    }
    return;
  }
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
    if (!isKidsMode() || !remainingKidsQuota().exhausted) currentEl.play().catch(() => {});
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

async function handleVideoEnded(video, videoEl) {
  await savePlayback(video, videoEl);
  if (!isKidsMode()) return;
  recordKidsWatch(video, videoEl, true);
  videoEl.pause();
  const quota = remainingKidsQuota();
  if (quota.exhausted) {
    showKidsEndScreen();
    return;
  }
  const watched = getWatchedToday();
  if (breakReminderEnabled() && watched.completedSinceBreak > 0 && watched.completedSinceBreak % breakEveryCount() === 0) {
    showBreakScreen();
    return;
  }
  showKidsAfterVideo(video);
}

function recordKidsWatch(video, videoEl, completed) {
  const watchedSeconds = Math.max(1, Math.round(videoEl.currentTime || video.playPosition || video.duration || 0));
  const today = getWatchedToday();
  today.count += completed ? 1 : 0;
  today.seconds += watchedSeconds;
  today.completedSinceBreak += completed ? 1 : 0;
  saveWatchedToday(today);
  const log = loadKidsLog();
  log.unshift({
    id: crypto.randomUUID(),
    videoId: video.id,
    title: video.title,
    watchedAt: new Date().toISOString(),
    durationWatched: watchedSeconds,
    completed: Boolean(completed),
    breakTaken: false,
    mode: "kids"
  });
  saveKidsLog(log);
  renderKidsHome();
  renderKidsLog();
}


function showKidsAfterVideo(video) {
  pendingKidsNextIndex = Math.min(currentIndex + 1, visibleVideos.length - 1);
  const question = memoryQuestionFor(video);
  kidsGateTitle.textContent = "Con vừa xem xong rồi.";
  kidsGateQuestion.textContent = question ? `Ba hỏi con: ${question}` : "";
  kidsGateNote.textContent = video.kidsNote || "Mình chọn xem tiếp hoặc nghỉ mắt chút nha.";
  breakCountdown.hidden = true;
  kidsNextBtn.hidden = false;
  kidsGate.hidden = false;
}


function showKidsEndScreen() {
  pendingKidsNextIndex = null;
  kidsGateTitle.textContent = "Rạp chiếu hôm nay đóng cửa rồi.";
  kidsGateQuestion.textContent = "";
  kidsGateNote.textContent = "Mình nghỉ mắt nha con.";
  breakCountdown.hidden = true;
  kidsNextBtn.hidden = true;
  kidsGate.hidden = false;
}

function showBreakScreen() {
  pendingKidsNextIndex = Math.min(currentIndex + 1, visibleVideos.length - 1);
  const current = visibleVideos[currentIndex];
  const log = loadKidsLog();
  log.unshift({
    id: crypto.randomUUID(),
    videoId: current?.id || "",
    title: current?.title || "Break",
    watchedAt: new Date().toISOString(),
    durationWatched: 0,
    completed: false,
    breakTaken: true,
    mode: "kids"
  });
  saveKidsLog(log);
  kidsGateTitle.textContent = "Mình nghỉ mắt 30 giây nha.";
  kidsGateQuestion.textContent = "Nhìn ra xa một chút. Uống nước một ngụm.";
  kidsGateNote.textContent = "";
  kidsNextBtn.hidden = true;
  kidsGate.hidden = false;
  breakCountdown.hidden = false;
  let remaining = 30;
  breakCountdown.textContent = `${remaining}s`;
  clearInterval(breakTimer);
  breakTimer = setInterval(() => {
    remaining -= 1;
    breakCountdown.textContent = `${remaining}s`;
    if (remaining <= 0) {
      clearInterval(breakTimer);
      const watched = getWatchedToday();
      watched.completedSinceBreak = 0;
      saveWatchedToday(watched);
      breakCountdown.textContent = "Có thể xem tiếp rồi.";
      kidsNextBtn.hidden = false;
    }
  }, 1000);
}

function hideKidsGate() {
  clearInterval(breakTimer);
  kidsGate.hidden = true;
}

function startKidsPlayback(index = 0) {
  if (!visibleVideos.length) {
    toast("Chưa có video được duyệt cho con.");
    return;
  }
  const routine = routineStatus();
  if (!routine.allowed) {
    kidsGateTitle.textContent = routine.reason;
    kidsGateQuestion.textContent = "";
    kidsGateNote.textContent = "Ba/Mẹ có thể đổi routine trong Chế độ của Ba.";
    breakCountdown.hidden = true;
    kidsNextBtn.hidden = true;
    kidsGate.hidden = false;
    return;
  }
  if (remainingKidsQuota().exhausted) {
    showKidsEndScreen();
    return;
  }
  kidsHome.hidden = true;
  hideKidsGate();
  scrollToIndex(Math.max(0, Math.min(index, visibleVideos.length - 1)));
}


function renderLibrary() {
  libraryList.innerHTML = visibleVideos.length ? "" : "<div class='hint'>Không có video phù hợp bộ lọc.</div>";
  visibleVideos.forEach((video, index) => {
    const item = document.createElement("div");
    item.className = "item";
    const fileLine = video.fileName && video.fileName !== video.title ? `${video.fileName} • ` : "";
    const playedLine = video.lastPlayedAt ? ` • xem ${new Date(video.lastPlayedAt).toLocaleDateString("vi-VN")}` : "";
    item.innerHTML = `
      <div class="thumb">▶</div>
      <div class="itemMain">
        <h3>${esc(video.title)}</h3>
        <p>${esc(fileLine)}${fmtTime(video.duration)} • ${fmt(video.size)} • ${watchStatus(video)}${video.favorite ? " • ★" : ""}${playedLine}</p>
        <p>${esc(video.note || "")}${video.tags.length ? " • #" + esc(video.tags.join(" #")) : ""}</p>
      </div>
      <div class="itemActions">
        <button class="mini play" type="button">Xem</button>
        <button class="mini fav" type="button">${video.favorite ? "★" : "☆"}</button>
        <button class="mini detail" type="button">${TEXT.details}</button>
        <button class="mini edit" type="button">${TEXT.edit}</button>
        <button class="mini playlist" type="button">+PL</button>
        <button class="mini del" type="button">${TEXT.delete}</button>
      </div>`;
    item.querySelector(".play").onclick = () => {
      closeDrawer();
      scrollToIndex(index);
    };
    item.querySelector(".fav").onclick = () => toggleFavorite(video.id);
    item.querySelector(".detail").onclick = () => showVideoDetail(video.id);
    item.querySelector(".edit").onclick = () => editVideo(video.id);
    item.querySelector(".playlist").onclick = () => addVideoToPlaylist(video.id);
    item.querySelector(".del").onclick = () => removeVideo(video.id);
    libraryList.appendChild(item);
  });
}


function renderKidsLog() {
  if (!kidsLogSummary || !kidsLogList) return;
  const log = loadKidsLog();
  const today = todayKey();
  const todayRows = log.filter(row => String(row.watchedAt || "").startsWith(today));
  const seconds = todayRows.reduce((sum, row) => sum + Number(row.durationWatched || 0), 0);
  kidsLogSummary.textContent = `Hôm nay đã xem ${todayRows.length} video, khoảng ${Math.ceil(seconds / 60)} phút.`;
  kidsLogList.innerHTML = log.slice(0, 8).map(row => `
    <div class="logItem">
      <strong>${esc(row.title)}</strong>
      <span>${new Date(row.watchedAt).toLocaleString("vi-VN")} • ${Math.ceil((row.durationWatched || 0) / 60)} phút</span>
    </div>`).join("") || "<div class='hint'>Chưa có lịch sử xem.</div>";
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
  if (selectedDetailId === id) showVideoDetail(id);
  await refresh({ keepIndex: true });
}


function showVideoDetail(id) {
  const video = videos.find(item => item.id === id);
  if (!video) return;
  selectedDetailId = id;
  const playlistNames = playlists
    .filter(playlist => playlist.videoIds.includes(id))
    .map(playlist => playlist.name)
    .join(", ") || TEXT.none;
  detailTitle.textContent = video.title;
  detailBody.innerHTML = [
    ["Title", video.title],
    ["File", video.fileName || video.title],
    ["Size", fmt(video.size)],
    ["Duration", fmtTime(video.duration)],
    ["Status", watchStatus(video)],
    ["Favorite", video.favorite ? "Có" : "Không"],
    ["Tags", video.tags.length ? video.tags.join(", ") : TEXT.none],
    ["Note", video.note || TEXT.none],
    ["Playlist", playlistNames],
    ["Kids Safe", video.approvedForKids ? "Cho con xem" : "Chưa duyệt"],
    ["Kids category", video.kidsCategory || "Chưa đặt"],
    ["Kids energy", kidsEnergyLabel(video.kidsEnergy)],
    ["Kids time", kidsTimeLabel(video.kidsAllowedTime)],
    ["Kids question", video.kidsQuestion || TEXT.none],
    ["Kids note", video.kidsNote || TEXT.none],
    ["Family type", familyTypeLabel(video.familyType)],
    ["Memory date", video.memoryDate || TEXT.none],
    ["Child age", video.childAgeLabel || TEXT.none],
    ["People", video.familyPeople.length ? video.familyPeople.join(", ") : TEXT.none],
    ["Location", video.familyLocation || TEXT.none],
    ["Memory note", video.memoryNote || TEXT.none],
    ["Memory question", video.memoryQuestion || TEXT.none],
    ["KHOBAUKYUC ref", video.khoBauKyUcRef || TEXT.none],
    ["Play position", fmtTime(video.playPosition)],
    ["Created", new Date(video.createdAt).toLocaleString("vi-VN")],
    ["Updated", new Date(video.updatedAt).toLocaleString("vi-VN")]
  ].map(([label, value]) => `<div class="detailRow"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`).join("");
  detailSheet.hidden = false;
}


function kidsEnergyLabel(value) {
  return value === "calm" ? "Êm" : value === "active" ? "Sôi động" : "Vừa";
}

function kidsTimeLabel(value) {
  if (value === "daytime") return "Ban ngày";
  if (value === "notBeforeSleep") return "Không xem trước giờ ngủ";
  return "Lúc nào cũng được";
}


async function editKidsSafe(id) {
  const video = videos.find(item => item.id === id);
  if (!video) return;
  video.approvedForKids = confirm(video.approvedForKids ? "Video đang cho con xem. Bấm OK để giữ duyệt, Cancel để bỏ duyệt." : "Cho con xem video này?");
  const category = prompt("Kids category (family, music, learning hoặc để trống):", video.kidsCategory || "");
  if (category === null) return;
  const energy = prompt("Năng lượng: calm, normal, active", video.kidsEnergy || "normal");
  if (energy === null) return;
  const allowedTime = prompt("Thời điểm: anytime, daytime, notBeforeSleep", video.kidsAllowedTime || "anytime");
  if (allowedTime === null) return;
  const question = prompt("Câu hỏi sau video cho con:", video.kidsQuestion || "");
  if (question === null) return;
  const note = prompt("Ghi chú ngắn cho Ba/Mẹ:", video.kidsNote || "");
  if (note === null) return;
  video.kidsCategory = category.trim();
  video.kidsEnergy = ["calm", "normal", "active"].includes(energy.trim()) ? energy.trim() : "normal";
  video.kidsAllowedTime = ["anytime", "daytime", "notBeforeSleep"].includes(allowedTime.trim()) ? allowedTime.trim() : "anytime";
  video.kidsQuestion = question.trim();
  video.kidsNote = note.trim();
  await updateVideo(video);
  showVideoDetail(id);
  await refresh({ keepIndex: true });
}

async function editFamilyMemory(id) {
  const video = videos.find(item => item.id === id);
  if (!video) return;
  const familyType = prompt("Family type: family, child-memory, learning, music, movement, bedtime, reward, other", video.familyType || "");
  if (familyType === null) return;
  const memoryDate = prompt("Memory date (YYYY-MM-DD):", video.memoryDate || "");
  if (memoryDate === null) return;
  const birthDate = localStorage.getItem(CHILD_BIRTH_DATE_KEY) || "";
  const suggestedAge = ageLabelFromDates(memoryDate.trim(), birthDate) || video.childAgeLabel || "";
  const childAgeLabel = prompt("Child age label:", suggestedAge);
  if (childAgeLabel === null) return;
  const people = prompt("People, comma separated:", video.familyPeople.join(", "));
  if (people === null) return;
  const location = prompt("Location:", video.familyLocation || "");
  if (location === null) return;
  const note = prompt("Memory note:", video.memoryNote || "");
  if (note === null) return;
  const question = prompt("Memory question after video:", video.memoryQuestion || "");
  if (question === null) return;
  const ref = prompt("KHOBAUKYUC ref text/link/id:", video.khoBauKyUcRef || "");
  if (ref === null) return;
  video.familyType = ["family", "child-memory", "learning", "music", "movement", "bedtime", "reward", "other"].includes(familyType.trim()) ? familyType.trim() : "";
  video.memoryDate = memoryDate.trim();
  video.memoryDateCode = video.memoryDate.replaceAll("-", "");
  video.childAgeLabel = childAgeLabel.trim();
  video.familyPeople = parseTags(people);
  video.familyLocation = location.trim();
  video.memoryNote = note.trim();
  video.memoryQuestion = question.trim();
  video.khoBauKyUcRef = ref.trim();
  await updateVideo(video);
  showVideoDetail(id);
  await refresh({ keepIndex: true });
}

function closeVideoDetail() {
  selectedDetailId = null;
  detailSheet.hidden = true;
}

function playDetailVideo() {
  const index = visibleVideos.findIndex(video => video.id === selectedDetailId);
  const fallbackIndex = videos.findIndex(video => video.id === selectedDetailId);
  closeVideoDetail();
  closeDrawer();
  if (index >= 0) scrollToIndex(index);
  else {
    searchInput.value = "";
    statusFilter.value = "all";
    playlistFilter.value = "all";
    refresh().then(() => {
      const visibleIndex = visibleVideos.findIndex(video => video.id === videos[fallbackIndex]?.id);
      if (visibleIndex >= 0) scrollToIndex(visibleIndex);
    });
  }
}

async function removeVideo(id) {
  if (!confirm("X  a video n  y kh   i b    nh    offline?")) return false;
  const videoEl = videoElements.get(id);
  if (videoEl) detachVideoSource(id, videoEl);
  await deleteVideo(id);
  playlists = playlists.map(playlist => ({ ...playlist, videoIds: playlist.videoIds.filter(videoId => videoId !== id) }));
  savePlaylists();
  await refresh();
  toast("     x  a video.");
  return true;
}

async function addFiles(files, inputEl) {
  const selected = Array.from(files || []).filter(file => file.type.startsWith("video/"));
  if (!selected.length) {
    toast("Kh  ng t  m th   y video.");
    if (inputEl) inputEl.value = "";
    return;
  }

  const totalBytes = selected.reduce((sum, file) => sum + file.size, 0);
  const largest = selected.reduce((max, file) => Math.max(max, file.size), 0);
  let warning = `Chu   n b    l  u ${selected.length} video, t   ng ${fmt(totalBytes)}, file l   n nh   t ${fmt(largest)}.`;
  if (largest > LARGE_FILE_BYTES) warning += "\nC   video tr  n 200MB, l  u tr  n   i   n tho   i y   u c   th    r   t ch   m.";
  if (totalBytes > LARGE_IMPORT_BYTES) warning += "\nT   ng import tr  n 1GB, quota tr  nh duy   t c   th    kh  ng      .";
  if (lowEndMode && largest > LOW_END_FILE_BYTES) warning += "\nCh          m  y y   u khuy   n ngh    m   i video <= 150MB.";
  warning += "\nB   n mu   n ti   p t   c?";
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
          const choice = prompt(`Video "${file.name}" c   v         t   n t   i.\nNh   p: skip, save, all`, "skip");
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
  const level = percent === null ? TEXT.unknown : percent < 50 ? TEXT.safe : percent <= 80 ? TEXT.watch : TEXT.danger;
  const orphans = db ? await findOrphanMetadata(videos).catch(() => []) : [];
  const warning = orphans.length
    ? `${orphans.length} metadata video thiếu blob. Đây là video offline bị lỗi và có thể dọn.`
    : buildStorageWarning(estimate, persisted, percent);

  storageInfo.textContent = `${videos.length} video - offline ${fmt(total)}`;
  healthVideoCount.textContent = String(videos.length);
  healthOfflineSize.textContent = fmt(total);
  healthUsage.textContent = estimate ? fmt(estimate.usage) : TEXT.notSupported;
  healthQuota.textContent = estimate ? fmt(estimate.quota) : TEXT.notSupported;
  healthPercent.textContent = percent === null ? TEXT.unknown : percent.toFixed(1) + "%";
  healthLevel.textContent = level;
  healthLevel.className = percent !== null && percent > 80 ? "dangerText" : percent !== null && percent >= 50 ? "warn" : "good";
  healthPersist.textContent = persisted === null ? TEXT.notSupported : persisted ? TEXT.protectedStorage : TEXT.unprotectedStorage;
  healthPersist.className = persisted ? "good" : "warn";
  healthWarning.textContent = warning;
  healthWarning.hidden = !warning;
  persistBtn.hidden = !navigator.storage?.persist || persisted === true;
  if (repairBtn) repairBtn.hidden = !orphans.length;
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
  const base = TEXT.storageBackupWarning;
  if (!navigator.storage) return TEXT.browserNoStorageApi + " " + base;
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
    return Array.isArray(rows) ? rows.map(item => ({ id: item.id || crypto.randomUUID(), name: item.name || "Playlist", videoIds: Array.isArray(item.videoIds) ? item.videoIds : [], showInKids: Boolean(item.showInKids) })) : [];
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
  playlistFilter.innerHTML = '<option value="all">' + TEXT.allPlaylists + '</option>';
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
  const playlist = { id: crypto.randomUUID(), name: name.trim(), videoIds: [], showInKids: false };
  playlists.push(playlist);
  savePlaylists();
  return playlist;
}

function selectedPlaylist() {
  return playlists.find(playlist => playlist.id === playlistFilter.value) || null;
}


function renameSelectedPlaylist() {
  const playlist = selectedPlaylist();
  if (!playlist) {
    toast("Hãy chọn một playlist trước.");
    return;
  }
  const name = prompt("Đổi tên playlist:", playlist.name);
  if (!name?.trim()) return;
  playlist.name = name.trim();
  savePlaylists();
  refresh({ keepIndex: true });
}


function deleteSelectedPlaylist() {
  const playlist = selectedPlaylist();
  if (!playlist) {
    toast("Hãy chọn một playlist trước.");
    return;
  }
  if (!confirm(`Xóa playlist "${playlist.name}"? Video sẽ không bị xóa.`)) return;
  playlists = playlists.filter(item => item.id !== playlist.id);
  playlistFilter.value = "all";
  savePlaylists();
  refresh({ keepIndex: true });
  toast("Đã xóa playlist.");
}


function toggleSelectedPlaylistKids() {
  const playlist = selectedPlaylist();
  if (!playlist) {
    toast("Hãy chọn một playlist trước.");
    return;
  }
  playlist.showInKids = !playlist.showInKids;
  savePlaylists();
  renderKidsHome();
  toast(playlist.showInKids ? "Playlist sẽ hiện trong Kids Mode." : "Playlist đã ẩn khỏi Kids Mode.");
}


function addVideoToPlaylist(videoId) {
  let playlist = selectedPlaylist() || playlists[0];
  if (playlist?.videoIds.includes(videoId)) {
    if (confirm(`Bỏ video khỏi playlist "${playlist.name}"?`)) {
      playlist.videoIds = playlist.videoIds.filter(id => id !== videoId);
      savePlaylists();
      if (selectedDetailId === videoId) showVideoDetail(videoId);
      refresh({ keepIndex: true });
      toast("Đã bỏ khỏi playlist.");
    }
    return;
  }
  if (!playlist || !confirm(`Thêm vào playlist "${playlist.name}"? Bấm Cancel để tạo playlist mới.`)) {
    playlist = createPlaylist();
  }
  if (!playlist) return;
  if (!playlist.videoIds.includes(videoId)) playlist.videoIds.push(videoId);
  savePlaylists();
  if (selectedDetailId === videoId) showVideoDetail(videoId);
  refresh({ keepIndex: true });
  toast("Đã thêm vào playlist.");
}


function renderKidsHome() {
  kidsHome.hidden = !isKidsMode();
  if (!isKidsMode()) return;
  const routine = routineStatus();
  if (!routine.allowed) {
    kidsQuota.textContent = routine.reason;
    kidsShelves.innerHTML = "<div class='hint'>Rạp chiếu đang nghỉ. Mình quay lại vào giờ xem nhé.</div>";
    return;
  }
  const quota = remainingKidsQuota();
  kidsQuota.textContent = quota.exhausted
    ? "Rạp chiếu hôm nay đóng cửa rồi. Mình nghỉ mắt nha con."
    : `Hôm nay còn ${quota.videos} video hoặc khoảng ${quota.minutes} phút xem.`;
  const familyRows = visibleVideos.filter(video => video.familyType === "family" || video.familyType === "child-memory");
  const groups = [
    ["Gia đình mình", familyRows],
    ["Video của con", visibleVideos.filter(video => video.familyType === "child-memory")],
    ["Ba/Mẹ chọn cho con", visibleVideos],
    [TEXT.learning, visibleVideos.filter(video => video.familyType === "learning" || video.kidsCategory === "learning")],
    ["Nhạc/vận động", visibleVideos.filter(video => ["music", "movement"].includes(video.familyType) || video.kidsCategory === "music")],
    [TEXT.reward, visibleVideos.filter(video => video.familyType === "reward")],
    ["Yêu thích của con", visibleVideos.filter(video => video.favorite)],
    ["Êm dịu", visibleVideos.filter(video => video.kidsEnergy === "calm")]
  ];
  for (const playlist of playlists.filter(playlist => playlist.showInKids)) {
    groups.push([playlist.name, visibleVideos.filter(video => playlist.videoIds.includes(video.id))]);
  }
  kidsShelves.innerHTML = groups
    .filter(([, rows]) => rows.length)
    .map(([name, rows]) => `<button class="kidsShelf" type="button" data-first="${esc(rows[0].id)}"><strong>${esc(name)}</strong><span>${rows.length} video</span></button>`)
    .join("") || "<div class='hint'>Chưa có video nào được duyệt cho con.</div>";
  for (const button of kidsShelves.querySelectorAll(".kidsShelf")) {
    button.onclick = () => {
      const index = visibleVideos.findIndex(video => video.id === button.dataset.first);
      if (index >= 0) startKidsPlayback(index);
    };
  }
}


function renderParentDashboard() {
  if (!parentDashboard) return;
  const today = summarizeLog(logRowsForDate(todayKey()));
  const quota = remainingKidsQuota();
  const routine = routineStatus();
  const recent = loadKidsLog().slice(0, 5);
  const overLimit = dailyLimitEnabled() && (today.count > dailyLimitCount() || today.minutes > effectiveDailyMinutes());
  parentDashboard.innerHTML = `
    <div class="statGrid">
      <div class="statCard"><span>${TEXT.minutesToday}</span><strong>${today.minutes}</strong></div>
      <div class="statCard"><span>${TEXT.videosWatched}</span><strong>${today.count}</strong></div>
      <div class="statCard"><span>${TEXT.videosCompleted}</span><strong>${today.completed}</strong></div>
      <div class="statCard"><span>${TEXT.breakCount}</span><strong>${today.breaks}</strong></div>
      <div class="statCard"><span>${TEXT.remaining}</span><strong>${quota.minutes} phút / ${quota.videos} video</strong></div>
      <div class="statCard"><span>Routine</span><strong>${esc(routine.allowed ? TEXT.allowed : TEXT.blocked)}</strong></div>
    </div>
    <div class="dashboardSection"><h4>${TEXT.lastSevenDays}</h4><div class="miniBars">${lastSevenDaySummaries().map(day => renderMiniBar(day)).join("")}</div></div>
    <div class="dashboardSection">
      <h4>${TEXT.content}</h4>
      <p>${TEXT.topVideo}: ${esc(today.topVideo || TEXT.none)}</p>
      <p>${TEXT.topPlaylist}: ${esc(today.topPlaylist || TEXT.none)}</p>
      <p>${TEXT.recentItems}: ${esc(recent.map(row => row.title).filter(Boolean).slice(0, 3).join(", ") || TEXT.none)}</p>
    </div>
    <div class="dashboardSection"><h4>${TEXT.routineStatus}</h4><p>${esc(routine.reason)} ${overLimit ? "Đã vượt giới hạn hôm nay." : "Chưa vượt giới hạn."}</p></div>
    <div class="dashboardSection"><h4>${TEXT.contentBalance}</h4>${renderContentBalance()}</div>`;
}

function lastSevenDaySummaries() {
  const rows = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    rows.push({ key, label: `${d.getDate()}/${d.getMonth() + 1}`, ...summarizeLog(logRowsForDate(key)) });
  }
  return rows;
}

function renderMiniBar(day) {
  const limit = Math.max(1, effectiveDailyMinutes());
  const percent = Math.min(100, day.minutes / limit * 100);
  const over = dailyLimitEnabled() && day.minutes > limit;
  return `<div class="miniBar"><span>${esc(day.label)}</span><span><i style="width:${percent}%"></i></span><strong class="${over ? "dangerText" : ""}">${day.minutes}p</strong></div>`;
}


function renderDailySummary() {
  if (!dailySummary) return;
  const today = summarizeLog(logRowsForDate(todayKey()));
  const over = dailyLimitEnabled() && (today.count > dailyLimitCount() || today.minutes > effectiveDailyMinutes());
  const activeCount = today.rows.filter(row => {
    const video = videos.find(item => item.id === row.videoId);
    return video?.kidsEnergy === "active" || video?.familyType === "movement";
  }).length;
  const hint = over ? "Hôm nay nên giảm một chút." : activeCount >= 2 ? "Con xem nhiều video sôi động, tối nên chọn video êm hơn." : "Hôm nay ổn.";
  dailySummary.innerHTML = `
    <div class="dashboardSection">
      <p>Con đã xem ${today.minutes} phút.</p>
      <p>Con đã xem ${today.count} video.</p>
      <p>Playlist chính: ${esc(today.topPlaylist || TEXT.none)}.</p>
      <p>Nghỉ mắt: ${today.breaks ? "có" : "chưa ghi nhận"}.</p>
      <p>Vượt giới hạn: ${over ? "có" : "không"}.</p>
      <p>Gợi ý: ${esc(hint)}</p>
    </div>`;
}


function renderContentBalance() {
  const approved = videos.filter(video => video.approvedForKids);
  if (!approved.length) return "<p>Chưa có video duyệt cho con.</p>";
  const count = predicate => approved.filter(predicate).length;
  const groups = [
    ["Gia đình/ký ức", count(video => video.familyType === "family" || video.familyType === "child-memory"), "mục tiêu 40%"],
    [TEXT.learning, count(video => video.familyType === "learning" || video.kidsCategory === "learning"), "mục tiêu 30%"],
    ["Nhạc/vận động", count(video => ["music", "movement"].includes(video.familyType) || video.kidsCategory === "music"), "mục tiêu 20%"],
    ["Thưởng/khác", count(video => video.familyType === "reward" || video.familyType === "other" || !video.familyType), "mục tiêu 10%"]
  ];
  return `<div class="balanceList">${groups.map(([name, amount, target]) => `<p>${esc(name)}: ${Math.round(amount / approved.length * 100)}% (${esc(target)})</p>`).join("")}</div>`;
}


function renderFamilyCinema() {
  if (!familyCinemaList) return;
  let rows = videos.filter(video => video.familyType || video.memoryDate || video.childAgeLabel || video.memoryNote);
  if (familyFilter.value === "child") rows = rows.filter(video => video.familyType === "child-memory");
  if (familyFilter.value === "learning") rows = rows.filter(video => video.familyType === "learning");
  if (familyFilter.value === "bedtime") rows = rows.filter(video => video.familyType === "bedtime");
  if (familyFilter.value === "reward") rows = rows.filter(video => video.familyType === "reward");
  rows.sort((a, b) => {
    if (familySort.value === "oldest") return String(a.memoryDate || "").localeCompare(String(b.memoryDate || ""));
    if (familySort.value === "age") return String(a.childAgeLabel || "").localeCompare(String(b.childAgeLabel || ""), "vi");
    return String(b.memoryDate || "").localeCompare(String(a.memoryDate || ""));
  });
  familyCinemaList.innerHTML = rows.length ? "" : `<div class='hint'>${TEXT.noFamilyMetadata}</div>`;
  for (const video of rows) {
    const item = document.createElement("div");
    item.className = "item";
    item.innerHTML = `
      <div class="thumb">▶</div>
      <div class="itemMain">
        <h3>${esc(video.title)}</h3>
        <p>${esc(familyTypeLabel(video.familyType))} • ${esc(video.memoryDate || TEXT.noDate)} • ${esc(video.childAgeLabel || TEXT.noAge)}</p>
        <p>${esc(video.familyLocation || "")}${video.familyPeople.length ? " • " + esc(video.familyPeople.join(", ")) : ""}</p>
      </div>
      <div class="itemActions">
        <button class="mini detail" type="button">${TEXT.details}</button>
        <button class="mini play" type="button">Xem</button>
      </div>`;
    item.querySelector(".detail").onclick = () => showVideoDetail(video.id);
    item.querySelector(".play").onclick = () => {
      closeDrawer();
      const index = visibleVideos.findIndex(item => item.id === video.id);
      scrollToIndex(index >= 0 ? index : 0);
    };
    familyCinemaList.appendChild(item);
  }
}

function exportMetadata() {
  const payload = {
    app: "Offline Cinema",
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    warning: "This file does not include video blobs.",
    videos: videos.map(video => normalizeMetadata(video)),
    playlists,
    kidsSettings: {
      dailyLimitEnabled: dailyLimitEnabled(),
      dailyLimitCount: dailyLimitCount(),
      dailyLimitMinutes: dailyLimitMinutes(),
      breakReminderEnabled: breakReminderEnabled(),
      breakEvery: breakEveryCount(),
      pinEnabled: pinEnabled()
    },
    routineSettings: loadRoutineSettings(),
    childProfile: {
      childName: localStorage.getItem(CHILD_NAME_KEY) || TEXT.childNameDefault,
      childBirthDate: localStorage.getItem(CHILD_BIRTH_DATE_KEY) || ""
    },
    watchLog: loadKidsLog()
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
      byId.set(item.id, { id: item.id, name: item.name || "Playlist", videoIds: Array.isArray(item.videoIds) ? item.videoIds : [], showInKids: Boolean(item.showInKids) });
    }
    playlists = [...byId.values()];
    savePlaylists();
  }
  if (payload.kidsSettings && typeof payload.kidsSettings === "object") {
    localStorage.setItem(DAILY_LIMIT_ENABLED_KEY, payload.kidsSettings.dailyLimitEnabled === false ? "0" : "1");
    if (payload.kidsSettings.dailyLimitCount) localStorage.setItem(DAILY_LIMIT_COUNT_KEY, String(payload.kidsSettings.dailyLimitCount));
    if (payload.kidsSettings.dailyLimitMinutes) localStorage.setItem(DAILY_LIMIT_MINUTES_KEY, String(payload.kidsSettings.dailyLimitMinutes));
    localStorage.setItem(BREAK_ENABLED_KEY, payload.kidsSettings.breakReminderEnabled === false ? "0" : "1");
    if (payload.kidsSettings.breakEvery) localStorage.setItem(BREAK_EVERY_KEY, String(payload.kidsSettings.breakEvery));
    syncKidsSettingsUI();
  }
  if (payload.routineSettings && typeof payload.routineSettings === "object") {
    localStorage.setItem(ROUTINE_ENABLED_KEY, payload.routineSettings.enabled ? "1" : "0");
    localStorage.setItem(ROUTINE_MORNING_KEY, payload.routineSettings.morning === false ? "0" : "1");
    localStorage.setItem(ROUTINE_AFTERNOON_KEY, payload.routineSettings.afternoon === false ? "0" : "1");
    localStorage.setItem(ROUTINE_EVENING_KEY, payload.routineSettings.evening === false ? "0" : "1");
    if (payload.routineSettings.noWatchAfter) localStorage.setItem(ROUTINE_NO_WATCH_AFTER_KEY, String(payload.routineSettings.noWatchAfter));
    localStorage.setItem(ROUTINE_NO_BEFORE_SLEEP_KEY, payload.routineSettings.noBeforeSleepEnabled === false ? "0" : "1");
    if (payload.routineSettings.weekendExtraMinutes !== undefined) localStorage.setItem(ROUTINE_WEEKEND_EXTRA_KEY, String(payload.routineSettings.weekendExtraMinutes));
    syncRoutineUI();
  }
  if (payload.childProfile && typeof payload.childProfile === "object") {
    if (payload.childProfile.childName) localStorage.setItem(CHILD_NAME_KEY, String(payload.childProfile.childName));
    if (payload.childProfile.childBirthDate !== undefined) localStorage.setItem(CHILD_BIRTH_DATE_KEY, String(payload.childProfile.childBirthDate));
    syncRoutineUI();
  }
  if (Array.isArray(payload.watchLog)) {
    saveKidsLog(payload.watchLog.map(row => ({
      id: row.id || crypto.randomUUID(),
      videoId: row.videoId || "",
      title: row.title || "Video",
      watchedAt: row.watchedAt || new Date().toISOString(),
      durationWatched: Number(row.durationWatched || 0),
      completed: Boolean(row.completed),
      breakTaken: Boolean(row.breakTaken),
      mode: row.mode || "kids"
    })));
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
$("heroAddBtn").onclick = openDrawer;
$("heroLibraryBtn").onclick = openDrawer;
$("continueBtn").onclick = () => {
  homeHero.hidden = true;
  const recent = [...visibleVideos].sort((a, b) => (b.lastPlayedAt || 0) - (a.lastPlayedAt || 0))[0];
  const index = recent ? visibleVideos.findIndex(video => video.id === recent.id) : 0;
  scrollToIndex(Math.max(0, index));
};
$("closeBtn").onclick = closeDrawer;
drawer.addEventListener("click", event => {
  if (event.target === drawer) closeDrawer();
});
fileInput.onchange = event => addFiles(event.target.files, event.target);
folderInput.onchange = event => addFiles(event.target.files, event.target);
metadataInput.onchange = event => importMetadataFile(event.target.files?.[0]).catch(() => toast("File metadata không hợp lệ.", 3600));
persistBtn.onclick = requestPersistentStorage;
repairBtn.onclick = async () => {
  if (!confirm("Dọn metadata video lỗi không có blob?")) return;
  const result = await repairLibrary({ removeOrphans: true }).catch(error => ({ error }));
  if (result.error) {
    toast("Dọn video lỗi thất bại.", 3600);
    return;
  }
  toast(`Dọn xong: đã xóa ${result.removed} video lỗi.`, 3600);
};
cancelImportBtn.onclick = () => {
  cancelImport = true;
  toast("Sẽ hủy sau file hiện tại.");
};
lowEndToggle.onchange = () => {
  lowEndMode = lowEndToggle.checked;
  applyLowEndMode();
};
for (const chip of document.querySelectorAll("#filterChips .chip")) {
  chip.onclick = () => {
    statusFilter.value = chip.dataset.filter;
    document.querySelectorAll("#filterChips .chip").forEach(item => item.classList.toggle("active", item === chip));
    refresh({ keepIndex: true });
  };
}
$("muteBtn").onclick = () => {
  muted = !muted;
  for (const videoEl of videoElements.values()) videoEl.muted = muted;
  $("muteBtn").textContent = muted ? "    " : "    ";
};
$("newPlaylistBtn").onclick = () => {
  createPlaylist();
  refresh({ keepIndex: true });
};
$("renamePlaylistBtn").onclick = renameSelectedPlaylist;
$("toggleKidsPlaylistBtn").onclick = toggleSelectedPlaylistKids;
$("deletePlaylistBtn").onclick = deleteSelectedPlaylist;
$("exportBtn").onclick = exportMetadata;
$("clearBtn").onclick = async () => {
  if (!confirm("X  a to  n b    video offline? Metadata v   video blob s    b    x  a kh   i IndexedDB.")) return;
  for (const [id, videoEl] of videoElements) detachVideoSource(id, videoEl);
  await clearLibrary();
  playlists = [];
  savePlaylists();
  await refresh();
  toast("     x  a th   vi   n.");
};
searchInput.oninput = () => refresh({ keepIndex: true });
sortSelect.onchange = () => refresh({ keepIndex: true });
statusFilter.onchange = () => refresh({ keepIndex: true });
playlistFilter.onchange = () => refresh({ keepIndex: true });
detailSheet.addEventListener("click", event => {
  if (event.target === detailSheet) closeVideoDetail();
});
$("detailCloseBtn").onclick = closeVideoDetail;
detailPlayBtn.onclick = playDetailVideo;
detailEditBtn.onclick = () => selectedDetailId && editVideo(selectedDetailId);
detailKidsBtn.onclick = () => selectedDetailId && editKidsSafe(selectedDetailId);
detailFamilyBtn.onclick = () => selectedDetailId && editFamilyMemory(selectedDetailId);
detailPlaylistBtn.onclick = () => selectedDetailId && addVideoToPlaylist(selectedDetailId);
detailDeleteBtn.onclick = () => {
  if (!selectedDetailId) return;
  removeVideo(selectedDetailId).then(deleted => {
    if (deleted) closeVideoDetail();
  });
};
enterKidsBtn.onclick = () => {
  appMode = "kids";
  applyAppMode();
};
kidsParentBtn.onclick = async () => {
  if (await verifyParentPin()) {
    appMode = "parent";
    hideKidsGate();
    applyAppMode();
  }
};
pinEnabledToggle.onchange = async () => {
  if (pinEnabledToggle.checked) await setParentPin();
  else {
    localStorage.setItem(PIN_ENABLED_KEY, "0");
    syncKidsSettingsUI();
  }
};
setPinBtn.onclick = setParentPin;
clearPinBtn.onclick = clearParentPin;
dailyLimitToggle.onchange = saveKidsSettingsFromUI;
dailyCountInput.onchange = saveKidsSettingsFromUI;
dailyMinutesInput.onchange = saveKidsSettingsFromUI;
breakToggle.onchange = saveKidsSettingsFromUI;
breakEveryInput.onchange = saveKidsSettingsFromUI;
resetKidsStatsBtn.onclick = resetKidsStatsToday;
clearKidsLogBtn.onclick = () => {
  if (!confirm("Xóa lịch sử xem local của con?")) return;
  saveKidsLog([]);
  renderKidsLog();
};
kidsStartBtn.onclick = () => startKidsPlayback(0);
kidsContinueBtn.onclick = () => {
  const recent = [...visibleVideos].sort((a, b) => (b.lastPlayedAt || 0) - (a.lastPlayedAt || 0))[0];
  const index = recent ? visibleVideos.findIndex(video => video.id === recent.id) : 0;
  startKidsPlayback(Math.max(0, index));
};
kidsRestBtn.onclick = () => showKidsEndScreen();
kidsNextBtn.onclick = () => {
  const next = pendingKidsNextIndex ?? Math.min(currentIndex + 1, visibleVideos.length - 1);
  hideKidsGate();
  startKidsPlayback(next);
};
kidsStopBtn.onclick = () => {
  hideKidsGate();
  kidsHome.hidden = false;
  document.querySelectorAll("video").forEach(video => video.pause());
};
window.addEventListener("online", () => toast("Đã có internet."));
window.addEventListener("offline", () => toast("Đang ở chế độ offline."));

saveRoutineBtn.onclick = saveRoutineSettingsFromUI;
saveChildProfileBtn.onclick = saveChildProfile;
familyFilter.onchange = renderFamilyCinema;
familySort.onchange = renderFamilyCinema;

window.offlineCinemaDebug = {
  appVersion: APP_VERSION,
  scanBadText,
  scanVisibleText,
  repairTextMetadata: async (options = {}) => { const result = await repairTextMetadata({ force: true, ...options }); await refresh(); return result; },
  findOrphans: () => findOrphanMetadata(videos),
  repairOrphans: async () => { if (!confirm("Dọn metadata video lỗi không có blob?")) return { cancelled: true }; return repairLibrary({ removeOrphans: true }); },
  countMetadata,
  countBlobs
};
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js?v=1.9.4").catch(() => {}));
}

(async () => {
  try {
    applyStaticText();
    applyLowEndMode();
    applyAppMode();
    db = await openDB();
    const badBeforeRepair = scanBadTextInMetadata(await getAllMetadata()).length;
    if (localStorage.getItem("offlineCinema.textRepairVersion") !== TEXT_REPAIR_VERSION || badBeforeRepair) await repairTextMetadata();
    updatePlaylistFilter();
    syncKidsSettingsUI();
    syncRoutineUI();
    await refresh();
  } catch (error) {
    toast("Không mở được thư viện IndexedDB trên trình duyệt này.", 4200);
  }
})();
