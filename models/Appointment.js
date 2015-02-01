/**
 * Created by Ho on 1/25/2015.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AppointmentSchema = new Schema({
  start: {
    type: Date,
    required:true
  },
  end:{
    type:Date,
    required: true
  },
  place:{
    placeId: Schema.Types.ObjectId,
    formatted: String,
    loc:[]
  },
  userId: Schema.Types.ObjectId,
  active: {
    type:Boolean,
    default:true
  },
  created:{
    type:Date,
    default:Date.now
  }
});


module.exports = {
  model: mongoose.model('Appointment', AppointmentSchema),
  schema: AppointmentSchema
};
