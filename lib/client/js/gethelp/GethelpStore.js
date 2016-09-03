define(['lodash', 'q', "gethelp/GethelpModel.js", 'core/Evented.js'], function (_, Q, Model, Evented) {
    
    var GHConstants = _.keyBy([
        'gethelp_show_page'
        ]);
    
    var GethelpStore = function (Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.gethelp.GethelpStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchToken, this));
            }, this));
        
        this.db = this.application.DB;
    };
    _.extend(GethelpStore.prototype, Evented.prototype, {
        dispatchHandler: function (action) {
            if (_.get(action, "HEAD.service_type") == "io.github.twrl.mentality.gethelp") {
                switch (_.get(action, "HEAD.action_type")) {
                    case "io.github.twrl.mentality.gethelp.put":
                        Q(this.db.helpsvcs.put(_.get(action, "BODY"))).then(function (id) {this.emit("change"); this.emit("change:" + id)});
                        break;
                    case "io.github.twrl.mentality.gethelp.delete":
                        if (_.has(action, "BODY._id")) { this.delete(_.get(action, "BODY._id")); }
                        break;
                }
            }
        },
        create: function () {
            Q(this.db.helpsvcs.add()).then(function (id) {
                
                this.emit("change");
                this.emit("change:" + id);
                
                return this.get(id);
            });
            
        },
        delete: function (id) {
            _.defer(this.db.helpsvcs.delete(id));
            
            this.emit("change");
            this.emit("delete:" + id);
        },
        get: function (id) {
            return Q(new Model(this, id));
        },
        getAll: function () {
            Q(this.db.helpsvcs.toCollection().keys()).then(function (keys) {
                return Q.all(_.forEach(keys, function (id) { return this.get(id); }));
            });
        },
        getAllIds: function () {
            return Q(this.db.helpsvcs.toCollection().keys());
        },
        set: function (id, data) {
            if (_.has(data, '_id')) {
                this.db.helpsvcs.put(data);
            } else {
                this.db.helpsvcs.put(data, id);
            }
            this.emit("change");
            this.emit("change:" + id);
        }
    });
    
    
    
});