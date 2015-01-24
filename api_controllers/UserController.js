/**
 * Created by Ho Nguyen on 6/29/2014.
 */

/**
 * Module dependencies.
 */

var User = require('../models/User').model;
var router = require('express').Router();


module.exports = function(router, passport) {


  /**
   * GET: api/users
   */
  router.get('/users', function(req, res) {
    var users = [];
    res.json(users);
  });


  /**
   * POST: api/users
   */
  router.post('/users',function(req, res){
    var body = req.body;
    var user = new User(body);

    user.save(function(err, user){
      if(!err) return err;

      return res.json(user);
    });

  });

};
