define(['lodash', 'stapes', 'dexie.schema.js'], function (_, Stapes, db) {
    
    return Stapes.subclass({
        constructor: function (_id) {
            var self = this;
            
            self.data = db.helpsvcs;
            
            self.select(_id);
            
            
        },
        select: function (_id) {
            if (!!_id) {
                this.data.get(_id).then(cur => this.current = cur).fail(() => this.current = null);
            } else {
                this.current = null;
            }
        },
        add: function () {
            this.data.add().then(id => this.select(id));
        },
        remove: function (_id) {
            if (!_id) {
                _id = this.current._id;
                this.select();
            }
            this.data.delete(_id);
        },
        sync: function () {
            this.data.put(this.current);
        }
        
        
        
    });
    
});