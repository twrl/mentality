define(["dexie"], function(Dexie) {

    var db = new Dexie("MentalityData");
    
    db.version(3).stores({
        "appointments": "++_id,date,time",
        "concerns": "++_id,*tags,&time",
        "thoughtdiary": "++_id,*tags,datetime,type,title",
        "healthcontacts": "++_id,*role",
        
        "helpsvcs": "_id",
        
        "prescriptions": "++_id",
        "medicationlog": "++_id",
        "commonmedication": "++_id",
        
        "inspirations": "++_id",
        "resources": "++_id,categories*",
        
        "crisis": "++_id"
    });
    
    db.version(2).stores({
        "appointments": "++_id,date,time",
        "concerns": "++_id,*tags,&time",
        "thoughtdiary": "++_id,*tags,datetime,type,title",
        "healthcontacts": "++_id,*role",
        
        "helpsvcs": "_id",
        
        "prescriptions": "++_id",
        "medicationlog": "++_id",
        
        "inspirations": "++_id",
        "resources": "++_id,categories*"
    });
    
    db.version(1).stores({
        "appointments": "++_id,date,time",
        "concerns": "++_id,*tags,&time",
        "thoughtdiary": "++_id,*tags,datetime,type,title",
        "healthcontacts": "++_id,*role",
        
        "helpsvcs": "_id",
        
        "prescriptions": "++_id"
    });
    
    db.open();
    
    return db;
    
});
