//Name für Cache-Ressource:
const staticCacheName = "site-static-v1";
//Array der möglichen Requests, die gecacht werden müssen (offline-Funktionalität):
const assets = [
    "/",
    "/index.html",
    "/jscript.js",
    "/manifest.json",
    "/styles.css",
    "/images/20160711_104300_HDR.jpg",
    "https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css"
];

//Service Worker für Caching aller nötigen Elemente
self.addEventListener("install", event => {
    //da SerWorker-Install vielleicht früher beendet als Caching:
    //Ressourcen-Caching (asynchron) abwarten mit waitUntil()
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log("Elemente gecacht.");
            cache.addAll(assets);
        })
    );
    console.log("Caching-Service Worker installiert.");
});

//Problem: bei Änderungen an Dateien werden diese in Cache momentan nicht aktualisiert
//Deshalb "site-static" muss versioniert werden! --> neues Install-Event
//Beschaffung 
self.addEventListener("activate", event => {
    console.log("Service Worker aktiviert");

    event.waitUntil(
        caches.keys().then(keys => {
            console.log(keys);
            //alle alten Caches löschen (asynchroner Task)
            //dafür alle promises als Array 
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                //wenn Ausdruck wahr: behalte betrachteten Promise (mittels Key) in Liste
                //lösche alle keys in diesem Array --> alle alten Caches
                .map(key => caches.delete(key))
            )
        })
    );
});

//Fetch-Events abfangen, fetch auf Cache umleiten (für offline-Funktionalität)
self.addEventListener("fetch", event => {
    //console.log("Fetch ausgelöst", event);
    event.respondWith(
        //wenn der Request auf etwas zielt, das in der Cache liegt:
        caches.match(event.request).then(cacheResponse => {
            //returne diesen Inhalt, sonst returne request --> fahre (online) fort
            return cacheResponse || fetch(event.request);
        })
    );
});