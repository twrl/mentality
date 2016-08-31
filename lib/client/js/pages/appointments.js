define(['jquery', 'dexie.schema.js', 'components/mvvm.js'], function($, db, rivets) {
    
    $("#ui-dash-btn-appointments").on("click", function (ev) {
        window.open("#pg-appointments", "_self");
    });
    
    var rowBinding;
    
    db.appointments.toArray().then(function(hs) {
        var $row = $("#pg-appointments .row");
        rowBinding = rivets.bind($row, {
            appointments: hs
        });
        $("#pg-appointments .datepicker").pickadate({ container: "#pg-appointments"});
        $("#pg-appointments .timepicker").pickatime({ container: "#pg-appointments"});
    });
    
    $("#ui-appointments-btn-add").on("click", function(ev) {
        ev.preventDefault();
        db.appointments.add({}).then(function(_id) {
            db.appointments.toArray().then(function(hs) {
                rowBinding.update({appointments: hs});
                $("#pg-appointments .container").scrollTo("#ui-appointment-card-" + _id);
                $("#ui-appointment-card-" + _id).find(".activator").trigger("click");
                $("#pg-appointments .datepicker").pickadate({ container: "#pg-appointments"});
                $("#pg-appointments .timepicker").pickatime({ container: "#pg-appointments"});
            });
            
        });
    });
    
    $("#pg-appointments").on("click", ".ui-appointments-btn-delete", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        
        var $target = $(ev.target);
        var _id = $target.data("target");
        db.appointments.delete(_id);
        db.appointments.toArray().then(function(hs) {
                rowBinding.update({appointments: hs});
                $("#pg-appointments .datepicker").pickadate({ container: "#pg-appointments"});
                $("#pg-appointments .timepicker").pickatime({ container: "#pg-appointments"});
            });
        
    });
    
});