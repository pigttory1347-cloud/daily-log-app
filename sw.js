/* 일상 기록 PWA — 오프라인 캐시 */
const CACHE = "dailylog-v6";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 앱 셸: 캐시 우선, 네트워크 폴백 (유튜브 썸네일 등 외부 요청은 네트워크 우선)
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request))
    );
  }
});
