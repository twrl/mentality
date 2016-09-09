System.import('q').then(function (Q) {
    
    
    Q.longStackSupport = true;
    
    Q.all([
        Q(System.import("lodash")),
        Q(System.import("core/Messages.js")),
        Q(System.import("core/Application.js"))
    ]).spread(function (_, $$, Application) {
        
        var application = new Application();
        
        Q.all([
            Q(System.import("core/Dispatcher.js")),
            
            Q(System.import("core/LocationStore.js")),
            Q(System.import("dash/DashStore.js")),
            Q(System.import("gethelp/GethelpStore.js")),
            Q(System.import("contacts/ContactStore.js")),
            Q(System.import("appointments/AppointmentStore.js")),
            Q(System.import("appointments/ConcernStore.js")),
            Q(System.import("diary/DiaryStore.js")),
            Q(System.import("medication/PrescriptionStore.js")),
            Q(System.import("medication/MedicationLogStore.js")),
            Q(System.import("medication/CommonMedicationStore.js")),
            Q(System.import("inspirations/InspirationStore.js")),
            Q(System.import("resources/ResourceStore.js")),
            Q(System.import("crisis/CrisisStore.js")),
            
            Q(System.import("core/RootView.js")),
            Q(System.import("dash/DashView.js")),
            
            Q(System.import("diary/DiaryListView.js")),
            Q(System.import("diary/DiaryEditView.js")),
            Q(System.import("diary/DiaryFreeEditView.js")),
            Q(System.import("diary/DiaryCREditView.js")),
            Q(System.import("diary/DiaryCrossEditView.js")),
            
            Q(System.import("gethelp/GethelpView.js")),
            Q(System.import("contacts/ContactView.js")),
            Q(System.import("contacts/ContactEditView.js")),
            Q(System.import("appointments/AppointmentListView.js")),
            Q(System.import("appointments/AppointmentEditView.js")),
            Q(System.import("appointments/ConcernListView.js")),
            Q(System.import("appointments/AppointmentDetailView.js")),
            Q(System.import("inspirations/InspirationView.js")),
            Q(System.import("medication/PrescriptionListView.js")),
            Q(System.import("medication/PrescriptionEditView.js")),
            Q(System.import("medication/MedicationLogView.js")),
            Q(System.import("resources/ResourceCategoriesView.js")),
            Q(System.import("resources/ResourceListView.js")),
            Q(System.import("crisis/CrisisPlanView.js")),
            Q(System.import("crisis/CrisisEditView.js"))
        ]).then(function (components) {
            
            for (var ii in components) new components[ii](application);
            
        }).then(function () {
            
            Q.all([
            
                application.getComponent("io.github.twrl.mentality.core.RootView").then(function (view) {
                    view.render();
                })
            ]).then(function () {
                
                application.ready();
                
                // this is a nasty hack that guarantees the dispatcher will eventually unblock...
                _.delay(function () { application.getComponent("io.github.twrl.mentality.core.Dispatcher").then(function (dispatcher) { dispatcher.ready()}); }, 1000);
                
            });
            
        });
        
        
            
    });
    
});