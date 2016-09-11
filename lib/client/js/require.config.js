var require = { config: o => { require = o; } };

require.config({
    baseUrl: "js",
    nodeIdCompat: true,
    packages: [
        {
            name: "dexie",
            location: "vendor/dexie",
            main: "dist/dexie"
        }, {
            name: "domReady",
            location: "vendor/domReady",
            main: "domReady"
        }, {
            name: "jquery",
            location: "vendor/jquery",
            main: "dist/jquery"
        }, {
            name: "lodash",
            location: "vendor/lodash",
            main: "lodash"
        }, {
            name: "materialize",
            location: "vendor/materialize",
            main: "dist/js/materialize"
        }, {
            name: "moment",
            location: "vendor/moment",
            main: "moment"
        }, {
            name: "q",
            location: "vendor/q",
            main: "q"
        }, {
            name: "rivets",
            location: "vendor/rivets",
            main: "dist/rivets"
        }, {
            name: "sightglass",
            location: "vendor/sightglass",
            main: "index"
        }, {
            name: "sw-toolbox",
            location: "vendor/sw-toolbox",
            main: "sw-toolbox"
        }, {
            name: "text",
            location: "vendor/text",
            main: "text"
        }, {
            name: "url-pattern",
            location: "vendor/url-pattern",
            main: "lib/url-pattern"
        }
    ],
    shim: {
        "materialize": {
            deps: [ "jquery" ]
        }
    },
    map: {
        
    }
    
});

