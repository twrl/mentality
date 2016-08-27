define(['jquery', 'dexie.schema.js', 'components/mvvm.js'], function ($, db, rivets) {
    
    $("#ui-dash-btn-gethelp").on("click", function() { window.open("#pg-gethelp", "_self"); });
    
    db.helpsvcs.toArray().then(function (hs) {
        var $row = $("#pg-gethelp .row");
        rivets.bind($row, { helpsvcs: hs });
    });
    
});