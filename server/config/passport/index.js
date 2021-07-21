import dotenv from 'dotenv'
dotenv.config();

import passport from 'passport';
import googleStrategy from 'passport-google-oauth20'


const strategy = googleStrategy.Strategy


passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new strategy({
    clientID: process.env.O_AUTH_CLIENT,
    clientSecret: process.env.O_AUTH_CLIENT_SECRET,
    callbackURL: "https://tic-tac-toe-ws-backend.herokuapp.com/v1/auth/oauth-redirect/",
}, (accessToken, refreshToken,profile,done)=>{
      return done(null, profile)
}))