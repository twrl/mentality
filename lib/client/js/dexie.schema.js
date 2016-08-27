define(["dexie"], function(Dexie) {

    var db = new Dexie("MentalityData");
    
    db.version(1).stores({
        "concerns": "++_id,*tags,&time",
        "thoughtdiary": "++_id,*tags,&time,type,title",
        "healthcontacts": "++_id,role",
        
        "helpsvcs": "_id"
    });
    
    db.open();
    
    db.helpsvcs.put({
        _id: 0,
        name: "Samaritans",
        description: "Talk about what's bothering you",
        tel: "116123",
        email: "jo@samaritans.org"
    });
    db.helpsvcs.put({
        _id: 1,
        name: "Saneline",
        description: "When you need a bit more sane",
        tel: "03003047000",
    });
    db.helpsvcs.put({
        _id: 2,
        name: "Papyrus",
        description: "Prevention of Young Suicide",
        tel: "06000684141",
        sms: "07786209697",
        email: "pat@papyrus-uk.org"
    });
    
    return db;
    
});
