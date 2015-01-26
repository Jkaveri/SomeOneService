/**
 * Created by Ho on 6/29/2014.
 */

/***
 * Module dependencies
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var _ = require('lodash');

var TimeRangeSchema = new Schema({
  time:Number,
  duration:Number
});

var FreeTimeSchema = new Schema({
  dayOW:Number,
  items:[TimeRangeSchema]
});

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  picture: String,
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required: true
  },
  gender:{
    type:String,
    required: true
  },
  birthday:{
    type:Date,
    required:true
  },
  location: {
    latitude: Number,
    longitude: Number,
    name: String,
    address:String,
    city:String,
    district: String,
    country:String
  },
  interestGenders:[String],

  freeTimes:[FreeTimeSchema]

});


UserSchema.path('password').set(function(value) {
  this._password = hashPassword(value);
  return this._password;
});




UserSchema.methods = {
  validatePassword: function(password) {
    return bcrypt.compareSync(password, this.password);
  },
  hashPassword:hashPassword
};

/**
* Hash password
*
* @param {String} password
* @return {String}
* @api public
*/
function hashPassword(password) {
  if (password == null || password.toString().length === 0) return '';
  return bcrypt.hashSync(password);
}



module.exports = {
  model: mongoose.model('User', UserSchema),
  schema: UserSchema
};
