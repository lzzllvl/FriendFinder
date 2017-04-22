//serverFTW
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

const app = express();


//telling express how to handle POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//routes
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);


app.listen(PORT, () => {
  console.log(`App Listening on port ${PORT}...`);
})