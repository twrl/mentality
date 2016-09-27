<form class="row">
    <div class="input-field col s2"><input rv-id="contact:_id | prepend 'ui-healthcontacts-field-title-'" type="text" rv-value="contact:title" /><label rv-class-active="contact:title" rv-for="contact:_id | prepend 'ui-healthcontacts-field-title-'">Title</label></div>
    <div class="input-field col s5"><input rv-id="contact:_id | prepend 'ui-healthcontacts-field-firstname-'" type="text" rv-value="contact:firstname" /><label rv-class-active="contact:firstname" rv-for="contact:_id | prepend 'ui-healthcontacts-field-firstname-'">First Name</label></div>
    <div class="input-field col s5"><input rv-id="contact:_id | prepend 'ui-healthcontacts-field-surname-'" type="text" rv-value="contact:surname" /><label rv-class-active="contact:surname" rv-id="contact:_id | prepend 'ui-healthcontacts-field-surname-'">Last Name</label></div>
    <!--div class="chips col s12"><div class="chip" rv-each-role=":role">{ role }</div></div-->
    <div class="input-field col s12"><input rv-id="contact:_id | prepend 'ui-healthcontacts-field-practice-'" type="text" rv-value="contact:practice" /><label rv-class-active="contact:practice" rv-for="contact:_id | prepend 'ui-healthcontacts-field-practice-'">Practice</label></div>
    <div class="input-field col s12"><input rv-id="contact:_id | prepend 'ui-healthcontacts-field-email-'" type="email" rv-value="contact:email" /><label rv-class-active="contact:email" rv-for="contact:_id | prepend 'ui-healthcontacts-field-email-'">Email Address</label></div>
    <div class="input-field col s12"><input rv-id="contact:_id | prepend 'ui-healthcontacts-field-tel-'" type="tel" rv-value="contact:tel" /><label rv-class-active="contact:tel" rv-for="contact:_id | prepend 'ui-healthcontacts-field-tel-'">Telephone</label></div>
    <div class="input-field col s12"><input rv-id="contact:_id | prepend 'ui-healthcontacts-field-sms-'" type="tel" rv-value="contact:sms" /><label rv-class-active="contact:sms" rv-for="contact:_id | prepend 'ui-healthcontacts-field-sms-'">Text</label></div>
</form>