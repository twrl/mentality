define(['lodash', 'q', "diary/DiaryModel.js", 'core/Evented.js'], function (_, Q, Model, Evented) {
    
    var DiaryStore = function (Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.diary.DiaryStore", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchHandler, this));
                this.application.ready();
            }, this));
        
        this.db = this.application.DB;
    };
    _.extend(DiaryStore.prototype, Evented.prototype, {
        dispatchHandler: function (action) {
            if (_.get(action, "HEAD.service_type") == "io.github.twrl.mentality.diary") {
                switch (_.get(action, "HEAD.action_type")) {
                    case "io.github.twrl.mentality.diary.create":
                        this.create(_.get(action, "BODY"));
                        break;
                    case "io.github.twrl.mentality.diary.put":
                        Q(this.db.thoughtdiary.put(_.get(action, "BODY"))).then(function (id) {this.emit("change"); this.emit("change:" + id)});
                        break;
                    case "io.github.twrl.mentality.diary.delete":
                        if (_.has(action, "BODY._id")) { this.delete(_.get(action, "BODY._id")); }
                        break;
                }
            }
        },
        create: function (data) {
            if (!data) data = {};
            Q(this.db.thoughtdiary.add(data)).then(_.bind(function (id) {
                
                this.emit("change");
                this.emit("create", id);
                
                return this.get(id);
            }, this));
            
        },
        delete: function (id) {
            Q(this.db.thoughtdiary.delete(id)).then(_.bind(function() {
                this.emit("change");
                this.emit("delete:" + id);
            }, this));
        },
        get: function (id) {
            return (new Model(this, id)).refresh();
        },
        getAll: function () {
            return Q(this.db.thoughtdiary.orderBy("_id").reverse().keys()).then(_.bind(function (keys) {
                return Q.all(_.map(keys, _.bind(function (id) { return this.get(id); }, this)));
            }, this));
        },
        getRaw: function (id) {
            return Q(this.db.thoughtdiary.get(id));
        },
        getAllIds: function () {
            return Q(this.db.thoughtdiary.toCollection().keys());
        },
        set: function (id, data) {
            if (_.has(data, '_id')) {
                this.db.thoughtdiary.put(data);
            } else {
                this.db.thoughtdiary.put(data, id);
            }
            this.emit("change");
            this.emit("change:" + id);
        }
    });
    
    
    return DiaryStore;
});