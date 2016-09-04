define(["dexie"], function(Dexie) {

    var db = new Dexie("MentalityData");
    
    db.version(1).stores({
        "appointments": "++_id,date,time",
        "concerns": "++_id,*tags,&time",
        "thoughtdiary": "++_id,*tags,&time,type,title",
        "healthcontacts": "++_id,*role",
        
        "helpsvcs": "_id"
    });
    
    db.open();
    
    return db;
    
});
