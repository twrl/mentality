<div class="row">
    <div rv-each-appointment="appointments" class="col s12 m6 l4">
        <div class="card orange lighten-2" rv-id="appointment:_id | prepend 'ui-appointments-card'">
            <div class="card-content white-text">
                <span class="card-title">{ appointment:title }</span>
                <p><time rv-datetime="appointment.datetime | call">{ appointment.datetime | call | time_relative }</time></p>
                
            </div>
            <div class="card-action white-text">
                <a class="ui-appointments-btn-edit white-text" rv-data-target="appointment:_id"><i class="fa fa-pencil-square-o"></i> Edit</a>
                <a class="ui-appointments-btn-detail white-text" rv-data-target="appointment:_id"><i class="fa fa-ellipsis-v"></i> Detail</a>
            </div>
        </div>
    </div>
</div>