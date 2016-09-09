define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", "resources/ResourceCategories.tpl!text"], function (_, Q, $, $$, rivets, template) {
    
    function ResourceCategoriesView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.resources.ResourceCategoriesView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/resources')
                        .set('targetView', 'io.github.twrl.mentality.resources.ResourceCategoriesView')
                        .send(this.dispatcher);
                    
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "selfhelp")
                        .set("tag", "resources")
                        .set("title", "Resources")
                        .set("location", "/#!/resources")
                        .send(this.dispatcher);
                    
                }, this))
        ]).then(_.bind(function () { this.application.ready(); }, this));
        
    }
    
    var resourceCategories = {
        "general": "General",
        "gad": "Generalized Anxiety"
    }
    
    _.extend(ResourceCategoriesView.prototype, {
        activateView: function () {
        },
        deactivateView: function () {
        },
        render: function (container_element, parameters) {
            
            if (!!container_element) {
                if (!!this.$container) this.$container.remove();
                this.$container = container_element;
            }
            
            var $template = $(template);
            
            // Q.all([
            //     this.store.getRandom()
            //     ]).spread(_.bind(function (inspiration) {
            //             rivets.bind($template, { inspiration: inspiration });
                        
                        
            //     }, this));
            
            var categories =  _.map(resourceCategories, (v, k) => { return { tag:k, title:v }; });
            
            rivets.bind($template, { categories: categories });
            $template.find(".ui-resource-category").on("click", _.bind(e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                    .set("location", "#!/resources/" + $(e.currentTarget).data("tag"))
                    .set("title", "View Category")
                    .set("state", {})
                    .send(this.dispatcher);
            }, this))
            this.$container.empty().append($template);
            
            return {};
        }
    });
    return ResourceCategoriesView;
    
});