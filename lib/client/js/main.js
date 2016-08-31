define(["lodash", 'jquery', 'page'], function (_, $, page) {
    
    var $splash = $('<div class="page green white-text" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 100;"><div class="container"><p style="position: relative; top: 33%; text-align: center; text-transform: uppercase;"><i class="fa fa-user large"></i><br/>Mentality</p><div class="progress" style="position: relative; top: 33%; text-align: center;"><div class="indeterminate"></div></div></div></div>');
    
    $splash.prependTo('body');
    
    function showPage(pg_id) {
        $(".active-page").removeClass("active-page");
        $("#" + pg_id).addClass("active-page");
    }
    
    page("/", _.partial(showPage, "pg-dash"));
    
    page("/gethelp", _.partial(showPage, "pg-gethelp"));
    
    
    $("a.brand-logo").on("click", function(e) {
        e.preventDefault();
        page("/");
    });
        
    $splash.delay(800).fadeOut(600, "swing", function () { 
        this.remove(); 
        page({ hashbang: true });
    //    if (window.location.hash.length < 2) {
    //        window.open("#pg-dash", "_self");
    //    };
    })
    
});