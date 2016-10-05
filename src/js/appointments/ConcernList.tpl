
    <table class="col s12 bordered">
        <thead>
            <tr>
                <td>Done</td>
                <td>Concern</td>
                <td>Review At</td>
            </tr>
        </thead>
        <tbody>
            <tr rv-each-concern="concerns" class="ui-concerns-item" rv-data-concern="concern:_id">
            <td>
                <input class="ui-concerns-field-done" type="checkbox" rv-id="concern:_id | prepend 'ui-concern-field-done-'"/>
                <label rv-for="concern:_id | prepend 'ui-concern-field-done-'"></label>
            </td>
            <td class="input-field">
                <input class="ui-concerns-field-text" rv-id="concern:_id | prepend 'ui-concern-field-text-'" type="text" rv-value="concern:text"/>
                <label rv-class-active="concern:text" rv-for="concern:_id | prepend 'ui-concern-field-text-'"></label>
            </td>
            <td class="input-field">
                <select class="ui-concerns-field-review" rv-id="concern:_id | prepend 'ui-concern-field-review-'">
                    <option disabled selected value="">Choose</option>
                    <option rv-each-appointment="appointments" rv-value="appointment:_id">{ appointment:title } ({ appointment.datetime | call | time_format 'L' })</option>
                </select>
            </td>
    </tr>
        </tbody>
        
    </table>
    