importScripts("/vendor/system.js/dist/system.js");
importScripts("/js/system.config.js");

System.import("sw-toolbox").then(function ($) {
    
    $.precache([
        "index.html",
        "vendor/system.js/dist/system.js",
        "js/system.config.js"
        ]);
    
    $.router.default = $.cacheFirst;
});

// ---- Simulate an AMD-style define, return a promise for the module ----
// function (deps, factory) { Promise.any(_.forEach(deps, function (v) { return System.import(v); })).then(function (mods) { return factory.apply(mods); }); }