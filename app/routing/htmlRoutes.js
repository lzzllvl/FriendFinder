const path = require('path');

const htmlRoutes = function(app) {
  //since these are all get requests, I'm using a switch statement to
  //catch all that arent survey.
  app.get("/:page", function(req, res) {
    switch(req.params.page){
      case "survey":
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
        break;
      default:
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    }
  });
}

module.exports = htmlRoutes;