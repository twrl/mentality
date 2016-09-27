define(['lodash', 'q', 'core/Model.js'], function (_, Q, Model) {
    
    function DiaryModel (Store, id) {
        Model.call(this, Store, id);
    };
    _.extend(DiaryModel.prototype, Model.prototype, {
        datetime: function () {
            return Date.parse(this.get("date") + "T" + this.get("time"));
        }
    });
    return DiaryModel;
    
});