define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", 'text!inspirations/Inspiration.tpl'], function (_, Q, $, $$, rivets, template) {
    
    function InspirationView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.inspirations.InspirationView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/inspiration')
                        .set('targetView', 'io.github.twrl.mentality.inspirations.InspirationView')
                        .send(this.dispatcher);
                    
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "selfhelp")
                        .set("tag", "inspiration")
                        .set("title", "Get Inspiration")
                        .set("location", "/#!/inspiration")
                        .send(this.dispatcher);
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.inspirations.InspirationStore')
                .then(_.bind(function (component) {
                    this.store = component;
                }, this))
        ]).then(_.bind(function () { this.application.ready(); }, this));
        
    }
    _.extend(InspirationView.prototype, {
        activateView: function () {
            
            this.store.on("change", _.bind(this.onstorechange, this));
            this.store.on("create", _.bind(this.onstorecreate, this));
            
        },
        deactivateView: function () {
            this.store.off("change", _.bind(this.onstorechange, this));
            this.store.off("create", _.bind(this.onstorecreate, this));
        },
        render: function (container_element, parameters) {
            
            if (!!container_element) {
                if (!!this.$container) this.$container.remove();
                this.$container = container_element;
            }
            
            var $template = $(template);
            
            Q.all([
                this.store.getRandom()
                ]).spread(_.bind(function (inspiration) {
                        rivets.bind($template, { inspiration: inspiration });
                        
                        
                }, this));
            
            this.$container.empty().append($template);
            
            return { toolbar: [ {icon: "fa-random", return_to: "/#!/inspiration" }]};
        },
        onstorechange: function() {
            this.render();
        },
        onstorecreate: function () {
            this.render();
        }
    });
    return InspirationView;
    
});