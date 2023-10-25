/* eslint-disable no-restricted-globals */

const cacheName = "my-cache";
const filesToCache = ["/", "/index.html", "/styles.css", "/script.js"];

self.addEventListener("install", (event) => {
  console.log("서비스워커 설치됨");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("파일을 캐시에 저장함");
      return cache.addAll(filesToCache)
      .then(function() {
        return fetch('/assets-manifest.json')
          .then(response => response.json())
          .then(assets => {
            const urlsToCache = Object.values(assets);
            return cache.addAll(urlsToCache);
          });
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("서비스워커 동작 시작됨!");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (!response) {
          console.log("네트워크에서 데이터 요청!", event.request);
          return fetch(event.request);
        }
        console.log("캐시에서 데이터 요청!", event.request);
        return response;
      })
      .catch((err) => console.log(err))
  );
});

// 푸시 알림 수신 시
self.addEventListener("push", (event) => {
  const pushData = event.data.json();

  const options = {
    title: pushData.title,
    body: pushData.body,
  };

  event.waitUntil(self.registration.showNotification(options.title, options));
});
