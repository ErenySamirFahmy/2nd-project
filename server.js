// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
app.use(express.json());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;
app.listen(port, function listening() {
  console.log(`Server is running on port ${port}`);
});


// /saveData route (post)
app.post("/saveData", function (request, response) {
  projectData = request.body;
  response.send(projectData);
  console.log("Data has been saved!");
});

// /returnData route (get)
app.get("/returnData", function (request, response) {
  response.send(projectData);
  console.log(projectData);
});
