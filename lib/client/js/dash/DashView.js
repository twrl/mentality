define(['lodash', 'q', 'jquery', "rivets", "core/Messages.js", "dash/Dash.tpl!text"], function (_, Q, $, rivets, $$, template) {
    
    function DashView(Application) {
        
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.dash.DashView", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
            .then(_.bind(function (component) { 
                this.dispatcher = component;
                this.dispatchToken = this.dispatcher.register(_.bind(this.dispatchToken, this));
            }, this));
        
        this.application.getComponent("io.github.twrl.mentality.dash.DashStore")
            .then(_.bind(function (component) {
                this.dashStore = component;
            }, this));
        
    }
    _.extend(DashView.prototype, {
        
        render: function (container_element) {
            // var $page = $("<div class='ui-page' aria-role='application'></div>");
            // var $container = $("<div class='container'></div>");
            
            // var $section = $("<div class='section'></div>").prepend("<h6>Crisis</h6>");
            // var $row = $("<div class='row'></div>");
            
            // $(_.map(this.dashStore.getSection('crisis'), _.bind(function (dashitem, tag) {
            //     return $("<div class='s6 m4 l2 col'><div class='card red darken-3'><div class='card-content white-text'>" + dashitem.title + "</div></div></div>")
            //         .on("click", _.bind(function () { 
            //             $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
            //                 .set("state", { location: dashitem.location })
            //                 .set("title", dashitem.title)
            //                 .set("location", dashitem.location)
            //                 .send(this.dispatcher); 
            //         }, this))
            //         .get(0);
            // }, this)))
            // .appendTo($row);
            
            // $row.appendTo($section);
            // $section.appendTo($container);
            
            // $page.append($container);
            // return $page;
            
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
            this.$container.append($template);
        }
        
    });
    
    return DashView;
    
});