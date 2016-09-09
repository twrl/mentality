define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function InspirationModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(InspirationModel.prototype, Model.prototype, {
        
    });
    return InspirationModel;
    
});