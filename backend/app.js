const express = require('express');

const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');

const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');

const app = express();

//setup view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));


// initialize passport
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes);



app.get('/', (req, res) => {
    res.render('home', { user: req.user })
})

app.listen(3000, () => {
    console.log('App now listening to port 3000');
})