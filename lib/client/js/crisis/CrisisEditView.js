define(['lodash', 'q', 'jquery', 'rivets.ext.js', 'core/Messages.js', 'crisis/CrisisEdit.tpl!text'], function (_, Q, $, rivets, $$, template) {
    
    function AppointmentListView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.crisis.CrisisEditView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) { 
                    this.dispatcher = component;
                    
                    $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.register")
                        .set("pattern", "/crisis/edit")
                        .set("targetView", "io.github.twrl.mentality.crisis.CrisisEditView")
                        .send(this.dispatcher);
                        
                }, this)),
                
                this.application.getComponent("io.github.twrl.mentality.crisis.CrisisStore")
                .then(_.bind(function (component) {
                    this.store = component;
                }, this))
            
            
            ]).then(_.bind(function () { 
                this.application.ready(); 
                
            }, this));
    }
    _.extend(AppointmentListView.prototype, {
        activateView: function () {
            
            // this.store.on("change", _.bind(this.onstorechange, this));
            
        },
        deactivateView: function () {
            // this.store.off("change", _.bind(this.onstorechange, this));
        },
        render: function (container_element, Parameters) {
            if (!!container_element) {
                if (!!this.$container) this.$container.remove();
                this.$container = container_element;
            }
            
            var $template = $(template);
            
            this.store.get(0).then(_.bind(function (svcs){ 
                // FIXME: Using _.delay to ensure that in each model item the promises for data have resolved. Very hacky and a race condition
                    rivets.bind($template, { crisis: svcs });
                
            }, this));
                
            
            try {
            this.$container.empty().append($template);
            } finally {}
            
            
            return { toolbar: [{ icon: "fa-check-square-o", return_to: "#!/crisis"}]};
            
            //if (!!Parameters.id) {
            //    this.$container.scrollTo('#ui-healthcontacts-card-' + Parameters.id);
            //}
        },
        onstorechange: function() {
            this.render();
        }
    });
    return AppointmentListView;
});