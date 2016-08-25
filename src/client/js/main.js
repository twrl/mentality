define(['zepto', 'zanimo', 'pouchdb', 'worker-pouch', 'domReady!'], function($, Z, PouchDB, WorkerPouch) {
    
    PouchDB.adapter('worker', WorkerPouch);
    var db = new PouchDB(self.location.origin + "/db/userdata", {adapter: 'worker'});
    
    db.info().then(function (info) { console.log(info); });
    
    Z($('#mentality-splash').get(0))
        .then(Z.f('opacity', 1))
        .then(Z.f('opacity', 0, 660, 'ease-in'))
        .then(Z.f('display', 'none'));
        
    Z($('#mentality-dash').get(0))
        .then(Z.f('display', 'block'));
        
    $('#dash-btn-emergencykitten').on('click', function (ev) {
        window.open("http://www.emergencykitten.com", "_blank");
    });
    
    $('#dash-btn-information').on('click', function (ev) {
        window.open("#information", "_self");
    });
    
    $('#dash-btn-gethelp').on("click", function(ev) {
        window.open("#gethelp", "_self");
    });
    
    $("#tb-btn-settings").on("click", function(ev) {
        window.open("#settings", "_self");
    });
        
    navigator.serviceWorker.register('/service.js').then(function () {
        console.log('Service Worker installed successfully');
    });
    
    
});