define(['rivets', 'lodash'], function (rivets, _) {
   
    _.extend(rivets.formatters, {
        url_mailto: function (value) {
            return "mailto:" + value;
        },
        url_sms: function (value) {
            return "sms:" + value;
        },
        url_tel: function (value) {
            return "tel:" + value;
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
        
    
    
    return rivets;
    
});