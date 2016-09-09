define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", "resources/ResourceList.tpl!text"], function (_, Q, $, $$, rivets, template) {
    
    function InspirationView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.resources.ResourceListView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/resources/:category')
                        .set('targetView', 'io.github.twrl.mentality.resources.ResourceListView')
                        .send(this.dispatcher);
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.resources.ResourceStore')
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
                this.store.getCategory(parameters.category)
                ]).spread(_.bind(function (resources) {
                        rivets.bind($template, { resources: resources });
                        
                        
                }, this));
            
            this.$container.empty().append($template);
            
            return { toolbar: [ {icon: "fa-tags", return_to: "/#!/resources" }]};
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