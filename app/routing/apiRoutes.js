const path = require('path');
const friends = require('../data/friends.js');


var apiRoutes = function(app) {
  app.get("/api/friends", function(req, res) {
    res.sendFile(path.join(__dirname, "/../data/friends.json"));
  });

  app.post("/api/friends", function(req, res) {
    var currentUser = req.body;
    friends.getUserArray();//this sets the user object array from current JSON file
    var suggestion = friends.findNearestNeighbor(currentUser);
    // var suggestion = friends.findNearestNeighborEuclidean(currentUser);

    friends.saveUser(currentUser);

    res.json(JSON.stringify(suggestion));//send back to client for modal
  });
}