define(['lodash', 'q'], function (_, Q) {
    
    // Constants = _.keyBy(['a', 'b', 'c']);
    
    var Evented = function () { };
    _.extend(Evented.prototype, {
        
        on: function (event, handler) {
            this._events = _.defaultTo(this._events, {});
            this._events[event] = _.defaultTo(this._events[event], []);
            this._events[event].push(handler);
        },
        
        off: function (event, handler) {
            this._events = _.defaultTo(this._events, {});
            if (_.has(this._events, event)) {
                _.pull(this._events[event], handler);
            }
        },
        
        emit: function (event /*, args... */) {
            this._events = _.defaultTo(this._events, {});
            if (_.has(this._events, event)) {
                _.forEach(this._events[event], function (handler) {
                    handler.apply(this, _.drop(arguments));
                });
            }
        }
        
    });
    
    return Evented;
    
});