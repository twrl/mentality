define(['lodash', 'q', 'jquery', 'rivets.ext.js', 'core/Messages.js', 'text!contacts/Contacts.tpl'], function (_, Q, $, rivets, $$, template) {
    
    function ContactsView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.contacts.ContactsView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) { 
                    this.dispatcher = component;
                    
                    $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.register")
                        .set("pattern", "/contacts(/:id)")
                        .set("targetView", "io.github.twrl.mentality.contacts.ContactsView")
                        .send(this.dispatcher);
                        
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "clinical")
                        .set("tag", "contacts")
                        .set("title", "Health Contacts")
                        .set("location", "/#!/contacts")
                        .send(this.dispatcher);
                        
                }, this)),
            
            this.application.getComponent("io.github.twrl.mentality.contacts.ContactStore")
                .then(_.bind(function (component) {
                    this.store = component;
                    
                }, this))
            ]).then(_.bind(function () { 
                this.application.ready(); 
                
            }, this));
    }
    _.extend(ContactsView.prototype, {
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
                
                    rivets.bind($template, { contacts: svcs });
                    $template.find("a.ui-healthcontacts-btn-edit").on("click", _.bind(function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                            .set("location", "#!/contacts/edit/" + $(e.currentTarget).data("target"))
                            .set("title", "Edit Contact")
                            .set("state", {})
                            .send(this.dispatcher);
                    }, this));
                
            }, this));
                
            
            
            this.$container.empty().append($template);
            
            var $btns = this.$container
            
            return { toolbar: [ {icon: "fa-plus", target_service: "io.github.twrl.mentality.contacts", target_action: "io.github.twrl.mentality.contacts.create" }] };
            
            //if (!!Parameters.id) {
            //    this.$container.scrollTo('#ui-healthcontacts-card-' + Parameters.id);
            //}
        },
        onstorechange: function() {
            this.render();
        },
        onstorecreate: function (id) {
            $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                            .set("location", "#!/contacts/edit/" + id)
                            .set("title", "Edit Contact")
                            .set("state", {})
                            .send(this.dispatcher);
        }
    });
    return ContactsView;
});