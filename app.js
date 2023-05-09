//!assign section
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || process.argv[2] || 3000;
const _ = require('lodash');

//!middleware section
app.use(express.static('./public'));
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next) => {
    console.log(req.method);
    // console.log(req.body);
    next();
});

//!Global Obj
let posts = [];

//!method get section

app.get('/', (req,res) => {
    res.render('./home.ejs', {titleHead: 'Home', posts});
});

app.get('/blog', (req,res) => {
    res.render('./blog.ejs', {titleHead: 'Blog'});
});

app.get('/contact', (req,res) => {
    res.render('./contact.ejs', {titleHead: 'Contact'});
});

app.get('/about', (req,res) => {
    res.render('./about.ejs', {titleHead: 'About'});
});



app.get('/posts/:postTitle',(req,res) => {
    const requestTitle = _.lowerCase(req.params.postTitle);
    
    posts.forEach(post => {
        const storedTitle = _.lowerCase(post.title);
        if( storedTitle === requestTitle){
            res.render('./postItem.ejs', {
                titleHead : post.title, 
                title : post.title,
                content : post.content
            });
        };
    });

});


//!method post section

// app.post('/blog', (req,res) =>{
//     const newBlog = req.body;
//     newBlog.id = posts.length +1
//     posts.push(newBlog);
//     res.render('./home.ejs', {'titleHead': 'Home', posts});
// });

app.post('/blog', (req,res) => {
    const newPost = {
        title : req.body.blogTitle,
        content : req.body.blogBody
    };
    posts.push(newPost);
    res.redirect('/');
});




app.listen(port, () => {
    console.log(`Server is up and running at port : ${port}`);
});


app.use((req,res) => {
    res.render('./error.ejs', {titleHead : 'Error 404'});
});