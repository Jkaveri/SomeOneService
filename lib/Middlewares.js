/**
 * Created by Henry on 2014-12-21
 * path: lib/Middlewares.js
 */

 module.exports = (function(){

   return {
     isAuthenticated:function(req, res, next){
       
       if(req.isAuthenticated()){
         return next();
       }

       res.redirect('/login');
     }
   };
 }());
