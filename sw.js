'use strict';
const CACHE = 'little-cosmos-20261013-v1';
const FILES = ['./', './index.html', './style.css', './game.js', './webapp.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
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
  const path = url.pathname.split('/').pop();
  if (event.request.mode !== 'navigate' && !FILES.some(file => file.slice(2) === path)) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && !response.redirected) {
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, response.clone())));
    }
    return response;
  }).catch(async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    if (event.request.mode === 'navigate') return caches.match('./index.html');
    return Response.error();
  }));
});
