define(['lodash', 'q', 'core/Messages.js', "url-pattern", 'core/Evented.js'], function (_, Q, $$, UrlPattern, Evented) {
    
    function LocationStore(Application) {
        
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.core.LocationStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchHandler, this));
                this.application.ready();
            }, this));
            
        this.routes_ = [];
        
        if ('undefined' !== typeof window) {
            window.addEventListener('popstate', _.bind(this.onPopstate, this), false);
        }
    }
    _.extend(LocationStore.prototype, Evented.prototype, {
        dispatchHandler: function (message) {
            var msg = $$(message);
            if (msg.service_type() === "io.github.twrl.mentality.core.location") {
                switch (msg.action_type()) {
                    case "io.github.twrl.mentality.core.location.register":
                        var pattern = new UrlPattern(msg.get("pattern"));
                        pattern.targetView = msg.get("targetView");
                        this.routes_.push(pattern);
                        break;
                    case "io.github.twrl.mentality.core.location.popstate":
                        //this.emit("change:location", msg.get("location"), msg.get("state"));
                        this.route();
                        break;
                    case "io.github.twrl.mentality.core.location.pushstate":
                        window.history.pushState(msg.get('state'), msg.get('title'), msg.get('location'));
                        this.route();
                        break;
                    case "io.github.twrl.mentality.core.location.replacestate":
                        window.history.replaceState(msg.get('state'), msg.get('title'), msg.get('location'));
                        this.route();
                        break;
                    case "io.github.twrl.mentality.core.location.reroute":
                        this.reroute(msg.get("targetView"), msg.get("parameters"));
                        break;
                    case "io.github.twrl.mentality.core.location.external":
                        window.open(msg.get('location'), "_blank");
                        break;
                }
            }
        },
        reroute: function (targetView, parameters) {
            var path = _.trimStart(window.location.hash, "#!");
            if (_.isEmpty(path)) path = "/";
            
            console.log("Path <" + path + "> rerouted to " + targetView);
            this.emit("change:location", path, targetView, parameters);
        },
        route: function () {
            var path = _.trimStart(window.location.hash, "#!");
            if (_.isEmpty(path)) path = "/";
            
            var route = _.findLast(this.routes_, function (route) {
                return !_.isNil(route.match(path));
            });
            
            console.log("Path <" + path + "> routed to " + route.targetView);
            
            this.emit("change:location", path, route.targetView, route.match(path));
            
        },
        onPopstate: function (e) {
            $$().service_type("io.github.twrl.mentality.core.location")
               .action_type("io.github.twrl.mentality.core.location.popstate")
               .set("location", window.location)
               .set("state", e.state)
               .send(this.dispatcher);
        }
    });
    return LocationStore;
    
});