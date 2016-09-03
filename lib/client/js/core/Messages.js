define(['lodash', 'q'], function (_, Q) {
    
    var Builder = function (service, action, payload) {
        if (_.isNil(service)) {
            // Call signature is Builder(); return a new empty Builder.fn
            return new Builder.fn();
        }
        
        // Builder(service_type [, activity_type [, payload]])
        if (_.isString(service)) {
            var fn = new Builder.fn();
            fn.service_type(service);
            if (_.isString(action)) {
                fn.action_type(action);
                if (_.isObject(payload)) {
                    fn.set(payload);
                }
            }
            return fn;
        }
        
        // Builder({message})
        if (_.isObject(service) && _.isNil(action)) {
            var fn = new Builder.fn();
            fn._message = service;
            return fn;
        }
        
        throw new Error("Not a defined call signature");
        
    };
    
    Builder.config = {};
    
    Builder.fn = function () {
        this._message = { HEAD: {}, BODY: {} };
    };
    _.extend(Builder.fn.prototype, {
        service_type: function (svctype) {
            if (!!svctype) return this.setHead("service_type", svctype);
            else return this.getHead("service_type");
        },
        action_type: function (acttype) {
            if (!!acttype) return this.setHead("action_type", acttype);
            else return this.getHead("action_type");
        },
        send: function (dispatcher) {
            if (!dispatcher) {
                if (!Builder.config.defaultDispatcher) throw new Error("Cannot send message with no default Dispatcher defined and no Dispatcher specified");
                dispatcher = Builder.config.defaultDispatcher;
            }
            dispatcher.dispatch(this._message);
        },
        setHead: function (path, value) {
            if (_.isString(path)) {
                _.set(this._message.HEAD, path, value);
            } else if (_.isObject(path)) {
                _.assign(this._message.HEAD, path);
            }
            return this;
        },
        getHead: function (path) {
            return _.get(this._message.HEAD, path);
        },
        set: function (path, value) {
            if (_.isString(path)) {
                _.set(this._message.BODY, path, value);
            } else if (_.isOBject(path)) {
                _.assign(this._message.BODY, path);
            }
            return this;
        },
        get: function (path) {
            if (!!path) return _.get(this._message.BODY, path);
            else return this._message.BODY;
        },
        Q: function () {
            return Q.when(this);
        }
    });
    
    return Builder;
    
});