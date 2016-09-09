define(['lodash', 'q', 'jquery', 'rivets.ext.js', 'core/Messages.js', 'appointments/AppointmentList.tpl!text'], function (_, Q, $, rivets, $$, template) {
    
    function AppointmentListView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.appointments.AppointmentListView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) { 
                    this.dispatcher = component;
                    
                    $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.register")
                        .set("pattern", "/appointments")
                        .set("targetView", "io.github.twrl.mentality.appointments.AppointmentListView")
                        .send(this.dispatcher);
                        
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "clinical")
                        .set("tag", "appointments")
                        .set("title", "Appointments")
                        .set("location", "/#!/appointments")
                        .send(this.dispatcher);
                        
                }, this)),
                
                this.application.getComponent("io.github.twrl.mentality.appointments.AppointmentStore")
                .then(_.bind(function (component) {
                    this.store = component;
                }, this))
            
            
            ]).then(_.bind(function () { 
                this.application.ready(); 
                
            }, this));
    }
    _.extend(AppointmentListView.prototype, {
        activateView: function () {
            
            this.store.on("change", _.bind(this.onstorechange, this));
            this.store.on("create", _.bind(this.onstorecreate, this));
            
        },
        deactivateView: function () {
            this.store.off("change", _.bind(this.onstorechange, this));
            this.store.off("create", _.bind(this.onstorecreate, this));
        },
        render: function (container_element, Parameters) {
            if (!!container_element) {
                if (!!this.$container) this.$container.remove();
                this.$container = container_element;
            }
            
            var $template = $(template);
            
            this.store.getAll().then(_.bind(function (svcs){ 
                
                    rivets.bind($template, { appointments: svcs });
                    $template.find("a.ui-appointments-btn-edit").on("click", _.bind(function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                            .set("location", "#!/appointments/edit/" + $(e.currentTarget).data("target"))
                            .set("title", "Edit Appointment")
                            .set("state", {})
                            .send(this.dispatcher);
                    }, this));
                    
                    $template.find("a.ui-appointments-btn-detail").on("click", _.bind(function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                            .set("location", "#!/appointments/detail/" + $(e.currentTarget).data("target"))
                            .set("title", "Appointment Detail")
                            .set("state", {})
                            .send(this.dispatcher);
                    }, this));
                
            }, this));
                
            
            try {
            this.$container.empty().append($template);
            } finally {}
            
            var $btns = this.$container
            
            return { toolbar: [ {icon: "fa-plus", target_service: "io.github.twrl.mentality.appointments", target_action: "io.github.twrl.mentality.appointments.create" }] };
            
            //if (!!Parameters.id) {
            //    this.$container.scrollTo('#ui-healthcontacts-card-' + Parameters.id);
            //}
        },
        onstorechange: function() {
            this.render();
        },
        onstorecreate: function (id) {
            $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                            .set("location", "#!/appointments/edit/" + id)
                            .set("title", "Edit Appointment")
                            .set("state", {})
                            .send(this.dispatcher);
        }
    });
    return AppointmentListView;
});