/**
 * Created by Ho on 6/29/2014.
 */

/***
 * Module dependencies
 */
var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var _ = require('lodash');

/***
 * @const
 */
var delimiter = '86a0b8270f63287a734c32af25863326';

/***
 * @const
 */
var iterations = 10000;
/**
 * @const
 */
var keylen = 64;


var UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  profile:{
    picture: String,
    firstName:String,
    lastName:String,
    location: {
      latitude: Number,
      longitude: Number,
      name: String,
      address:String,
      city:String,
      district: String,
      country: {
        type:String,
        default:"VN"
      },
    },
    interestGenders:[],
    gender:{
      type:String,
      required: true
    }
  },

  freeTimes:[{dayOW:Number, time: Number, duration: Number}]

});


UserSchema.path('password').set(function(value) {
  this._password = hashPassword(value);
  return this._password;
});




UserSchema.methods = {
  validatePassword: function(password) {
    var passwords = this.password.split(delimiter);

    if (passwords.length != 2) return false;

    var salt = new Buffer(passwords[0], 'base64');
    var hashed_password = crypto.pbkdf2Sync(password, salt, iterations, keylen).toString('base64');
    var real_password = passwords[1];

    return real_password === hashed_password;
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
  if (_.isEmpty(password)) return '';
  var salt_string = crypto.randomBytes(32).toString('base64');

  var salt = new Buffer(salt_string, 'base64');

  var hashed_password = crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');

  return salt_string + delimiter + hashed_password;
}



module.exports = {
  model: mongoose.model('User', UserSchema),
  schema: UserSchema
};
