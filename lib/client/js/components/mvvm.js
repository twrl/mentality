define(function (require) {
    
    var Rivets = require('rivets.ext.js');
    
    Rivets.components['helpsvcs-card'] = require('components/helpsvcs/cards.view.js');
    Rivets.components['healthcontacts-card'] = require('components/contacts/card.view.js');
    Rivets.components['appointment-card'] = require('components/appointments/card.view.js');
    
    return Rivets;
    
});