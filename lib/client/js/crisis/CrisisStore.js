define(['lodash', 'q', "crisis/CrisisModel.js", 'core/Evented.js'], function (_, Q, Model, Evented) {
    
    var ConcernStore = function (Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.crisis.CrisisStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchHandler, this));
                this.application.ready();
            }, this));
        
        this.db = this.application.DB;
    };
    _.extend(ConcernStore.prototype, Evented.prototype, {
        dispatchHandler: function (action) {
            if (_.get(action, "HEAD.service_type") == "io.github.twrl.mentality.crisis") {
                switch (_.get(action, "HEAD.action_type")) {
                    case "io.github.twrl.mentality.crisis.create":
                        this.create();
                        break;
                    case "io.github.twrl.mentality.crisis.put":
                        Q(this.db.crisis.put(_.get(action, "BODY"))).then(function (id) {this.emit("change"); this.emit("change:" + id)});
                        break;
                    case "io.github.twrl.mentality.crisis.delete":
                        if (_.has(action, "BODY._id")) { this.delete(_.get(action, "BODY._id")); }
                        break;
                }
            }
        },
        create: function () {
            Q(this.db.crisis.add({})).then(_.bind(function (id) {
                
                this.emit("change");
                this.emit("create", id);
                
                return this.get(id);
            }, this));
            
        },
        delete: function (id) {
            Q(this.db.crisis.delete(id)).then(_.bind(function() {
                this.emit("change");
                this.emit("delete:" + id);
            }, this));
        },
        get: function (id) {
            return (new Model(this, id)).refresh();
        },
        getAll: function () {
            return Q(this.db.crisis.reverse().keys()).then(_.bind(function (keys) {
                return Q.all(_.map(keys, _.bind(function (id) { return this.get(id); }, this)));
            }, this));
        },
        getRaw: function (id) {
            return Q(this.db.crisis.get(id));
        },
        getAllIds: function () {
            return Q(this.db.crisis.toCollection().keys());
        },
        set: function (id, data) {
            if (_.has(data, '_id')) {
                this.db.crisis.put(data);
            } else {
                this.db.crisis.put(data, id);
            }
            this.emit("change");
            this.emit("change:" + id);
        }
    });
    
    
    return ConcernStore;
});