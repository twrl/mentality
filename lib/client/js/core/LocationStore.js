define(['lodash', 'q', 'core/Messages.js', 'core/Evented.js'], function (_, Q, $$, Evented) {
    
    function LocationStore(Application) {
        
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.core.LocationStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchToken, this));
            }, this));
            
        
        
        if ('undefined' !== typeof window) {
            window.addEventListener('popstate', _.bind(this.onPopstate, this), false);
        }
    }
    _.extend(LocationStore.prototype, Evented.prototype, {
        dispatchHandler: function (message) {
            var msg = $$(message);
            if (msg.service_type() === "io.github.twrl.mentality.core.location") {
                switch (msg.action_type()) {
                    case "io.github.twrl.mentality.core.location.popstate":
                        this.emit("change:location", msg.get("location"), msg.get("state"));
                        break;
                    case "io.github.twrl.mentality.core.location.pushstate":
                        window.history.pushState(msg.get('state'), msg.get('title'), msg.get('location'));
                        this.emit("change:location", msg.get("location"), msg.get("state"));
                        break;
                    case "io.github.twrl.mentality.core.location.replacestate":
                        window.history.replaceState(msg.get('state'), msg.get('title'), msg.get('location'));
                        this.emit("change:location", msg.get("location"), msg.get("state"));
                        break;
                }
            }
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