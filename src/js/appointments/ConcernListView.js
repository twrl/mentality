define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", "text!appointments/ConcernList.tpl"], function (_, Q, $, $$, rivets, template) {
    
    function AppointmentEditView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.appointments.ConcernListView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/concerns')
                        .set('targetView', 'io.github.twrl.mentality.appointments.ConcernListView')
                        .send(this.dispatcher);
                    
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "selfmanage")
                        .set("tag", "concerns")
                        .set("title", "Concerns")
                        .set("location", "/#!/concerns")
                        .send(this.dispatcher);
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.appointments.AppointmentStore')
                .then(_.bind(function (component) {
                    this.appointmentStore = component;
                }, this)),
            this.application.getComponent("io.github.twrl.mentality.appointments.ConcernStore")
                .then(_.bind(function (component) {
                    this.concernStore = component;
                }, this))
        ]).then(_.bind(function () { this.application.ready(); }, this));
        
    }
    _.extend(AppointmentEditView.prototype, {
        activateView: function () {
            
            this.concernStore.on("change", _.bind(this.onstorechange, this));
            this.concernStore.on("create", _.bind(this.onstorecreate, this));
            
        },
        deactivateView: function () {
            this.concernStore.off("change", _.bind(this.onstorechange, this));
            this.concernStore.off("create", _.bind(this.onstorecreate, this));
        },
        render: function (container_element, parameters) {
            
            if (!!container_element) {
                if (!!this.$container) this.$container.remove();
                this.$container = container_element;
            }
            
            var $template = $(template);
            
            Q.all([
                this.concernStore.getAll(),
                this.appointmentStore.getAll()
                ]).spread(_.bind(function (concerns, appointments) {
                        rivets.bind($template, { concerns: concerns, appointments: appointments });
                        _.each(concerns, c => {
                            c.autoSync = false;
                            });
                        
                        $template.find('.ui-concerns-field-text').each(_.bind((i, el) => {
                            var id = _.toNumber($(el).parents('.ui-concerns-item').data('concern'));
                            var model = _.find(concerns, ['id', id]);
                            $(el).on("blur", e => { model.save(); })
                        }, this));
                        
                        $template.find('.ui-concerns-field-review').each(_.bind((i, el) => {
                            var id = _.toNumber($(el).parents('.ui-concerns-item').data('concern'));
                            var model = _.find(concerns, ['id', id]);
                            $(el).prop({'value': model.get("review")})
                                .on('change', _.bind(function (ev) {
                                    model.set("review", $(ev.delegateTarget).prop('value'));
                                    model.save();
                                }, this));
                        }, this));
                        
                            
                        $template.find('select').material_select();
                        
                }, this));
            
            this.$container.empty().append($template);
            
            return { toolbar: [ {icon: "fa-plus", target_service: "io.github.twrl.mentality.appointments", target_action: "io.github.twrl.mentality.appointments.createConcern"}]};
        },
        onstorechange: function() {
            this.render();
        },
        onstorecreate: function () {
            this.render();
        }
    });
    return AppointmentEditView;
    
});