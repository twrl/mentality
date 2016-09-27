<div class="section">
    <h4>Crisis Plan</h4>
    
    <table>
        <tbody>
            <tr>
                <th>Full Name</th>
                <td>{ crisis:fullname }</td>
            </tr>
            <tr>
                <th>Preferred Name</th>
                <td>{ crisis:preferredname }</td>
            </tr>
            <tr>
                <th>Date of Birth</th>
                <td>{ crisis:dob | time_format 'LL' }</td>
            </tr>
            <tr>
                <th>NHS Number</th>
                <td>{ crisis:nhsno }</td>
            </tr>
        </tbody>
    </table>
    
</div>
<div class="divider"></div>
<div class="section">
    <h5>Advice</h5>
    <h6 rv-if="crisis:signs">Signs I am in Crisis</h6>
    <p rv-if="crisis:signs" rv-text="crisis:signs"></p>
    <h6 rv-if="crisis:helpful">Things that help</h6>
    <p rv-if="crisis:helpful" rv-text="crisis:helpful"></p>
    <h6 rv-if="crisis:unhelpful">Things that do not help</h6>
    <p rv-if="crisis:unhelpful" rv-text="crisis:unhelpful"></p>
    <h6 rv-if="crisis:uncommunicative">If I cannot communicate...</h6>
    <p rv-if="crisis:uncommunicative" rv-text="crisis:uncommunicative"></p>
</div>

<div class="divider"></div>
<div class="section">
    <h5>Current Prescriptions</h5>
    <ul class="collection">
        <li class="collection-item" rv-each-prescription="prescriptions"><p>{ prescription:name } { prescription:dose }{ prescription:doseuom }<br/>{ prescription:instructions }</p><p>{ prescription:remaining } doses remaining</p></p></li>
    </ul>
</div>
<div class="divider"></div>
<div class="section">
    <h5>Medications Taken</h5>
    <p>Medications taken in the last 24 hours</p>
    <ul class="collection">
        <li rv-each-entry="medicationlog" class="collection-item"><time rv-datetime="entry:datetime">{ entry:datetime | time_format 'LT' }</time> | { entry:qty }x { entry:strength }{ entry:uom } { entry:name }</li>
    </ul>
</div>