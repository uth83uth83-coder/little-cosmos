'use strict';
const CACHE = 'little-cosmos-20261019-collection-v8';
const FILES = ['./', './index.html', './style.css', './game.js', './catalog.js', './collection-ui.js', './webapp.js', './manifest.webmanifest', './icon-192.png', './icon-512.png',"./photos/3-mercury.jpg","./photos/3-venus.jpg","./photos/3-earth.jpg","./photos/3-jupiter.jpg","./photos/3-saturn.jpg","./photos/3-uranus.jpg","./photos/3-neptune.jpg","./photos/1-pluto.jpg","./photos/3-mars.jpg","./photos/5-m87.jpg"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(async cache => {
    for (const file of FILES) {
      const response = await fetch(new Request(file, {cache:'reload', credentials:'same-origin'}));
      if (!response.ok || response.redirected) throw new Error('Offline resources unavailable');
      await cache.put(file, response);
    }
  }));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('little-cosmos-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (event.request.mode !== 'navigate' && !FILES.some(file => new URL(file, self.registration.scope).pathname === url.pathname)) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && !response.redirected) {
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, response.clone())));
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(event.request, {ignoreSearch:true});
    if (cached) return cached;
    if (event.request.mode === 'navigate') return caches.match('./index.html');
    return Response.error();
  }));
});
