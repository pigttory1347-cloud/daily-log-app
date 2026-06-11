/* 일상 기록 PWA — 오프라인 캐시 */
const CACHE = "dailylog-v14";
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

// 앱 페이지: 네트워크 우선(항상 최신), 오프라인이면 캐시 폴백.
// 나머지 같은 출처 리소스: 캐시 우선.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request)
        .then(r => {
          const copy = r.clone();
          caches.open(CACHE).then(c => {
            c.put("./index.html", copy.clone());
            c.put("./", copy);
          }).catch(() => {});
          return r;
        })
        .catch(() => caches.match("./index.html", {ignoreSearch: true}))
    );
  } else {
    e.respondWith(
      caches.match(e.request, {ignoreSearch: true}).then(hit => hit || fetch(e.request))
    );
  }
});
