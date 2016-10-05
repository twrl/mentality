define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", 'text!diary/DiaryFreeEdit.tpl'], function (_, Q, $, $$, rivets, template) {
    
    function AppointmentEditView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.diary.DiaryFreeEditView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.diary.DiaryStore')
                .then(_.bind(function (component) {
                    this.store = component;
                }, this))
        ]).then(_.bind(function () { this.application.ready(); }, this));
        
    }
    _.extend(AppointmentEditView.prototype, {
        activateView: function () {},
        deactivateView: function () {},
        render: function (container_element, parameters) {
            
            if (!!container_element) {
                if (!!this.$container) this.$container.remove();
                this.$container = container_element;
            }
            
            var $template = $(template);
            
            
                this.store.get(_.toNumber(parameters.id)).then(_.bind(function (model) {
                        rivets.bind($template, { entry: model});
                        
                        $template.find('#ui-diary-field-text')
                            .prop({'value': model.get("details")})
                            .on('input', _.bind(function (ev) {
                                model.set("details", $(ev.delegateTarget).prop('value'));
                            }, this));
                }, this));
            
            container_element.empty().append($template);
            
            return { toolbar: [
                {icon: "fa-check-square-o", return_to: "#!/diary" },
                {icon: "fa-minus", target_service: "io.github.twrl.mentality.diary", target_action: "io.github.twrl.mentality.diary.delete", params: { _id: _.toNumber(parameters.id) }, return_to: "#!/diary" }
                ]};
        }
    });
    return AppointmentEditView;
    
});