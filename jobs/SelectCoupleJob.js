
// // B1: collect top 10 user that is not selected.
// order by rank and creation date.
// B2: Iterate each people
// B3.1: If this is male.
// B3.1.1: SELECT SUITABLE PEOPLE OF MALE (Randomize).
// B3.1.2: if have suitable
// B3.1.2.1: YES: mark 2 of them are selected.
// B3.1.2.2: NO: return to B4.1.1 ( loop <= 3)
// B3.2: if this is female.
// B3.2.1: SELECT SUITABLE PEOPLE OF FEMALE (Randomize).
// B3.2.2: if have suitable
// B3.2.2.1: YES: mark 2 of them are selected.
// B3.2.2.2: NO: return to B4.2.1 ( loop <= 3)
// -------------------------------------------------------
// selectCouple:
// B1: select peop
//


var User = require('../models/User').model;
var Q = require('q');
var CollectionUtil = require('../lib/CollectionUtil');
var _ = require('lodash');
var Appointment = require('../models/Appointment').model;


var selectPartner = function(user) {
  'use strict';

  var defered = Q.defer();
  var partner = null;
  var max = 3;
  var daysOW = _.map(user.freeTimes, function(freeTime) {
    return freeTime.dayOW;
  });

  User.find({
      selected: false
    }) //select user who is not selected
    .in('gender', user.interestGenders) //who have gender that cross interestGender of he.
    .elementMatch('freeTimes', {
      dayOW: {
        $in: daysOW
      }
    })
    //  .elementMatch('freeTimes.items',{time:{$in:times})
    .limit(10) //only 10 person.
    .sort('created') //order by created it help to randomize the user.
    .exec() //execute query.
    .then(function(err, users) {
      if (err) {
        defered.reject(err);
      } else {
        //find user.
        var i = 0;
        if (users !== null && users.length > 0) {
          while (count > i++ && i < users.length) {
            partner = CollectionUtils.randomSelect(users, 1)[0];
            var matchResult = user.matchWithMe(partner);
            if (matchResult.match) {
              break;
            }
          }
        }
        defered.resolve([user, partner]);
      }
    });

  return defered.promise;
};


var pickAppointment = function(user1, user2){
  'use strict';
    var now = new Date();
    var hour = 1000*60*60;
    var day = hour*24;
    var dayOW = now.getDay();
    var sortAsc = function(a, b){ return a.dayOW - b.dayOW;};
    var intercept = [];
    var starts = [];

    //get intercept days ow
    for (var i = 0; i < user1.freeTimes.length; i++) {
      var ft1 = user1.freeTimes[i];
      for(var j = 0; j< user1.freeTimes.length; j++){
        var ft2 = user2.freeTimes[j];
        if(ft1.dayOW === ft2.dayOW){

          for (var h = 0; h < ft1.items.length; h++) {
            var item1 = ft1.items[h];
            for (var k = 0; k < ft2.items.length; k++) {
              var item2 = ft2.items[k];

              if(item1.time === item2.time){
                intercept.push({
                  dayOW:item1.dayOW,
                  time: item1.time,
                  duration: Math.min(item1.duration, item2.duration),
                });
              }

            }
          }

        }
      }
    }

    //get closest day for the appointment.
    var min = (new Date()).setMilliseconds(day*30);
    var closestStart;
    for (i = 0; i < intercept.length; i++) {
      var item = intercept[i];
      var start = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if(item.dayOW >= dayOW){
        start.setMilliseconds(day*(item.dayOW - dayOW));
      }else {
        start.setMilliseconds(day*(7- dayOW + item.dayOW));
      }

      if(start.getTime() < min){
        min = start.getTime();
        closestStart = start.setMinutes(item.time);
        closestEnd = new Date(closestStart.getTime() + hour*item.duration);
      }
    }

    //set the time.



    //get intercept



    var appointment = new Appointment({
        start:closestStart,
        end: closestEnd
    });
};

var selectCouple = function(job, done) {

  var condition = {
    selected: false
  }; //select only user that is not selected.
  var length = 0;
  var promises = [];
  User.find(condition)
    .limit(10) //select top 10 user.
    .sort('-rank created') //order decsending by rank and ascending date created.
    .exec() //execute query
    .then(function(err, users) {
      if (err) {
        //if have any error.
        done(err);
      } else {
        length = users.length;
        var i = 0;
        while (i < length) {
          var user = users[i];
          promises.push(selectPartner(user));
          i++;
        }
        //wait for all process is done.
        Q.allSettled(promises)
        .then(function(results){
          //for each result (partner.)
          _.each(results, function(item){
            var user, partner;
            if(!_.isArray(item) ||
              item.length !== 2 ||
              typeof(item[0]) !== 'object' ||
              typeof(item[1]) !== 'object')
              return;


            // create appointment.
            // select location.
            // notification.
          });
        });
      }

    });
};




module.exports = function(job, done) {

  //select radomize users.
  console.log('select couple');
  //filter by age.
  //filter by interest gender.
};
