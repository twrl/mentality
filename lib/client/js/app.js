define(["lodash", "core/Messages.js", "core/Application.js", "core/Dispatcher.js", "core/LocationStore.js", "dash/DashStore.js", "dash/DashView.js", "core/RootView.js"], 
function (_, $$, Application, Dispatcher, LocationStore, DashStore, DashView, RootView) {
    
    
    var application = new Application();
    new Dispatcher(application);
    new LocationStore(application);
    new RootView(application);
    new DashStore(application);
    new DashView(application);
    
    _.defer(function () {
    
        application.getComponent("io.github.twrl.mentality.core.Dispatcher").then(function (dispatcher) {
            $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                .set("section_tag", "crisis")
                .set("tag", "gethelp")
                .set("title", "Get Help")
                .set("location", "/#!/gethelp")
                .send(dispatcher);
        });
        
        application.getComponent("io.github.twrl.mentality.core.RootView").then(function (view) {
            view.render();
        });
    
    });
    
});