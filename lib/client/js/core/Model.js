define(['lodash', 'q', 'core/Evented.js'], function (_, Q, Evented) {
    
    function Model (Store, id) {
        this.id = id;
        this.store = Store;
        
        this.autoSync = true;
    };
    _.extend(Model.prototype, Evented.prototype, {
        get: function (key) {
            return _.get(this.data, key);
        },
        set: function (key, value) {
            _.set(this.data, key, value);
            this.emit('change');
            this.emit('change:' + key);
            if (this.autoSync) {
                this.store.set(this.id, this.data);
            }
        },
        save: function () {
            this.store.set(this.id, this.data);
        },
        refresh: function () {
            return this.store.getRaw(this.id).then(_.bind(d => { this.data = d; return this; }, this));
        }
    });
    return Model;
    
});