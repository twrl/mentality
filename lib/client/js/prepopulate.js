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
    
    db.inspirations.bulkPut([{
        _id: 0,
        text: "What lies behind us and what lies before us are tiny matters compared to what lies within us."
    }, {
        _id: 1,
        text: "It is never to late to be what you might have been."
    }]);
    
    db.resources.bulkPut([{
        _id: 0,
        location: "http://www.nhs.uk/Conditions/Pages/hub.aspx",
        title: "NHS Health A-Z",
        categories: ['general']
    }]);
    
    db.commonmedication.bulkPut([{
        _id: 0,
        name: "Paracetamol",
        stdstrength: 500,
        stduom: "mg"
    }, {
        _id: 1,
        name: "Ibuprofen",
        stdstrength: 200,
        stduom: "mg"
    }, {
        _id: 2,
        name: "Cetirizine",
        stdstrength: 10,
        stduom: "mg"
    }, {
        _id: 3,
        name: "Loratadine",
        stdstrength: 10,
        stduom: "mg"
    }]);



});