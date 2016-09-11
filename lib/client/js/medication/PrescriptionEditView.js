define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", 'text!medication/PrescriptionEdit.tpl'], function (_, Q, $, $$, rivets, template) {
    
    function PrescriptionEditView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.medication.PrescriptionEditView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/prescriptions/edit/:id')
                        .set('targetView', 'io.github.twrl.mentality.medication.PrescriptionEditView')
                        .send(this.dispatcher);
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.medication.PrescriptionStore')
                .then(_.bind(function (component) {
                    this.store = component;
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.contacts.ContactStore')
                .then(_.bind(function (component) {
                    this.contactsStore = component;
                }, this))
        ]).then(_.bind(function () { this.application.ready(); }, this));
        
    }
    _.extend(PrescriptionEditView.prototype, {
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
                this.contactsStore.getAll()
                ]).spread(_.bind(function (model, contacts) {
                        rivets.bind($template, { prescription: model, contacts:contacts});
                        
                        $template.find('#ui-prescription-field-prescriber')
                            .prop({'value': model.get("prescriber")})
                            .on('change', _.bind(function (ev) {
                                model.set("prescriber", $(ev.delegateTarget).prop('value'));
                            }, this));
                            
                        $template.find('#ui-prescription-field-doseuom')
                            .prop('value', model.get('doesuom'))
                            .on('change', _.bind(function (e) {
                                model.set("doseuom", $(e.delegateTarget).prop('value'));
                            }, this))
                            .trigger("change");
                            
                        $template.find('select').material_select();
                        
                }, this));
            
            container_element.empty().append($template);
            
            return { toolbar: [
                {icon: "fa-check-square-o", return_to: "#!/prescriptions" },
                {icon: "fa-minus", target_service: "io.github.twrl.mentality.medication", target_action: "io.github.twrl.mentality.medication.deletePrescription", params: { _id: _.toNumber(parameters.id) }, return_to: "#!/prescriptions" }
                ]};
        }
    });
    return PrescriptionEditView;
    
});