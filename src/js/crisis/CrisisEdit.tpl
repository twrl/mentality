<div class="section">
    <h5>Personal Details</h5>
    <div class="row">
        <div class="col s12 input-field">
            <input type="text" id="ui-crisis-field-fullname" rv-value="crisis:fullname"/>
            <label type="text" for="ui-crisis-field-fullname" rv-class-active="crisis:fullname">Full Name</label>
        </div>
        <div class="col s12 input-field">
            <input id="ui-crisis-field-preferredname" rv-value="crisis:preferredname"/>
            <label for="ui-crisis-field-preferredname" rv-class-active="crisis:preferredname">Preferred Name</label>
        </div>
        <div class="col s12 input-field">
            <input type="date" id="ui-crisis-field-dob" rv-value="crisis:dob"/>
            <label for="ui-crisis-field-dob" rv-class-active="crisis:dob">Date of Birth</label>
        </div>
        <div class="col s12 input-field">
            <input type="text" id="ui-crisis-field-nhsno" rv-value="crisis:nhsno"/>
            <label for="ui-crisis-field-nhsno" rv-class-active="crisis:nhsno">NHS Number</label>
        </div>
    </div>
</div>
<div class="divider"></div>
<div class="section">
    <h5>Advice</h5>
    <div class="row">
        <div class="col s12 input-field">
            <textarea id="ui-crisis-field-signs" rv-value="crisis:signs" class="materialize-textarea"></textarea>
            <label for="ui-crisis-field-signs" rv-class-active="crisis:signs">Signs of Crisis</label>
        </div>
        <div class="col s12 input-field">
            <textarea id="ui-crisis-field-signs" rv-value="crisis:helpful" class="materialize-textarea"></textarea>
            <label for="ui-crisis-field-signs" rv-class-active="crisis:helpful">Things that Help</label>
        </div>
        <div class="col s12 input-field">
            <textarea id="ui-crisis-field-signs" rv-value="crisis:unhelpful" class="materialize-textarea"></textarea>
            <label for="ui-crisis-field-signs" rv-class-active="crisis:unhelpful">Things that do not help</label>
        </div>
        <div class="col s12 input-field">
            <textarea id="ui-crisis-field-signs" rv-value="crisis:uncommunicative" class="materialize-textarea"></textarea>
            <label for="ui-crisis-field-signs" rv-class-active="crisis:uncommunicative">Requests if unable to communicate</label>
        </div>
    </div>
</div>
<div class="divider"></div>
<div class="section">
    <h5>Privacy</h5>
    <div class="row">
        <div class="col s12">
            <div class="switch"><label>Hide <input type="checkbox"/><span class="lever"></span> Show</label></div>
            Medication History
        </div>
        <div class="col s12">
            <div class="switch"><label>Hide <input type="checkbox"/><span class="lever"></span> Show</label></div>
            Current Prescriptions
        </div>
    </div>
</div>