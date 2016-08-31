define(['lodash', 'jquery', 'page', 'dexie.schema.js', 'components/mvvm.js'], function(_, $, page, db, rivets) {

    function showPage(pg_id) {
        $(".active-page").removeClass("active-page");
        $("#" + pg_id).addClass("active-page");
    }

    page("/contacts", _.partial(showPage, "pg-healthcontacts"));

    $("#ui-dash-btn-healthcontacts").on("click", function() {
        page('/contacts');
    });

    var rowBinding;

    $("#ui-healthcontacts-btn-add").on("click", function(ev) {
        ev.preventDefault();
        db.healthcontacts.add({}).then(function(_id) {
            db.healthcontacts.toArray().then(function(hs) {
                rowBinding.update({healthcontacts: hs});
                $("#pg-healthcontacts .container").scrollTo("#ui-healthcontacts-card-" + _id);
                $("#ui-healthcontacts-card-" + _id).find(".activator").trigger("click");
            });
            
        });
    });
    
    $("#pg-healthcontacts").on("click", ".ui-healthcontacts-btn-delete", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        
        var $target = $(ev.target);
        var _id = $target.data("target");
        db.healthcontacts.delete(_id);
        db.healthcontacts.toArray().then(function(hs) {
                rowBinding.update({healthcontacts: hs});
            });
        
    });

    db.healthcontacts.toArray().then(function(hs) {
        var $row = $("#pg-healthcontacts .row");
        rowBinding = rivets.bind($row, {
            healthcontacts: hs
        });
    });

});