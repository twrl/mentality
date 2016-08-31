define(['components/appointments/viewmodel.js'], function (VM) {
    
    return {
        template: function () {
            return '<div class="card orange lighten-2" rv-id=":_id | prepend \'ui-appointment-card-\'">'
                 + '<div class="card-content white-text">'
                 + '<span class="card-title activator">{ :title }<i class="tiny fa fa-pencil right"></i></span>'
                 + '<p>Who</p>'
                 + '<p><time rv-datetime=":date" rv-text=":date"></time></p>'
                 + '<p>Where</p>'
                 + '</div>'
                 + '<div class="card-reveal">'
                 + '<span class="card-title" rv-on-click="save">Edit Appointment<i class="grey-text tiny fa fa-close right"></i><i class="grey-text tiny fa fa-trash-o right ui-appointments-btn-delete" rv-data-target=":_id"></i></span>'
                 + '<form class="row">'
                 + '<div class="input-field col s12"><input rv-id=":_id | prepend \'ui-appointment-field-date-\'" type="date" class="datepicker" rv-value=":date"/><label rv-class-active=":date" rv-for=":_id | prepend \'ui-appointment-field-date-\'">Date</label></div>'
                 + '<div class="input-field col s12"><input rv-id=":_id | prepend \'ui-appointment-field-time-\'" type="time" class="timepicker" rv-value=":time"/><label rv-class-active=":time" rv-for=":_id | prepend \'ui-appointment-field-time-\'">Time</label></div>'
                 + '</form>'
                 + '</div>'
                 + '</div>';
        },
        initialize: function (el, data) { 
            return new VM(el, data);
        }
    };
    
});