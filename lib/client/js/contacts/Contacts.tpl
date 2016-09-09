<div class="row">
    <div rv-each-contact="contacts" class="col s12 m6 l4">
        <div class="card orange lighten-2" rv-id="contact:_id | prepend 'ui-healthcontacts-card-'">
            <div class="card-content white-text">
                <span class="card-title">{ contact:title } { contact:firstname } { contact:surname }</span>
                <p>{ contact:practice }</p>
                <p><div class="chip" rv-each-role="contact:role">{ role }</div></p>
            </div>
            <div class="card-action white-text">
                <a class="white-text ui-healthcontacts-btn-edit" rv-data-target="contact:_id"><i class="fa fa-pencil"></i> Edit</a>
                <a rv-if="contact:tel" rv-href="contact:tel | url_tel" style="color: white"><i class="fa fa-phone"></i> Call</a>
                <a rv-if="contact:sms" rv-href="contact:sms | url_sms" style="color: white"><i class="fa fa-comments"></i> Text</a>
                <a rv-if="contact:email" rv-href="contact:email | url_mailto" style="color: white"><i class="fa fa-envelope"></i> Email</a>
            </div>

        </div>
    </div>
</div>