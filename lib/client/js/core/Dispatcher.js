define(['lodash', 'q'], function (_, Q) {
    
    var callbacks_ = [];
    var promises_ = [];
    
    var Dispatcher = function (Application) {
        
        Application.setComponent("io.github.twrl.mentality.core.Dispatcher", this);
        
        this.application = Application;
        
        this.callbacks_ = {};
        this.pending_ = [];
        this.done_ = [];
        this.dispatching_ = false;
        this.ready_ = false;
        this.readyqueue_ = [];
        
        this.application.ready();
    };
    _.extend(Dispatcher.prototype, {
        
        register: function (callback) {
            if (!!this.dispatching_) throw new Error("Cannot register during dispatch");
            var dt = _.uniqueId('dispatch');
            _.set(this.callbacks_, dt, callback);
            return dt;
        },
        
        unregister: function (dispatchToken) {
            if (!!this.dispatching_) throw new Error("Cannot unregister during dispatch");
            _.remove(this.callbacks_, dispatchToken);
            return;
        },
        
        asyncDispatch: function (message) {
            _.defer(_.bind(this.dispatch, this, message));
        },
        
        dispatch: function (message) {
            if (!this.ready_) {
                this.readyqueue_.push(message);
            } else {
                if (!!this.dispatching_) throw new Error("Cannot dispatch during another dispatch");
                
                try {
                    this.dispatching_ = true;
                    this.message_ = message;
                    
                    _.forEach(_.keys(this.callbacks_), _.bind(function (id) {
                        this.pending_[id] = false;
                        this.done_[id] = false;
                    }, this));
                    
                    _.forEach(_.keys(this.callbacks_), _.bind(function (id) {
                        if (this.pending_[id]) return;
                        this.pending_[id] = true;
                        this.callbacks_[id](this.message_);
                        this.done_[id] = true;
                    }, this));
                
                } finally {
                    delete this.message_;
                    this.dispatching_ = false;
                }
            }
        },
        
        ready: function () {
            if (this.ready_) return;
            this.ready_ = true;
            while (this.readyqueue_.length > 0) {
                var message = this.readyqueue_.shift();
                this.dispatch(message);
            }
        },
        
        waitFor: function (ids) {
            if (!this.dispatching_) throw new Error("Cannot wait when not dispatching");
            ids = _.castArray(ids);
            _.forEach(ids, _.bind(function (id) {
                if (!this.callbacks_[id]) throw new Error("Attempting to wait on something non-existant");
                if (this.pending_[id]) {
                    if (!this.done_[id]) throw new Error("Circular dependency waiting in dispatch");
                    else return;
                }
                this.pending_[id] = true;
                this.callbacks_[id](this.message_);
                this.done_[id] = true;
            }, this));
        }
        
        
    });
    
    return Dispatcher;
});