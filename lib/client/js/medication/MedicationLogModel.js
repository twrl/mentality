define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function MedicationLogModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(MedicationLogModel.prototype, Model.prototype, {
        
    });
    return MedicationLogModel;
    
});