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
                <textarea id="ui-diary-field-situation" class="materialize-textarea"></textarea>
                <label rv-class-active="entry:situation" for="ui-diary-field-situation">Describe the Situation</label>
            </div>
            <div class="input-field col s12">
                <textarea id="ui-diary-field-thoughts" class="materialize-textarea"></textarea>
                <label rv-class-active="entry:thoughts" for="ui-diary-field-thoughts">What were your thoughts?</label>
            </div>
            <div class="input-field col s12">
                <textarea id="ui-diary-field-emotions" class="materialize-textarea"></textarea>
                <label rv-class-active="entry:emotions" for="ui-diary-field-emotions">What were your emotions?</label>
            </div>
            <div class="input-field col s12">
                <textarea id="ui-diary-field-behaviour" class="materialize-textarea"></textarea>
                <label rv-class-active="entry:behaviour" for="ui-diary-field-behaviour">What were your behaviours?</label>
            </div>
            <div class="input-field col s12">
                <textarea id="ui-diary-field-sensation" class="materialize-textarea"></textarea>
                <label rv-class-active="entry:sensation" for="ui-diary-field-sensation">What sensations did you experience?</label>
            </div>
        </div>
    </form>
</div>