const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID:
        process.env.CLIENT_ID ||
        "882116814490-jopj0bjv616puhuf3cfjhftlu6u5uvi5.apps.googleusercontent.com",
      clientSecret:
        process.env.CLIENT_SECRET || "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
