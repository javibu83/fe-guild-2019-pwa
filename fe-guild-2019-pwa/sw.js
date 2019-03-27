importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
  {
    "url": "favicon.ico",
    "revision": "0251fdb59b82f5f8f448fca84e94f357"
  },
  {
    "url": "index.html",
    "revision": "2e592b8403fc71d37477b0b5101af548"
  },
  {
    "url": "manifest.json",
    "revision": "839abadb6c74e82a34ae5cac52bc697c"
  },
  {
    "url": "offline.html",
    "revision": "7a2ff0fc24a0a6b1a125c98a3664a5ac"
  },
  {
    "url": "src/css/app.css",
    "revision": "574e324013279b516504023455b26b32"
  },
  {
    "url": "src/css/feed.css",
    "revision": "ef5b292641220d93e7923dc79c254969"
  },
  {
    "url": "src/css/help.css",
    "revision": "81922f16d60bd845fd801a889e6acbd7"
  },
  {
    "url": "src/js/app.js",
    "revision": "7c2fe4be27096194a1c1243b675891e5"
  },
  {
    "url": "src/js/feed.js",
    "revision": "33f562cd8a8942e79e167d6bd390b920"
  },
  {
    "url": "src/lib/material.indigo-deep_orange.min.css",
    "revision": "a776ab54eac9a54727e007e0c92eae70"
  },
  {
    "url": "src/lib/material.min.js",
    "revision": "e68511951f1285c5cbf4aa510e8a2faf"
  },
  {
    "url": "src/images/main-image-lg.jpg",
    "revision": "05b87e478ce30957f4e2f00b5c18f80a"
  },
  {
    "url": "src/images/main-image-sm.jpg",
    "revision": "6172dffd0848144bbc3f7504d8585058"
  },
  {
    "url": "src/images/main-image.jpg",
    "revision": "489ce4c1c7ebc7545aa528cea56e50c1"
  }
]);

  workbox.routing.registerRoute(
    routeData => routeData.event.request.headers.get('accept').includes('text/html'),
    args => {
        return caches.match(args.event.request)
            .then(response => {
                if (response) {
                    console.log(response);
                    return response;
                }

                // Clone the request - a request is a stream and can be only consumed once
                const requestToCache = args.event.request.clone();

                // Try to make the original HTTP request as intended
                return fetch(requestToCache)
                    .then(response => {
                        // If request fails or server responds with an error code, return that error immediately
                        if (!response || response.status !== 200) {
                            return response;
                        }

                        // Again clone the response because you need to add it into the cache and because it's used
                        // for the final return response
                        const responseToCache = response.clone();

                        caches.open('dynamic')
                            .then(cache => {
                                cache.put(requestToCache, responseToCache);
                            });

                        return response;
                    });
            })
            .catch(error => {
                return caches.match('/fe-guild-2019-pwa/offline.html');
            });
          }
      );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}