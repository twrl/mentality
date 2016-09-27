define(['lodash', 'q', "appointments/AppointmentModel.js", 'core/Evented.js'], function (_, Q, Model, Evented) {
    
    var AppointmentStore = function (Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.appointments.AppointmentStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchHandler, this));
                this.application.ready();
            }, this));
        
        this.db = this.application.DB;
    };
    _.extend(AppointmentStore.prototype, Evented.prototype, {
        dispatchHandler: function (action) {
            if (_.get(action, "HEAD.service_type") == "io.github.twrl.mentality.appointments") {
                switch (_.get(action, "HEAD.action_type")) {
                    case "io.github.twrl.mentality.appointments.create":
                        this.create();
                        break;
                    case "io.github.twrl.mentality.appointments.put":
                        Q(this.db.appointments.put(_.get(action, "BODY"))).then(function (id) {this.emit("change"); this.emit("change:" + id)});
                        break;
                    case "io.github.twrl.mentality.appointments.delete":
                        if (_.has(action, "BODY._id")) { this.delete(_.get(action, "BODY._id")); }
                        break;
                }
            }
        },
        create: function () {
            Q(this.db.appointments.add({})).then(_.bind(function (id) {
                
                this.emit("change");
                this.emit("create", id);
                
                return this.get(id);
            }, this));
            
        },
        delete: function (id) {
            Q(this.db.appointments.delete(id)).then(_.bind(function() {
                this.emit("change");
                this.emit("delete:" + id);
            }, this));
        },
        get: function (id) {
            return (new Model(this, id)).refresh();
        },
        getAll: function () {
            return Q(this.db.appointments.toCollection().keys()).then(_.bind(function (keys) {
                return Q.all(_.map(keys, _.bind(function (id) { return this.get(id); }, this)));
            }, this));
        },
        getRaw: function (id) {
            return Q(this.db.appointments.get(id));
        },
        getAllIds: function () {
            return Q(this.db.appointments.toCollection().keys());
        },
        set: function (id, data) {
            if (_.has(data, '_id')) {
                this.db.appointments.put(data);
            } else {
                this.db.appointments.put(data, id);
            }
            this.emit("change");
            this.emit("change:" + id);
        }
    });
    
    
    return AppointmentStore;
});