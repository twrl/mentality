define(['components/contacts/viewmodel.js'], function (VM) {
    
    return {
        template: function () {
            return '<div class="card orange lighten-2" rv-id=":_id | prepend \'ui-healthcontacts-card-\'">'
                 + '<div class="card-content white-text">'
                 + '<span class="card-title activator">{ :title } { :firstname } { :surname }<i class="tiny fa fa-pencil right"></i></span>'
                 + '<p>{ :practice }</p>'
                 + '<p><div class="chip" rv-each-role=":role">{ role }</div></p>'
                 + '</div>'
                 + '<div class="card-action white-text">'
                 + '<a rv-if=":tel" rv-href=":tel | url_tel" style="color: white"><i class="fa fa-phone"></i> Call</a>'
                 + '<a rv-if=":sms" rv-href=":sms | url_sms" style="color: white"><i class="fa fa-comments"></i> Text</a>'
                 + '<a rv-if=":email" rv-href=":email | url_mailto" style="color: white"><i class="fa fa-envelope"></i> Email</a>'
                 + '</div>'
                 + '<div class="card-reveal">'
                 + '<span class="card-title" rv-on-click="save">Edit Contact<i class="grey-text tiny fa fa-close right"></i><i class="grey-text tiny fa fa-trash-o right ui-healthcontacts-btn-delete" rv-data-target=":_id"></i></span>'
                 + '<form class="row">'
                 + '<div class="input-field col s2"><input rv-id=":_id | prepend \'ui-healthcontacts-field-title-\'" type="text" rv-value=":title"/><label rv-class-active=":title" rv-for=":_id | prepend \'ui-healthcontacts-field-title-\'">Title</label></div>'
                 + '<div class="input-field col s5"><input rv-id=":_id | prepend \'ui-healthcontacts-field-firstname-\'" type="text" rv-value=":firstname"/><label rv-class-active=":firstname" rv-for=":_id | prepend \'ui-healthcontacts-field-firstname-\'">First Name</label></div>'
                 + '<div class="input-field col s5"><input rv-id=":_id | prepend \'ui-healthcontacts-field-surname-\'" type="text" rv-value=":surname"/><label rv-class-active=":surname" rv-id=":_id | prepend \'ui-healthcontacts-field-surname-\'">Last Name</label></div>'
                // + '<div class="chips col s12"><div class="chip" rv-each-role=":role">{ role }</div></div>'
                 + '<div class="input-field col s12"><input rv-id=":_id | prepend \'ui-healthcontacts-field-practice-\'" type="text" rv-value=":practice"/><label rv-class-active=":practice" rv-for=":_id | prepend \'ui-healthcontacts-field-practice-\'">Practice</label></div>'
                 + '<div class="input-field col s12"><input rv-id=":_id | prepend \'ui-healthcontacts-field-email-\'" type="email" rv-value=":email"/><label rv-class-active=":email" rv-for=":_id | prepend \'ui-healthcontacts-field-email-\'">Email Address</label></div>'
                 + '<div class="input-field col s12"><input rv-id=":_id | prepend \'ui-healthcontacts-field-tel-\'" type="tel" rv-value=":tel"/><label rv-class-active=":tel" rv-for=":_id | prepend \'ui-healthcontacts-field-tel-\'">Telephone</label></div>'
                 + '<div class="input-field col s12"><input rv-id=":_id | prepend \'ui-healthcontacts-field-sms-\'" type="tel" rv-value=":sms"/><label rv-class-active=":sms" rv-for=":_id | prepend \'ui-healthcontacts-field-sms-\'">Text</label></div>'
                 + '</form>'
                 + '</div>'
                 + '</div>';
        },
        initialize: function (el, data) { 
            return new VM(el, data);
        }
    };
    
});