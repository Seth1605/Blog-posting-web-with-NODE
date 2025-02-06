const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = 'mongodb+srv://Seth:<db_password>@learnnode.6ei6e.mongodb.net/?retryWrites=true&w=majority&appName=learnNode';

const app = express();

//setting render engine
app.set('view engine', 'ejs');
//res.render('index', {title: 'Home'}); 
app.listen(3000, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("server is listening for request on port 3000");
    }
});
//make "public" folder available
app.use(express.static('public'));
app.use(express.static('public/img'))
//log dev mode data
app.use(morgan('dev'));
//---------------without render engine EJS
// app.get('/menu', (req, res) => {
//     res.status(200).sendFile('/pages/menu.html', {root: __dirname})
//     --or--
//     res.status(200).sendfile(__dirname + '/pages/menu.html');
// })
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
const blogs = [
   {title:'Text1', content:'This is the content of text1'},
   {title:'Text2', content:'This is the content of text'},
]
const noBlog = 'no blog to show';
app.get('/viewBlog', (req, res) => {
    res.status(200).render('viewBlog', {blogs, noBlog});
});

app.use((req,res) => {
    res.status(404).sendFile('/pages/404.html', {root: __dirname})
});