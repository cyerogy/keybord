var jCommon = {
    /**
     * it's a string ?
     * @param str
     * @returns {boolean}
     */
    isString: function (str) {
        return Object.prototype.toString.call(str) === "[object String]";
    },
    /**
     * Delete the left and right Spaces
     * @param str
     * @returns {string}
     */
    strTrim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    /**
     * it's a array ?
     * @param o
     * @returns {boolean}
     */
    isArray: function(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    },
 
    /**
     * it's a object ?
     * @param o
     * @returns {boolean}
     */
    isObject: function(o) {
        return typeof o == 'object';
    },
    /**
     * it's a empty ?
     * @param {} str
     */
    empty: function (str){
        if (typeof (str) == "undefined" || str == 0 || str == '' || str == '0' || str == null || str == false || str == undefined || (jCommon.isString(str) && jCommon.strTrim(str).length == 0) || (jCommon.isArray(str) && str.length == 0)) {
            return true;
        } else if (jCommon.isObject(str)) {
            var is_empty = true;
            var prop;
            for (prop in str) {
                is_empty = false;
                break;
            }
            return is_empty;
        } else {
            return false;
        }
    },
    /**
     * add Dom Class
     * @param {*} origin_class 
     * @param {*} class_name 
     */
    addClass:function(origin_class,class_name){
        return origin_class+=" " + class_name;
    },
    /**
     * remove Dom Class
     * @param {*} origin_class 
     * @param {*} remove_class 
     */
    removeClass:function(origin_class,remove_class){
        var arr = origin_class.split(/\s+/);
        var class_arr = [];
        for(var i = 0;i<arr.length;i++){
            if (arr[i] && arr[i] != remove_class){
                class_arr.push(arr[i]);
            }
        }
        return class_arr.join(" ");
    },
    /**
     * Is String Contain Word
     * @param {*} string 
     * @param {*} word 
     */
    checkWordInString:function(string,word){
        var rule = "\\b" + word.toUpperCase() + "\\b";
        return new RegExp(rule).test(string.toUpperCase());
    }
}