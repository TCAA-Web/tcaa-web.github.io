const staticCacheVersion = "site-static-v1.3";
const dynamicCacheVersion = "site-dynamic-v1.3";

const staticCache = `${staticCacheVersion}-app`;
const dynamicCache = `${dynamicCacheVersion}-app`;

const ENABLE_DYNAMIC_CACHING = true;

// funktion til at sætte maks antal filer i cache
const limitCacheSize = (cacheName, numberOfAllowedFiles) => {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > numberOfAllowedFiles) {
        cache
          .delete(keys[0])
          .then(limitCacheSize(cacheName, numberOfAllowedFiles));
      }
    });
  });
};

// Ny sikkerheds foranstalning på response
// Fra https://stackoverflow.com/questions/45434470/only-in-chrome-service-worker-a-redirected-response-was-used-for-a-reque
function cleanResponse(response) {
  const clonedResponse = response.clone();

  // Not all browsers support the Response.body stream, so fall back to reading
  // the entire body into memory as a blob.
  const bodyPromise =
    "body" in clonedResponse
      ? Promise.resolve(clonedResponse.body)
      : clonedResponse.blob();

  return bodyPromise.then((body) => {
    // new Response() is happy when passed either a stream or a Blob.
    return new Response(body, {
      headers: clonedResponse.headers,
      status: clonedResponse.status,
      statusText: clonedResponse.statusText,
    });
  });
}

// install event
self.addEventListener("install", (event) => {
  console.log("Service Worker has been installed");
  event.waitUntil(self.skipWaiting()); // Akriver service worker med det samme
});

// activate event
self.addEventListener("activate", (event) => {
  console.log("Service Worker has been activated");
  event.waitUntil(self.clients.claim()); // Aktiver på ALLE sider
});

// lyt efter alle fetch events
self.addEventListener(
  "fetch",
  (event) => {
    // Efter fetch request
    event.respondWith(
      (async () => {
        // check om response findes i cache
        const cachedResponse = await caches.match(event.request);

        if (cachedResponse) {
          // hvis response er redirected
          if (cachedResponse.redirected) {
            // clean response (sikkerheds foranstaltning)
            return cleanResponse(cachedResponse);
            // ellers return response normalt
          } else {
            return cachedResponse;
          }
        }

        const response = await fetch(event.request);
        // Hvis siden ikke findes så vis fallback siden
        if (response.status == 404) {
          const cache = await caches.open(staticCache);
          const cachedResponse = await cache.match("/fallback.html");
          return cachedResponse;
        }

        // ???
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // hvis dynamisk cache er slået til "boolean" så åben cache og gem response
        if (ENABLE_DYNAMIC_CACHING) {
          const responseToCache = response.clone();
          const cache = await caches.open(dynamicCache);
          await cache.put(event.request, responseToCache);
        }

        return response;
      })()
    );
  },
  // Kør limitCache size til maks 50 filer
  limitCacheSize(dynamicCache, 50)
);

// lyt efter message events
self.addEventListener("message", function (event) {
  console.log("Service Worker message event: " + JSON.stringify(event.data));
  event.source.postMessage(event.data);
});

console.log("Service Worker initialized");

// alle ikoner og statiske assets
const staticAssets = [
  "/assets/appIcons/ios/16.png",
  "/assets/appIcons/ios/32.png",
  "/assets/appIcons/windows11/Square44x44Logo.targetsize-96.png",
  "/assets/appIcons/ios/120.png",
  "assets/appIcons/ios/144.png",
];

// tilføj statiske assets til cache
caches.open(staticCache).then((cache) => {
  cache.addAll(staticAssets);
  console.log("cache event", cache);
});

// tilføj statiske filer til cache
caches.open(staticCache).then((cache) => {
  cache.add("/");
  cache.add("/index.html");
  cache.add("/pages/notifications.js");
  cache.add("/pages/daily/");
  cache.add("/pages/daily/index.html");
  cache.add("/pages/daily/daily.js");
  cache.add("/pages/dashboard/");
  cache.add("/pages/dashboard/index.html");
  cache.add("/pages/dashboard/dashboard.js");
  cache.add("/pages/history/");
  cache.add("/pages/history/index.html");
  cache.add("/pages/history/history.js");
  cache.add("/pages/overview/");
  cache.add("/pages/overview/index.html");
  cache.add("/pages/overview/overview.js");
  cache.add("/pages/settings/");
  cache.add("/pages/settings/index.html");
  cache.add("/pages/settings/settings.js");
  cache.add("/fallback.html");
  cache.add("/serviceworker.js");
  cache.add("/manifest.json");
  cache.add("/javascript/fallback.js");
  cache.add("/javascript/redirect.js");
  cache.add("/clientServiceWorker.js");
});
