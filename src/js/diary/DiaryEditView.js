define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js"], function (_, Q, $, $$, rivets) {
    
    function DiaryEditView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.diary.DiaryEditView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/diary/edit/:id')
                        .set('targetView', 'io.github.twrl.mentality.diary.DiaryEditView')
                        .send(this.dispatcher);
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.diary.DiaryStore')
                .then(_.bind(function (component) {
                    this.store = component;
                }, this))
        ]).then(_.bind(function () { this.application.ready(); }, this));
        
    }
    
    var DiaryTypesMap = {
        freeText: "io.github.twrl.mentality.diary.DiaryFreeEditView",
        cognitiveRestructure: "io.github.twrl.mentality.diary.DiaryCREditView",
        crosssectional: "io.github.twrl.mentality.diary.DiaryCrossEditView"
    };
    
    _.extend(DiaryEditView.prototype, {
        activateView: function () {
        },
        deactivateView: function () {
        },
        render: function (container_element, parameters) {
           
           this.store.get(_.toNumber(parameters.id)).then(_.bind(function (entry) {
                $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.reroute")
                    .set("targetView", DiaryTypesMap[entry.get("type")])
                    .set("parameters", parameters)
                    .send(this.dispatcher);
           }, this));
            
            // if (!!container_element) {
            //     if (!!this.$container) this.$container.remove();
            //     this.$container = container_element;
            // }
            
            // this.store.get(_.toNumber(parameters.id)).then(_.bind(function (entry) {
            //     _.delay(_.bind(function () {this.application.getComponent(_.get(AppointmentTypesMap, entry.get("type"))).then(_.bind(function (component) {
            //         if (!!this.activeView) this.activeView.deactivateView();
            //         this.activeView = component;
            //         this.activeView.activateView();
            //         this.activeView.render(container_element, parameters);
            //     }, this))}, this), 40);
            // }, this));
            
            // return { toolbar: [
            //     {icon: "fa-check-square-o", return_to: "#!/diary" },
            //     {icon: "fa-minus", target_service: "io.github.twrl.mentality.diary", target_action: "io.github.twrl.mentality.diary.delete", params: { _id: _.toNumber(parameters.id) }, return_to: "#!/diary" }
            //     ]};
            
            // var $template = $(template);
            
            // Q.all([
            //     this.store.get(_.toNumber(parameters.id)),
            //     this.contactStore.getAll()
            //     ]).spread(_.bind(function (model, contacts) {
            //         _.delay(_.bind(function () {
            //             rivets.bind($template, { appointment: model, contacts: contacts });
                        
            //             $template.find('#ui-appointments-field-with')
            //                 .prop({'value': model.get("with")})
            //                 .on('change', _.bind(function (ev) {
            //                     model.set("with", $(ev.delegateTarget).prop('value'));
            //                 }, this));
                            
            //             $template.find('select').material_select();
            //             $template.find('#ui-appointments-field-details')
            //                 .prop({'value': model.get("details")})
            //                 .on('input', _.bind(function (ev) {
            //                     model.set("details", $(ev.delegateTarget).prop('value'));
            //                 }, this));
            //         }, this), 75);
            //     }, this));
            
            // container_element.empty().append($template);
            
            // return { toolbar: [
            //     {icon: "fa-check-square-o", return_to: "#!/appointments" },
            //     {icon: "fa-minus", target_service: "io.github.twrl.mentality.appointments", target_action: "io.github.twrl.mentality.appointments.delete", params: { _id: _.toNumber(parameters.id) }, return_to: "#!/appointments" }
            //     ]};
        }
    });
    return DiaryEditView;
    
});