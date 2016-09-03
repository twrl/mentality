define(['lodash', 'q', 'core/Messages.js', 'core/Evented.js'], function (_, Q, $$, Evented) {
    
    function DashStore(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.dash.DashStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchToken, this));
            }, this));
        
        this._data = _.stubArray();
    }
    _.extend(DashStore.prototype, Evented.prototype, {
        dispatchHandler: function (msg) {
            var message = $$(msg);
            if (message.service_type() === "io.github.twrl.mentality.dash") {
                switch (message.action_type()) {
                    case "io.github.twrl.mentality.dash.add":
                        // _.set(this._data, [message.get("section_tag"), message.get("tag")], { title: message.get("title"), location: message.get("location") });
                        this._data.push(message.get());
                        this.emit("change");
                        break;
                }
            }
        },
        getSection: function (section_tag) {
            return _.filter(this._data, function (item) { return item.section_tag === section_tag; });
        },
        get: function (tag) {
            return _.find(this._data, function (item) { return item.tag === tag; });
        },
        getAll: function () {
            return this._data;
        }
        
        
    });
    return DashStore;
    
});