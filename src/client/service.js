self.addEventListener('install', function (ev) {
    ev.waitUntil(caches.open("mentality-sw-cache").then(function (cache) {
        cache.addAll([
            "/",
            "/css/main.css",
            "/css/fontawesome.css",
            "/fonts/fontawesome-webfont.woff2",
            "/js/main.js",
            "/js/vendor/async.js",
            "/js/vendor/backbone.js",
            "/js/vendor/css.js",
            "/js/vendor/domReady.js",
            "/js/vendor/font.js",
            "/js/vendor/goog.js",
            "/js/vendor/pouchdb.js",
            "/js/vendor/propertyParser.js",
            "/js/vendor/q.js",
            "/js/vendor/require.js",
            "/js/vendor/text.js",
            "/js/vendor/tpl.js",
            "/js/vendor/underscore.js",
            "/js/vendor/zanimo.js",
            "/js/vendor/zepto.js"
            ]);
    }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open("mentality-sw-cache")
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});