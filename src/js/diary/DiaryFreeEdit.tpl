<div class="row">
    <form class="col s12">
        <div class="row">
            <div class="col s12">
                <label class="active">When</label>
                <p><time rv-datetime="entry:datetime">{ entry:datetime | time_pretty }</time></p>
            </div>
            <div class="input-field col s12">
                <input id="ui-diary-field-title" rv-value="entry:title" type="text"/>
                <label rv-class-active="entry:title" for="ui-diary-field-title">Title</label>
            </div>
            <div class="input-field col s12">
                <textarea id="ui-diary-field-text" class="materialize-textarea"></textarea>
                <label rv-class-active="entry:details" for="ui-diary-field-text">Text</label>
            </div>
            
        </div>
    </form>
</div>