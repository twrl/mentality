System.config({
    baseURL: "/js",
    map: {
        "catiline": "/vendor/catiline",
        "dexie": "/vendor/dexie",
        "jquery": "/vendor/jquery",
        "lodash": "/vendor/lodash",
        "materialize": "/vendor/materialize",
        "moment": "/vendor/moment",
        "q": "/vendor/q",
        "page": "/vendor/page",
        "rivets": "/vendor/rivets",
        "sightglass": "/vendor/sightglass",
        "stapes": "/vendor/stapes",
        "sw-toolbox": "/vendor/sw-toolbox",
        "systemjs": "/vendor/system.js",
        
        "text": "/vendor/loader-plugins/text.js"
    },
    packages: {
        "catiline": {
            "main": "dist/catiline.js",
            "format": "amd"
        },
        "dexie": {
            "main": "dist/dexie.js",
            "format": "amd"
        },
        "jquery": {
            "main": "dist/jquery.js",
            "format": "amd"
        },
        "lodash": {
            "main": "lodash.js",
            "format": "amd"
        },
        "materialize": {
            "main": "dist/js/materialize.js",
            meta: {
                "dist/js/materialize.js": {
                    format: "global",
                    globals: {
                        "jQuery": "jquery"
                    },
                    deps: [
                        "jquery"
                        ]
                }
            }
        },
        "page": {
            "main": "page.js",
            "format": "amd"
        },
        "moment": {
            "main": "moment.js",
            "format": "amd"
        },
        "q": {
            "main": "q.js",
            "format": "global"
        },
        "rivets": {
            "main": "dist/rivets.js",
            "format": "amd"
        },
        "sightglass": {
            "main": "index.js",
            "format": "amd"
        },
        "stapes": {
            "main": "stapes.js",
            "format": "amd"
        },
        "sw-toolbox": {
            "main": "sw-toolbox.js",
            "format": "amd"
        }
    }
});

// window.define = System.amdDefine;
// window.require = System.amdRequire;