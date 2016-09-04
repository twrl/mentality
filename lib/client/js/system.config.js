System.config({
    baseURL: "/js",
    depCache: {
        "app.js": ["q", "jquery", "lodash", "core/Messages.js", "core/Application.js", "core/Dispatcher.js", "core/LocationStore.js", "core/RootView.js", "dash/DashStore.js", "dash/DashView.js", "gethelp/GethelpStore.js", "gethelp/GethelpView.js"],
        "rivets.ext.js": ["rivets", "lodash", "moment"],
        "dexie.schema.js": ["dexie"],
        
        "appointments/AppointmentModel.js": ["lodash", "q", "core/Model.js"],
        "appointments/AppointmentStore.js": ["lodash", "q", "core/Messages.js", "core/Evented.js", "appointments/AppointmentModel.js"],
        "appointments/AppointmentView.js": ["lodash", "q", "jquery", "rivets.ext.js", "core/Messages.js", "appointments/AppointmentCard.tpl!text"],
        
        "contacts/ContactModel.js": ["lodash", "q", "core/Model.js"],
        "contacts/ContactStore.js": ["lodash", "q", "contacts/ContactModel.js", "core/Messages.js", "core/Evented.js"],
        "contacts/ContactView.js": ["lodash", "q", "jquery", "rivets.ext.js", "core/Messages.js", "contacts/Contacts.tpl!text"],
        
        "core/Application.js": ["lodash", "q", "core/Messages.js", "dexie.schema.js"],
        "core/Dispatcher.js": ["lodash", "q"],
        "core/Evented.js": ["lodash", "q"],
        "core/LocationStore.js": ["lodash", "q", "core/Messages.js", "url-pattern", "core/Evented.js"],
        "core/Messages.js": ["lodash", "q"],
        "core/Model.js": ["lodash", "q", "core/Evented.js"],
        "core/RootView.js": ["lodash", "q", "jquery", "core/Messages.js"],
        
        "dash/DashStore.js": ["lodash", "q", "core/Messages.js", "core/Evented.js"],
        "dash/DashView.js": ["lodash", "q", "jquery", "rivets.ext.js", "core/Messages.js", "dash/Dash.tpl!text"],
        
        "gethelp/GethelpModel.js": ["lodash", "q", "core/Model.js"],
        "gethelp/GethelpStore.js": ["lodash", "q", "gethelp/GethelpModel.js", "core/Evented.js"],
        "gethelp/GethelpView.js": ["lodash", "q", "rivets.ext.js", "core/Messages.js", "gethelp/Gethelp.tpl!text"]
        
    },
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
        "url-pattern": "/vendor/url-pattern",
        
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
        },
        "url-pattern": {
            "main": "lib/url-pattern.js",
            "format": "amd"
        }
    }
});

// window.define = System.amdDefine;
// window.require = System.amdRequire;