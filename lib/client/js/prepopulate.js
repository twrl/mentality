define(['dexie.schema.js'], function(db) {

    db.helpsvcs.bulkPut([{
        _id: 0,
        name: "Samaritans",
        description: "Talk about what's bothering you",
        tel: "116123",
        email: "jo@samaritans.org"
    }, {
        _id: 1,
        name: "Saneline",
        description: "When you need a bit more sane",
        tel: "03003047000",
    }, {
        _id: 2,
        name: "Papyrus",
        description: "Prevention of Young Suicide",
        tel: "06000684141",
        sms: "07786209697",
        email: "pat@papyrus-uk.org"
    }]);
    
    db.healthcontacts.bulkPut([
        { _id: 1, title: 'Dr', firstname: 'Foo', surname: 'Bar', practice: "CMK Medical Centre", role: [ "GP", "Prescriber" ], tel: "1", sms: "2", email: "Foo.Bar@example.com" }
        ])


});