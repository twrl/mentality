System.config({
    baseURL: "/js",
    map: {
        "catiline": "/vendor/catiline",
        "dexie": "/vendor/dexie",
        "jquery": "/vendor/jquery",
        "lodash": "/vendor/lodash-amd",
        "materialize": "/vendor/materialize",
        "q": "/vendor/q",
        "rivets": "/vendor/rivets",
        "sightglass": "/vendor/sightglass",
        "stapes": "/vendor/stapes",
        "sw-toolbox": "/vendor/sw-toolbox",
        "systemjs": "/vendor/system.js"
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
            "main": "modern/main.js",
            "format": "amd"
        },
        "materialize": {
            "main": "dist/js/materialize.js",
            meta: {
                "dist/js/materialize.js": {
                    format: "global",
                    globals: {
                        "jQuery": "jquery"
                    }
                }
            }
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

window.define = System.amdDefine;
window.require = System.amdRequire;