'use strict'

/* global self,toolbox */


importScripts("/vendor/sw-toolbox/sw-toolbox.js");

importScripts("js/require.config.js");
importScripts("js/vendor/requirejs/require.js");
//importScripts("js/vendor/q/q.js");


self.addEventListener("install", e => self.setInterval(() => {
    console.log("Timer")
    }, 60000));

($ => {
    
    //$.precache([]);
    //$.options.debug = true;
    
    $.router.default = $.fastest;
    
})(self.toolbox);

self.addEventListener("install", e => e.waitUntil(self.skipWaiting()));
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
    
// $.precache([
//     "index.html",
//     "vendor/system.js/dist/system.js",
//     "js/system.config.js",
//     "js/app.js"
//     ]);
    
// $.router.default = $.Fastest;
    
    
// ---- Simulate an AMD-style define, return a promise for the module ----
// function (deps, factory) { Promise.any(_.forEach(deps, function (v) { return System.import(v); })).then(function (mods) { return factory.apply(mods); }); }