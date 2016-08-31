define(['lodash', 'stapes', 'dexie.schema.js'], function (_, Stapes, db) {
    
    return Stapes.subclass({
        constructor: function (el, data) {
            var self = this;
            
            if (!!data) {
                this.set(data.item, true);
            }
            
            this.onsave = function () { 
                return self.save; 
            };
            
            this.save = function () {
                db.healthcontacts.put(self.getAll());
            };
            
            this.reload = function () {
                db.healthcontacts.get(this._id).then(function (v) {
                    this.remove();
                    this.set(v);
                });
            };
            
        }
        
    });
    
});