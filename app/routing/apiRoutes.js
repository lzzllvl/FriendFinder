const path = require('path');
const friends = require('../data/friends.js');


var apiRoutes = function(app) {
  app.get("/api/friends", function(req, res) {
    res.sendFile(path.join(__dirname, "/../data/friends.json"));
  });

  app.post("/api/friends", function(req, res) {

    var currentUser = req.body;


    //this section is a little weird, it's to maintain formatting.
    currentUser.scores = currentUser['scores[]'];
    //I'm not sure why the post is changing the object from client in this way
    delete currentUser['scores[]'];
    currentUser.scores = currentUser.scores.map(Number);

    friends.getUserArray();//this sets the user object array from current JSON file
    var suggestion = friends.findNearestNeighbor(currentUser);
    //var suggestion = friends.findNearestNeighborEuclidean(currentUser);

    friends.saveUser(currentUser);

    res.json(JSON.stringify(suggestion));//send back to client for modal
  });
}

module.exports = apiRoutes;