define(['lodash', 'q', "contacts/ContactModel.js", 'core/Evented.js'], function (_, Q, Model, Evented) {
    
    var ContactStore = function (Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.contacts.ContactStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchHandler, this));
                this.application.ready();
            }, this));
        
        this.db = this.application.DB;
    };
    _.extend(ContactStore.prototype, Evented.prototype, {
        dispatchHandler: function (action) {
            if (_.get(action, "HEAD.service_type") == "io.github.twrl.mentality.contacts") {
                switch (_.get(action, "HEAD.action_type")) {
                    case "io.github.twrl.mentality.contacts.create":
                        this.create();
                        break;
                    case "io.github.twrl.mentality.contacts.put":
                        Q(this.db.helpsvcs.put(_.get(action, "BODY"))).then(function (id) {this.emit("change"); this.emit("change:" + id)});
                        break;
                    case "io.github.twrl.mentality.contacts.delete":
                        if (_.has(action, "BODY._id")) { this.delete(_.get(action, "BODY._id")); }
                        break;
                }
            }
        },
        create: function () {
            Q(this.db.healthcontacts.add({})).then(_.bind(function (id) {
                
                this.emit("change");
                this.emit("create", id);
                
                return this.get(id);
            }, this));
            
        },
        delete: function (id) {
            Q(this.db.healthcontacts.delete(id)).then(_.bind(function() {
                this.emit("change");
                this.emit("delete:" + id);
            }, this));
        },
        get: function (id) {
            return Q(new Model(this, id));
        },
        getAll: function () {
            return Q(this.db.healthcontacts.toCollection().keys()).then(_.bind(function (keys) {
                return Q.all(_.map(keys, _.bind(function (id) { return this.get(id); }, this)));
            }, this));
        },
        getRaw: function (id) {
            return Q(this.db.healthcontacts.get(id));
        },
        getAllIds: function () {
            return Q(this.db.healthcontacts.toCollection().keys());
        },
        set: function (id, data) {
            if (_.has(data, '_id')) {
                this.db.healthcontacts.put(data);
            } else {
                this.db.healthcontacts.put(data, id);
            }
            this.emit("change");
            this.emit("change:" + id);
        }
    });
    
    
    return ContactStore;
});