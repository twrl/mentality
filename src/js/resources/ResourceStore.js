define(['lodash', 'q', "resources/ResourceModel.js", 'core/Evented.js'], function (_, Q, Model, Evented) {
    
    var ResourceStore = function (Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.resources.ResourceStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchHandler, this));
                this.application.ready();
            }, this));
        
        this.db = this.application.DB;
    };
    _.extend(ResourceStore.prototype, Evented.prototype, {
        dispatchHandler: function (action) {
            if (_.get(action, "HEAD.service_type") == "io.github.twrl.mentality.resources") {
                switch (_.get(action, "HEAD.action_type")) {
                    case "io.github.twrl.mentality.resources.create":
                        this.create();
                        break;
                    case "io.github.twrl.mentality.resources.put":
                        Q(this.db.resources.put(_.get(action, "BODY"))).then(function (id) {this.emit("change"); this.emit("change:" + id)});
                        break;
                    case "io.github.twrl.mentality.resources.delete":
                        if (_.has(action, "BODY._id")) { this.delete(_.get(action, "BODY._id")); }
                        break;
                }
            }
        },
        create: function () {
            Q(this.db.resources.add({})).then(_.bind(function (id) {
                
                this.emit("change");
                this.emit("create", id);
                
                return this.get(id);
            }, this));
            
        },
        delete: function (id) {
            Q(this.db.resources.delete(id)).then(_.bind(function() {
                this.emit("change");
                this.emit("delete:" + id);
            }, this));
        },
        get: function (id) {
            return (new Model(this, id)).refresh();
        },
        getCategory: function (tag) {
            return Q(this.db.resources.where('categories').equals(tag).primaryKeys()).then(_.bind(keys => {
                return Q.all(_.map(keys, _.bind(id => this.get(id), this)));
            }, this))
        },
        getRandom: function () {
            return Q(this.db.resources.count()).then(count => {
                return _.random(0, count - 1);
            }).then(_.bind(id => {
                return this.get(id);
            }, this));
        },
        getAll: function () {
            return Q(this.db.resources.reverse().keys()).then(_.bind(function (keys) {
                return Q.all(_.map(keys, _.bind(function (id) { return this.get(id); }, this)));
            }, this));
        },
        getRaw: function (id) {
            return Q(this.db.resources.get(id));
        },
        getAllIds: function () {
            return Q(this.db.resources.toCollection().keys());
        },
        set: function (id, data) {
            if (_.has(data, '_id')) {
                this.db.resources.put(data);
            } else {
                this.db.resources.put(data, id);
            }
            this.emit("change");
            this.emit("change:" + id);
        }
    });
    
    
    return ResourceStore;
});