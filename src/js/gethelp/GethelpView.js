define(['lodash', 'q', 'jquery', 'rivets.ext.js', 'core/Messages.js', 'text!gethelp/Gethelp.tpl'], function (_, Q, $, rivets, $$, template) {
    
    function GethelpView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.gethelp.GethelpView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) { 
                    this.dispatcher = component;
                    
                    $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.register")
                        .set("pattern", "/gethelp")
                        .set("targetView", "io.github.twrl.mentality.gethelp.GethelpView")
                        .send(this.dispatcher);
                        
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "crisis")
                        .set("tag", "gethelp")
                        .set("title", "Get Help")
                        .set("location", "/#!/gethelp")
                        .send(this.dispatcher);
                        
                }, this)),
            
            this.application.getComponent("io.github.twrl.mentality.gethelp.GethelpStore")
                .then(_.bind(function (component) {
                    this.store = component;
                    
                }, this))
            ]).then(_.bind(function () { 
                this.application.ready(); 
                
            }, this));
    }
    _.extend(GethelpView.prototype, {
        activateView: function () {
            this.store.on("change", _.bind(this.onstorechange, this));
        },
        deactivateView: function () {
            this.store.off("change", _.bind(this.onstorechange, this));
        },
        render: function (container_element) {
            if (!!container_element) {
                if (!!this.$container) this.$container.remove();
                this.$container = container_element;
            }
            
            var $template = $(template);
            
            this.store.getAll().then(function (svcs){ 
                
                    rivets.bind($template, { services: svcs });
                });
            
            this.$container.empty().append($template);
        },
        onstorechange: function() {
            this.render();
        }
    });
    return GethelpView;
});