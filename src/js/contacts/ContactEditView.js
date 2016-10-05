define(['lodash', 'q', 'jquery', 'core/Messages.js', "rivets.ext.js", "text!contacts/ContactEdit.tpl"], function (_, Q, $, $$, rivets, template) {
    
    function ContactEditView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.contacts.ContactEditView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) {
                    this.dispatcher = component;
                    
                    $$('io.github.twrl.mentality.core.location', 'io.github.twrl.mentality.core.location.register')
                        .set('pattern', '/contacts/edit/:id')
                        .set('targetView', 'io.github.twrl.mentality.contacts.ContactEditView')
                        .send(this.dispatcher);
                    
                }, this)),
            this.application.getComponent('io.github.twrl.mentality.contacts.ContactStore')
                .then(_.bind(function (component) {
                    this.store = component;
                }, this))
        ]).then(_.bind(function () { this.application.ready(); }, this));
        
    }
    _.extend(ContactEditView.prototype, {
        activateView: function () {},
        deactivateView: function () {},
        render: function (container_element, parameters) {
            
            var $template = $(template);
            
            this.store.get(_.toNumber(parameters.id)).then(_.bind(function (model) {
                
                    rivets.bind($template, {contact: model});
                
            }, this));
            
            container_element.empty().append($template);
            
            return { toolbar: [
                {icon: "fa-check-square-o", return_to: "#!/contacts" },
                {icon: "fa-minus", target_service: "io.github.twrl.mentality.contacts", target_action: "io.github.twrl.mentality.contacts.delete", params: { _id: _.toNumber(parameters.id) }, return_to: "#!/contacts" }
                ]};
        }
    });
    return ContactEditView;
    
});