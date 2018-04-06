let cacheName = "notas-son.v.1.0.7";
let filesToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
  "https://fonts.googleapis.com/css?family=Raleway:400,600,700",
  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
  "https://code.jquery.com/jquery-3.2.1.slim.min.js"
];

self.addEventListener("install", function(e) {
  console.log("[ServiceWorker] Installer");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching App Shell");
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("active", function(e) {
  console.log("[ServiceWorker] Activated");
  e.waitUntil(
    caches.keys().then(function(keyList) {
      console.log(keyList);
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName) {
            console.log("[ServiceWorker] Removing old cache");
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(e) {
  console.log("[ServiceWorker] Fethed", e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
