define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function GHModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(GHModel.prototype, Model.prototype, {
        
    });
    return GHModel;
    
});