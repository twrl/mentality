define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function PrescriptionModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(PrescriptionModel.prototype, Model.prototype, {
        
    });
    return PrescriptionModel;
    
});