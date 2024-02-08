// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

/*--------------------- Start ---------------------*/
// API endpoint for timestamp microservice
app.get("/api/:date?", function (req, res) {
  const date = req.params["date"];
  let inputDate;

  // Check if date parameter is provided
  if (!date) {
    inputDate = new Date(); //current date
  } else {
    // Attempt to parse input date
    const timestamp = Number(date);
    // Check if the timestamp is valid like(1451001600000)
    if (!isNaN(timestamp)) {
      inputDate = new Date(timestamp);
    } else {
      // If not valid, try to parse the input date as a date string(2015-12-25)
      inputDate = new Date(date);
    }
    // Check if the input date is invalid
    if (isNaN(inputDate.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  }

  // Prepare response object
  const responseObject = {
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString(),
  };

  // Send response object
  res.json(responseObject);
});
/*--------------------- End ---------------------*/
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
