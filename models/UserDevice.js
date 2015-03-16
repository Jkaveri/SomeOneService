/**
 * Created by Ho on 3/7/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserDeviceSchema = new Schema({
    userId:{
        required:true,
        type:Schema.Types.ObjectId
    },
    registrationId:String, //notification for android device.
    tokenID:String, //notification for ios device.
    model:String, //device model name.
    type:{
        required:true,
        type:String, //ios, android, wp, windows, browser
    }
});

module.exports = {
    model: mongoose.model('UserDevice', UserDeviceSchema),
    schema: UserDeviceSchema
};