require([
    'q',
    'lodash',
    'core/Messages',
    'core/Application'
    ], function (Q, _, $$, Application) {
       
       var global = (!!window) ? window : self;
       
       var application = new Application();
       
       global.rq = function (dep) {
           if (arguments.length > 1) {
               dep = _.toArray(arguments);
           }
           if (_.isArray(dep)) {
               return Q.all(_(dep).map(d => global.rq(d)).value())
           } else {
               var deferred = Q.defer();
               try {
                   require([dep], function (mod) { deferred.resolve(mod); })
               } catch (e) {
                   deferred.reject(e);
               }
               return deferred.promise;
           }
       }
       
       rq(
           'core/Dispatcher',
           'core/LocationStore',
           'dash/DashStore',
           'contacts/ContactStore',
           'appointments/AppointmentStore',
           'appointments/ConcernStore',
           'diary/DiaryStore',
           'medication/PrescriptionStore',
           'medication/MedicationLogStore',
           'medication/CommonMedicationStore',
           'inspirations/InspirationStore',
           'resources/ResourceStore',
           'crisis/CrisisStore',
           'core/RootView',
           'dash/DashView',
           'diary/DiaryListView',
           'diary/DiaryEditView',
           'diary/DiaryFreeEditView',
           'diary/DiaryCREditView',
           'diary/DiaryCrossEditView',
           'gethelp/GethelpView',
           'contacts/ContactView',
           'contacts/ContactEditView',
           'appointments/AppointmentListView',
           'appointments/AppointmentEditView',
           'appointments/ConcernListView',
           'appointments/AppointmentDetailView',
           'inspirations/InspirationView',
           'medication/PrescriptionListView',
           'medication/PrescriptionEditView',
           'medication/MedicationLogView',
           'resources/ResourceCategoriesView',
           'resources/ResourceListView',
           'crisis/CrisisPlanView',
           'crisis/CrisisEditView'
           ).then(components => {
               
               for (var ii in components) new components[ii](application);
               
           }).then(() => {
               
                application.getComponent("io.github.twrl.mentality.core.RootView").then(view =>
                    view.render()
                );
                
                application.ready();
                
                _.delay(() => {
                    application.getComponent('io.github.twrl.mentality.core.Dispatcher').then(dispatcher => dispatcher.ready())
                }, 1000);
               
           })
        
    });