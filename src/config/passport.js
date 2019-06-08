// Authenticate password
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const Member = require('../models/Member')

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // Match Email's User
  const user = await Member.findOne({email: email});
  if (!user) {
    return done(null, false, { message: 'Not User found.' });
  } else {
    // Match Password's User
    const match = await user.matchPassword(password);
    if(match) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Contraseña Incorrecta.' });
    }
  }
}));

//Creating a session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Member.findById(id, (err, user) => {
    done(err, user);
  });
});
