define(['lodash', 'q', 'core/Messages.js', 'dexie.schema.js'], function (_, Q, $$, db) {
    
    function Application() {
        this._components = {};
        this.DB = db;
    }
    _.extend(Application.prototype, {
        getComponent: function (component_id) {
            return Q(_.get(this._components, component_id));
        },
        setComponent: function (component_id, component) {
            _.set(this._components, component_id, component);
        }
    });
    return Application;
    
})