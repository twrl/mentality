define(['rivets', 'lodash', 'moment'], function (rivets, _, moment) {
   
   
   
    _.extend(rivets.formatters, {
        prepend: function (value, prefix) {
            return prefix + value;
        },
        url_mailto: function (value) {
            return "mailto:" + value;
        },
        url_sms: function (value) {
            return "sms:" + value;
        },
        url_tel: function (value) {
            return "tel:" + value;
        },
        is: function (valueA, valueB) {
            return valueA === valueB;
        },
        time_relative: function (value) {
            return moment(value).fromNow();
        },
        time_format: function (value, fmt) {
            return moment(value).format(fmt);
        },
        time_pretty: function (value) {
            return moment(value).format("LLLL");
        }
        
    });
    
    _.extend(rivets.adapters, {
        ':': {
            observe: function(obj, keypath, callback) {
                obj.on('change:' + keypath, callback)
            },
            unobserve: function(obj, keypath, callback) {
                obj.off('change:' + keypath, callback)
            },
            get: function(obj, keypath) {
                return obj.get(keypath)
            },
            set: function(obj, keypath, value) {
                obj.set(keypath, value)
            }
        }
    });
        
    _.extend(rivets.binders, {
        'bool-*': function (el, value) {
            if (!!value) {
                el.setAttribute(this.type, this.type)
            } else {
                el.removeAttribute(this.type);
            }
        }
    });
    
    
    return rivets;
    
});