define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function ResourceModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(ResourceModel.prototype, Model.prototype, {
        
    });
    return ResourceModel;
    
});