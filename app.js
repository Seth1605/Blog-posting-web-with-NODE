const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./Models/blog');
const dbURL = 'mongodb+srv://Seth:123@learnnode.6ei6e.mongodb.net/BlogWeb?retryWrites=true&w=majority&appName=learnNode';
const app = express();

//connect to mongodb
mongoose.connect(dbURL)
//incase of older version of node you would need to pass a second argument to the connect method
//-------------
//{useNewUrlParser: true, useUnifiedTopology: true}
//-------------
.then((result) => 
    app.listen(3000, (err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("server is listening for request on port 3000");
        }
    }))
.catch((err) => console.log(err));

//setting render engine
app.set('view engine', 'ejs');
//res.render('index', {title: 'Home'}); 

//make "public" folder available
app.use(express.static('public'));
app.use(express.static('public/img'));
//log dev mode data
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).render('index', 
        {title: 'Home'});
});
app.get('/home', (req, res) => {
    res.status(200).redirect('/');
});

app.get('/about', (req, res) => {
    res.status(200).render('aboutUs');
});
app.get('/aboutUs', (req, res) => {
    res.status(200).redirect('/about');
});

app.get('/createBlog', (req, res) => {
    res.status(200).render('createBlog');
});
app.get('/viewBlog', (req, res) => {
    Blog.find().sort({createdAt: -1})
    .then((result) => {
        res.status(200).render('viewBlog', {blogs: result});
    })
    .catch((err) => {
        console.log(err);
    })
});

app.use((req,res) => {
    res.status(404).sendFile('/pages/404.html', {root: __dirname})
});