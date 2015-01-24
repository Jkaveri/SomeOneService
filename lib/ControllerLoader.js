/**
 * Created by Ho on 12/5/2014.
 */

var express = require('express'),
  //  IdParamValidate = require('../middleware/IdParamValidate'),
  fs = require('fs'),
  path_module = require('path');

//router.param('id',IdParamValidate.validate);


// var DIR = path_module.join(path_module.dirname(__dirname),'api_controllers');
// LoadModules(DIR);

function LoadModules(router, path, passport) {
  //  console.log(path);
  fs.lstat(path, function(err, stat) {
    if (stat.isDirectory()) {
      // we have a directory: do a tree walk
      fs.readdir(path, function(err, files) {
        var f, l = files.length;
        for (var i = 0; i < l; i++) {
          f = path_module.join(path, files[i]);
          LoadModules(router, f, passport);
        }
      });
    } else {
      // we have a file: load it
      var controller = require(path);
    
      controller(router, passport);
    }
  });
}





module.exports = function(path, passport) {
  var router = express.Router();
  LoadModules(router, path, passport);
  return router;
};
