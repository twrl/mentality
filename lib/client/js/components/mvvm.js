System.import('rivets.ext.js').then(function (Rivets) {
    
    Q.all([
        System.import('components/helpsvcs/cards.view.js').then(function (cv) {
            Rivets.components['helpsvcs-cards'] = cv;
        })
    ]).done();
    
});