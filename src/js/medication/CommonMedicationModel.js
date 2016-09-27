define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function CommonMedicationModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(CommonMedicationModel.prototype, Model.prototype, {
        
    });
    return CommonMedicationModel;
    
});