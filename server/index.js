if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const local_auth = require('passport-local');
const session = require('express-session');
const User = require('./models/user');
const MongoDBStore = require('connect-mongodb-session')(session)
const userRoutes = require('./routes/users');
const mongoSanitize = require('express-mongo-sanitize');

const calenderASRoutes = require('./routes/calender');
const courseASRoutes = require('./routes/courseAS');
const domainASRoutes = require('./routes/domainAS');
const chapterASRoutes =require('./routes/chapterAS');

const dbUrl = process.env.DB_URL || 'mongodb+srv://EDULINE:EDULINESDIRI@cluster0.lcx2y.mongodb.net/test';
mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database Connected");
})
const app = express();
const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = new MongoDBStore({
    url: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
/*app.use(mongoSanitize());*/
app.use(express.urlencoded({ extended: true }));
//////////////////////////////////////////////
passport.use(new local_auth(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', userRoutes);

app.use('/',courseASRoutes);
app.use('/courseAS/domain',domainASRoutes);
app.use('/courseAS/chapter',chapterASRoutes);
app.use('/calendar',calenderASRoutes);

const bodyParser = require('body-parser');

app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);



const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})