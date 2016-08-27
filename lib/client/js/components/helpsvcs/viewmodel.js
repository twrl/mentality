define(['lodash', 'stapes', 'dexie.schema.js'], function (_, Stapes, db) {
    
    return Stapes.subclass({
        constructor: function (el, data) {
            
            this.set(data.item, true);
        },
        save: function () {
            db.helpsvcs.put(this.getAll());
        },
        reload: function () {
            db.helpsvcs.get(this._id).then(function (v) {
                this.remove();
                this.set(v);
            })
        }
    });
    
});