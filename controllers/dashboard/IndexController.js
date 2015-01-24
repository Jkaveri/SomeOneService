/**
 * Created by Henry on 2014-12-19
 */

var middlewares = require('../../lib/Middlewares');


module.exports = function(router, passport) {

  //GET: admin/dashboard
  router.get('/dashboard', middlewares.isAuthenticated,
    function(req, res) {
      res.render("dashboard", {});
    }
  );
};
