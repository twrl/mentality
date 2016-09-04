<div class="row">
    <div rv-each-appointment="appointments" class="col s12 m6 l4">
        <div class="card orange lighten-2" rv-id="appointment:_id | prepend 'ui-appointments-card'">
            <div class="card-content white-text">
                <a class="grey-text small right ui-appointments-btn-detail" rv-data-target="appointment:_id"><i class="fa fa-info-circle"></i></a>
                <a class="grey-text small right ui-appointments-btn-edit" rv-data-target="appointment:_id"><i class="fa fa-pencil"></i></a>
                <span class="card-title">{ appointment:title }</span>
                <p><time rv-datetime="appointment.datetime | call">{ appointment.datetime | call | time_relative }</time></p>
                
            </div>
        </div>
    </div>
</div>