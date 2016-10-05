define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function CrisisModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(CrisisModel.prototype, Model.prototype, {
        
    });
    return CrisisModel;
    
});