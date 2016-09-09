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
                <label rv-class-active="entry:situation" for="ui-diary-field-situation">What is the situation?</label>
            </div>
            
            <div class="input-field col s12">
                <textarea id="ui-diary-field-initialThought" class="materialize-textarea"></textarea>
                <label rv-class-active="entry:initialThought" for="ui-diary-field-initialThought">What is your initial thought?</label>
            </div>
            
            <div class="input-field col s12">
                <select multiple id="ui-diary-field-distortions">
                    <option value="allOrNothing">All or Nothing Thinking</option>
                    <option value="overGeneralising">Over-generalising</option>
                    <option value="mentalFilter">Mental Filter</option>
                    <option value="discountPositive">Discouting the Positive</option>
                    <option value="jumpConclusion">Jumping to Conclusions</option>
                    <option value="catastrophising">Catastrophising</option>
                    <option value="emotionalReason">Emotional Reasoning</option>
                    <option value="shouldMust">Shoulds and Musts</option>
                    <option value="labelling">Labelling</option>
                    <option value="personalisation">Personalisation</option>
                </select>
                <label>How is your initial thought distorted?</label>
            </div>
            
            <div class="input-field col s12">
                <textarea id="ui-diary-field-alternateThought" class="materialize-textarea"></textarea>
                <label rv-class-active="entry:alternateThought" for "ui-diary-field-alternateThought">What is an alterative thought?</label>
            </div>
            
            
            
            
            
        </div>
    </form>
</div>