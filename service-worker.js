// ===============================
// Service Worker – Vitt PRO
// Versión mínima y estable
// ===============================

// Instala el service worker
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Activa el service worker
self.addEventListener("activate", (event) => {
  self.clients.claim();
});

// (Opcional por ahora)
// No cacheamos nada para evitar errores
self.addEventListener("fetch", (event) => {
  // Dejamos que el navegador maneje todo normalmente
});
