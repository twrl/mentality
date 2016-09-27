define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function AppointmentModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(AppointmentModel.prototype, Model.prototype, {
        datetime: function () {
            return Date.parse(this.get("date") + "T" + this.get("time"));
        }
    });
    return AppointmentModel;
    
});