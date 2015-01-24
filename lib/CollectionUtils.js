/***
 * @author: Ho Nguyen
 * @type CollectionUtils
 */

var collectionUtils = {
    /***
     * Random select an elements in a array.
     * @param arr
     * @param count
     * @returns {*}
     */
    randomSelect: function (arr, count) {
        if (count <= 0) return [];
        if (arr.length <= count) return arr;

        var result = [];
        var map = {};
        while (result.length < count) {
            var index = Math.floor(Math.random() * arr.length);
            if (!map[index]) {
                map[index] = true;
                result.push(arr[index]);
            }
        }
        return result;
    }
};


module.exports = collectionUtils;
