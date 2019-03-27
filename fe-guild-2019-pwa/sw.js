importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
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
    "url": "src/lib/material.indigo-deep_orange.min.css",
    "revision": "a776ab54eac9a54727e007e0c92eae70"
  }
]);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}