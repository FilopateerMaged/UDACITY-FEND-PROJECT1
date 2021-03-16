const dotenv = require("dotenv");
dotenv.config();
var path = require("path");
const express = require("express");
const app = express();
const mockAPIResponse = require("./mockAPI.js");
app.use(express.static("dist"));
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
console.log(__dirname);
const cors = require("cors");
app.use(cors());
const axios = require("axios");
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.get("/scan/*", async (req, res) => {
  try {
    const url = req.params[0];
    apiURL = "https://api.meaningcloud.com/sentiment-2.1";
    apiKey = process.env.API_KEY;
    const apiResponse = await axios.get(
      `${apiURL}?key=${apiKey}&url=${url}&lang=en`
    );

    const { agreement, subjectivity, confidence, irony } = apiResponse.data;
    res.send({
      agreement,
      subjectivity,
      confidence,
      irony,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Ha..This shouldn't be happening..." + err);
  }
});

app.listen(8080, function () {
  console.log("check your local host on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
