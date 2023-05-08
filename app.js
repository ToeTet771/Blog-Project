//!assign section
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || process.argv[2] || 3000;

//!Obj
let blogObj = [];

//!middleware section
app.use(express.static('./public'));
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next) => {
    // console.log(req.method);
    // console.log(req.body);
    next();
});


//!method get section

app.get('/', (req,res) => {
    res.render('./home.ejs', {'titleHead': 'Home', blogObj});
});

app.get('/blog', (req,res) => {
    res.render('./blog.ejs', {'titleHead': 'Blog'});
});

app.get('/contact', (req,res) => {
    res.render('./contact.ejs', {'titleHead': 'Contact'});
});

app.get('/about', (req,res) => {
    res.render('./about.ejs', {'titleHead': 'About'});
});






//!method post section

app.post('/blog', (req,res) =>{
    const newBlog = req.body;
    blogObj.push(newBlog);
    res.render('./home.ejs', {'titleHead': 'Home', blogObj});
});





app.listen(port, () => {
    console.log(`Server is up and running at port : ${port}`);
});


app.use((req,res) => {
    res.render('./error.ejs', {'titleHead': 'Error 404'});
});