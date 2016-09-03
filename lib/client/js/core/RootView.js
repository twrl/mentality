define(['lodash', 'q', 'jquery', 'core/Messages.js'], function (_, Q, $, $$) {
    
    function RootView(Application) {
        
        this.application = Application;
        
        this.application.setComponent("io.github.twrl.mentality.core.RootView", this);
        
        this.application.getComponent("io.github.twrl.mentality.core.Dispatcher").then(_.bind(component => this.dispatcher = component, this));
        this.application.getComponent("io.github.twrl.mentality.core.LocationStore").then(_.bind(component => this.locationStore = component, this)).then(_.bind(() =>
            this.locationStore.on("change:location", _.bind(this.onlocationchange, this)), this));
        
        
        
    }
    _.extend(RootView.prototype, {
        onlocationchange: function (location, state) {
            console.log("RootView.onlocationchange called");
        },
        render: function () {
            var $body = $('<body/>');
            this.application.getComponent("io.github.twrl.mentality.dash.DashView").then(function (component) {
                var $page = $("<div class='ui-page'></div>")
                var $container = $("<div class='container'></div>").appendTo($page);
                component.render($container);
                $page.appendTo($body);
                });
            $('body').replaceWith($body);
        }
    });
    return RootView;
    
});