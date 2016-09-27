<div class="row">
    <div class="col s12">
        <a class="waves-effect waves-green btn-flat" id="ui-medication-btn-takenow">Take now</a>
    </div>
    <div class="col s12" rv-each-log="logentries">
        <div class="divider" rv-if="%log%"></div>
        <div class="section" >
            <h6>{ log.date | time_format 'LL' }</h6>
            <ul class="collection">
                <li rv-each-entry="log.entries" class="collection-item"><time rv-datetime="entry:datetime">{ entry:datetime | time_format 'LT' }</time> | { entry:qty }x { entry:strength }{ entry:uom } { entry:name }</li>
            </ul>
        </div>
    </div>
</div>
<div class="modal" id="ui-medication-modal-takenow">
    <div class="modal-content">
        <div class="row">
            <h5 class="col s12">Take Medication</h5>
            <div class="input-field col s12">
                <select id="ui-medication-field-name">
                    <option selected disabled>Choose one</option>
                    <optgroup label="Prescriptions">
                        <option rv-each-prescription="prescriptions" data-type="prescription" rv-data-key="prescription:_id">{ prescription:name }</option>
                    </optgroup>
                    <optgroup label="Common Medications">
                        <option rv-each-med="commonmedication" data-type="commonmedication" rv-data-key="med:_id">{ med:name }</option>
                    </optgroup>
                </select>
                <label>Medication</label>
            </div>
            <div class="input-field col s3">
                <input type="number" id="ui-medication-field-qty" />
                <label for="ui-medication-field-qty">Quantity</label>
            </div>
            <div class="input-field col s5">
                <input type="number" id="ui-medication-field-strength" />
                <label for="ui-medication-field-strength">Strength</label>
            </div>
            <div class="input-field col s4">
                <select id="ui-medication-field-doseuom">
                    <option value="mg">mg</option>
                    <option value="&micro;g">&micro;g</option>
                    <option value="ml">ml</option>
                    <option value="each">each</option>
                </select>
                <label>Unit</label>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">OK</a>
    </div>
</div>