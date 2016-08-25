if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(['express', 'pouchdb', 'express-pouchdb'], function (express, pouch, xpdb) {
    
    var app = express();
    app.use(express.static('../client'));
    app.use('/db', xpdb(pouch));
    
    app.listen(process.env.PORT);
    
});