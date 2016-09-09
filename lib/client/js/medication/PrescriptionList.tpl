<div class="row">
    <div rv-each-prescription="prescriptions" class="col s12 m6 l4">
        <div class="card orange lighten-2">
            <div class="card-content white-text">
                
                
                <span class="card-title">{ prescription:name } { prescription:dose }{ prescription:doseuom }</span>
                
                <p>{ prescription:instructions }</p>
                
                <p>{ prescription:remaining } doses remaining</p>
                <p>Last refill <time rv-datetime="prescription:lastrefill">{ prescription:lastrefill | time_format 'llll' }</time></p>
                
            </div>
            <div class="card-action white-text">
                <a class="white-text ui-prescription-btn-edit" rv-data-target="prescription:_id"><i class="fa fa-pencil"></i> Edit</a>
                <a style="color: white" class="ui-prescription-btn-takenow" rv-data-prescription="prescription:_id"><i class="fa fa-spoon"></i> Take Now</a>
                <a style="color: white" class="ui-prescription-btn-refill" rv-data-prescription="prescription:_id"><i class="fa fa-plus"></i> Refill</a>
            </div>
        </div>
    </div>
</div>

<div id="ui-prescription-modal-refill" class="modal">
    <div class="modal-content">
        <h5>Refilling <span id="ui-prescription-modal-refill-drugname"></span></h5>
        <div class="input-field">
            <input id="ui-prescription-modal-refill-quantity" type="number" value="0"/>
            <label class="active" for="ui-prescription-modal-refill-quantity">Quantity</label>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">OK</a>
    </div>
</div>
<div id="ui-prescription-modal-takenow" class="modal">
    <div class="modal-content">
        <h5>Take <span id="ui-prescription-modal-takenow-drugname"></span></h5>
        <div class="input-field">
            <input id="ui-prescription-modal-takenow-quantity" type="number" value="1"/>
            <label class="active" for="ui-prescription-modal-takenow-quantity">Quantity</label>
        </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-green btn-flat">OK</a>
    </div>
</div>