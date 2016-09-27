<div class="row">
    <div rv-each-entry="diary" class="col s12 m6 l4">
        <div class="card blue lighten-1">
            <div class="card-content white-text">
                <i rv-if="entry:type | is 'crosssectional'" class="tiny fa fa-arrows"></i>
                <i rv-if="entry:type | is 'freeText'" class="tiny fa fa-file-text-o"></i>
                <i rv-if="entry:type | is 'cognitiveRestructure'" class="tiny fa fa-columns"></i>
                
               
                <span class="card-title">{ entry:title }</span>
                <p><time rv-datetime="entry.datetime | call">{ entry:datetime | time_relative }</time></p>
            </div>
            <div class="card-action white-text">
                 <a class="ui-diary-btn-edit white-text" rv-data-target="entry:_id" rv-data-entry-type="entry:type"><i class="fa fa-pencil"></i> Edit</a>
            </div>
        </div>
    </div>
</div>
<div class="fixed-action-btn" style="bottom: calc(2ch + 56px); right: 1ch;">
    <a class="btn-floating btn-large red">
        <i class="large fa fa-plus"></i>
    </a>
    <ul>
        <li><a id="ui-diary-btn-create-freetext" class="btn-floating yellow darken-1"><i class="fa fa-file-text-o"></i></a></li>
        <li><a id="ui-diary-btn-create-cr" class="btn-floating red lighten-2"><i class="fa fa-columns"></i></a></li>
        <li><a id="ui-diary-btn-create-cross" class="btn-floating green"><i class="fa fa-arrows"></i></a></li>
    </ul>
</div>