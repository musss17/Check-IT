
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const express = require('express');
const handleError = require('./middlewares/handleError');
const app = express();
const port = process.env.NODE_ENV == 'production' ? process.env.PORT || 8080 : 3000;
const Auth = require('./middlewares/auth');
const MongoDB = require('./database/mongodb');
const firebase = require("firebase-admin");

const serviceAccount = require("./check-it-a5623-firebase-adminsdk-a9tgf-d9f9cdf35a.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});


const userRouter = require('./routes/userRoute');
const homeRouter = require('./routes/homeRoute');
const NotesRouter = require('./routes/NotesRoute');
const StudyPlanRouter = require('./routes/StudyPlanRoute');
const chatRouter = require('./routes/ChatRoute');
const courseRouter = require('./routes/MyCourseRoute');
const todolistRouter = require('./routes/ToDoListRoute');

dotenv.config()

app.use(express.static('public'))

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(Auth.auth());

app.use('/user', userRouter);
app.use('/home', homeRouter);
app.use('/Notes', NotesRouter);
app.use('/StudyPlan', StudyPlanRouter);
app.use('/Chat', chatRouter);
app.use('/course', courseRouter);
app.use('/ToDoList', todolistRouter);

app.get('/', (req, res) => {
  res.render('index')
})


app.use((req, res) => res.render('404'));
app.use(handleError);

MongoDB.connect();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




