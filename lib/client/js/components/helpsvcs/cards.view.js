define(['lodash', 'rivets.ext.js', "components/helpsvcs/viewmodel.js"], function (_, Rivets, VM) {
    
    return {
        template: function () {
            return '<div class="card red darken-3">'
                 + '<div class="card-content white-text">'
                 + '<span class="card-title">{ :name }</span>'
                 + '<p>{ :description }</p>'
                 + '</div>'
                 + '<div class="card-action">'
                 + '<a rv-if=":tel" rv-href=":tel | url_tel"><i class="fa fa-phone"></i> Call</a>'
                 + '<a rv-if=":sms" rv-href=":sms | url_sms"><i class="fa fa-comments"></i> Text</a>'
                 + '<a rv-if=":email" rv-href=":email | url_mailto"><i class="fa fa-envelope"></i> Email</a>'
                 + '</div>'
                 + '</div>';
        },
        initialize: function (el, data) {
            return new VM(el, data);
        }
    }
    
});