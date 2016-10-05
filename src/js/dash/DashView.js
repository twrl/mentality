define(['lodash', 'q', 'jquery', "rivets.ext.js", "core/Messages.js", "text!dash/Dash.tpl"], function (_, Q, $, rivets, $$, template) {
    
    function DashView(Application) {
        
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.dash.DashView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) { 
                    this.dispatcher = component;
                    
                    $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.register")
                        .set("pattern", "/")
                        .set("targetView", "io.github.twrl.mentality.dash.DashView")
                        .send(this.dispatcher);
                }, this)),
            
            this.application.getComponent("io.github.twrl.mentality.dash.DashStore")
                .then(_.bind(function (component) {
                    this.dashStore = component;
                    
                }, this))
            ]).then(_.bind(function () { 
                this.application.ready(); 
                
            }, this));
        
    }
    _.extend(DashView.prototype, {
        activateView: function () {
            this.dashStore.on("change", _.bind(this.onstorechange, this));
        },
        deactivateView: function () {
            this.dashStore.off("change", _.bind(this.onstorechange, this));
        },
        
        render: function (container_element) {
            
            if (!!container_element) {
                if (!!this.$container) this.$container.remove();
                this.$container = container_element;
            }
            
            var $template = $(template);
            rivets.bind($template, { 
                selfmanage: this.dashStore.getSection("selfmanage"), 
                clinical: this.dashStore.getSection("clinical"), 
                selfhelp: this.dashStore.getSection("selfhelp"), 
                crisis: this.dashStore.getSection("crisis")
            });
            $template.find(".card").on("click", _.bind(function (e) { 
                $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                    .set("state", { location: $(e.target).data("target") })
                    .set("title", _.trim($(e.target).text()))
                    .set("location", $(e.currentTarget).data("target"))
                    .send(this.dispatcher);
                }, this));
            this.$container.empty().append($template);
            
            return { toolbar: [ { icon: "fa-bug", target_service: "io.github.twrl.mentality.core.location", target_action: "io.github.twrl.mentality.core.location.external", params: { location: "https://gitreports.com/issue/twrl/mentality" } } ] };
        },
        onstorechange: function () {
            this.render();
        }
        
    });
    
    return DashView;
    
});