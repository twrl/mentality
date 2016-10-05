define(['lodash', 'q', 'jquery', 'rivets.ext.js', 'core/Messages.js', 'text!medication/PrescriptionList.tpl'], function (_, Q, $, rivets, $$, template) {
    
    function PrescriptionListView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.medication.PrescriptionListView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) { 
                    this.dispatcher = component;
                    
                    $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.register")
                        .set("pattern", "/prescriptions")
                        .set("targetView", "io.github.twrl.mentality.medication.PrescriptionListView")
                        .send(this.dispatcher);
                        
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "clinical")
                        .set("tag", "prescriptions")
                        .set("title", "Prescriptions")
                        .set("location", "/#!/prescriptions")
                        .send(this.dispatcher);
                        
                }, this)),
            
            this.application.getComponent("io.github.twrl.mentality.medication.PrescriptionStore")
                .then(_.bind(function (component) {
                    this.store = component;
                    
                }, this))
            ]).then(_.bind(function () { 
                this.application.ready(); 
                
            }, this));
    }
    _.extend(PrescriptionListView.prototype, {
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
                
                    var $refillModal = $('#ui-prescription-modal-refill-drugname', $template).parent().parent().parent();
                    var $takenowModal = $('#ui-prescription-modal-takenow-drugname', $template).parent().parent().parent();
                
                    rivets.bind($template, { prescriptions: svcs });
                    
                    
                    
                    $template.find('a.ui-prescription-btn-refill').on("click", _.bind(e => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        var prescriptionId = $(e.delegateTarget).data('prescription');
                        var prescription = _.find(svcs, ["id", prescriptionId]);
                        
                        $refillModal.find("#ui-prescription-modal-refill-drugname").text(prescription.get("name"));
                        $refillModal.openModal({
                            complete: () => {
                                var refill = _.toNumber($("#ui-prescription-modal-refill-quantity", $template).prop("value"));
                                prescription.set("remaining", refill + _.defaultTo(prescription.get("remaining"), 0));
                                prescription.set("lastrefill", _.now());
                            }
                        });
                    }, this))
                    
                    $template.find('a.ui-prescription-btn-takenow').on("click", _.bind(e => {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        var prescriptionId = $(e.delegateTarget).data('prescription');
                        var prescription = _.find(svcs, ["id", prescriptionId]);
                        
                        $takenowModal.find("#ui-prescription-modal-refill-drugname").text(prescription.get("name") + " " + prescription.get("dose") + " " + prescription.get("doseuom"));
                        $takenowModal.openModal({
                            complete: _.bind(() => {
                                var taken = _.toNumber($("#ui-prescription-modal-takenow-quantity", $template).prop("value"));
                                prescription.set("remaining", _.defaultTo(prescription.get("remaining"), 0) - taken);
                                prescription.set("lasttaken", _.now());
                                
                                $$("io.github.twrl.mentality.medication", "io.github.twrl.mentality.medication.createMedicationLog")
                                    .set("datetime", _.now())
                                    .set("qty", taken)
                                    .set("strength", _.toNumber(prescription.get("dose")))
                                    .set("uom", prescription.get("doseuom"))
                                    .set("name", prescription.get("name"))
                                    .send(this.dispatcher);
                            }, this)
                        });
                    }, this))
                    
                    $template.find("a.ui-prescription-btn-edit").on("click", _.bind(function (e) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                            .set("location", "#!/prescriptions/edit/" + $(e.currentTarget).data("target"))
                            .set("title", "Edit Prescription")
                            .set("state", {})
                            .send(this.dispatcher);
                    }, this));
                
            }, this));
                
            
            
            this.$container.empty().append($template);
            
            var $btns = this.$container
            
            return { toolbar: [ {icon: "fa-plus", target_service: "io.github.twrl.mentality.medication", target_action: "io.github.twrl.mentality.medication.createPrescription" }] };
            
            //if (!!Parameters.id) {
            //    this.$container.scrollTo('#ui-healthcontacts-card-' + Parameters.id);
            //}
        },
        onstorechange: function() {
            this.render();
        },
        onstorecreate: function (id) {
            $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
                            .set("location", "#!/prescriptions/edit/" + id)
                            .set("title", "Edit Prescription")
                            .set("state", {})
                            .send(this.dispatcher);
        }
    });
    return PrescriptionListView;
});