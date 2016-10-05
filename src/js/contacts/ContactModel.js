define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function CModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(CModel.prototype, Model.prototype, {
        
    });
    return CModel;
    
});