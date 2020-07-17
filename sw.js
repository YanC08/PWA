//Asignar nombre y versión de la cache
const CACHE_NAME='V1_cache_PWA';
//Ficheros a cachear en la aplicación
var urlsToCache = [
    './',
    './css/estilos.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];
//self es para referirse al propio service worker
//Evento install
//Instalación del evento Service Worker y guardar en  cache los recursos estaticos
self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                  return cache.addAll(urlsToCache)
                              .then(() =>{
                                self.skipWaiting();
                              })
              })
              .catch(err => console.log('No se ha regisrado el cache', err))
              
    )
})
//Evento Activate
// que la app funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()//saca todas las caches en que tiene
              .then(cacheNames => {
                  return Promise.all(// hasta que todas se cumplan y se recorran todas las caches encontradas
                      cacheNames.map(cacheName => { //Recorre una por una elementos del arreglo
                          if (cacheWhiteList.indexOf(cacheName) === -1){//si el elemento actual no existe en la nueva lista la borra
                              //Borrar elementos que no se necesitan
                              return caches.delete(cacheName);
                          }
                      })
                  )
              })
              .then(() => {
                  //Activar cache
                  self.clients.claim();
              })
    )
})
//Evento Fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request) //valida si la cache es la misma que se esta actualizando
              .then(res => {
                  if (res){
                      //devuelve los datos de la cache
                      return res;
                  }
                  return fetch(e.request);// devuelve lo cache que descargo
              })
    )
})