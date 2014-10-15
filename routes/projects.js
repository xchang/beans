var express = require('express');
var router = express.Router();

var createProject = function(projectName, db, callback) {
  var collection = db.collection('projects');
  collection.insert({name: projectName}, function(err, result){
    callback(result);
  });
}

router.post('/', function(req, res){
  var url = 'mongodb://localhost:27017/beans_dev';
  var mongoClient = require('mongodb').MongoClient;

  mongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");

    createProject(req.body.projectName, db, function(){
      db.close();
    });
  });
  
  res.redirect('/dashboard');
});

module.exports = router;