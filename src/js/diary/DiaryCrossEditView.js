define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", 'text!diary/DiaryCrossEdit.tpl'], function (_, Q, $, $$, rivets, template) {
    
    function DiaryCrossEditView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.diary.DiaryCrossEditView", this);
        
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
    _.extend(DiaryCrossEditView.prototype, {
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
                        
                        $template.find('#ui-diary-field-situation')
                            .prop({'value': model.get("situation")})
                            .on('input', _.bind(function (ev) {
                                model.set("situation", $(ev.delegateTarget).prop('value'));
                            }, this));
                        $template.find('#ui-diary-field-thoughts')
                            .prop({'value': model.get("thoughts")})
                            .on('input', _.bind(function (ev) {
                                model.set("thoughts", $(ev.delegateTarget).prop('value'));
                            }, this));
                        $template.find('#ui-diary-field-emotions')
                            .prop({'value': model.get("emotions")})
                            .on('input', _.bind(function (ev) {
                                model.set("emotions", $(ev.delegateTarget).prop('value'));
                            }, this));
                        $template.find('#ui-diary-field-behaviour')
                            .prop({'value': model.get("behaviour")})
                            .on('input', _.bind(function (ev) {
                                model.set("behaviour", $(ev.delegateTarget).prop('value'));
                            }, this));
                        $template.find('#ui-diary-field-sensation')
                            .prop({'value': model.get("sensation")})
                            .on('input', _.bind(function (ev) {
                                model.set("sensation", $(ev.delegateTarget).prop('value'));
                            }, this));
                }, this));
            
            container_element.empty().append($template);
            
            return { toolbar: [
                {icon: "fa-check-square-o", return_to: "#!/diary" },
                {icon: "fa-minus", target_service: "io.github.twrl.mentality.diary", target_action: "io.github.twrl.mentality.diary.delete", params: { _id: _.toNumber(parameters.id) }, return_to: "#!/diary" }
                ]};
        }
    });
    return DiaryCrossEditView;
    
});