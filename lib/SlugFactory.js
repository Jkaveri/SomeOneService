/**
 * Created by Ho on 7/8/2014.
 */


/***
 * mapping unicode character to ASCII character.
 */
var _unicodeASCIIMap = {224: 97, 225: 97, 226: 97, 227: 97, 232: 101, 233: 101, 234: 101, 236: 105, 237: 105, 242: 111, 243: 111, 244: 111, 245: 111, 249: 117, 250: 117, 253: 121, 259: 97, 273: 100, 297: 105, 361: 117, 417: 111, 432: 117, 7841: 97, 7843: 97, 7845: 97, 7847: 97, 7849: 97, 7851: 97, 7853: 97, 7855: 97, 7857: 97, 7859: 97, 7861: 97, 7863: 97, 7865: 101, 7867: 101, 7869: 101, 7871: 101, 7873: 101, 7875: 101, 7877: 101, 7879: 101, 7881: 105, 7883: 105, 7885: 111, 7887: 111, 7889: 111, 7891: 111, 7893: 111, 7895: 111, 7897: 111, 7899: 111, 7901: 111, 7903: 111, 7905: 111, 7907: 111, 7909: 117, 7911: 117, 7913: 117, 7915: 117, 7917: 117, 7919: 117, 7921: 117, 7923: 121, 7925: 121, 7927: 121, 7929: 121};
/***
 * mapping special character to humanly string.
 * @type {{35: string, 36: string, 37: string, 38: string, 43: string, 45: string, 46: string, 61: string, 64: string}}
 * @private
 */
var _specialToHumanMap = {    35: "sharp", 36: "dolar", 37: "percent", 38: "and", 43: "plus", 45: "-", 46: "dot", 61: "equal", 64: "at"};
/***
 * Determine if the code char is special.
 * ex: @, #, !, ( ....
 * @param code {number|string}
 * @returns {boolean}
 * @private
 */
function _isSpecialChar(code) {

    code = _getCharCode(code);

    return ((35 <= code && code <= 38) ||
        (43 == code) ||
        (45 == code) ||
        (46 == code) ||
        (61 == code) ||
        (64 == code));
}
/***
 * Determine if a char is ascii leter.
 * @param code {number|string}
 * @returns {boolean}
 * @private
 */
function _isASCII(code) {
    code = _getCharCode(code);

    if (65 <= code && code <= 90) return true;
    if (95 == code) return true;
    return (97 <= code && code <= 122);

}
/***
 * determine a char is a number.
 * @param code {int|string}
 * @returns {boolean}
 * @private
 */
function _isNumber(code) {
    code = _getCharCode(code);
    return (48 <= code && code <= 57);
}
/***
 * all char code of string.
 * @param code
 * @returns {int}
 * @private
 */
function _getCharCode(code) {
    if (typeof(code) === 'number') return code;
    if (typeof(code) === 'string') {
        return code.charCodeAt(0);
    }
    throw "invalid argument";
}

/***
 * validate slug.
 * @param text
 */
exports.isValid = function (source) {

    for (var i = 0; i < source.length; i++) {
        var code = source[i].charCodeAt(0);
        if(code === 45) continue;

        if ((!_isASCII(code) && !_isNumber(code)) || _isSpecialChar(code)) {
            return false;
        }
    }
    return true;
};

/***
 * Create a url slug from a string.
 * @param source {string}
 * @returns {string}
 */
exports.createSlug = function (source) {
    if (!source || typeof(source) !== 'string')return '';
    var slug = '';
    source = source.toLowerCase();

    for (var i = 0; i < source.length; i++) {
        var c = source[i],
            code = c.charCodeAt(0);
        if (_isASCII(code) || _isNumber(code)) {
            slug += c;
        }
        else if (_isSpecialChar(code)) {
            slug += _specialToHumanMap[code];
        } else if (_unicodeASCIIMap[code]) {
            slug += String.fromCharCode(_unicodeASCIIMap[code]);
        } else {
            slug += '-';
        }
    }

    return slug;
};

/***
 * determine a char is a number.
 * @param code {int|string}
 * @returns {boolean}
 * @private
 */
exports.isSpecialChar = _isSpecialChar;
/***
 * Determine if the code char is special.
 * ex: @, #, !, ( ....
 * @param code {number|string}
 * @returns {boolean}
 * @private
 */
exports.isNumber = _isNumber;
