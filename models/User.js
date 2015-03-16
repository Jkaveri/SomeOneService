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
  address: {
    loc: [],
    name: String,
    address:String,
    city:String,
    district: String,
    country:String
  },
  interestGenders:[String],

  freeTimes:[FreeTimeSchema],
  rank:{
    type:Number,
    default:1
  },
  selected:{
    type:Boolean,
    default:false
  },
  created:{
    type:Date,
    default:Date.now
  },
  updated:{
    type:Date,
    default:Date.now
  }
});


UserSchema.path('password').set(function(value) {
  this._password = hashPassword(value);
  return this._password;
});




UserSchema.methods = {
  validatePassword: function(password) {
    return bcrypt.compareSync(password, this.password);
  },
  hashPassword:hashPassword,
  matchFreeTime:function(other){
    var flag = false;

    for(var i = 0; i < this.freeTimes.length; i++){
      var ft = this.freeTimes[i];

      for(var j = 0; j < other.freeTimes.length; j++){
        var ft2 = other.freeTimes[j];
        if(ft.dayOW === ft2.dayOW){
           for(var k =0; k < ft.items.length; k++){
             for(var h = 0; h < ft2.items.length; h++){
               var t1 = ft.times[k];
               var t2 = ft2.times[h];
               if(t1.time === t2.time)
               {
                 flag = true;
                 break;
               }
             }
             if(flag) break;
           }
        }
        if(flag) break;
      }
      if(flag)
        break;
    }
    return flag;
  },
  matchAge:function(other){
   return Math.abs(this.birthday.getFullYear() - other.birthday.getFullYear()) <= 4;
  },
  matchWithMe:function(other){
    var matchAge = this.matchAge(other);
    var matchFreeTime = this.matchFreeTime(other);
    return {
      match: matchAge && matchFeeTime,
      matchAge: matchAge,
      matchFreeTime:matchFeeTime
    };
  }
};

/**
* Hash password
*
* @param {String} password
* @return {String}
* @api public
*/
function hashPassword(password) {
  if (typeof(password) !== 'string' || password.toString().length === 0) return '';
  return bcrypt.hashSync(password);
}



module.exports = {
  model: mongoose.model('User', UserSchema),
  schema: UserSchema
};
