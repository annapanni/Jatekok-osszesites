const CACHE = 'jatekok-v1'
const precache = [
    "./icon.png",
    "./index.html",
    "./ki_vagyok_en/index.html",
    "./ki_vagyok_en/style.css",
    "./ki_vagyok_en/kepek/benjamin.jpg",
    "./ki_vagyok_en/kepek/laura.jpg",
    "./ki_vagyok_en/kepek/rachel.jpg",
    "./ki_vagyok_en/kepek/maria.jpg",
    "./ki_vagyok_en/kepek/abigail.jpg",
    "./ki_vagyok_en/kepek/ethan.jpg",
    "./ki_vagyok_en/kepek/anthony.jpg",
    "./ki_vagyok_en/kepek/alexander.jpg",
    "./ki_vagyok_en/kepek/campbell.jpg",
    "./ki_vagyok_en/kepek/tiffany.jpg",
    "./ki_vagyok_en/kepek/madison.jpg",
    "./ki_vagyok_en/kepek/david.jpg",
    "./ki_vagyok_en/kepek/anna.jpg",
    "./ki_vagyok_en/kepek/jacob.jpg",
    "./ki_vagyok_en/kepek/charles.jpg",
    "./ki_vagyok_en/kepek/scott.jpg",
    "./ki_vagyok_en/kepek/lisa.jpg",
    "./ki_vagyok_en/kepek/sophia.jpg",
    "./ki_vagyok_en/kepek/emma.jpg",
    "./ki_vagyok_en/kepek/linda.jpg",
    "./ki_vagyok_en/kepek/jerry.jpg",
    "./ki_vagyok_en/kepek/martin.jpg",
    "./ki_vagyok_en/kepek/roy.jpg",
    "./ki_vagyok_en/kepek/richard.jpg",
    "./ki_vagyok_en/script.js",
    "./ki_vagyok_en/borito.jpg",
    "./ki_vagyok_en/borito2.jpg",
    "./automata/virag.jpeg",
    "./automata/index.html",
    "./automata/cseresznye.png",
    "./automata/csillag.png",
    "./automata/style.css",
    "./automata/kar.png",
    "./automata/citrom.jpeg",
    "./automata/script.js",
    "./automata/csengo.jpg",
    "./automata/fa.png",
    "./manifest.webmanifest",
    "./jatekok-style.css",
    "./sw.js",
    "./keno/index.html",
    "./keno/style.css",
    "./keno/talalatok.png",
    "./keno/script.js",
    "./keno/tick.png",
    "./keno/nyeremenyek.png",
    "./rulett-rules.png",
    "./amoba/index.html",
    "./amoba/script.js",
]

self.addEventListener('install', e => {
  self.skipWaiting()
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(precache)),
  )
})

self.addEventListener('activate', async e => {
    console.log('Activating...', e);
    e.waitUntil(activate())
    return self.clients.claim()
});

async function activate() {
    const keys = await caches.keys()
    console.log('Current caches:', keys)
    const delproms = keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
    return Promise.all(delproms)
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
        .then(response => response || fetch(e.request)),
  )

  // post update cache
  e.waitUntil(async () => {
    const cache = await caches.open(CACHE)
    const resp = await fetch(e.request)
    cache.put(e.request.url, resp)
  })
})
// vim: set et sw=4 ts=4 :
