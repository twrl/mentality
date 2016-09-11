define(['lodash', 'q', 'core/Messages.js', 'dexie.schema.js'], function (_, Q, $$, db) {
    
    function Application() {
        this._components = {};
        this._waitComponent = {};
        this.DB = db;
        this.waitfor_ = 1;
    }
    _.extend(Application.prototype, {
        getComponent: function (component_id) {
            if (_.has(this._components, component_id)) {
                return Q(_.get(this._components, component_id));
            } 
            
            if (_.has(this._waitComponent, component_id)) {
                return _.get(this._waitComponent, component_id).promise;
            }
            
            var deferred = Q.defer();
            this._waitComponent[component_id] = deferred;
            return deferred.promise;
            
        },
        setComponent: function (component_id, component) {
            if (!_.has(this._components, component_id)) this.waitfor_++;
            _.set(this._components, component_id, component);
            if (_.has(this._waitComponent, component_id)) {
                _.get(this._waitComponent, component_id).resolve(component);
                _.unset(this._waitComponent, component_id);
            }
        },
        ready: function () {
            this.waitfor_--;
            if (this.waitfor_ == 0) {
                this.getComponent("io.github.twrl.mentality.core.Dispatcher").then(function (dispatcher) {  
                    $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.popstate").send(dispatcher);
                    dispatcher.ready();
                });
            }
        }
    });
    return Application;
    
})