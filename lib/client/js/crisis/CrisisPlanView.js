define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", "crisis/CrisisPlan.tpl!text"], function (_, Q, $, $$, rivets, template) {
    
    function AppointmentEditView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.crisis.CrisisPlanView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/crisis')
                        .set('targetView', 'io.github.twrl.mentality.crisis.CrisisPlanView')
                        .send(this.dispatcher);
                        
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "crisis")
                        .set("tag", "crisisplan")
                        .set("title", "Crisis Plan")
                        .set("location", "/#!/crisis")
                        .send(this.dispatcher);
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.crisis.CrisisStore')
                .then(_.bind(function (component) {
                    this.crisisStore = component;
                }, this)),
            this.application.getComponent("io.github.twrl.mentality.medication.MedicationLogStore")
            .then(_.bind(function (component) {
                this.logStore = component;
                
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
            
            Q.all([
                this.crisisStore.get(0),
                this.prescriptionStore.getAll(),
                this.logStore.getAll().then(entries => {
                    return _.filter(entries, e => {
                        return _.toNumber(e.get("datetime")) >= _.now() - (24*60*60*1000);
                        })
                    })
                ]).spread(_.bind((crisisplan, prescriptions, medicationlog) => {
                    rivets.bind($template, { crisis: crisisplan, prescriptions: prescriptions, medicationlog: medicationlog});
                }, this));
            
            
            container_element.empty().append($template);
            
            return { toolbar: [{icon: "fa-pencil", return_to: "#!/crisis/edit" }]};
            
            // return { toolbar: [
            //     {icon: "fa-check-square-o", return_to: "#!/appointments" },
            //     {icon: "fa-minus", target_service: "io.github.twrl.mentality.appointments", target_action: "io.github.twrl.mentality.appointments.delete", params: { _id: _.toNumber(parameters.id) }, return_to: "#!/appointments" }
            //     ]};
        }
    });
    return AppointmentEditView;
    
});