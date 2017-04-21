const fs = require('fs');
const path = require('path');

//this module will use a JSON file to write and read the users information;

module.exports = {
  getUserArray: function() {
     this.users = JSON.parse(fs.readFileSync(path.join(__dirname, "/../data/friends.json"), 'utf-8'));
  },
  saveUser: function(userObject) {

    this.users.push(userObject);
    console.log(this.users);
    fs.writeFileSync(path.join(__dirname, "/../data/friends.json"), JSON.stringify(this.users, null, 2));//pretty print json for readability
  },
  findNearestNeighbor: function(userObject) {
    let bestMatchIndex = 0;
    let bestMatchScore = Infinity; //lower scores are better, like golf
    let userScores = userObject.scores;
    let len = userScores.length;

    this.users.forEach((val, index) => {
      let current = 0;
      for(let i = 0; i < len; i++) {
        var diff = Math.abs(userScores[i] - val.scores[i]);
        current += diff;
      }
      if(current < bestMatchScore) {
        bestMatchScore = current;
        bestMatchIndex = index;
      }
    })
    return this.users[bestMatchIndex];
  },
  findNearestNeighborEuclidean: function(userObject) {
    //d = sqrt((a1 - a2)^2 + (b1 - b2)^2 + (c1 - c2)^2 .... (n1 - n2)^2)
    let bestMatchIndex = 0;
    let bestMatchScore = Infinity;
    let userScores = userObject.scores;
    let len = userScores.length;

    this.users.forEach((val, index) => {
      let current = 0;
      for(let i = 0; i < len; i++) {
        var diff = Math.pow((userScores[i] - val.scores[i]), 2);
        current += diff;
      }
      if(Math.sqrt(current) < bestMatchScore) {
        bestMatchScore = Math.sqrt(current);
        bestMatchIndex = index;
      }
    })
    return this.users[bestMatchIndex];
  }
}