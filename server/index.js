import dotenv from 'dotenv';

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import local_auth from 'passport-local';
import session from 'express-session';
import User from './models/user.js';
//const MongoDBStore = require('connect-mongodb-session')(session)
import connect from 'connect-mongodb-session';
const MongoDBStore = connect(session);
import userRoutes from './routes/users.js';
import forumRoutes from './routes/forums.js';
import answerRoutes from './routes/answers.js';
import commentRoutes from './routes/comments.js';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';

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
app.use(cors());
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


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration



app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
/*app.use(mongoSanitize());*/
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import bodyParser from 'body-parser';

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//////////////////////////////////////////////
passport.use(new local_auth(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/forums', forumRoutes);
app.use('/answers', answerRoutes);
app.use('/forums', commentRoutes);
app.use('/', userRoutes);

app.use('/aa',courseASRoutes);
app.use('/courseAS/domain',domainASRoutes);
app.use('/courseAS/chapter',chapterASRoutes);
app.use('/calendar',calenderASRoutes);

const bodyParser = require('body-parser');

app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});