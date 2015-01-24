/**
 * Created by Ho on 8/3/2014.
 */


var User = require('../../../models/User').model,
    assert = require('assert'),
    should = require('should'),
    mongoose = require('mongoose'),
    db = require('../../../lib/db');


describe('models/User', function () {

    var password = '1234567';

    function createUser() {

        return new User({
            email: 'haiho1992@gmail.com',
            password: password,
            profile:{
              picture: '',
              gender:'male',
              firstName:'Ho',
              lastName:'Nguyen',
              age: 18,
              interestGenders:['male', 'female'],
              location:{
                address:'2/142 Thien Phuoc',
                district:'Tan Binh',
                city: 'Ho Chi Minh',
                country:'Vietnam',

              }
            }
        });
    }


  
    it('should have "email" property', function () {
        var user = createUser();
        user.should.have.property('email');
    });

    it('should have "password" property', function () {
        var user = createUser();
        user.should.have.property('password');
    });


    it('should have encrypted password', function () {
        var user = createUser();
        user.password.should.not.equal(password);
    });


    describe('#validatePassword', function () {
        var user;

        before(function (done) {
            user = createUser();
            User.remove({email:user.email},function(err){
                if(err) return done(err);
                user.save(function (err) {
                    if (err) return done(err);
                    done();
                });
            });

        });

        it('should return true with valid password', function (done) {
            User.findOne(
                {email: user.email},
                function (err, u) {
                    if (err !== null) return done(err);
                    u.validatePassword(password).should.equal(true);
                    done();
                }
            );
        });

        it('should return false with invalid password', function (done) {
            User.findOne(
                {email: user.email},
                function (err, u) {
                    if (err != null) return done(err);
                    u.validatePassword(password+"invalid").should.equal(false);
                    done();
                }
            );
        });

        after(function(done){
           User.remove({id:user.id},function(err){
               if(err) return done(err);
               done();
           });
        });
    });


    it('should have "picture" property', function () {
        var user = createUser();
        user.should.have.property('picture');
    });

});
