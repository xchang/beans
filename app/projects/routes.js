var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();
var app = express();

var createProject = function(projectName, db, callback) {
  var collection = db.collection('projects');
  collection.insert({name: projectName}, function(err, result){
    callback(result);
  });
}

var fetchProject = function(id, db, callback){
  var collection = db.collection('projects');
  collection.find({_id: new ObjectID(id)}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.dir(docs);
    callback(docs[0]);
  });
}

router.get('/:id', function(req, res) {
  var url = req.app.get('DB_URL');
  var mongoClient = require('mongodb').MongoClient;

  mongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");

    fetchProject(req.params['id'], db, function(proj){
      db.close();
      res.render('projects/index', {project: proj});
    });
  });
});

router.post('/', function(req, res){
  var url = req.app.get('DB_URL');
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