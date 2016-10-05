require(['q', 'lodash', 'core/Messages', 'core/Application'])
    .then ([Q, _, $$, Application]) ->

        application = new Application

        require([
            'core/Dispatcher',
            'core/LocationStore',
            'contacts/ContactStore',
            'appointments/AppointmentStore',
            'appointments/ConcernStore',
            'diary/DiaryStore',
            'medication/PrescriptionStore',
            'medication/MedicationLogStore',
            'medication/CommonMedicationStore',
            'inspirations/InspirationStore',
            'resources/ResourceStore',
            'core/RootView',
            'dash/DashView',
            'diary/DiaryListView',
            'diary/DiaryEditView',
            'diary/DiaryFreeEditView',
            'diary/DiaryCREditView',
            'diary/DiaryCrossEditView',
            'gethelp/GethelpStore',
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
            'crisis/CrisisEditView',
            'dash/DashStore',
            'crisis/CrisisStore'
            ])
            .then (components) ->
                new component(application) for component in components
            .then () ->
                application.getComponent "io.github.twrl.mentality.core.RootView"
                    .then (view) -> view.render()
                application.ready()
