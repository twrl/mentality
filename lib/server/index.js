var path = require("path");

require("joey")
    .blah()
    .route(function ($) {
        $("manifest.json").file(path.resolve(path.dirname(module.filename), "../client/manifest.json"), "application/manifest+json");
        $("").file(path.resolve(path.dirname(module.filename), "../client/index.html"))
        $("...").fileTree(path.resolve(path.dirname(module.filename), "../client"));
        
    })
    .listen(process.env.PORT)
    .then(function () {
        console.log("listening on port " + process.env.PORT)
    });