define(['lodash', 'q', "inspirations/InspirationModel.js", 'core/Evented.js'], function (_, Q, Model, Evented) {
    
    var InspirationStore = function (Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.inspirations.InspirationStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchHandler, this));
                this.application.ready();
            }, this));
        
        this.db = this.application.DB;
    };
    _.extend(InspirationStore.prototype, Evented.prototype, {
        dispatchHandler: function (action) {
            if (_.get(action, "HEAD.service_type") == "io.github.twrl.mentality.inspirations") {
                switch (_.get(action, "HEAD.action_type")) {
                    case "io.github.twrl.mentality.inspirations.create":
                        this.create();
                        break;
                    case "io.github.twrl.mentality.inspirations.put":
                        Q(this.db.inspirations.put(_.get(action, "BODY"))).then(function (id) {this.emit("change"); this.emit("change:" + id)});
                        break;
                    case "io.github.twrl.mentality.inspirations.delete":
                        if (_.has(action, "BODY._id")) { this.delete(_.get(action, "BODY._id")); }
                        break;
                }
            }
        },
        create: function () {
            Q(this.db.inspirations.add({})).then(_.bind(function (id) {
                
                this.emit("change");
                this.emit("create", id);
                
                return this.get(id);
            }, this));
            
        },
        delete: function (id) {
            Q(this.db.inspirations.delete(id)).then(_.bind(function() {
                this.emit("change");
                this.emit("delete:" + id);
            }, this));
        },
        get: function (id) {
            return (new Model(this, id)).refresh();
        },
        getRandom: function () {
            return Q(this.db.inspirations.count()).then(count => {
                return _.random(0, count - 1);
            }).then(_.bind(id => {
                return this.get(id);
            }, this));
        },
        getAll: function () {
            return Q(this.db.inspirations.reverse().keys()).then(_.bind(function (keys) {
                return Q.all(_.map(keys, _.bind(function (id) { return this.get(id); }, this)));
            }, this));
        },
        getRaw: function (id) {
            return Q(this.db.inspirations.get(id));
        },
        getAllIds: function () {
            return Q(this.db.inspirations.toCollection().keys());
        },
        set: function (id, data) {
            if (_.has(data, '_id')) {
                this.db.inspirations.put(data);
            } else {
                this.db.inspirations.put(data, id);
            }
            this.emit("change");
            this.emit("change:" + id);
        }
    });
    
    
    return InspirationStore;
});