<div class="row">
    <form class="col s12">
        <div class="row">
            <div class="input-field col s12">
                <input id="ui-appointments-field-title" rv-value="appointment:title" type="text"/>
                <label rv-class-active="appointment:title" for="ui-appointments-field-title">Title</label>
            </div>
            <div class="input-field col s12">
                <select id="ui-appointments-field-with">
                    <option disabled selected value="">Choose one</option>
                    <option rv-each-contact="contacts" rv-value="contact:_id">{ contact:title } { contact:firstname } { contact:surname }</option>
                </select>
                
                <label>With</label>
            </div>
            
            <div class="input-field col s8">
                <input type="date" rv-value="appointment:date" id="ui-appointments-field-date"/>
                <label rv-class-active="appointment:date" for="ui-appointments-field-date">Date</label>
            </div>
            <div class="input-field col s4">
                <input type="time" rv-value="appointment:time" id="ui-appointments-field-time"/>
                <label rv-class-active="appointment:time" for="ui-appointments-field-time">Time</label>
            </div>
            
            <div class="input-field col s12">
                <textarea id="ui-appointments-field-details" class="materialize-textarea"></textarea>
                <label rv-class-active="appointment:details" for="ui-appointments-field-details">Details</label>
            </div>
            
        </div>
        
        
    </form>
</div>