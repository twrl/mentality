define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", "appointments/AppointmentEdit.tpl!text"], function (_, Q, $, $$, rivets, template) {
    
    function AppointmentEditView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.appointments.AppointmentEditView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/appointments/edit/:id')
                        .set('targetView', 'io.github.twrl.mentality.appointments.AppointmentEditView')
                        .send(this.dispatcher);
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.appointments.AppointmentStore')
                .then(_.bind(function (component) {
                    this.store = component;
                }, this)),
            this.application.getComponent("io.github.twrl.mentality.contacts.ContactStore")
                .then(_.bind(function (component) {
                    this.contactStore = component;
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
            
            Q.all([
                this.store.get(_.toNumber(parameters.id)),
                this.contactStore.getAll()
                ]).spread(_.bind(function (model, contacts) {
                        rivets.bind($template, { appointment: model, contacts: contacts });
                        
                        $template.find('#ui-appointments-field-with')
                            .prop({'value': model.get("with")})
                            .on('change', _.bind(function (ev) {
                                model.set("with", $(ev.delegateTarget).prop('value'));
                            }, this));
                            
                        $template.find('select').material_select();
                        $template.find('#ui-appointments-field-details')
                            .prop({'value': model.get("details")})
                            .on('input', _.bind(function (ev) {
                                model.set("details", $(ev.delegateTarget).prop('value'));
                            }, this));
                }, this));
            
            container_element.empty().append($template);
            
            return { toolbar: [
                {icon: "fa-check-square-o", return_to: "#!/appointments" },
                {icon: "fa-minus", target_service: "io.github.twrl.mentality.appointments", target_action: "io.github.twrl.mentality.appointments.delete", params: { _id: _.toNumber(parameters.id) }, return_to: "#!/appointments" }
                ]};
        }
    });
    return AppointmentEditView;
    
});