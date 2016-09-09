define(['lodash', 'q', "medication/MedicationLogModel.js", 'core/Evented.js'], function (_, Q, Model, Evented) {
    
    var MedicationLogStore = function (Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.medication.MedicationLogStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchHandler, this));
                this.application.ready();
            }, this));
        
        this.db = this.application.DB;
    };
    _.extend(MedicationLogStore.prototype, Evented.prototype, {
        dispatchHandler: function (action) {
            if (_.get(action, "HEAD.service_type") == "io.github.twrl.mentality.medication") {
                switch (_.get(action, "HEAD.action_type")) {
                    case "io.github.twrl.mentality.medication.createMedicationLog":
                        this.create(_.get(action, "BODY"));
                        break;
                    case "io.github.twrl.mentality.medication.putMedicationLog":
                        Q(this.db.medicationlog.put(_.get(action, "BODY"))).then(function (id) {this.emit("change"); this.emit("change:" + id)});
                        break;
                    case "io.github.twrl.mentality.medication.deleteMedicationLog":
                        if (_.has(action, "BODY._id")) { this.delete(_.get(action, "BODY._id")); }
                        break;
                }
            }
        },
        create: function (data) {
            data = _.defaultTo(data, {});
            Q(this.db.medicationlog.add(data)).then(_.bind(function (id) {
                
                this.emit("change");
                this.emit("create", id);
                
                return this.get(id);
            }, this));
            
        },
        delete: function (id) {
            Q(this.db.medicationlog.delete(id)).then(_.bind(function() {
                this.emit("change");
                this.emit("delete:" + id);
            }, this));
        },
        get: function (id) {
            return (new Model(this, id)).refresh();
        },
        getAll: function () {
            return Q(this.db.medicationlog.reverse().keys()).then(_.bind(function (keys) {
                return Q.all(_.map(keys, _.bind(function (id) { return this.get(id); }, this)));
            }, this));
        },
        getRaw: function (id) {
            return Q(this.db.medicationlog.get(id));
        },
        getAllIds: function () {
            return Q(this.db.medicationlog.toCollection().keys());
        },
        set: function (id, data) {
            if (_.has(data, '_id')) {
                this.db.medicationlog.put(data);
            } else {
                this.db.medicationlog.put(data, id);
            }
            this.emit("change");
            this.emit("change:" + id);
        }
    });
    
    
    return MedicationLogStore;
});