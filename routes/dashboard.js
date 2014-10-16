var express = require('express');
var router = express.Router();

var fetchProjects = function(db, callback) {
  var collection = db.collection('projects');
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
}

router.get('/', function(req, res) {
  var url = res.app.get('DB_URL');
  var mongoClient = require('mongodb').MongoClient;

  mongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");

    fetchProjects(db, function(projects){
      res.render('dashboard', {projects: projects});
      db.close();
    });
  });
});

module.exports = router;