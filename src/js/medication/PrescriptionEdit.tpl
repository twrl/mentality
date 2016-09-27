<div class="row">
    <form class="col s12">
        <div class="row">
            <div class="input-field col s12">
                <input id="ui-prescription-field-name" rv-value="prescription:name" type="text"/>
                <label rv-classs-active="prescription:name" for="ui-prescription-field-name">Drug Name</label>
            </div>
            <div class="input-field col s8">
                <input id="ui-prescription-field-dose" rv-value="prescription:dose" type="number"/>
                <label rv-class-active="prescription:dose" for="ui-prescription-field-dose">Dosage</label>
            </div>
            <div class="input-field col s4">
                <select id="ui-prescription-field-doseuom">
                    <option value="mg">mg</option>
                    <option value="&micro;g">&micro;g</option>
                    <option value="ml">ml</option>
                    <option value="each">each</option>
                </select>
                <label>Unit</label>
            </div>
            <div class="input-field col s12">
                <input id="ui-prescription-field-instructions" rv-value="prescription:instructions" type="text"/>
                <label rv-class-active="prescription:instructions" for="ui-prescription-field-instructions">Instructions</label>
            </div>
            <div class="input-field col s12">
                <select id="ui-prescription-field-prescriber">
                    <option disabled selected value="">Choose one</option>
                    <option rv-each-contact="contacts" rv-value="contact:_id">{ contact:title } { contact:firstname } { contact:surname }</option>
                </select>
                
                <label>Prescribed By</label>
            </div>
            <div class="input-field col s12">
                <input id="ui-prescription-field-remaining" rv-value="prescription:remaining" type="number"/>
                <label rv-class-active="prescription:remaining" for="ui-prescription-field-remaining">Doses Remaining</label>
            </div>
        </div>
    </form>
</div>