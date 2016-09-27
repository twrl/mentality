define(['lodash', 'q', 'jquery', 'rivets.ext.js', 'core/Messages.js', 'text!diary/DiaryList.tpl'], function (_, Q, $, rivets, $$, template) {
    
    function AppointmentListView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.diary.DiaryListView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) { 
                    this.dispatcher = component;
                    
                    $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.register")
                        .set("pattern", "/diary")
                        .set("targetView", "io.github.twrl.mentality.diary.DiaryListView")
                        .send(this.dispatcher);
                        
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "selfmanage")
                        .set("tag", "diary")
                        .set("title", "Thought Diary")
                        .set("location", "/#!/diary")
                        .send(this.dispatcher);
                        
                }, this)),
                
                this.application.getComponent("io.github.twrl.mentality.diary.DiaryStore")
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
                // FIXME: Using _.delay to ensure that in each model item the promises for data have resolved. Very hacky and a race condition
                _.delay(_.bind(function () {
                    rivets.bind($template, { diary: svcs });
                    $template.find("a.ui-diary-btn-edit").on("click", _.bind(function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                            .set("location", "#!/diary/edit/" + $(e.currentTarget).data("target"))
                            .set("title", "Edit Diary Entry")
                            .set("state", {})
                            .send(this.dispatcher);
                    }, this));
                    $template.find("a#ui-diary-btn-create-freetext").on("click", _.bind(function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        $$("io.github.twrl.mentality.diary", "io.github.twrl.mentality.diary.create")
                            .set("type", "freeText")
                            .set("datetime", Date())
                            .send(this.dispatcher);
                    }, this));
                    $template.find("a#ui-diary-btn-create-cr").on("click", _.bind(function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        $$("io.github.twrl.mentality.diary", "io.github.twrl.mentality.diary.create")
                            .set("type", "cognitiveRestructure")
                            .set("datetime", Date())
                            .send(this.dispatcher);
                    }, this));
                    $template.find("a#ui-diary-btn-create-cross").on("click", _.bind(function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        $$("io.github.twrl.mentality.diary", "io.github.twrl.mentality.diary.create")
                            .set("type", "crosssectional")
                            .set("datetime", Date())
                            .send(this.dispatcher);
                    }, this));
                }, this), 75);
                
            }, this));
                
            
            try {
            this.$container.empty().append($template);
            } finally {}
            
            var $btns = this.$container
            
            return {};
            
            //if (!!Parameters.id) {
            //    this.$container.scrollTo('#ui-healthcontacts-card-' + Parameters.id);
            //}
        },
        onstorechange: function() {
            this.render();
        },
        onstorecreate: function (id) {
            $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                            .set("location", "#!/diary/edit/" + id)
                            .set("title", "Edit Diary Entry")
                            .set("state", {})
                            .send(this.dispatcher);
        }
    });
    return AppointmentListView;
});