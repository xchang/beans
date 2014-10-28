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

/* GET home page. */
router.get('/', function(req, res) {
  res.render('site/index', { title: 'beans' });
});

router.get('/signin', function(req, res) {
  res.render('site/signin');
});

router.get('/dashboard', function(req, res) {
  var url = res.app.get('DB_URL');
  var mongoClient = require('mongodb').MongoClient;
  
  mongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");

    fetchProjects(db, function(projects){
      res.render('site/dashboard', {projects: projects});
      db.close();
    });
  });
});

module.exports = router;