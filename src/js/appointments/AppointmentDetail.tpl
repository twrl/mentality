<div class="section">
    <h4>{ appointment:title }</h4>
    <p><time rv-datetime="appointment.datetime | call">{ appointment.datetime | call | time_format 'LLLL' }</time></p>
    <p>{ contact:title } { contact:firstname } { contact:surname } ({ contact:practice })</p>
</div>
<div class="divider"></div>
<div class="section">
    <h5>Concerns</h5>
    <ul class="collection">
        <li class="collection-item" rv-each-concern="concerns">{ concern:text }</li>
    </ul>
</div>
<div class="divider"></div>
<div class="section">
    <h5>Prescriptions</h5>
    <ul class="collection">
        <li class="collection-item" rv-each-prescription="prescriptions"><p>{ prescription:name } { prescription:dose }{ prescription:doseuom }<br/>{ prescription:instructions }</p><p>{ prescription:remaining } doses remaining</p></p></li>
    </ul>
</div>