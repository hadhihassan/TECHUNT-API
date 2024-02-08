import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import passport from 'passport';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        done(null, profile)
    }
));

passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})