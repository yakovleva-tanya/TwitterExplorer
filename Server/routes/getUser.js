var express = require("express");
var router = express.Router();
const https = require("https");

/* GET users listing. */
router.get("/", function(req, res, next) {
  let username = req.query.username;
  let token = req.query.token;
  const url = encodeURIComponent(`https://twitter.com/${username}/`);
  const path = `/?token=${token}&url=${url}&format=json`;
  const options = {
    hostname: "api.proxycrawl.com",
    path: path
  };

  https
    .request(options, response => {
      let body = "";
      response
        .on("data", chunk => (body += chunk))
        .on("end", () => res.send(body));
    })
    .end();
});

module.exports = router;
