/**
 * Created by Ho Nguyen on 6/29/2014.
 */

/**
 * Module dependencies.
 */

var User = require('../models/User').model;

module.exports = function(router, passport) {


  /**
   * GET: api/users
   */
  router.get('/Users', function(req, res) {
    var users = [];
    res.json(users);
  });


  /**
   * POST: api/users
   */
  router.post('/Users',function(req, res){
    var body = req.body;

    var user = new User({
      email:body.email,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      birthday: body.birthday,
      gender:body.gender,
      location:{
        address: body.address
      },
      interestGenders: body.intrestGenders,
      freeTimes: body.freeTimes
    });

    user.save(function(err, u){
      if(err != null) {
        res.status(500);
        res.json({message: "could not save user. err: "+err});
      }else{
        //remove password from user object.
        u.password = "";
      //response status 200.
        res.status(200);
        //send response.
        res.json(u);
      }
    });

  });

};
