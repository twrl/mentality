<div class="row">
    <div rv-each-item="services" class="col s12 m6 l4">
        <div class="card red darken-3">
            <div class="card-content white-text">
                <span class="card-title">{ item:name }</span>
                <p>{ item:description }</p>
            </div>
            <div class="card-action">
                <a rv-if="item:tel" rv-href="item:tel | url_tel"><i class="fa fa-phone"></i> Call</a>
                <a rv-if="item:sms" rv-href="item:sms | url_sms"><i class="fa fa-comments"></i> Text</a>
                <a rv-if="item:email" rv-href="item:email | url_mailto"><i class="fa fa-envelope"></i> Email</a>
            </div>
        </div>
    </div>

</div>