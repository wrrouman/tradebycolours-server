const router = require("express").Router();
const passport = require("passport");
var request = require("request");
const { AuthenticationClient } = require("auth0");

router.get("/login/auth0/get-access-token", (req, res) => {
  var options = {
    method: "POST",
    url: "https://dev-g87patwvksep0xn4.us.auth0.com/oauth/token",
    headers: { "content-type": "application/json" },
    body: '{"client_id":"LGYPXXaNBL2JrADGgSzG0CVhD9u5BKRg","client_secret":"bD3xK6yhomtb6NjJQz_c_GZzXNHvSdfPYxccsw-r9mB6YngrJwXtBDUDGy5XSh4l","audience":"https://dev-g87patwvksep0xn4.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(JSON.parse(body));
  });
});

router.get("/login/auth0", (req, res) => {});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect:
      process.env.CLIENT_URL || "https://tradebycolours.herokuapp.com",
    failureRedirect: "/auth/login/failed",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(
    process.env.CLIENT_URL || "https://tradebycolours.herokuapp.com"
  );
});

module.exports = router;
