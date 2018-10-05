var dataCacheName = 'annaitamil-011018';
var cacheName = 'annaitamil';
var filesToCache = [
  '/',
  '/index.html',
  '/home.html',
  '/pazhamozhi.html',
  '/js/index.js',
  '/js/jquery-3.2.1.min.js',
  '/js/phonon.min.js',
  '/css/index.css',
  '/css/phonon.min.css',
  '/fonts/material-design-icons.eot',
  '/fonts/material-design-icons.svg',
  '/fonts/material-design-icons.ttf',
  '/fonts/material-design-icons.woff',
  '/fonts/Uni\ Ila.Sundaram-01.ttf',
  '/fonts/Uni\ Ila.Sundaram-05.ttf',
  '/fonts/Uni\ Ila.Sundaram-10.ttf',
  '/img/icon.png',
  '/img/icon-128x128.png',
  '/img/icon-144x144.png',
  '/img/icon-152x152.png',
  '/img/icon-192x192.png',
  '/img/icon-256x256.png',
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
  });

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    
    return self.clients.claim();
  });