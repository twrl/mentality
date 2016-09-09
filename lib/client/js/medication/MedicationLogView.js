define(['lodash', 'q', 'jquery', 'rivets.ext.js', 'moment', 'core/Messages.js', 'medication/MedicationLog.tpl!text'], function (_, Q, $, rivets, moment, $$, template) {
    
    function PrescriptionListView(Application) {
        this.application = Application;
        this.application.setComponent("io.github.twrl.mentality.medication.MedicationLogView", this);
        
        Q.all([
            this.application.getComponent("io.github.twrl.mentality.core.Dispatcher")
                .then(_.bind(function (component) { 
                    this.dispatcher = component;
                    
                    $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.register")
                        .set("pattern", "/medication")
                        .set("targetView", "io.github.twrl.mentality.medication.MedicationLogView")
                        .send(this.dispatcher);
                        
                    $$("io.github.twrl.mentality.dash", "io.github.twrl.mentality.dash.add")
                        .set("section_tag", "selfmanage")
                        .set("tag", "medication")
                        .set("title", "Medication Log")
                        .set("location", "/#!/medication")
                        .send(this.dispatcher);
                        
                }, this)),
            
            this.application.getComponent("io.github.twrl.mentality.medication.PrescriptionStore")
                .then(_.bind(function (component) {
                    this.prescriptionStore = component;
                    
                }, this)),
            this.application.getComponent("io.github.twrl.mentality.medication.MedicationLogStore")
                .then(_.bind(function (component) {
                    this.logStore = component;
                    
                }, this)),
            this.application.getComponent("io.github.twrl.mentality.medication.CommonMedicationStore")
                .then(_.bind(function (component) {
                    this.commonmedStore = component;
                    
                }, this))
            ]).then(_.bind(function () { 
                this.application.ready(); 
                
            }, this));
    }
    _.extend(PrescriptionListView.prototype, {
        activateView: function () {
            this.prescriptionStore.on("change", _.bind(this.onstorechange, this));
            this.logStore.on("change", _.bind(this.onstorechange, this));
            this.commonmedStore.on("change", _.bind(this.onstorechange, this));
        },
        deactivateView: function () {
            this.prescriptionStore.off("change", _.bind(this.onstorechange, this));
            this.logStore.off("change", _.bind(this.onstorechange, this));
            this.commonmedStore.off("change", _.bind(this.onstorechange, this));
        },
        render: function (container_element, Parameters) {
            if (!!container_element) {
                if (!!this.$container) this.$container.remove();
                this.$container = container_element;
            }
            
            var $template = $(template);
            
            Q.all([
                this.logStore.getAll().then(_.bind(log => { 
                    return _(log).groupBy(entry => {
                        var t = new Date(entry.get('datetime'));
                        return new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime();
                    }).map((v, k) => { return { date: _.toNumber(k), entries: v }}).value();
                }, this)),
                this.prescriptionStore.getAll(),
                this.commonmedStore.getAll()
            ]).spread(_.bind( (logentries, prescriptions, commonmedication) => {
                
                rivets.bind($template, { logentries: logentries, prescriptions: prescriptions, commonmedication: commonmedication });
                
                var $modal = $template.find(".modal-content").parent();
                
                
                
                $modal.find("#ui-medication-field-name").on("change", _.bind(e => {
                    var si = e.delegateTarget.selectedIndex;
                    var $sel = $(e.delegateTarget[si]);
                    if ($sel.data("type") === "prescription") {
                        
                        var med = _.find(prescriptions, ['id', _.toNumber($sel.data("key"))]);
                        $modal.find("#ui-medication-field-strength").val(med.get('dose'));
                        $modal.find("#ui-medication-field-doseuom").val(med.get('doseuom'));
                        
                    } else if ($sel.data("type") === "commonmedication") {
                        
                        var med = _.find(commonmedication, ['id', _.toNumber($sel.data("key"))]);
                        $modal.find("#ui-medication-field-strength").val(med.get('stdstrength'));
                        $modal.find("#ui-medication-field-doseuom").val(med.get('stduom'));
                        
                    }
                }, this));
                
                $modal.find("select").material_select();
                
                $template.find("#ui-medication-btn-takenow").on("click", _.bind(e => {
                    e.preventDefault();
                    
                    $modal.openModal({
                        complete: _.bind(() => {
                            
                            var $name = $modal.find("#ui-medication-field-name");
                            var $qty = $modal.find("#ui-medication-field-qty");
                            var $strength = $modal.find("#ui-medication-field-strength");
                            var $uom = $modal.find("#ui-medication-field-doseuom");
                            
                            
                            var si = $name.prop("selectedIndex");
                            var $sel = $($name.get(0)[si]);
                            
                            var val = $uom.val();
                            
                            if ($sel.data("type") === "prescription") {
                                
                                var med = _.find(prescriptions, ['id', _.toNumber($sel.data("key"))]);
                                med.set("remaining", med.get("remaining") - _.toNumber($qty.val()));
                                
                            } 
                            
                            $$("io.github.twrl.mentality.medication", "io.github.twrl.mentality.medication.createMedicationLog")
                                    .set("datetime", _.now())
                                    .set("qty", _.toNumber($qty.val()))
                                    .set("strength", _.toNumber($strength.val()))
                                    .set("uom", $uom.val())
                                    .set("name", $name.val())
                                    .send(this.dispatcher);
                        }, this)
                    });
                    
                }, this));
                
            }, this))
            
            // this.store.getAll().then(_.bind(function (svcs){ 
            //     // FIXME: Using _.delay to ensure that in each model item the promises for data have resolved. Very hacky and a race condition
                
            //         var $refillModal = $('#ui-prescription-modal-refill-drugname', $template).parent().parent().parent();
            //         var $takenowModal = $('#ui-prescription-modal-takenow-drugname', $template).parent().parent().parent();
                
            //         rivets.bind($template, { prescriptions: svcs });
                    
                    
                    
            //         $template.find('a.ui-prescription-btn-refill').on("click", _.bind(e => {
            //             e.preventDefault();
            //             e.stopPropagation();
                        
            //             var prescriptionId = $(e.delegateTarget).data('prescription');
            //             var prescription = _.find(svcs, ["id", prescriptionId]);
                        
            //             $refillModal.find("#ui-prescription-modal-refill-drugname").text(prescription.get("name"));
            //             $refillModal.openModal({
            //                 complete: () => {
            //                     var refill = _.toNumber($("#ui-prescription-modal-refill-quantity", $template).prop("value"));
            //                     prescription.set("remaining", refill + _.defaultTo(prescription.get("remaining"), 0));
            //                     prescription.set("lastrefill", _.now());
            //                 }
            //             });
            //         }, this))
                    
            //         $template.find('a.ui-prescription-btn-takenow').on("click", _.bind(e => {
            //             e.preventDefault();
            //             e.stopPropagation();
                        
            //             var prescriptionId = $(e.delegateTarget).data('prescription');
            //             var prescription = _.find(svcs, ["id", prescriptionId]);
                        
            //             $takenowModal.find("#ui-prescription-modal-refill-drugname").text(prescription.get("name") + " " + prescription.get("dose") + " " + prescription.get("doseuom"));
            //             $takenowModal.openModal({
            //                 complete: () => {
            //                     var taken = _.toNumber($("#ui-prescription-modal-takenow-quantity", $template).prop("value"));
            //                     prescription.set("remaining", _.defaultTo(prescription.get("remaining"), 0) - taken);
            //                     prescription.set("lasttaken", _.now());
            //                 }
            //             });
            //         }, this))
                    
            //         $template.find("a.ui-prescription-btn-edit").on("click", _.bind(function (e) {
            //             e.preventDefault();
            //             e.stopImmediatePropagation();
            //             $$("io.github.twrl.mentality.core.location", "io.github.twrl.mentality.core.location.pushstate")
            //                 .set("location", "#!/prescriptions/edit/" + $(e.currentTarget).data("target"))
            //                 .set("title", "Edit Prescription")
            //                 .set("state", {})
            //                 .send(this.dispatcher);
            //         }, this));
                
            // }, this));
                
            
            
            this.$container.empty().append($template);
            
            var $btns = this.$container
            
            return {};
            //if (!!Parameters.id) {
            //    this.$container.scrollTo('#ui-healthcontacts-card-' + Parameters.id);
            //}
        },
        onstorechange: function() {
            this.render();
        }
    });
    return PrescriptionListView;
});