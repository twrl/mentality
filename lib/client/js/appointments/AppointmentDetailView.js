define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", "appointments/AppointmentDetail.tpl!text"], function (_, Q, $, $$, rivets, template) {
    
    function AppointmentEditView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.appointments.AppointmentDetailView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/appointments/detail/:id')
                        .set('targetView', 'io.github.twrl.mentality.appointments.AppointmentDetailView')
                        .send(this.dispatcher);
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.appointments.AppointmentStore')
                .then(_.bind(function (component) {
                    this.appointmentStore = component;
                }, this)),
            this.application.getComponent("io.github.twrl.mentality.contacts.ContactStore")
                .then(_.bind(function (component) {
                    this.contactStore = component;
                }, this)),
            this.application.getComponent("io.github.twrl.mentality.appointments.ConcernStore")
                .then(_.bind(function (component) {
                    this.concernStore = component;
                }, this)),
            this.application.getComponent("io.github.twrl.mentality.medication.PrescriptionStore")
                .then(_.bind(component => {
                    this.prescriptionStore = component;
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
            
            this.appointmentStore.get(_.toNumber(parameters.id)).then(_.bind(appointment => {
                
                return [
                    Q(appointment),
                    this.contactStore.get(_.toNumber(appointment.get("with"))),
                    this.concernStore.getAll().then(concerns => _.filter(concerns, function (c) { 
                        return _.toNumber(c.get("review")) === _.toNumber(appointment.id); 
                        })
                    ),
                    this.prescriptionStore.getAll().then(prescriptions => _.filter(prescriptions, function (p) {
                        return _.toNumber(p.get("prescriber")) === _.toNumber(appointment.get("with"));
                    }))
                    ]
            }, this)).spread(_.bind((appointment, contact, concerns, prescriptions) => {
                rivets.bind($template, { appointment: appointment, contact: contact, concerns: concerns, prescriptions: prescriptions });
            }, this))
            
            
            
            container_element.empty().append($template);
            
            // return { toolbar: [
            //     {icon: "fa-check-square-o", return_to: "#!/appointments" },
            //     {icon: "fa-minus", target_service: "io.github.twrl.mentality.appointments", target_action: "io.github.twrl.mentality.appointments.delete", params: { _id: _.toNumber(parameters.id) }, return_to: "#!/appointments" }
            //     ]};
        }
    });
    return AppointmentEditView;
    
});