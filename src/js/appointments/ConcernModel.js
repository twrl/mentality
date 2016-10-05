define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function ConcernModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(ConcernModel.prototype, Model.prototype, {
        
    });
    return ConcernModel;
    
});